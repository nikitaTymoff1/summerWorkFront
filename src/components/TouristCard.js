import React, {Component} from 'react';
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styled from "styled-components";


const TouristWrapper = styled.div`
    margin-right: 1.25rem ;
    margin-bottom: 1.25rem ;
    padding-top:  1.25rem;
    padding-bottom:  1.25rem;
    width: 372px;
    border: 1px solid #dadbdd;
    border-radius: 7px;
    box-shadow: 7px 7px 7px -7px rgba(0,0,0,0.54);
`;

const TouristCard = (props) => {
    const {tourists} = props;
    return (
        <>
            {tourists.map((tourist, index) => (
                    <TouristWrapper key={index + 500}>
                        <Col>
                            Name: <b>  {tourist.name} </b>
                        </Col>
                        <Col>
                            Surname: <b>{tourist.surname}</b>
                        </Col>
                        <Col>
                            FathersName: <b>{tourist.fathersName}</b>
                        </Col>
                        <Col>
                            Email: <b>{tourist.email}</b>
                        </Col>
                        <Col>
                            Date of Birth: <b>{tourist.dateOfBirth}</b>
                        </Col>
                        <Col>
                            Passport: <b>{tourist.passport}</b>
                        </Col>
                        <br/>
                        {props.delete ? <Col>
                            <Button
                                onClick={props.delete}
                                name={index}
                                variant='outline-dark'
                                block
                                size={"sm"}>
                                Delete
                            </Button>
                        </Col> : null}
                    </TouristWrapper>
                )
            )}
        </>
    )
}

export default TouristCard;
