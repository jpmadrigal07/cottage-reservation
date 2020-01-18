import React, { Component } from 'react';

const formSignin = {
  width: '100%',
  maxWidth: '330px',
  padding: '15px',
  margin: '15rem auto 0px'
};

class Loading extends Component {

  componentDidMount(){
    document.title = this.props.title;
    document.body.style.backgroundColor = '#1a1a1a';
  }

  render() {
    return (
      <div  style={formSignin}>
          <h3 className="text-center text-white" style={{margin: '6rem auto 0px'}}>Loading...</h3>
      </div>
    );
  }
}

export default Loading;
