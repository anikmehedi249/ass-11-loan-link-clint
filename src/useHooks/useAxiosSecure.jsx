import axios from 'axios'
import React, { useEffect } from 'react'

 const axiosSecure = axios.create({
    baseURL: 'process.env.VITE_server_url'
 })

const useAxiosSecure = () => {
    useEffect(()=>{
        axiosSecure.interceptors.request.c
    },[])
  return axiosSecure
}

export default useAxiosSecure
