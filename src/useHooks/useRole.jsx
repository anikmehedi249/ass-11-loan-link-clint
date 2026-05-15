import React from 'react'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const useRole = () => {
  
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
  
    const { data:role, isLoading : roleLoading, } = useQuery({
        queryKey:['user-role', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async()=>{
         const res =await axiosSecure.get(`/users/${user.email}/role`)
            return res.data.role 
         }
    })

    if (loading || roleLoading) {
        return {role:null, roleLoading:true}
    }

    return{role, roleLoading:false}
}

export default useRole;
