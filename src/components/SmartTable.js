import React, {Component} from 'react';
import Table from "react-bootstrap/Table";
import styled from "styled-components";

const TableWrapper = styled.div`
      border: 1px solid #d8d9db;
      padding:  1rem;
      border-radius: 5px;
      box-shadow: 1px 7px 20px -8px rgba(0,0,0,0.54);
`;

class SmartTable extends Component {
    constructor(props) {
        super(props);
    }

    renderRow = (data) => {
        if (data.length) {
            return data.map((user, index) => (
                <tr key={index + 10000}>
                    <td>{index + 1}</td>
                    {Object.keys(user).map((key, index) => (
                            <td key={user[key] + Math.random()}>{user[key]}</td>
                        )
                    )}
                </tr>
            ))
        }
    }

    render() {
        const {data} = this.props
        const head = ['#']
        if (data.length) {
            Object.keys(data[0]).forEach(key => {
                head.push(key)
            })
        }

        console.log(head)
        return (

            <Table striped bordered hover style={{
                borderRadius: "5px",
                boxShadow: "1px 7px 20px -8px rgba(0,0,0,0.54)",
                backgroundColor:'white'
            }}>
                <thead>
                <tr>
                    {head.map((item) => (
                            <th key={item + Math.random()}>{item}</th>
                        )
                    )}
                </tr>
                </thead>
                <tbody>
                {this.renderRow(data)}
                </tbody>
            </Table>
        );
    }
}

export default SmartTable;
