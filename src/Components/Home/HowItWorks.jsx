import React from 'react'

const HowItWorks = () => {

  const steps =[
    {
      id:1,
      title:"Sign Up",
      description: "Provide basic information to get started quickly.",
      img:"/signup.webp"
    },
    {
      id:2,
      title:"Choose a loan",
      description: "Provide your personal and financial details in a simple application form.",
      img:"/choose-loan.webp"
    },
    {
      id:3,
      title:"Verification & Review",
      description: "Our system reviews your application and verifies your information.",
      img:"/verification&review2.png"
    },
    {
      id:4,
      title:"Approval",
      description: "Get notified once your loan is approved.",
      img:"/loanApproval.jpg"
    },
    {
      id:5,
      title:"Receive Funds",
      description: "Loan amount is transferred to your account quickly.",
      img:"/receive-fund-png.png"
    },
  ]

  return (
    <div className='my-30 mx-30 shadow-2xl '>
        <div className='bg-green-800 py-20 text-center relative'>
            <h2 className='custom-font text-3xl text-white text-center font-bold'>How It Works</h2>
            <p className='text-green-200 mt-2 mb-20'>Simple Steps to get your loan</p>
        </div>
      
      <div className='bg-gray-200 pb-50'>

        <div className='max-w-7xl mx-auto mr-5 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 px-6 -mt-27 gap-6 '>
        {
          steps.map(step=>
            <div key={step.id} 
            className='bg-white absolute top-5 text-center shadow-xl p-4 rounded-xl border relative'>

                <div className='absolute -top-5 left-1/2 -translate-x-1/2  text-secondary w-10 h-10 flex items-center justify-center rounded-full font-bold  bg-white'>

                </div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2  text-secondary w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold">
                {step.id}
              </div>

              <div className='mt-6 '>
                <img src={step.img} alt="" className='h-20 w-20 object-contain ml-7'/>
              </div>

              <h3 className='font-semibold text-sm mt-4'>{step.title}</h3>

              <p className='text-accent text-sm my-4'>{step.description}</p>
                
            </div>
          )
        }
        </div>

      </div>
    </div>
  )
}

export default HowItWorks
