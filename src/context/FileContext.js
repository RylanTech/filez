import { createContext, useState } from "react";
import axios from 'axios'

const BASE_URL = "http://localhost:3001/api/";

export const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("myFilezUserToken")}`,
});

export const FileContext = createContext()
const fs = require('fs');

export const FileProvider = (props) => {
    const [uploadProgress, setUploadProgress] = useState()

    const uploadFile = async (file) => {
        try {
          const formData = new FormData();
          formData.append('file', file);
    
          const config = {
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              setUploadProgress(progress);
            },
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };
    
          // Make the POST request to the server endpoint using Axios
          const response = await axios.post('https://example.com/upload', formData, config);
    
          console.log('File uploaded successfully:', response.data);
        } catch (error) {
          console.error('File upload failed:', error);
        }
      };

  return (
    <FileContext.Provider
      value={{
        uploadFile
      }}
    >
      {props.children}
    </FileContext.Provider>
  )
}