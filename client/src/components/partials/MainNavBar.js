import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminMenu from './AdminMenu';
import UserMenu from './UserMenu';
import $ from 'jquery';
import FeatherIcon from 'feather-icons-react';

class MainNavBar extends Component {

  componentDidMount() {
    $(function () {
      $('[data-toggle="offcanvas"]').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
      })
    })
  }

  renderLogoName() {
    if(!this.props.auth.isLoading && this.props.auth.user) {
      return <a className="navbar-brand" href="#"><img src={this.props.auth.user.profilePicture} width="30" height="30" className="rounded-circle" /> { this.props.auth.user.firstName } { this.props.auth.user.lastName }</a>
    } else {
      return <a className="navbar-brand" href="#">...</a>
    }
  }

  renderSubMenu() {
    if(!this.props.auth.isLoading && this.props.auth.user) {
      if(this.props.auth.user.role === "Administrator") {
        return <AdminMenu {...this.props} />
      } else if(this.props.auth.user.role === "User") {
        return <UserMenu {...this.props} />
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
          <div className="container">
            {this.renderLogoName()}
            <button className="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
              <ul className="navbar-nav ml-auto flex-nowrap">
                <li className="nav-item">
                    <a className="nav-link" href="/api/logout"><FeatherIcon icon="log-out" size="17" /> Log Out</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {this.renderSubMenu()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) { 
  return { auth };
}

export default connect(mapStateToProps)(MainNavBar);
