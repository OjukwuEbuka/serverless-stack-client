import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const { isAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            if(!isAuthenticated) {
                return;
            }

            try {
                const notes = await loadNotes();
                setNotes(notes);
            } catch(err) {
                onError(err)
            }

            setIsLoading(false);
        }
        onLoad();
    }, [isAuthenticated]);

    const loadNotes = () => API.get("notes", "/notes");

    const renderNotesList = notes => [{}, ...notes].map((note, i) => 
        i !== 0 ? (
            <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
                <ListGroupItem header={note.content.trim().split("\n")[0]}>
                    {"Created: " + new Date(note.createdAt).toLocaleString()}
                </ListGroupItem>
            </LinkContainer>
        ) : (
            <LinkContainer key="new" to="/notes/new">
                <ListGroupItem>
                    <h4>
                        <b>{"\uFF0B"}</b> Create a new note
                    </h4>
                </ListGroupItem>
            </LinkContainer>
        )
    );

    const renderLander = () => (
        <div className="lander">
            <h1>Scratch</h1>
            <p>A simple note taking app</p>
        </div>
    );

    const renderNotes = () => (
        <div className="notes">
            <PageHeader>Your Notes</PageHeader>
            <ListGroup>
                {!isLoading && renderNotesList(notes)}
            </ListGroup>
        </div>
    );

    return (
        <div className="Home">
            {isAuthenticated ? renderNotes() : renderLander()}
        </div>
    );
}


export default Home;