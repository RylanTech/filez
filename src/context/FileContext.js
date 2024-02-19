import { createContext, useState } from "react";
import axios from 'axios'



export const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("myFilezUserToken")}`,
});

export const FileContext = createContext()

export const FileProvider = (props) => {


  const [ip, setIp] = useState("localhost:3001")
  const BASE_URL = `http://${ip}/api/`

  const [uploadProgress, setUploadProgress] = useState()

  const uploadFile = async (formData) => {

    try {
      const config = {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
        headers: authHeader(),
      };

      // Make the POST request to the server endpoint using Axios
      const response = await axios.post(`${BASE_URL}upload`, formData, config);

      return response.data
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  const loginUser = async (user) => {
    const loginUserURL = `${BASE_URL}user/signin`;
    try {
      const response = await axios.post(loginUserURL, user);
      if (response.status === 200) {
        localStorage.setItem("myFilezUserToken", response.data.token);
        return response.data;
      }
    } catch (error) {
      return error
    }
  };

  const getFilesByUser = async () => {
    const url = `${BASE_URL}file/`
    try {
      const response = await axios.get(url, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      return error
    }
  }

  const deleteFileArr = async (arr) => {

    const url = `${BASE_URL}file/deletearr/`

    try {
      const response =await axios.post(url, arr, {
        headers: authHeader()
      })
      return response.data
    } catch (error) {
      return error
    }
  }

  return (
    <FileContext.Provider
      value={{
        uploadFile,
        loginUser,
        getFilesByUser,
        deleteFileArr,
        uploadProgress,
        ip
      }}
    >
      {props.children}
    </FileContext.Provider>
  )
}