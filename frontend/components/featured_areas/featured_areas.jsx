import React from 'react';
import { Redirect, withRouter } from "react-router-dom";
import RestaurantIndexContainer from "../restaurants/restaurant_index_container";


class FeaturedAreas extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search: []
        }
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick(e){
        //upon click use the id as the search key word 
        e.preventDefault();
        
        let city = e.target.id.split("_").join(' ');
        this.setState(
          {
            search: [city],
          },
          () =>
            this.props
              .searchRestaurants(
                // search rest by search city
                this.state.search
              )
              // .then( ()=>
              //     this.setState({
              //         //reset search
              //         search: ""
              //     })
              // )
              .then(() =>
                this.props.history.push({
                  pathname: "/restaurants",
                  state: { search: this.state.search },
                })
                // {
                //     debugger
                //     return console.log(this.state.search);
                // }
                //navigate to restaurants
                // <Redirect
                //   push to={{
                //     pathname: "/restaurants",
                //     state: { search: this.state.search }
                //   }} />
              )
        );
    }

    render( ) {
        return (
            <div className="areas">
                <h1>Featured Areas</h1>
                <div className="area-list">
                    <div className="fcity" id="san_francisco" onClick={this.handleClick}>
                        San Francisco
                    </div>
                    <div className="fcity" id="los_angeles" onClick={this.handleClick}>
                        Los Angeles
                    </div>
                    <div className="fcity" id="new_york" onClick={this.handleClick}>
                        New York
                    </div>
                    <div className="fcity" id="las_vegas" onClick={this.handleClick}>
                        Las Vegas
                    </div>
                    <div className="fcity" id="chicago" onClick={this.handleClick}>
                        Chicago
                    </div>
                    <div className="fcity" id="seattle" onClick={this.handleClick}>
                        Seattle
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(FeaturedAreas);