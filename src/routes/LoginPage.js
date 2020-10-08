import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import axios from "../lib/api"
import { withRouter } from "react-router-dom";
import styled from "styled-components"
import {Redirect, BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 250px;
   
    
`;
const FormWrapper = styled.div`

    border: 1px solid silver;
        border-radius: 7px;
        box-shadow: 1px 7px 20px -8px rgba(0,0,0,0.54);
    padding: 30px;
        background-color: white;
`;

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        let {error} = this.state;
        const {username, password} = this.state;
        const {history} = this.props;

        if (!username || !password) {
            return this.setState({error: true});
        }

        const post = {
            username: username,
            password: password
        };

        axios
            .post("users/login", post)
            .then(res => {
                this.setState({response: res});
                localStorage.setItem("jwtToken", res.data.token);
                return history.push("/Profile");
            })
            .catch(err => {
                this.setState({error: true});
            });
    }

    render() {
        const {username, password, error} = this.state;
        return (
            <Wrapper>
                <FormWrapper>
                    <Form onSubmit={this.onSubmit} style={{width:"330px"}}>
                        <Form.Group controlId="text">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={this.onChange} name="username" type="text" placeholder="Enter username"
                                          value={username} isInvalid={error}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={this.onChange} name="password" type="password" placeholder="Password"
                                          value={password} isInvalid={error}/>
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Submit
                        </Button>
                        <div style={{marginTop:"10px"}}>
                            Dont have an account?
                            <Link to='/register'> Sigh Up</Link>
                        </div>
                    </Form>
                </FormWrapper>
            </Wrapper>
        );
    }
}

export default withRouter(LoginPage);
