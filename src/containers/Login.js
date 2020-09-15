import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";

import "./Login.css";
import LoaderButton from "../components/LoaderButton";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = async e => {
        e.preventDefault();

        setIsLoading(true);

        try {
            await Auth.signIn(email, password);
            userHasAuthenticated(true);
            history.push("/");
        } catch (err) {
            onError(err);
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={ e => setEmail(e.target.value) }
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={password}
                        onChange={ e => setPassword(e.target.value) }
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