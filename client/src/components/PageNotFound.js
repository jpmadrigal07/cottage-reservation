import React, { Component } from 'react';

class PageNotFound extends Component {

  componentDidMount(){
    document.title = this.props.title;
    document.body.style.backgroundColor = '#F8F9FA';
  }

  render() {
    return (
      <div>
          <h3 className="text-center" style={{margin: '15rem auto 0px'}}>Oooppsss..</h3>
          <p className="text-center">Either this page does not exist or you do not have any rights to access this page.</p>
      </div>
    );
  }
}

export default PageNotFound;
