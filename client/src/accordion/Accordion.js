import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import './accordionstyle.css';
class Accordion extends Component {
  constructor() {
    super();
    this.state = {
      active: false
    };
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  // }
  componentDidMount() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});
  }
  render() {
    console.log(this.props);
    return (
      <div class='accordionmenu'>
        <ul class='collapsible'>
          <li>
            <div class='collapsible-header'>
              <h6 class='right-align'>Menu</h6>
            </div>
          </li>
          <li>
            <div class='collapsible-header'>
              <i class='material-icons'>apps</i>Tickets
            </div>
            <div class='collapsible-body'>
              <Link to='/pending_tickets'>
                <span>pending</span>
              </Link>
            </div>
            <div class='collapsible-body'>
              <Link to='/winning_tickets'>
                <span>winning</span>
              </Link>
            </div>
            <div class='collapsible-body'>
              <Link to='/previous_tickets'>
                <span>previous</span>
              </Link>
            </div>
          </li>
          <li>
            <div class='collapsible-header'>
              <i class='material-icons'>apps</i>Scan QR
            </div>
            <div class='collapsible-body'>
              <Link to='/qr_scan'>
                <span>click to scan</span>
              </Link>
            </div>
          </li>
          <li>
            <div class='collapsible-header'>
              <i class='material-icons'>apps</i>Virtual Account
            </div>
            <div class='collapsible-body'>
              <Link to='/credited_money'>
                <span>prize money credited</span>
              </Link>
            </div>
            <div class='collapsible-body'>
              <Link to='/claimed_money'>
                <span>Money Claimed</span>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
export default Accordion;
