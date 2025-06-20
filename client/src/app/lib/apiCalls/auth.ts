import axios from "axios";
import { baseUrl } from "../apiConfig";

export async function registerUser(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return {
      message: "",
      error: "Passwords do not match",
    };
  }

  try {
    const res = await axios.post(`${baseUrl}/auth/register`, {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    return {
      message: "User created successfully",
      user: res.data,
      error: "",
    };
  } catch (error: any) {
    console.error(error);
    return {
      message: "",
      error: error?.response?.data?.message || error.message,
    };
  }
}

export async function userLogin(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password,
    });

    return {
      message: "Login successful",
      user: res.data.data,
      error: "",
    };
  } catch (error: any) {
    console.error(error);
    return {
      message: "",
      error: error?.response?.data?.message || error.message,
      user: null,
    };
  }
}
