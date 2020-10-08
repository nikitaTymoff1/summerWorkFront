import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {
    BrowserRouter as
        Router,
    Link
} from "react-router-dom";
import styled from "styled-components";
import axios from "../lib/api";
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'
import Form from "react-bootstrap/Form";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from "react-bootstrap/Modal";
import MySpinner from "../components/MySpinner";

const Option = styled.div`
      text-align: center;
      text-decoration: none;
      padding: .75rem 1.25rem;
      min-width: 110px;
      cursor: pointer;
      border: 1px solid #dadbdd ;
      color: #495057;

      background: ${props => (props.active ? `#dedede` : `white`)};
      &:hover {
        background: ${props => (props.active ? `#e2e2e2` : `#e5e5e5`)};
      }
        border-radius: 5px;
        box-shadow: 1px 7px 20px -8px rgba(0,0,0,0.54);
        margin: 12px 3px 3px;
`;
const Wrapper = styled.div`
      display: flex;
      flex-direction: row;
      margin-top: 1.25rem;
      margin-left: -2rem;
`;
const OptionWrapper = styled.div`
      display: flex;
      flex-direction: column;
      margin-top: .25rem;
      justify-content: center;
`;
const TableWrapper = styled.div`
      display: flex;
      margin: 1.25rem;
      justify-content: center;
      min-width: 800px;
      background-color: white;
      flex-direction: column;
`;
const FormWrapper = styled.div`
      background-color: white;
      display: flex;
      border: 1px solid #d8d9db;
      padding:  1rem;
      max-width: 700px;
         border-radius: 5px;
        box-shadow: 1px 7px 20px -8px rgba(0,0,0,0.54);
        margin: auto;
