import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div style={{ height: '75vh' }} className='container valign-wrapper'>
        <div className='row'>
          <div className='col s12 center-align'>
            <h4>
              A login/register app made with{' '}
              <i style={{ fontFamily: 'monospace' }}>
                Express.js, React.js and a MySQL Database
              </i>
            </h4>
            <p className='flow-text grey-text text-darken-1'>
              Full-stack app with user authentication via passport and JWTs
            </p>
            <br />
            <div className='col s6'>
              <Link
                to='/register'
                style={{
                  width: '200px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px'
                }}
                className='btn btn-large waves-effect waves-light hoverable blue accent-3'
              >
                <i className='material-icons right'>person_add</i>
                Register
              </Link>
            </div>
            <div className='col s6'>
              <Link
                to='/login'
                style={{
                  width: '200px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px'
                }}
                className='btn btn-large waves-effect waves-light hoverable blue accent-3'
              >
                <i class='material-icons right'>person</i>
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
