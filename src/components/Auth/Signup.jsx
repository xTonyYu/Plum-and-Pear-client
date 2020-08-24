import React from 'react'
import { withRouter } from 'react-router-dom';

class Signup extends React.Component {
  state = {
    userName: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input onChange={this.handleChange} type="text" id="username" name="userName" value={this.state.userName} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input onChange={this.handleChange} type="email" id="email" name="email" value={this.state.email} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={this.handleChange} type="password" id="password" name="password" value={this.state.password} />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input onChange={this.handleChange} type="text" id="firstname" name="firstName" value={this.state.firstName} />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input onChange={this.handleChange} type="text" id="lastname" name="lastName" value={this.state.lastName} />
        </div>
        <button className="btn btn-primary float-right" type="submit">Register</button>
      </form>
    )
  }
}

export default withRouter(Signup);