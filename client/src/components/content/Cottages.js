import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    FormGroup, 
    Label, 
    Input
  } from 'reactstrap';
import { getCottages, deleteCottage } from '../../actions/cottageActions';
import { addReservation } from '../../actions/reservationActions';
import PropTypes from 'prop-types';
import SingleCottage from '../partials/SingleCottage';
import MessageWithIcon from '../partials/MessageWithIcon';
import LoadingSpinner from '../partials/LoadingSpinner';

class Cottages extends Component {

    static propTypes = {
        getCottages: PropTypes.func.isRequired,
        addReservation: PropTypes.func.isRequired,
        cottage: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getCottages();
    };

    state = {
        modalReserve: false,
        modalDelete: false,
        cottageId: '',
        date: '',
        time: '',
        cottageCount: 0
    };

    toggleModalReserve = (cottageId) => {
        this.setState({
          modalCancel: !this.state.modalReserve,
          cottageId: cottageId
        });
    };   

    toggleModalDelete = (cottageId, cottageCount) => {
        this.setState({
          modalDelete: !this.state.modalDelete,
          cottageId: cottageId,
          cottageCount: cottageCount
        });
    };   

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.date)
    };

    onReserveClick = (id, userId, date, time)=> {
        const { history } = this.props;
        if(date !== '' || time !== '') {
            this.props.addReservation(id, userId, date+' '+time, history);
        }
    };

    onDeleteClick = (id)=> {
        const { history } = this.props;
        this.props.deleteCottage(id, history);
    };

    renderCottageButton(cottageId, cottagesCount) {
        if(this.props.auth.user.role === 'Administrator') {
            return <button className="btn btn-danger btn-block" onClick={() => this.toggleModalDelete(cottageId, cottagesCount)}>Delete</button>
        } else if(this.props.auth.user.role === 'User') {
            return <button className="btn btn-primary btn-block" onClick={() => this.toggleModalReserve(cottageId)}>Reserve</button>
        }
    }

    renderPosts() {
        if(!this.props.cottage.loading && this.props.cottage.cottages.length > 0) {
            const { cottages } = this.props.cottage;
            return  <div>
                        {cottages.map((cottage, index) => (
                            <div key={cottage._id} className="my-3 p-3 bg-white rounded box-shadow">
                                <SingleCottage user={this.props.auth.user} cottage={cottage} type={'Uploaded'} />
                                {this.renderCottageButton(cottage._id, cottages.length)}
                            </div>
                        ))}
                    </div>
        } else if(!this.props.cottage.loading && this.props.cottage.cottages.length === 0) {
            return <MessageWithIcon icon={'alert-circle'} logoColor={'text-danger'} message={'No record to display.'} />
        } else {
            return <LoadingSpinner message={'Please wait...'} />
        }
    }

    renderReserveModalBody() {
        if(!this.props.cottage.loading) {
            return <div><FormGroup>
            <Label for="exampleDate">Date</Label>
            <Input 
              onChange={this.onChange}
              type="date"
              name="date"
              id="exampleDate"
              placeholder="date placeholder"
              required 
            />
          </FormGroup><FormGroup>
            <Label for="exampleTime">Time</Label>
            <Input
              onChange={this.onChange}
              type="time"
              name="time"
              id="exampleTime"
              placeholder="time placeholder"
              required 
            />
          </FormGroup>
          </div>
        } else {
            return <LoadingSpinner message={'Please wait...'} />
        }
    }

    renderDeleteModalBody() {
        if(!this.props.cottage.loading && this.props.cottage.cottages.length === this.state.cottageCount) {
            return <p>Are you sure you want to delete this?</p>
        } else if(!this.props.cottage.loading && this.props.cottage.cottages.length !== this.state.cottageCount) {
            return <MessageWithIcon icon={'check-circle'} logoColor={'text-success'} message={'Deleted successful!'} />
        } else {
            return <LoadingSpinner message={'Please wait...'} />
        }
    }

    renderReserveModalFooter() {
        return  <ModalFooter>
                    <Button color="secondary" onClick={() => this.toggleModalReserve(this.state.cottageId)}>Close</Button>{' '}
                    <Button color="primary" onClick={() => this.onReserveClick(this.state.cottageId, this.props.auth.user._id, this.state.date, this.state.time)}>Submit</Button>
                </ModalFooter>
    }

    renderDeleteModalFooter() {
        return  <ModalFooter>
                    <Button color="secondary" onClick={() => this.toggleModalDelete(this.state.cottageId)}>Close</Button>{' '}
                    <Button color="danger" onClick={() => this.onDeleteClick(this.state.cottageId)}>Yes</Button>
                </ModalFooter>
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <main role="main" className="container">
                    {this.renderPosts()}
                </main> 

                <Modal size="sm" isOpen={this.state.modalReserve} >
                    <ModalHeader>Reserve</ModalHeader>
                    <ModalBody>
                        {this.renderReserveModalBody()}
                    </ModalBody>
                    { this.renderReserveModalFooter() }
                </Modal>

                <Modal size="sm" isOpen={this.state.modalDelete} toggle={this.toggleModalDelete.bind(this, this.state.cottageId, this.state.cottageCount)}>
                    <ModalHeader toggle={this.toggleModalDelete.bind(this, this.state.cottageId, this.state.cottageCount)}>Delete Cottage</ModalHeader>
                    <ModalBody>
                        {this.renderDeleteModalBody()}
                    </ModalBody>
                    {this.props.cottage.cottages.length === this.state.cottageCount ? this.renderDeleteModalFooter() : '' }
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  cottage: state.cottage,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCottages, deleteCottage, addReservation }
)(withRouter(Cottages));

