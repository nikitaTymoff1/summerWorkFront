import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as
    Router,
    Redirect,
    Switch,
    Route
} from "react-router-dom";
import LoginPage from "./routes/LoginPage"
import RegisterPage from "./routes/RegisterPage";
import ProfilePage from "./routes/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import {createBrowserHistory} from "history";
import HomePage from "./routes/HomePage";
import styled from "styled-components";
import UsersPage from "./routes/UsersPage";
import ToursPage from "./routes/ToursPage";
import MyToursPage from "./routes/MyToursPage";
import CrudPage from "./routes/CrudPage";

const customHistory = createBrowserHistory();

const getLocation = () => {
    const currentLocation = window.location.pathname;
    return currentLocation.split("/")[1];
};

const MainContainer = styled.div`
    margin-top: 76px;
    margin-left: 280px
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            status: 'loading'
        }
    }

    getDataOfCurrentUser = data => {
        this.setState({user: data});
    };
    setStatus = status => {
        this.setState({status: status});
    };
    reload = () => {
        this.setState({status: "loading", user: {}});
    };

    render() {
        const {status, user} = this.state;
        const {role} = this.state.user
        return (
            <>
                <Router history={customHistory}>
                    <Switch>
                        <Route exact path='/login'>
                            <LoginPage/>
                        </Route>
                        <Route exact path='/register'>
                            <RegisterPage/>
                        </Route>
                        <PrivateRoute path='/'>
                            <HomePage
                                active={getLocation()}
                                getUser={this.getDataOfCurrentUser}
                                setStatus={this.setStatus}
                                reload={this.reload}
                            />
                        </PrivateRoute>
                    </Switch>
                    <Switch>
                        {status === 'ready' ? (
                            <MainContainer>
                                <PrivateRoute
                                    exact
                                    path='/Profile'>
                                    <ProfilePage user={user}/>
                                </PrivateRoute>
                                <PrivateRoute
                                    exact
                                    path='/Users'
                                    onlyAdmin={true}
                                    role={role}>
                                    <UsersPage/>
                                </PrivateRoute>
                                {/*<PrivateRoute*/}
                                {/*    exact*/}
                                {/*    path='/CreateTour'>*/}
                                {/*    <ToursPage/>*/}
                                {/*</PrivateRoute>*/}
                                {/*<PrivateRoute*/}
                                {/*    exact*/}
                                {/*    path='/MyTours'>*/}
                                {/*    <MyToursPage email={user.email}/>*/}
                                {/*</PrivateRoute>*/}
                                <PrivateRoute
                                    path='/Crud'>
                                    <CrudPage/>
                                </PrivateRoute>
                                {/*<Route key={"NotFound"} exact>*/}
                                {/*    <NotFound/>*/}
                                {/*</Route>*/}
                            </MainContainer>
                        ) : (
                            <MainContainer>

                            </MainContainer>
                        )}
                    </Switch>
                </Router>
            </>
        )
    }
}

export default App;
