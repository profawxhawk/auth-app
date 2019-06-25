import React from 'react';
import './id_proof.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import DefaultImg from '../assets/default-img.jpg';
class id_proof extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      multerImage: DefaultImg,
      curfile: ''
    };

    // this.handleUploadImage = this.handleUploadImage.bind(this);
  }
  uploadImage = e => {
    e.preventDefault();
    let imageFormObj = new FormData();

    imageFormObj.append('imageName', 'multer-image-' + Date.now());
    imageFormObj.append('imageData', this.curfile);
    imageFormObj.append('email', this.props.auth.user.email);
    console.log(this.curfile);
    console.log(imageFormObj.get('imageData'));
    // stores a readable instance of
    // the image being uploaded using multer
    this.setState({
      multerImage: imageFormObj
    });

    axios
      .post(`http://localhost:5000/image/uploadmulter`, imageFormObj)
      .then(data => {
        console.log(data);
        alert('Image has been successfully uploaded using multer');
      })
      .catch(err => {
        alert('Error while uploading image using multer');
      });
  };
  changefile = e => {
    this.curfile = e.target.files[0];
  };
  render() {
    console.log(this.props.auth.user);
    return (
      <div>
        <div>
          <div className='col s6'>
            <div
              style={{
                position: 'absolute',
                right: '700px',
                width: '300px',
                top: '200px',
                borderRadius: '3px',
                letterSpacing: '1.5px'
              }}
              className='btn btn-large waves-effect waves-light hoverable blue accent-3'
            >
              <input onChange={this.changefile} type='file' />
            </div>
          </div>
        </div>
        <div>
          <div className='col s6'>
            <button
              onClick={e => this.uploadImage(e)}
              style={{
                position: 'absolute',
                right: '500px',
                width: '300px',
                top: '320px',
                borderRadius: '3px',
                letterSpacing: '1.5px'
              }}
              className='btn btn-large waves-effect waves-light hoverable blue accent-3'
            >
              Upload
            </button>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            right: '370px',
            width: '300px',
            top: '400px',
            borderRadius: '3px',
            letterSpacing: '1.5px'
          }}
        >
          <img src={this.state.imageURL} alt='img' />
        </div>
      </div>
    );
  }
}
id_proof.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(id_proof);
