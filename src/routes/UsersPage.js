import React, {Component} from 'react';
import SmartTable from "../components/SmartTable";
import axios from "../lib/api";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";
import MySpinner from "../components/MySpinner";
import Button from "react-bootstrap/Button";

const ProfileWrapper = styled.div`
    margin: 1.25rem ;
    max-width: 700px;
`;

class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            makeAdmin: '',
            loading: true
        }
    }

    getData = () => {
        const jwt = localStorage.getItem("jwtToken");
        if (jwt) {
            axios({
                method: "get",
                url: "/users",
                headers: {Authorization: jwt}
            })
                .then(res => {
                    this.setState({
                        users: res.data,
                        loading: false
                    });
                })
                .catch(err => console.log(err));
        }
    }

    componentDidMount() {
        this.getData();
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    makeAdmin = () => {
        const {makeAdmin} = this.state;
        if (makeAdmin) {
            axios
                .put(`crud/makeAdmin`, {role: 'admin'}, {params: {id: makeAdmin}})
                .then(res => {
                    this.getData();
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }
    makeUser = () => {
        const {makeAdmin} = this.state;
        if (makeAdmin) {
            axios
                .put(`crud/makeAdmin`, {role: 'user'}, {params: {id: makeAdmin}})
                .then(res => {
                    this.getData();
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    render() {
        const {users, loading, makeAdmin} = this.state;
        return (
            loading ?
                <MySpinner/> :
                <ProfileWrapper>
                    <SmartTable data={users}/>
                    {this.props.role === 'superAdmin' ? <div>
                        <select onChange={this.handleChange}
                                name={'makeAdmin'}
                                value={makeAdmin}>
                            {users.map(user => (
                                user.role !== 'superAdmin' ?
                                    <option value={user._id}>{user.username}</option> : null
                            ))}
                        </select>
                        <br/>
                        <br/>
                        <Button size='sm'
                                disabled={!makeAdmin}
                                onClick={this.makeAdmin}
                                variant='dark'>make Admin</Button>
                        <br/>
                        <br/>
                        <Button size='sm'
                                disabled={!makeAdmin}
                                onClick={this.makeUser}
                                variant='dark'>make User</Button>
                    </div> : null}


                </ProfileWrapper>

        );
    }
}

export default UsersPage;
