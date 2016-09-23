import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { logout } from '../redux/actions';
import NavbarContainer from '../nav/nav-header-container';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    this.props.logout();
  }

  render() {
    const { error, isAuthenticated, profile } = this.props
    return (
      <div>
        <NavbarContainer
          isAuthenticated={isAuthenticated}
          profile={profile}
          onLogoutClick={this.handleLogoutClick}
        />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.auth.profile,
  };
}

export default connect(mapStateToProps, {
  logout,
})(Container);