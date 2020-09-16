import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";

import "./Login.css";
import LoaderButton from "../components/LoaderButton";
import ConfirmationForm from "./ConfirmationForm";

const Login = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const { userHasAuthenticated, setUserEmail } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const [fields, handleFieldChange] = useFormFields({email: "", password:""});
    const [notConfirmed, setNotConfirmed] = useState(false);

    const validateForm = () => {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    const handleSubmit = async e => {
        e.preventDefault();

        setIsLoading(true);

        try {
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
            history.push("/");
        } catch (err) {
            if(err instanceof Object && err.message === "User is not confirmed."){
                setNotConfirmed(true);
                Auth.resendSignUp(fields.email);
                setUserEmail(fields.email);
                alert("Check your email for Confirmation Code")
            } else{
                onError(err);
            }
            setIsLoading(false);
        }
    }

    if(notConfirmed) return <ConfirmationForm />
    return (
        <div className="Login">
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
                <LoaderButton 
                    block 
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()} 
                    type="submit"
                >
                    Login
                </LoaderButton>
            </form>
        </div>
    )
}

export default Login;