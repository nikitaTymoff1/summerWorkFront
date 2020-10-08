import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import axios from "../lib/api"
import {Link, withRouter} from "react-router-dom";
import styled from "styled-components"
import Alert from "react-bootstrap/Alert";
const nameRegex = RegExp(/^[a-zA-Zа-яА-Я0-9]{3,}$/);
const emailRegex = RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/);
const passwordRegex = RegExp(
    /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?!\S*?[!@#$^&%*()+=\-[\]/{}|:<>?,. а-яА-Я]).{6,})\S$/
);
const FormWrapper = styled.div`
    border: 1px solid silver;
        border-radius: 7px;
        box-shadow: 1px 7px 20px -8px rgba(0,0,0,0.54);
    padding: 30px;
        background-color: white;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
`;
const formValid = ({validationErrors}) => {
    let valid = true;

    Object.values(validationErrors).forEach((val) => {
        if (val) valid = false;
    });

    return valid;
};

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: {
                username: "",
                name: "",
                surname: "",
                email: "",
                password: "",
                repeatPassword: "",
            },
            validationErrors: {
                usernameError: false,
                nameError: false,
                surnameError: false,
                emailError: false,
                passwordError: false,
                repeatPasswordError: false,
            },
            errorFromServer: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        const newPostData = {
            ...this.state.postData, [e.target.name]: e.target.value
        }
        this.setState({
            postData: newPostData
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.validate();
        const {postData} = this.state;
        const {history} = this.props;
        this.setState({errorFromServer: false});
        if (formValid(this.state))
            axios
                .post("users/register", postData)
                .then(res => {

                    localStorage.setItem("jwtToken", res.data.token);
                    return history.push("/profile");
                })
                .catch(err => {
                    this.setState({errorFromServer: true});
                });
    }

    validate = () => {
        const {validationErrors, postData} = this.state;
        for (let key in postData) {
            switch (key) {
                case 'name':
                    validationErrors.nameError = !nameRegex.test(postData[key]);
                    break;
                case 'username':
                    validationErrors.usernameError = !nameRegex.test(postData[key]);
                    break;
                case 'surname':
                    validationErrors.surnameError = !nameRegex.test(postData[key]);
                    break;
                case 'email':
                    validationErrors.emailError = !emailRegex.test(postData[key]);
                    break;
                case 'password':
                    //validationErrors.password = !(passwordRegex.test(value) && value === repeatPassword);
                    validationErrors.passwordError = !passwordRegex.test(postData[key]);
                    break;
                case 'repeatPassword':
                    validationErrors.repeatPasswordError = postData.password !== postData.repeatPassword;
                    break;
                default:
                    break;
            }
        }
        this.setState({validationErrors});
    };

    render() {
        const {
            username,
            password,
            name,
            surname,
            email,
            repeatPassword
        } = this.state.postData;
        const {
            usernameError,
            nameError,
            surnameError,
            emailError,
            passwordError,
            repeatPasswordError
        } = this.state.validationErrors;
        const {errorFromServer} = this.state
        return (
            <Wrapper>
                {errorFromServer ? (
                    <Alert variant={'danger'}>
                        Login or email is already in use
                    </Alert>
                ) : (<div/>)}
                <FormWrapper>
                    <Form onSubmit={this.onSubmit} style={{width: "330px"}}>
                        <Form.Group controlId="text">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={this.onChange} name="username" type="text"
                                          placeholder="Enter username"
                                          value={username} isInvalid={usernameError}/>
                            <Form.Control.Feedback type="invalid">
                                Invalid username.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="text">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={this.onChange} name="name" type="text" placeholder="Enter name"
                                          value={name} isInvalid={nameError}/>
                            <Form.Control.Feedback type="invalid">
                                Invalid characters.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="text">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control onChange={this.onChange} name="surname" type="text"
                                          placeholder="Enter surname"
                                          value={surname} isInvalid={surnameError}/>
                            <Form.Control.Feedback type="invalid">
                                Invalid characters.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={this.onChange} name="email" type="text" placeholder="Enter email"
                                          value={email} isInvalid={emailError}/>
                            <Form.Control.Feedback type="invalid">
                                Invalid email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={this.onChange} name="password" type="password"
                                          placeholder="Password"
                                          value={password} isInvalid={passwordError}/>
                            <Form.Control.Feedback type="invalid">
                                Invalid Password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Repeat your password</Form.Label>
                            <Form.Control onChange={this.onChange} name="repeatPassword" type="password"
                                          placeholder="Repeat your password"
                                          value={repeatPassword} isInvalid={repeatPasswordError}/>
                            <Form.Control.Feedback type="invalid">
                                Passwords dont match.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant={"dark"} type="submit">
                            Submit
                        </Button>
                        <div style={{marginTop: "10px"}}>
                            Already have an account?
                            <Link to='/login'> Sigh In</Link>
                        </div>
                    </Form>
                </FormWrapper>
            </Wrapper>
        );
    }
}

export default withRouter(RegisterPage);
