import React from 'react';


export default class DetailsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            asteroidPageData: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            asteroidPageData: nextProps.asteroidPageData
        })
    }

    render() {
        return(
            <div>
                <div> {this.state.asteroidPageData.name}  </div>
                <div>{this.state.asteroidPageData.nasa_jpl_url}</div>
                <div>{this.state.asteroidPageData.is_potentially_hazardous_asteroid}</div>
            </div>
        );
    }
}
