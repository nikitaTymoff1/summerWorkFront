import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import styled from "styled-components";
import Gravatar from 'react-gravatar'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Redirect, BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

const ProfileWrapper = styled.div`
    background-color: white;
    margin: 1.25rem ;
    padding-top:  1.25rem;
    padding-bottom:  1.25rem;
    padding-left:  .25rem;
    max-width: 600px;
    border: 1px solid #dadbdd;
    border-radius: 5px;
    box-shadow: 7px 7px 7px -7px rgba(0,0,0,0.54);
`;

class ProfilePage extends Component {
    render() {
        const {user} = this.props;
        return (
            <ProfileWrapper>
                <Container>
                    <Row>
                        <Col sm={3}>
                            <Gravatar email={user.email} size={150}/>
                        </Col>
                        <Col>
                            <Col>
                                Name: <b>  {user.name} </b>
                            </Col>
                            <Col>
                                Surname: <b>{user.surname}</b>
                            </Col>
                            <Col>
                                Email: <b>{user.email}</b>
                            </Col>
                            <Col>
                                Role: <b>{user.role}</b>
                            </Col>
                        </Col>
                        <Col sm={2}>
                            <Link to={"/MyTours"}>
                                <Button variant={"outline-dark"} size={"sm"} >
                                    TOURS
                                </Button>
                            </Link>
                        </Col>
                    </Row>

                </Container>
            </ProfileWrapper>
        );
    }
}

export default withRouter(ProfilePage);
