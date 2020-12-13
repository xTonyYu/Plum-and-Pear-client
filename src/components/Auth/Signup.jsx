import React from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../../App.css'

class Signup extends React.Component {
  state = {
    userName: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API}/auth/register`, this.state)
    .then(res => {
      console.log(res);
      this.props.history.push('/login')
    })
    .catch(err => console.log('err login...', err))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input onChange={this.handleChange} type="text" id="username" name="userName" placeholder= "User Name" value={this.state.userName} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input onChange={this.handleChange} type="email" id="email" name="email" placeholder= "Email" value={this.state.email} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={this.handleChange} type="password" id="password" name="password" placeholder= "Password" value={this.state.password} />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input onChange={this.handleChange} type="text" id="firstname" name="firstName" placeholder= "First Name" value={this.state.firstName} />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input onChange={this.handleChange} type="text" id="lastname" name="lastName" placeholder= "Last Name" value={this.state.lastName} />
        </div>
        <button className="btn btn-primary float-right" type="submit">Register</button>
      </form>
    )
  }
}

export default withRouter(Signup);