import axios from 'axios'

const endPoint = 'http://localhost:4000/api/v1/users'

class UserModel {
  static getAllUsers = () => {
    return axios.get(endPoint)
  }

  static getUserById = (id) => {
    return axios.get(`${endPoint}/${id}`)
  }

  // static addUser = (data) => {
  //   return axios.post(endPoint, data)
  // }
  
  static editUser = (id, data) => {
    return axios.put(`${endPoint}/${id}`, data)
  }
  static toggleFav = (id, prod, direction) => {
    return axios.put(`${endPoint}/fav/${id}/${direction}`, prod)
  }

  // static revmoveUser = (id) => {
  //   return axios.delete(`${endPoint}/${id}`)
  // }

}

export default UserModel;