`;


class CrudPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
            data: [],
            updateData: {},
            modifiedId: '',
            createData: {},
            response: '',
            activeId: '',
            showModal: false,
            loading: false
        }
    }

    getData = () => {
        const {active} = this.state;
        axios({
            method: "get",
            url: `crud/get${active}`,
        })
            .then(res => {
                res.data.forEach(item => {
                    delete item.__v
                    if (item.title) delete item.title;
                    if (item.tourists) delete item.tourists
                })
                this.setState({
                    data: res.data
                });
            })
            .catch(err => console.log(err));
    }
    handleClick = e => {
        if (e.target.id) {
            this.setState({loading:true})
            axios({
                method: "get",
                url: `crud/get${e.target.id}`,
            })
                .then(res => {
                    res.data.forEach(item => {
                        delete item.__v
                        if (item.title) delete item.title;
                        if (item.tourists) delete item.tourists
                    })
                    this.setState({
                        data: res.data,
                        loading:false
                    });
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        loading:false
                    });
                });
            let option = e.target.id;
            this.setState({active: option});
        }
    };

    handleClose = () => this.setState({showModal: false});

    handleEdit = id => {
        const {data} = this.state;
        let obj = {}
        data.forEach(item => {
            if (item._id === id) {
                obj = JSON.parse(JSON.stringify(item))
            }
        })
        this.setState({
            updateData: obj,
            modifiedId: id,
            showModal: true
        })
    }
    submitEdit = (e) => {
        e.preventDefault();
        const {updateData, active, modifiedId} = this.state;
        axios
            .put(`crud/update${active}`, updateData, {params: {id: modifiedId}})
            .then(res => {
                this.getData()
                this.handleClose()
            })
            .catch(err => {
                console.log(err)
                this.handleClose()
            });
    }

    handleDelete = id => {
        const {active} = this.state;
        axios({
            method: "delete",
            url: `crud/delete${active}`,
            params: {id: id}
        })
            .then(res => {
                this.getData()
            })
            .catch(err => console.log(err));
    }
    handleCreate = e => {
        e.preventDefault()
        const {createData, active} = this.state;
        axios
            .post(`crud/create${active}`, createData)
            .then(res => {
                this.getData()
            })
            .catch(err => {
                console.log(err)
            });
    }
    handleChange = (e) => {
        const {createData} = this.state;
        this.setState({
                createData: {
                    ...createData,
                    [e.target.name]: e.target.value
                }
            }
        )
    }
    handleEditChange = (e) => {
        const {updateData} = this.state;
        this.setState({
                updateData: {
                    ...updateData,
                    [e.target.name]: e.target.value
                }
            }
        )
    }

    renderCreator = (options) => {
        const {active} = this.state;
        if (options)
            delete options[0]
        return (
            <Form onSubmit={this.handleCreate}>
                <div style={{display: 'flex', justifyContent: 'center'}}>Create New {active}</div>
                <br/>
                <Form.Row>
                    {
                        options.map(item => (
                            <Col key={'fdfsfsdfsf' + item}>
                                <Form.Control
                                    placeholder={item}
                                    onChange={this.handleChange}
                                    value={this.state.createData[`${item}`]}
                                    name={item}
                                    required
                                />
                            </Col>
                        ))
                    }
                    <Col>
                        <Button variant={"dark"} type={"submit"}>Submit</Button>
                    </Col>
                </Form.Row>
            </Form>
        )
    }
    renderModifier = (options) => {
        const {active} = this.state;
        if (options) delete options[0]
        return (
            <>
                <Modal size={"xl"} show={this.state.showModal} onHide={this.handleClose} open>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit {active}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitEdit}>
                            <Form.Row>
                                {
                                    options.map(item => (
                                        <Col key={'fdfsfsdfsfyy' + item}>
                                            <Form.Control
                                                placeholder={item}
                                                onChange={this.handleEditChange}
                                                value={this.state.updateData[`${item}`]}
                                                name={item}
                                                required
                                            />
                                        </Col>
                                    ))
                                }
                                <Col>
                                    <Button variant={"dark"} type={"submit"}>Submit</Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }

    render() {
        const pages = [
            "ComputerClub",
            "Computer",
            "Console",
            "Drink",
            "Snack",
            "Food",
            "Stuff",
            "Prices"
        ]

        const {active, data} = this.state;

        let head = [];
        let head1 = [];
        if (data.length) {
            Object.keys(data[0]).forEach(key => {
                let lol = {
                    Header: key,
                    accessor: key
                }
                head1.push(key)
                head.push(lol)
            })
            console.log(head1)
        }
        const deleteCell = {
            Header: "Actions",
            Cell: props => {
                return (
                    <>
                        <Button size={"sm"} variant={"danger"} onClick={() => {
                            this.handleDelete(props.row._id)
                        }}>
                            <DeleteIcon/>
                        </Button>

                        <Button size={"sm"} onClick={() => {
                            this.handleEdit(props.row._id)
                        }}>
                            <EditIcon/>
                        </Button>
                    </>

                )
            },

        }

        head.push(deleteCell)

        return (<>
            <Wrapper>
                <OptionWrapper>
                    {pages.map(item => (
                        <Link to={`/Crud/${item}`} key={item}>
                            <Option
                                id={item}
                                onClick={this.handleClick}
                                active={active === item}
                            >
                                {item}
                            </Option>
                        </Link>
                    ))}
                </OptionWrapper>
                {
                    this.state.loading ? <MySpinner/> :
                        <>
                            <TableWrapper>
                                {head.length > 1 ?
                                    <ReactTable
                                        style={{
                                            borderRadius: "7px",
                                            boxShadow: "1px 7px 20px -8px rgba(0,0,0,0.54)",
                                            padding: "10px",

                                        }}
                                        defaultPageSize={5}
                                        columns={head}
                                        data={data}>
                                    </ReactTable> : null}
                                {head1.length ?<FormWrapper> {this.renderCreator(head1)}</FormWrapper> : null}

                            </TableWrapper>

                            {head1.length ? this.renderModifier(head1) : null}
                        </>
                }


            </Wrapper>

        </>
        );
    }
}

export default CrudPage;
