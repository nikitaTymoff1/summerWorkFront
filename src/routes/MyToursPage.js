import React, {Component} from 'react';
import axios from "../lib/api";
import TourRenderer from "../components/TourRenderer";
import MySpinner from "../components/MySpinner";
import Alert from "react-bootstrap/Alert";
import styled from "styled-components";

const MyToursWrapper = styled.div`
    margin: 1.25rem ;
    max-width: 700px;
`;
class MyToursPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tours: [],
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/tour/findTour",
            params: {
                email: this.props.email
            }
        })
            .then(res => {
                this.setState({
                    tours: res.data.tour,
                    loading: false,
                    error: !res.data.success
                });
            })
            .catch(err => {
                this.setState({loading: false, error: true})
                console.log(err)
            });
    }

    render() {
        const {tours, loading, error} = this.state
        return (
            loading ? <MySpinner/> :
                error ?
                    <div style={{width: "220px"}}>
                        <Alert variant={'danger'}>
                            You dont have any tours!
                        </Alert>
                    </div>
                     :
                    <MyToursWrapper>
                        <TourRenderer tours={tours}/>
                    </MyToursWrapper>
        );
    }
}

export default MyToursPage;
