import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import axios from "../lib/api";
import Collapse from "react-bootstrap/Collapse";
import TouristCard from "../components/TouristCard";
import Modal from "react-bootstrap/Modal";
import AddIcon from '@material-ui/icons/Add';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-bottom: 6rem;
  padding-left:  6rem;

`;

const ButtonWrapper = styled.div`
display: flex;
    width: 400px;
`;
const TouristWrapper = styled.div`
    margin-right: 1.25rem ;
    margin-bottom: 1.25rem ;
    padding-top:  1.25rem;
    padding-bottom:  1.25rem;
    width: 372px;
    border: 1px solid #dadbdd;
`;
const TouristRegistWrapper = styled.div`
    margin-top: 1.25rem ;
    padding:  1.25rem;
    border: 1px solid #dadbdd;
          border-radius: 5px;
        box-shadow: 7px 7px 7px -7px rgba(0,0,0,0.54);
`;

class ToursPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursions: [],
            showModal: false,
            countries: [],
            cities: [],
            airlineCompanies: [],
            busCompanies: [],
            hotels: [],
            tourists: [],
            newTourist: {
                name: '',
                surname: '',
                fathersName: '',
                passport: '',
                dateOfBirth: '',
                email: ''
            },
            postData: {
                Country: 'england',
                City: 'london',
                Excursion: 'history',
                Hotel: 'bigHotel',
                AirlineCompany: 'britishAirlines',
                BusCompany: 'saturnBus'
            },
            way: 'airlineCompany',
            addingTourist: false,
            errors: {
                newTouristPassport: false,
                newTouristEmail: false,
            }
        }
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/tour/getCountry"
        })
            .then(res => {
                this.setState({
                    countries: res.data
                });
            })
            .catch(err => console.log(err));
        axios({
            method: "get",
            url: "/tour/getCity"
        })
            .then(res => {
                this.setState({
                    cities: res.data
                });
            })
            .catch(err => console.log(err));
        axios({
            method: "get",
            url: "/tour/getHotel"
        })
            .then(res => {
                this.setState({
                    hotels: res.data
                });
            })
            .catch(err => console.log(err));
        axios({
            method: "get",
            url: "/tour/getExcursion"
        })
            .then(res => {
                this.setState({
                    excursions: res.data
                });
            })
            .catch(err => console.log(err));
        axios({
            method: "get",
            url: "/tour/getAirlineCompany"
        })
            .then(res => {
                this.setState({
                    airlineCompanies: res.data
                });
            })
            .catch(err => console.log(err));

        axios({
            method: "get",
            url: "/tour/getBusCompany"
        })
            .then(res => {
                this.setState({
                    busCompanies: res.data
                });
            })
            .catch(err => console.log(err));
    }

    handleClose = () => this.setState({showModal: false});
    handleShow = () => this.setState({showModal: true});
    addTourist = (e) => {
        e.preventDefault();
        const {tourists, newTourist, errors} = this.state;
        tourists.forEach(item => {
            errors.newTouristPassport = item.passport === newTourist.passport;
            errors.newTouristEmail = item.email === newTourist.email;
        })
        if (errors.newTouristPassport || errors.newTouristEmail) {

        } else {
            tourists.push(newTourist);
            this.setState({tourists: tourists})
        }

    }
    // addingTourist = () => {
    //
    //     // this.setState({addingTourist: !this.state.addingTourist})
    // }
    onNewTouristChange = (e) => {
        let {newTourist} = this.state;
        this.setState({
            newTourist: {
                ...newTourist,
                [e.target.name]: e.target.value
            }
        });
    }
    touristForm = () => {
        const {newTourist} = this.state;
        return (
            <>
                <Modal size={"xl"} show={this.state.showModal} onHide={this.handleClose} open>
                    <Modal.Header closeButton>
                        <Modal.Title>Create new tourist</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.addTourist}>

                            <Form.Row>
                                <Col>
                                    <Form.Label>name</Form.Label>
                                    <Form.Control onChange={this.onNewTouristChange}
                                                  name="name" type="text"
                                                  placeholder="Enter name"
                                                  value={newTourist.name}
                                                  required
                                        // isInvalid={error}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>surname</Form.Label>
                                    <Form.Control onChange={this.onNewTouristChange}
                                                  name="surname" type="text"
                                                  placeholder="Enter surname"
                                                  value={newTourist.surname}
                                                  required
                                        // isInvalid={error}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>fathersName</Form.Label>
                                    <Form.Control onChange={this.onNewTouristChange}
                                                  name="fathersName" type="text"
                                                  placeholder="Enter fathersName"
                                                  value={newTourist.fathersName}
                                                  required
                                        // isInvalid={error}
                                    />
                                </Col>
                                </Form.Row>
                            <br/>
                            <Form.Row>
                            <Col>
                                    <Form.Label>passport</Form.Label>
                                    <Form.Control onChange={this.onNewTouristChange}
                                                  name="passport" type="number"
                                                  placeholder="Enter passport"
                                                  value={newTourist.passport}
                                                  required
                                        // isInvalid={error}
                                    />
                                </Col>

                                <Col>

                                    <Form.Label>email</Form.Label>
                                    <Form.Control onChange={this.onNewTouristChange}
                                                  name="email" type="email"
                                                  placeholder="Enter email"
                                                  value={newTourist.email}
                                                  required
                                        // isInvalid={error}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>dateOfBirth</Form.Label>
                                    <Form.Control onChange={this.onNewTouristChange}
                                                  name="dateOfBirth" type="date"
                                                  placeholder="Enter dateOfBirth"
                                                  value={newTourist.dateOfBirth}
                                                  required
                                        // isInvalid={error}
                                    />
                                </Col>

                            </Form.Row>
                            <br/>
                            <Form.Row>
                                <Col>
                                    <Button variant={"dark"} block type={"submit"}>Submit</Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
    deleteTourist = (e) => {
        const {tourists} = this.state;
        tourists.splice(parseInt(e.target.name), 1);
        this.setState({tourists: tourists})
    }
    handleSelect = (e) => {
        const {postData} = this.state;
        this.setState({
                postData: {
                    ...postData,
                    [e.target.name]: e.target.value
                }
            }
        )
    }
    renderSelect = (data) => {
        if (data[0].title === 'City') {
            return (
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>{data[0].title}</Form.Label>
                    <Form.Control key={data.id}
                                  size='sm'
                                  as="select"
                                  custom
                                  name={data[0].title}
                                  onLoad={this.handleSelect}
                                  required
                                  onChange={this.handleSelect}>

                        {data.map(item => (
                            item.country === this.state.postData.Country ?
                                <option
                                    key={item.id}
                                    name={item.title}
                                    value={item.name}>
                                    {item.name}
                                </option> : null
                        ))}
                    </Form.Control>
                </Form.Group>
            )
        } else if (data[0].title === 'Excursion' || data[0].title === 'Hotel') {
            return (
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>{data[0].title}</Form.Label>
                    <Form.Control key={data.id}
                                  size='sm'
                                  as="select"
                                  custom
                                  name={data[0].title}
                                  required
                                  onChange={this.handleSelect}>
                        {data.map(item => {
                                return item.city === this.state.postData.City ?
                                    <option
                                        key={item.id}
                                        name={item.title}
                                        value={item.name}>
                                        {item.name}
                                    </option> : null
                            }
                        )}
                    </Form.Control>
                </Form.Group>
            )
        } else {
            return (
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>{data[0].title}</Form.Label>
                    <Form.Control key={data.id}
                                  size='sm'
                                  as="select"
                                  custom
                                  required
                                  name={data[0].title}
                                  onChange={this.handleSelect}>
                        {data.map(item => (
                            <option
                                key={item.title + "lolol"}
                                name={item.title}
                                value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            )
        }
    }
    changeWay = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    sendTour = () => {
        const {way, tourists, postData} = this.state;
        const data = {
            ...postData,
            way: way === "airlineCompany" ? postData.AirlineCompany : postData.BusCompany,
            tourists: tourists
        }
        delete data.AirlineCompany;
        delete data.BusCompany;
        axios
            .post("tour/createTour", data)
            .then(res => {
                document.location.reload()
            })
            .catch(err => {
                this.setState({error: true});
            });
    }

    render() {

        const state = this.state;
        let readyToGo = this.state.tourists.length > 0;
        const {addingTourist} = this.state;
        return (
            <Wrapper>
                <ButtonWrapper>
                    <Button size={"sm"} variant='dark' onClick={this.handleShow}>
                        <AddIcon/>
                    </Button>
                </ButtonWrapper>


                <Row>
                    {this.touristForm()}
                </Row>
                <br/>
                <Row>
                    <TouristCard
                        tourists={this.state.tourists}
                        delete={this.deleteTourist}
                    />
                </Row>
                <Row>
                    {readyToGo ? <TouristRegistWrapper>
                        <Form>
                            <Row>
                                <Col>
                                    {this.renderSelect(state.countries)}
                                </Col>
                                <Col>
                                    {this.renderSelect(state.cities)}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {this.renderSelect(state.excursions)}
                                </Col>
                                <Col>
                                    {this.renderSelect(state.hotels)}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Label>Airline or bus</Form.Label>
                                        <Form.Control
                                            as="select"
                                            custom
                                            size='sm'
                                            name="way"
                                            onChange={this.changeWay}>
                                            <option value='airlineCompanies'>airlineCompanies</option>
                                            <option value='busCompanies'>busCompanies</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    {this.state.way === "airlineCompanies" ? this.renderSelect(state.airlineCompanies) : null}
                                    {this.state.way === "busCompanies" ? this.renderSelect(state.busCompanies) : null}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="text">
                                        <Form.Label>arrival</Form.Label>
                                        <Form.Control onChange={this.handleSelect}
                                                      name="arrival" type="date"
                                                      placeholder="arrival"
                                                      value={state.postData.arrival}
                                                      required
                                            // isInvalid={error}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="text">
                                        <Form.Label>departure</Form.Label>
                                        <Form.Control onChange={this.handleSelect}
                                                      name="departure" type="date"
                                                      placeholder="departure"
                                                      value={state.postData.departure}
                                                      required
                                            // isInvalid={error}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </TouristRegistWrapper> : null}

                </Row>
                <br/>
                <Row>
                    {readyToGo ?
                        <Button size='sm' variant='dark' onClick={this.sendTour}>
                            GOOOOOOOOOOOOOOO!!!
                        </Button> : null}
                </Row>
            </Wrapper>
        );
    }
}

export default ToursPage;
