import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

class UserMenu extends Component {

  renderMyPost() {
    if(this.props.location.pathname === "/" || this.props.location.pathname === "/cottages" || this.props.location.pathname === "/register") {
      return <Link className="nav-link active" to="/cottages"><FeatherIcon icon="menu" size="17" /> Cottages</Link>
    } else {
      return <Link className="nav-link" to="/cottages"><FeatherIcon icon="menu" size="17" /> Cottages</Link>
    }
  }

  render() {
    return (
      <div>
        <div className="nav-scroller bg-white box-shadow" style={{position: 'fixed', width: '100%'}}>
            <div className="container">
              <nav className="nav nav-underline">
                { this.renderMyPost() }                
                { this.props.location.pathname === "/reservations" ? <Link className="nav-link active" to="/reservations"><FeatherIcon icon="menu" size="17" /> Reservations</Link> : <Link className="nav-link" to="/reservations"><FeatherIcon icon="menu" size="17" /> Reservations</Link> }
              </nav>
            </div>
        </div>
      </div>
    );
  }
}

export default UserMenu;
