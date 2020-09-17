import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";

export default function Notes () {
    const file = useRef(null);
    const { id } = useParams();
    const history = useHistory();
    const [note, setNote] = useState(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const loadNote = () => API.get("notes", `/notes/${id}`);

        async function onLoad() {
            try {
                const note = await loadNote();
                const { content, attachment } = note;

                if(attachment) {
                    note.attachmentURL = await Storage.vault.get(attachment);
                }
                setContent(content);
                setNote(note);
            } catch(err) {
                onError(err);
            }
        }
        onLoad();
    }, [id]);

    const validateForm = () => content.length > 0;

    const formatFilename = str => str.replace(/^\w+-/, "");

    const handleFileChange = e => file.current = e.target.files[0];

    async function handleSubmit(e) {
        let attachment;
        e.preventDefault();

        if(file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`);
            return;
        }

        setIsLoading(true);
    }

    async function handleDelete(e) {
        e.preventDefault();

        const confirmed = window.confirm("Are you sure you want to delete this note?");

        if(!confirmed) return;

        setIsDeleting(true);
    }


    return (
        <div className="Notes">
            {note && (
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl 
                            value={content}
                            componentClass="textarea"
                            onChange={e => setContent(e.target.value)}
                        />
                        {note.attachment && (
                            <FormGroup>
                                <ControlLabel>Attachment</ControlLabel>
                                <FormControl.Static>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={note.attachmentURL}
                                    >
                                        {formatFilename(note.attachment)}
                                    </a>
                                </FormControl.Static>
                            </FormGroup>
                        )}
                        <FormGroup controlId="file">
                            {!note.attachment && 
                            <ControlLabel>Attachment</ControlLabel>}
                            <FormControl onChange={handleFileChange} type="file" />
                        </FormGroup>
                        <LoaderButton
                            block
                            type="submit"
                            bsSize="large"
                            bsStyle="primary"
                            isLoading={isLoading}
                            disabled={!validateForm()}
                        >
                            Save
                        </LoaderButton>
                        <LoaderButton
                            block
                            bsSize="large"
                            bsStyle="danger"
                            isLoading={isDeleting}
                            onClick={handleDelete}
                        >
                            Delete
                        </LoaderButton>
                    </FormGroup>
                </form>
            )}
        </div>
    )
}