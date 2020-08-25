import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Login extends React.Component {
  state = {
    userName: '',
    password: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API}/auth/login`, this.state)
    .then((res) => {
      console.log(res.config.data)
      let admin = res.config.data.includes(`AdminX`)
      console.log("admin: ", admin);
      this.props.setCurrentUser(res.data.token, admin)
      this.props.history.push('./')
    })
    .catch(err => console.log('err login...', err))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input onChange={this.handleChange} type="username" id="username" name="userName" value={this.state.userName} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={this.handleChange} type="password" id="password" name="password" value={this.state.password} />
        </div>
        <button className="btn btn-primary float-right" type="submit">Login</button>
      </form>
    )
  }
}

export default withRouter(Login);