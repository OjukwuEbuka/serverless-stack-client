import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useFormFields } from "../libs/hooksLib";
import { useAppContext } from "../libs/contextLib";
import { 
    FormGroup, 
    FormControl, 
    ControlLabel,
    HelpBlock
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { Auth } from "aws-amplify";
import { onError } from "../libs/errorLib";
import "./Login.css";


export default function ConfirmationForm () {
    const { userHasAuthenticated, userEmail } = useAppContext();
    const [fields, handleFieldChange] = useFormFields({confirmationCode: ""});
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const validateConfirmationForm = () => {
        return fields.confirmationCode.length > 0;
    }

    const handleConfirmationSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log(userEmail, fields.confirmationCode);
            await Auth.confirmSignUp(userEmail, fields.confirmationCode);
            await Auth.signIn(userEmail, fields.password);
            userHasAuthenticated(true);
            history.push("/");
            alert("yes")
        } catch (err) {
            onError(e);
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleConfirmationSubmit} className="ConfirmForm">
            <FormGroup 
                controlId="confirmationCode"
                bsSize="large">
                <ControlLabel>Confirmation Code</ControlLabel>
                <FormControl
                    autoFocus
                    type="tel"
                    onChange={handleFieldChange}
                    value={fields.confirmationCode}
                />
                <HelpBlock>Please check your email for the code.</HelpBlock>
            </FormGroup>
            <LoaderButton 
                block 
                bsSize="large"
                isLoading={isLoading}
                disabled={!validateConfirmationForm()} 
                type="submit"
            >
                Verify
            </LoaderButton>
        </form>
    )
};
