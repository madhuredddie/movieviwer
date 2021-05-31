import React, { Component } from 'react';
import Users from '../../components/users';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div>
        <Users  {...this.props} />
      </div>
    );
  }
}

export default App;
