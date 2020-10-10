import React, {Component} from 'react';
import styled from "styled-components";
import {Redirect, BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "../lib/api"

const SidebarComponent = styled.div`
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        min-height: 100vh !important;
        z-index: 100;
        margin: 56px 0 0;
        box-shadow: 1px 0 7px 0 rgba(0,0,0,0.54);
        width: 200px;
        border-right: 1px solid #dadbdd;
        text-decoration: none;
        background-color: white ;
`;
const Option = styled.div`
      text-decoration: none;
      padding: .75rem 1.25rem;
      width: 100%;
      cursor: pointer;
      border-bottom: 1px solid #dadbdd ;
      color: #495057;
     
      border-left: ${props => props.active ? `4px solid #343a3f` : `4px solid transparent`};
      background: ${props => (props.active ? `#dedede` : `transparent`)};
      &:hover {
        background: ${props => (props.active ? `#e2e2e2` : `#e5e5e5`)};
      }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.active || 'Profile',
            role: "user",
            username: 'loading...'
        }
    }

    componentDidMount() {
        const {history} = this.props;
        const jwt = localStorage.getItem("jwtToken");
        if (jwt) {
            axios({
                method: "get",
                url: "/users/user",
                headers: {Authorization: jwt}
            })
                .then(res => {
                    this.props.getUser(res.data.user);
                    this.props.setStatus("ready");
                    this.setState({
                        role: res.data.user.role,
                        username: res.data.user.username
                    });
                })
                .catch(err => {
                    console.log(err)
                    return history.push("/login");
                });
        }
    }

    logout = () => {
        const {history} = this.props;
        this.props.reload();
        localStorage.clear();
        return history.push("/login");
    }
    handleClick = e => {
        if (e.target.id) {
            let option = e.target.id;
            this.setState({active: option});
        }
    };
    header = username => (
        <Navbar bg="dark" variant="dark" fixed={"top"}>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{marginRight: '5px'}}>
                    Signed in as:
                </Navbar.Text>
                <DropdownButton id="dropdown-basic-button" variant={'dark'} title={username}>
                    <Dropdown.Item onClick={this.logout}>Log out</Dropdown.Item>
                </DropdownButton>
            </Navbar.Collapse>
        </Navbar>
    )

    render() {
        const {active, username, role} = this.state;

        const options = [
            'Profile',
            'MyTours'
        ]
        const adminOptions = [
            'Profile',
            // 'CreateTour',
            'Users',
            // 'MyTours',
            'Crud'
        ]
        return (
            <>
                {this.header(username)}
                <SidebarComponent>
                    {
                        role === 'admin' || 'superAdmin' ? (adminOptions.map(item => (
                            <StyledLink to={'/' + item} key={item}>
                                <Option
                                    id={item}
                                    onClick={this.handleClick}
                                    active={active === item}
                                >
                                    {item}
                                </Option>
                            </StyledLink>))) : (options.map(item => (
                            <StyledLink to={'/' + item} key={item}>
                                <Option
                                    id={item}
                                    onClick={this.handleClick}
                                    active={active === item}
                                >
                                    {item}
                                </Option>
                            </StyledLink>
                        )))
                    }
                </SidebarComponent>
            </>
        );
    }
}

export default withRouter(HomePage);
