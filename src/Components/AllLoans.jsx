import React, { useEffect, useState } from 'react';
import { data } from 'react-router';
import AllLoansCard from './AllLoansCard';
import useAxiosSecure from '../useHooks/useAxiosSecure';

const AllLoans = () => {

    const[loans, setLoans] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(()=>{
         axiosSecure.get('/loans')
         .then(res=>setLoans(res.data))
         .catch(error=>console.error(error))
    },[axiosSecure])

    return (
        <div className='flex flex-col justify-center items-center my-25'>
            <p className='text-3xl font-bold text-primary mb-20 custom-font'>All The Loans We Offer </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto mr-2 w-11/12 gap-5 '>
                {
                loans.map(loan=><AllLoansCard key={loan._id} loan={loan}></AllLoansCard>)
            }
            </div>
         
        </div>
    );
};

export default AllLoans;