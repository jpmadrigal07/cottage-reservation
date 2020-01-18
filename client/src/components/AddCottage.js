import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainNavBar from './partials/MainNavBar';
import PageNotFound from './PageNotFound';
import AddCottageContent from './content/AddCottage';

class AddCottage extends Component {

  componentDidMount(){
    document.title = this.props.title;
    document.body.style.backgroundColor = '#F8F9FA';
  }

  renderContent() {
    if(!this.props.auth.isLoading && this.props.auth.user) {
      if(this.props.auth.user.role === "Editor" || this.props.auth.user.role === "User") {
        return <PageNotFound />
      } else {
        return <AddCottageContent />
      }
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

export default connect(mapStateToProps)(AddCottage);