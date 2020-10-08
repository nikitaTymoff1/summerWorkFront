import React, {Component} from 'react';
import {BrowserRouter as Router, Route,withRouter} from "react-router-dom";
import axios from "../lib/api";
class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            go : true
        }
    }
    componentDidMount() {
        const {history} = this.props;
        const jwt = localStorage.getItem("jwtToken");
        if (jwt) {
            return axios({
                method: "get",
                url: "/users/checkJwt",
                headers: {Authorization: jwt}
            })
                .then((res) => {
                    this.setState({go: true})
                })
                .catch(err => {
                    this.setState({go: false})
                    return history.push("/login");
                })
        } else {
            this.setState({go: false});
            return history.push("/login")

        }
    }
    render() {
        return (
            <Route {...this.props}>
            {this.props.children}
            </Route>
        );
    }
}

export default withRouter(PrivateRoute);

