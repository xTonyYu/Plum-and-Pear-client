import axios from 'axios'

const endPoint = `${process.env.REACT_APP_API}/cartitems`
// const endPoint = 'https://plumpear-api.herokuapp.com/api/v1/cartitems'
// const endPoint = 'http://localhost:4000/api/v1/cartitems'

class CartItemModel {
  static getAll = () => {
    return axios.get(endPoint)
  }

  static getById = (id) => {
    return axios.get(`${endPoint}/${id}`)
  }

  static add = (data) => {
    return axios.post(endPoint, data)
  }
  
  static edit = (id, data) => {
    return axios.put(`${endPoint}/${id}`, data)
  }

  static remove = (id) => {
    return axios.delete(`${endPoint}/${id}`)
  }
}

export default CartItemModel;