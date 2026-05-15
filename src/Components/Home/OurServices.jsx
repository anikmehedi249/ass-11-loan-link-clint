import React from 'react'

const OurServices = () => {

  const services =[
    {
      id:1,
      title:"Easy Loan Application",
      description: "Apply for microloans quickly with a simple and user-friendly process.",
      img:"/easy-loan.png"
    },
    {
      id:2,
      title:"Application Tracking",
      description: "Track your loan status in real-time from submission to approval.",
      img:"/easily-tracking.png"
    },
    {
      id:3,
      title:"Secure Verification",
      description: "Advanced verification ensures safe and reliable loan processing.",
      img:"/Secure-Verification.jpg"
    },
    {
      id:4,
      title:"EMI Management",
      description: "Manage repayments easily with structured EMI schedules.",
      img:"/emi-management.webp"
    },
    {
      id:5,
      title:"User Dashboard",
      description: "Access all your loan details, status, and repayment info in one place.",
      img:"/User-Dashboard.webp"
    },
  ]
  return (
    <div className='my-30 mx-30 shadow-2xl'>
      <div className='relative h-150'>
        <img src="/our-services.jpg" alt="" className='h-full w-full object-fill'/>
        <div className='absolute inset-0 bg-cyan-700/70 '></div>
        <div className='absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4 '>
            <h2 className='text-4xl font-bold'>Our Services </h2>
            <p className='mt-3 max-w-xl'> Manage loans, approvals, and repayments in one smart system</p>
        </div>
      </div>

      <div className='bg-white pb-50'>

        <div className='max-w-7xl mx-auto  grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 px-6 -mt-24 gap-6 '>
           {
            services.map(service =>(
              <div key={service.id} className='bg-white shadow-xl hover:shadow-2xl transition duration-300 rounded-xl p-6 text-center relative top-30 pb-5' >
                  <div className='absolute -top-25 left-1/2 -translate-x-1/2 bg-white w-30 h-30 flex items-center justify-center rounded-full  font-bold'>
                  <img src={service.img} alt="" className='w-20 h-20 object-contain rounded-2xl'/>

                
                  </div>
                  <h2 className='mt-5 mb-5 font-semibold text-lg'>
                    {service.title}
                  </h2>

                  <p className='text-gray-500'>
                     {service.description}
                  </p>
              </div>
            ))
           }
        </div>

      </div>

    </div>
  )
}

export default OurServices
