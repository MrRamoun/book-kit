import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import Profile from './profile';

class AccountDisplayContainer extends React.Component {

  render() {
    return (
      <div>
        <h1>Account Display</h1>

        <Profile profile={this.props.profile} />


      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.auth.profile,
  };
};

module.exports = connect(mapStateToProps)(AccountDisplayContainer)