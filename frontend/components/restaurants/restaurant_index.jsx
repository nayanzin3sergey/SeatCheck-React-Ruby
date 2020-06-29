import React from 'react';
import IndexItem from './restaurant_index_item'
import SearchForm from '../search/search_container'

class RestaurantIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.props.fetchRestaurants();
  // }

  render() {
    // debugger
    const items = 
      this.props.restaurants.map((restaurant) => (
      <IndexItem key={restaurant.id} restaurant={restaurant} />
    ));

    const errors = (
      <div className="search-error">
        <h3>WE DID NOT FIND A MATCH FOR YOUR SEARCH</h3>
        <p>
          Sorry, we couldn't find any results. Try checking your spelling or
          using less specific keywords.
        </p>
        <p>
          There are no restaurants with availability within 30 miles of your
          search.
        </p>
      </div>
    );
    
    let searchResults;

    items.length === 0 ? searchResults = errors : searchResults = items 

    return (
      <div className="restaurant-container">
        <div className="search-control">
          <div className="page-header-content">
            <SearchForm />
          </div>
        </div>
        <div className="restaurant-page-content">
          <div className="restaurant-filters">
            Filters here
          </div>
          <div className="restaurant-items">
            {searchResults}
            </div>
        </div>
      </div>
    );
  }
}




export default RestaurantIndex;