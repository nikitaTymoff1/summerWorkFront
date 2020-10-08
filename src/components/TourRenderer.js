import React, {Component} from 'react';
import SmartTable from "./SmartTable";

class TourRenderer extends Component {
    constructor(props) {
        super(props);
    }

    renderTourInfo = () => {
        const {tours} = this.props
        tours.forEach(tour => {
            delete tour.tourists;
            delete tour.__v;
        })
        return (
                <SmartTable data={tours}/>
        )
    }

    render() {
        return (
            <div>
                {this.renderTourInfo()}
            </div>
        );
    }
}

export default TourRenderer;
