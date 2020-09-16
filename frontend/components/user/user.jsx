import React from "react";
import { Link, Switch, Route, withRouter} from "react-router-dom"

import ReservationIndex from '../reservation/reservation_index_container'

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.favoriteRestaurants = this.favoriteRestaurants.bind(this)
    this.deleteFavorite = this.deleteFavorite.bind(this)
    this.scroll = this.scroll.bind(this)
  }

  componentDidMount() {
    // Promise.all([
    //   this.props.fetchRestaurants()
    //   // ,this.props.fetchUser(this.props.currentUser.id) 
    //   ,this.props.fetchUserReservations(this.props.currentUser.id)
    //   ,this.props.requestUserFavorites(this.props.currentUser.id)
    //   ])  
    this.props.fetchRestaurants()
    // this.props.fetchUser(this.props.currentUser.id)
    this.props.fetchUserReservations(this.props.currentUser.id)
    this.props.requestUserFavorites(this.props.currentUser.id)
  }

  deleteFavorite(id) {
    return (e) => {
      e.preventDefault();
      this.props.deleteFavorite(id).then(()=> 
        window.location.reload()
      )
    };
  }

  scroll(el) {
    return () => {
      el.scrollIntoView({
        behavior: 'smooth',
        block: "start"
      });
    };
  }

  favoriteRestaurants() {
    if (Object.keys(this.props.favorites).length === 0) {
      return (
        <div>
          <p>No Favorites</p>
        </div>
      )
    } else {
      return (
        <div>
          {Object.values(this.props.favorites).map((favorite, i) => {
            return (
              <section key={`favorite-${i}`} className="favorite-list">
                <div className="restaurant-detail-container">
                  <div className="restaurant-icon-container">
                    <img className="restaurant-icon" src={favorite.restaurant.photo}></img>
                  </div>
                  <div className="favorite-info">
                    <Link to={`/restaurants/${favorite.restaurant.id}`} className="restaurant-name">
                      {favorite.restaurant.name} 
                    </Link>
                    <div className="favorite-cuisines">
                      {favorite.restaurant.cuisine} | {favorite.restaurant.city}
                    </div>
                    <br/>
                    <div className="remove-fav" onClick={this.deleteFavorite(favorite.restaurant.id)}>
                      <i className="fas fa-bookmark"></i> Remove from saved restaurants
                    </div>
                  </div>
                  <Link to={`/restaurants/${favorite.restaurant.id}`} className="green-btn">
                    Reserve Now
                    </Link>
                </div>
              </section>
            )
          }
          )}
        </div>
      )
    }
  }

  render() {
    const {currentUser} = this.props
    return (
      <div className="page-container">

        <div className="page-header">
          <div className="page-header-content">
            <h1 className="full-name">{`${currentUser.first_name} ${currentUser.last_name}`}</h1>
          </div>
        </div>

        <div className="content-group">
          <nav className="page-nav" >
            <div className="page-nav-links" onClick={this.scroll(this.reservationSection)}> Reservations </div>
            <div className="page-nav-links" onClick={this.scroll(this.favoriteSection)}> Saved Restaurants </div>
          </nav>
        </div>

        <div className="page-main-content">
          

          <div className="content-reservations">
            <div className="content-header" ref={el => this.reservationSection = el}>
              <h3>Reservations</h3>
            </div>
            <div className="content-feed">
              <ReservationIndex restaurants={this.props.restaurants}
                 reservations={this.props.reservations} 
                />
            </div>
          </div>

          <div className="content-favorites">
            <div className="content-header" ref={el => this.favoriteSection = el}>
              <h3>Saved Restaurants</h3>
            </div>
            <div className="content-feed">
                {this.favoriteRestaurants()}
                {/* {UserFavorites} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(UserProfile);