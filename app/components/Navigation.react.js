var React = require('react');
var Link = require('react-router').Link;
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var Navigation = React.createClass({
  getInitialState: function() {
    return {
      user: UserStore.getState().user
    };
  },

  componentDidMount: function() {
    UserStore.listen(this.onChange);
  },

  componentWillUnmount: function() {
    UserStore.unlisten(this.onChange);
  },

  onChange: function() {
    this.setState({
      user: UserStore.getState().user
    });
  },

  onLogout: function() {
    UserActions.logout();
  },

  render: function() {
    var navBlock = [];
    if (this.state.user.get('authenticated')) {
      navBlock.push(<Link key="dashboard" to="dashboard" className="navigation__item" activeClassName="navigation__item--active">Dashboard</Link>);
      navBlock.push(<Link key="logout" onClick={this.onLogout} className="navigation__item" to="logout">Logout</Link>);
    } else {
      navBlock.push(<Link key="logout" className="navigation__item" to="login">Log in</Link>);
    }
    navBlock.push(<Link key="about" to="about" className="navigation__item" activeClassName="navigation__item--active">About</Link>);
    return (
      <nav className="navigation" role="navigation">
          <Link to="/" className="navigation__item navigation__item--logo" activeClassName="navigation__item--active">Ninja Ocean</Link>
          { navBlock }
      </nav>
    );
  }
});

module.exports = Navigation;
