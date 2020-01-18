/* eslint-disable */

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
import { getReservations, deleteReservation, editReservationStatus } from '../../actions/reservationActions';
import PropTypes from 'prop-types';
import SingleCottage from '../partials/SingleCottage';
import MessageWithIcon from '../partials/MessageWithIcon';
import LoadingSpinner from '../partials/LoadingSpinner';
import moment from 'moment';

class Reservations extends Component {

    static propTypes = {
        getReservations: PropTypes.func.isRequired,
        deleteReservation: PropTypes.func.isRequired,
        reservation: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.getReservations();
    };

    state = {
        modal: false,
        reservationId: '',
        reservationCount: 0
    };

    toggle = (reservationId, reservationCount) => {
        this.setState({
          modal: !this.state.modal,
          reservationId: reservationId,
          reservationCount: reservationCount
        });
    };   

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.date)
    };

    onCancelClick = (id)=> {
        const { history } = this.props;
        this.props.deleteReservation(id, history);
    };

    approveReservation(reservationId, status) {
        this.props.editReservationStatus(reservationId, status);
    }

    renderPosts() {
        if(!this.props.reservation.loading && this.props.reservation.reservations.length > 0) {
            const { reservations } = this.props.reservation;
            return  <div>
                        {reservations.map((reservation, index) => (
                            <div key={reservation._id} className="my-3 p-3 bg-white rounded box-shadow">
                                <img src={ reservation.userId.profilePicture } width="50" height="50" className="rounded-circle float-left" style={{marginRight: '10px'}} /><span className="float-left" style={{lineHeight: '1.2', marginTop: '5px'}}> { reservation.userId.firstName } { reservation.userId.lastName }<br/> <span className="text-muted">{typeof this.props.reservation.createdAt !== 'undefined' ? moment(this.props.reservation.createdAt).fromNow() : moment().fromNow() }</span> </span>
                                <div style={{ clear: 'both'}}></div>
                                <br/>
                                <SingleCottage cottage={reservation.cottageId} type={'Uploaded'} />
                                <h6>Date: <strong>{moment(reservation.date).format('MMMM Do YYYY, h:mm:ss A')}</strong></h6>
                                {typeof reservation.approvedAt !== 'undefined' ? <span className="badge badge-success" style={{marginBottom: '10px'}}>Approved</span> : <span className="badge badge-warning" style={{marginBottom: '10px'}}>Pending</span>}
                                {this.renderCottageButton(reservation._id, reservations.length, reservation.approvedAt)}
                            </div>
                        ))}
                    </div>
        } else if(!this.props.reservation.loading && this.props.reservation.reservations.length === 0) {
            return <MessageWithIcon icon={'alert-circle'} logoColor={'text-danger'} message={'No record to display.'} />
        } else {
            return <LoadingSpinner message={'Please wait...'} />
        }
    }

    renderCottageButton(reservationId, reservationCount, approvedAt) {
        if(this.props.auth.user.role === 'Administrator') {
            if(typeof approvedAt !== 'undefined') {
                return <button className="btn btn-danger btn-block" onClick={() => this.approveReservation(reservationId, 'Disapprove')}>Disapprove</button>
            } else {
                return <button className="btn btn-success btn-block" onClick={() => this.approveReservation(reservationId, 'Approve')}>Approve</button>
            }
        } else if(this.props.auth.user.role === 'User') {
            <button className="btn btn-danger btn-block" onClick={() => this.toggle(reservationId, reservationCount)}>Cancel</button>
        }
    }

    renderModalBody() {
        if(!this.props.reservation.loading && this.props.reservation.reservations.length === this.state.reservationCount) {
            return <p>Are you sure you want to cancel this?</p>
        } else if(!this.props.reservation.loading && this.props.reservation.reservations.length !== this.state.reservationCount) {
            return <MessageWithIcon icon={'check-circle'} logoColor={'text-success'} message={'Cancelled successful!'} />
        } else {
            return <LoadingSpinner message={'Please wait...'} />
        }
    }

    renderModalFooter() {
        return  <ModalFooter>
                    <Button color="secondary" onClick={() => this.toggle(this.state.reservationId)}>Close</Button>{' '}
                    <Button color="danger" onClick={() => this.onCancelClick(this.state.reservationId)}>Yes</Button>
                </ModalFooter>
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <main role="main" className="container">
                    {this.renderPosts()}
                </main> 

                <Modal size="sm" isOpen={this.state.modal} toggle={this.toggle.bind(this, this.state.reservationId, this.state.reservationCount)} >
                    <ModalHeader toggle={this.toggle.bind(this, this.state.reservationId, this.state.reservationCount)}>Cancel Reservation</ModalHeader>
                    <ModalBody>
                        {this.renderModalBody()}
                    </ModalBody>
                    {this.props.reservation.reservations.length === this.state.reservationCount ? this.renderModalFooter() : '' }
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  reservation: state.reservation,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getReservations, deleteReservation, editReservationStatus }
)(withRouter(Reservations));

