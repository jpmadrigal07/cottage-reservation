import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCottage } from '../../actions/cottageActions';
import { withRouter } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import MessageWithIcon from '../partials/MessageWithIcon';
import LoadingSpinner from '../partials/LoadingSpinner';
import $ from 'jquery';

class AddCottage extends Component {

    state = {
        file: '',
        name: '',
        desc: '',
        cottageCount: this.props.cottage.cottages.length
    };

    componentDidMount() {
        $(document).ready( function() {
            $(document).on('change', '.btn-file :file', function() {
                $('#img-upload-div').show();
                var input = $(this),
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
                input.trigger('fileselect', [label]);
            });
    
            $('.btn-file :file').on('fileselect', function(event, label) {
                $('#img-upload-div').show();
                var input = $(this).parents('.input-group').find(':text'),
                    log = label;
                
                if( input.length ) {
                    input.val(log);
                } else {
                    if( log ) alert(log);
                }
            
            });
            function readURL(input) {
                if (input.files && input.files[0]) {
                    if(input.files[0].type !== "video/mp4") {
                        var reader = new FileReader();
                        
                        reader.onload = function (e) {
                            $('#img-upload').attr('src', e.target.result);
                        }
                        
                        reader.readAsDataURL(input.files[0]);
                    } else {
                        $('#img-upload').attr('src', '/images/video-placeholder.png');
                    }
                }
            }
    
            $("#imgInp").change(function(){
                readURL(this);
            }); 	
        });
    }

    checkMimeType = (event) => {
        //getting file object
        let files = event.target.files
        //define message container
        let err = []
        // list allow mime type
        const types = ['image/png', 'image/jpeg', 'image/gif', 'video/mp4']
        // loop access array
        for (var x = 0; x < files.length; x++) {
            // compare file type find doesn't matach
            if (types.every(type => files[x].type !== type)) {
                // create error message and assign to container   
                err[x] = files[x].type + ' is not a supported format\n';
            }
        };
        for (var z = 0; z < err.length; z++) { // if message not same old that mean has error 
            // discard selected file
            console.log(err[z])
            event.target.value = null
        }
        return true;
    }

    SelectFile = (event) => {
        let files = event.target.files
        if (files.length > 3) {
            const msg = 'Only 3 images can be uploaded at a time'
            event.target.value = null
            console.log(msg)
            return false;
        }
        return true;
    }

    checkFileSize = (event) => {
        let files = event.target.files;
        let size = 100000000000;
        let err = [];
        for (var x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err[x] = files[x].type + 'is too large, please pick a smaller file\n';
            }
        };
        for (var z = 0; z < err.length; z++) { // if message not same old that mean has error 
            // discard selected file
            console.log(err[z]);
            event.target.value = null;
        }
        return true;
    }

    onChangeHandler = event => {
        let files = event.target.files;
        if (this.SelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)) {
            // if return true allow to setState
            this.setState({
                file: files
            })
        }
    }

    setImagePreviewURL = files => {
        if (files && this.state.file === '') {
            var reader = new FileReader();      
            reader.onload = function (e) {
                $('#img-upload').attr('src', '/images/video-placeholder.png');
            }
            reader.readAsDataURL(files);
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { history } = this.props;

        const data = new FormData();

        data.append("file", this.state.file[0]);
        data.append("name", this.state.name);
        data.append("desc", this.state.desc);
    
        this.props.addCottage(data, history);
    };

    addAnotherCottage = e => {
        window.location.reload();
    }

    renderContent() {
        if(!this.props.cottage.loading && (this.props.cottage.cottages.length === this.state.cottageCount || this.props.cottage.cottages.length < this.state.cottageCount)) {
            return <div>
                                        <form onSubmit={this.onSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Name</label>
                                    <input type="text" className="form-control" name="name" placeholder="" onChange={this.onChange} required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Description</label>
                                    <input type="text" className="form-control" name="desc" placeholder="" onChange={this.onChange} required />
                                </div>
                            </div>
            
                                        <div className="input-group">
                                            <span className="input-group-btn">
                                                <span className="btn btn-primary btn-file">
                                                <FeatherIcon icon="camera" size="18" /> Browse<input type="file" id="imgInp" onChange={this.onChangeHandler} />
                                                </span>
                                            </span>
                                            <input type="text" className="form-control" disabled />
                                        </div>
                                    <div className="col-md-4 offset-md-4" id='img-upload-div' style={{display: 'block', marginTop: '15px'}}>
                                        {this.state.file !== '' ? this.setImagePreviewURL(this.state.file[0]) : ''} 
                                        <img className="img-responsive" id='img-upload'/>
                                    </div>
                            <br/>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
            </div>
        } else if(!this.props.cottage.loading && this.props.cottage.cottages.length > this.state.cottageCount) {
            return <div><MessageWithIcon icon={'check-circle'} logoColor={'text-success'} message={'Added successful!'} /><button type="submit" onClick={this.addAnotherCottage} className="btn btn-primary btn-block">Add Another Cottage</button></div>
        } else {
            return <LoadingSpinner message={'Please wait...'} />
        }
    }

    render() {
        return (
            <div>
                {console.log(this.props)}
                <main role="main" className="container">
                    <div className="my-3 p-3 bg-white rounded box-shadow">
                        {this.renderContent()}
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  cottage: state.cottage,
});

export default connect(
  mapStateToProps,
  { addCottage }
)(withRouter(AddCottage));