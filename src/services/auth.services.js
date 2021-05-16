import axios from "axios";

const API_AUTH_URL = "https://intense-peak-83897.herokuapp.com/api/auth/";

export const register = async (name, email, password) => {
  const res = await axios.post(API_AUTH_URL + "signup", {
    name,
    email,
    password
  });
  return res.data;
}

export const forgotPassword = async (email) => {
  try {
    const res = await axios.post(API_AUTH_URL + "forgetPassword", { email })
    return res
  } catch (e) {
    return e.response.data
  }

}

export const checkResetPasswordToken = async (token, userId) => {
  try {
    const res = await axios.get(API_AUTH_URL + `forgetPassword/verifyLink/${token}/${userId}`)
    return res

  } catch (e) {
    return e.response
  }
}


export const resetPassword = async (token, userId, password) => {
  try {
    const res = await axios.post(API_AUTH_URL + `forgetPassword/verifyLink/${token}/${userId}`, { password })
    return res

  } catch (e) {
    return e.response.data
  }
}