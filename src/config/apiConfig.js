import axios from "axios"
axios.interceptors.request.use(
  config => {
    //get Token
    let token = localStorage.getItem("accessToken")
    let AuthToken = ""
    config.headers["Authorization"] = token
    config.headers["Content-Type"] = "application/json"
    return config
  },
  error => {
    Promise.reject(error)
  }
)

const apiPost = (endPoint, reqdata) => {
  try {
    return axios
      .post(endPoint, reqdata)
      .then(response => {
        if (
          (response.status >= 200 && response.status < 300) ||
          response.status === 304
        ) {
          return { error: null, response: response, resultCode: 1 }
        } else {
          return { error: response, resultCode: 2, response: [] }
        }
      })
      .catch(error => {
        return { error: error.response, resultCode: 2, response: [] }
      })
  } catch (error) {
    console.log(error)
  }
}
const apiPut = (endPoint, reqdata) => {
  try {
    return axios
      .put(endPoint, reqdata)
      .then(response => {
        if (
          (response.status >= 200 && response.status < 300) ||
          response.status === 304
        ) {
          return { error: null, response: response, resultCode: 1 }
        } else {
          return { error: response, resultCode: 2, response: [] }
        }
      })
      .catch(error => {
        return { error: error.response, resultCode: 2, response: [] }
      })
  } catch (error) {
    console.log(error)
  }
}

const apiGet = endPoint => {
  return axios
    .get(endPoint)
    .then(response => {
      if (
        (response.status >= 200 && response.status < 300) ||
        response.status === 304
      ) {
        return { error: null, response: response, resultCode: 1 }
      } else {
        return { error: response, resultCode: 2, response: [] }
      }
    })
    .catch(error => {
      console.log("error", error)
      return { error: error.data, resultCode: 2, response: [] }
    })
}
const apiDelete = endPoint => {
  try {
    return axios
      .delete(endPoint)
      .then(response => {
        if (
          (response.status >= 200 && response.status < 300) ||
          response.status === 304
        ) {
          return { error: null, response: response, resultCode: 1 }
        } else {
          return { error: response, resultCode: 2, response: [] }
        }
      })
      .catch(error => {
        return { error: error.response, resultCode: 2, response: [] }
      })
  } catch (error) {
    console.log(error)
  }
}

export { apiPost, apiGet, apiPut, apiDelete }
