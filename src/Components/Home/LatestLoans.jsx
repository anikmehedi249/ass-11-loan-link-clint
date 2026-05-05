import React, { useEffect, useState } from 'react';
import LatestLoansCard from './LatestLoansCard';
import { Link } from 'react-router';

const LatestLoans = () => {
    const [featuredLoans, setFeaturedLoans] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_server_url}/featured-loans`)
            .then(res => res.json())
            .then(data => setFeaturedLoans(data))
            .catch(error =>
                console.log(error))
    }, [])

    return (

        <div className='flex flex-col justify-center items-center my-5'>
            <div className='w-11/12 mx-auto mt-30 mb-10'>
                <h1 className='text-center text-3xl mb-15 font-semibold text-primary custom-font'>See Our Latest Loans We Offer </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto mr-2 w-11/12 gap-5'>
                    {
                        featuredLoans.map(loan => <LatestLoansCard key={loan._id} loan={loan}></LatestLoansCard>)
                    }
                </div>
            </div>
            <Link to={'/all-loans'} className='btn btn-primary my-6  cursor-pointer transition-all duration-300 ease-in-out  hover: shadow-lg hover:scale-[1.02] hover:bg-blue-500'>See More Loans</Link>
        </div>


    );
};

export default LatestLoans;