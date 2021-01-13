import { useState } from 'react';
import { Card, Input, Label, Form, Button } from 'reactstrap';
import { normalFetch } from '../components/Fetch/Fetch';
import { Redirect } from "react-router-dom"
import '../loginPanel/login.css';
import { render } from '@testing-library/react';

function LoginPanel() {
    const [details, setDetails] = useState({ pass: "", user: "" })
    const [ready, setReady] = useState(false);

    const login = async (e) => {
        e.preventDefault();
        const login = await normalFetch("http://localhost:3002/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwidXNlcklkIjoiNWZlYjQzOTMwYmZlNGMyMzI4NGEzZTdiIiwicm9sZXMiOiJBZG1pbiIsImlhdCI6MTYxMDM2Nzk0MCwiZXhwIjoxNjEwNDU0MzQwfQ.Yy9KbWXYxFjVT9JRB2A7V5ZkpSNReedCylo0NhzmkCg'
            },
            body: JSON.stringify({
                email: details.user,
                password: details.pass,

            })
        });

        if (login.message === "Auth successful") {
            sessionStorage.setItem("token", login.token);
            setReady(true);
        }

    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    }

    if(ready || sessionStorage.getItem("token") !== null) {
        return <Redirect push to={{pathname: '/dashboard'}} />
    }

    return (
        <Card className="mainBody">
            <Form onSubmit={login}>
                <Label for="user">Username: </Label>
                <Input id="user" name="user" type="text" onChange={onChange}></Input>
                <Label for="pass">Password: </Label>
                <Input id="pass" name="pass" type="password" onChange={onChange}></Input>
                <Button>Login</Button>
            </Form>
        </Card>
    )
}

export default LoginPanel;