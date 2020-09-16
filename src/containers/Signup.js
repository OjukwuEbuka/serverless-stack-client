import React, { useState } from "react";
import { 
    FormGroup, 
    FormControl, 
    ControlLabel,
    HelpBlock
} from "react-bootstrap";
import { Auth } from "aws-amplify";

import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";

import "./Signup.css";
import LoaderButton from "../components/LoaderButton";
import ConfirmationForm from "./ConfirmationForm";

const Login = () => {
    const [newUser, setNewUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password:"",
        confirmPassword: "",
        confirmationCode: ""
    });

    const validateForm = () => {
        return (
            fields.email.length > 0 && 
            fields.password.length > 0&&
            fields.password === fields.confirmPassword
        );
    }

    const handleSubmit = async e => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password
            })
            setNewUser(newUser);
            setIsLoading(false);
            // alert('submitted');            
        } catch (err) {
            onError(err);
            setIsLoading(false);
        }
    }

    const renderForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={fields.confirmPassword}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <LoaderButton 
                    block 
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()} 
                    type="submit"
                >
                    Signup
                </LoaderButton>
            </form>
        );
    }

    return (
        <div className="Signup">
            {newUser === null ? renderForm() : <ConfirmationForm />}
        </div>
    );
}

export default Login;