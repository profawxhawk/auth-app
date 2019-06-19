import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import classnames from 'classnames';
class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      errors: {}
    };
  }
  // componentDidMount() {
  //   // If logged in and user navigates to Register page, should redirect them to dashboard
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push('/dashboard');
  //   }
  // }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChangeFirstName = e => {
    this.setState({
      firstname: e.target.value,
      lastname: this.state.lastname,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      errors: this.state.errors
    });
  };
  onChangeLastName = e => {
    this.setState({
      firstname: this.state.firstname,
      lastname: e.target.value,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      errors: this.state.errors
    });
  };
  onChangeUserName = e => {
    this.setState({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: e.target.value,
      email: this.state.email,
      password: this.state.password,
      errors: this.state.errors
    });
  };
  onChangeEmail = e => {
    this.setState({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      email: e.target.value,
      password: this.state.password,
      errors: this.state.errors
    });
  };
  onChangePassword = e => {
    this.setState({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      email: this.state.email,
      password: e.target.value,
      errors: this.state.errors
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const errors = this.state.errors;
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s8 offset-s2'>
            <Link to='/' className='btn-flat waves-effect'>
              <i className='material-icons left'>keyboard_backspace</i> Back to
              home
            </Link>
            <div className='col s12' style={{ paddingLeft: '11.250px' }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className='grey-text text-darken-1'>
                Already have an account? <Link to='/login'>Log in</Link>
              </p>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChangeFirstName}
                  value={this.state.firstname}
                  error={errors.firstname}
                  id='firstname'
                  type='text'
                  className={classnames('', {
                    invalid: errors.firstname
                  })}
                />
                <label htmlFor='firstname'>Firstname</label>
                <span className='red-text'>{errors.firstname}</span>
              </div>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChangeLastName}
                  value={this.state.lastname}
                  error={errors.lastname}
                  id='lastname'
                  type='text'
                  className={classnames('', {
                    invalid: errors.lastname
                  })}
                />
                <label htmlFor='lastname'>Lastname</label>
                <span className='red-text'>{errors.lastname}</span>
              </div>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChangeUserName}
                  value={this.state.username}
                  error={errors.username}
                  id='username'
                  type='text'
                  className={classnames('', {
                    invalid: errors.username
                  })}
                />
                <label htmlFor='username'>Username</label>
                <span className='red-text'>{errors.username}</span>
              </div>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChangeEmail}
                  value={this.state.email}
                  error={errors.email}
                  id='email'
                  type='email'
                  className={classnames('', {
                    invalid: errors.email
                  })}
                />
                <label htmlFor='email'>Email</label>
                <span className='red-text'>{errors.email}</span>
              </div>
              <div className='input-field col s12'>
                <input
                  onChange={this.onChangePassword}
                  value={this.state.password}
                  error={errors.password}
                  id='password'
                  type='password'
                  className={classnames('', {
                    invalid: errors.password
                  })}
                />
                <label htmlFor='password'>Password</label>
                <span className='red-text'>{errors.password}</span>
              </div>
              <div className='col s12' style={{ paddingLeft: '11.250px' }}>
                <button
                  style={{
                    width: '150px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginTop: '1rem'
                  }}
                  type='submit'
                  className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
