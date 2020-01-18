import React, { Component } from 'react';
import moment from 'moment';

class SingleCottage extends Component {

  render() {
    return (
        <div>
            <div className="row mb-3">
                <div className="col-md-12">
                    <h3>{this.props.cottage.name}</h3>
                    <p style={{ marginTop: '15px'}}>{ this.props.cottage.desc }</p>
                    <div style={{backgroundColor: '#F8F9FA'}} > 
                      <img className="img-fluid" src={this.props.cottage.imagePath} alt="Photo" />
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default SingleCottage;
