import React, {Component} from 'react';
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 300px;
`;
class MySpinner extends Component {
    render() {
        return (
            <Wrapper>
                <Spinner animation={'border'}/>
            </Wrapper>
        );
    }
}

export default MySpinner;
