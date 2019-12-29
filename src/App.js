import React from 'react';
import Header from './Header'
import { UserProvider } from './context/userAuthentication';

class App extends React.Component {
  state = {
    login: false,
    user: false,

    data: null,
    setMyAc: (e) => {
      this.setMyAcount(e)
    },
    setUser: (e) => {
      this.setIsUser(e)
    },
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

  setIsUser = (e) => {
    this.setState({
      ...this.state,
      user: e
    })
  }

  setMyAcount = (e) => {
    this.setMyAc({
      ...this.state,
      data: e
    })
    console.log(this.state.data)
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