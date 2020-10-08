import React, {Component} from 'react';
import SmartTable from "../components/SmartTable";
import axios from "../lib/api";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";
import MySpinner from "../components/MySpinner";

const ProfileWrapper = styled.div`
    margin: 1.25rem ;
    max-width: 700px;
`;

class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true
        }
    }

    componentDidMount() {
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

    render() {
        const {users, loading} = this.state;
        return (
            loading ?
                <MySpinner/> :
                <ProfileWrapper>
                    <SmartTable data={users}/>
                </ProfileWrapper>

        );
    }
}

export default UsersPage;
