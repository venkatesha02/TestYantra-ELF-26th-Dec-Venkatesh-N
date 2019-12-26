import React from 'react';
import Header from './Header'
import { UserProvider } from './context/userAuthentication';

class App extends React.Component {
  state = {
    login:false,
    setLogin: (e) => {
      this.setLogout(e)
    }
  }
  setLogout = (e) => {
    this.setState({
      ...this.state,
      login: e
    })
  }
  render() {
    return (
      <div>
        <UserProvider value={this.state}>
          <Header />
        </UserProvider>
      </div>)
  }
}
export default App;