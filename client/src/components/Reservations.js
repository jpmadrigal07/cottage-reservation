import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainNavBar from './partials/MainNavBar';
import ReservationsContent from './content/Reservations';

class Reservations extends Component {

  componentDidMount(){
    document.title = this.props.title;
    document.body.style.backgroundColor = '#F8F9FA';
  }

  renderContent() {
    if(!this.props.auth.isLoading && this.props.auth.user) {
      return <ReservationsContent />
    } else {
      return <h3 className="text-center" href="#">...</h3>
    }
  }

  render() {
    return (
      <div>
        <MainNavBar {...this.props} />
        <br/><br/>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) { 
  return { auth };
}

export default connect(mapStateToProps)(Reservations);
