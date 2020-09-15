import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";

import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await Auth.signIn(email, password);
            alert("Logged in");
        } catch (err) {
            alert(err.message);
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
                <Button block bsSize="large"
                     disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
        </div>
    )
}

export default Login;