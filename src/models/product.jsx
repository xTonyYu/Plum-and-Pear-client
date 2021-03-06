import axios from 'axios'

const endPoint = `${process.env.REACT_APP_API}/products`
// const endPoint = 'https://plumpear-api.herokuapp.com/api/v1/products'
// const endPoint = 'http://localhost:4000/api/v1/products'

class ProductModel {
  static getAllProducts = () => {
    return axios.get(endPoint)
  }

  static getProductById = (id) => {
    return axios.get(`${endPoint}/${id}`)
  }

  static addProduct = (data) => {
    return axios.post(endPoint, data)
  }
  
  static editProduct = (id, data) => {
    return axios.put(`${endPoint}/${id}`, data)
  }

  static removeProduct = (id) => {
    return axios.delete(`${endPoint}/${id}`)
  }
}

export default ProductModel;