import React, {Component} from 'react';
import Button from "react-bootstrap/Button";

class NotFound extends Component {
    render() {
        return (
            <div>
                <Button variant={'outline-danger'} size="sm" block href={'home'}>404 Fuk go bec</Button>
            </div>
        );
    }
}

export default NotFound;
