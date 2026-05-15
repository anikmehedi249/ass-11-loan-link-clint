import React, { useState } from 'react'
import useAxiosSecure from '../../../useHooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import { MdOutlinePayments } from 'react-icons/md';
import { TiCancel } from 'react-icons/ti';
import { FaDollarSign, FaRegEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { FcPaid } from "react-icons/fc";
import useAuth from '../../../useHooks/useAuth';

const MyLoans = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
        const queryClient = useQueryClient()
        const navigate = useNavigate()
        const [modal, setModal] = useState(false) 
        const [selectedLoan, setSelectedLoan] = useState(null)
        
        
        const { data: myLoans = [] } = useQuery({
            queryKey:['my-loans'],
            queryFn: async()=>{
              const res = axiosSecure.get('my-loans')
              return (await res).data
            }
        });

        const { data: applicationFee =[] } = useQuery({
          queryKey:['payments'],
          queryFn: async()=>{
            const res = axiosSecure.get('/applicationFee')
            return(await res).data
          }
        })

        const convertAmount = (number) => {

    if (number >= 1000000)
      return (number / 1000000) + 'M'

    else if (number >= 1000)
      return (number / 1000) + 'K'

    return number
  }

  const handlePayment= async(loan)=>{
    const paymentInfo = {
      _id:loan._id,
      loanTitle:loan.loanTitle,
      email: loan.email || user.email,
      name: user.displayName || loan.name || 'Customer'
    }

    const res = await axiosSecure.post('/payment-checkout-session', paymentInfo)
    window.location.href = res.data.url
      console.log(res.data);
  }

  const getPaymentByLoanId=(loanId)=>{
    return applicationFee.find(pay=>String(pay.loanId) === String(loanId))
  };


  const openModal=async(loan)=>{

    if(!applicationFee.length){
      console.log('Payment not loaded yet');
      return
    }

    const payment = getPaymentByLoanId(loan._id)
    console.log("Match payment:", payment);
    

    setSelectedLoan({
      ...loan, paymentInfo:payment
    })
    setModal(true)
  };

  const closeModal=async()=>{
    
    setModal(false)
  }

  const capitalizeText = (text) => {
    return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const deleteMutation=useMutation ({
    mutationFn: async(id)=>{
      return axiosSecure.delete(`/my-loans/${id}`)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey:['my-loans']})
    }
  })

  const handleDelete = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to delete This Loan Application?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          deleteMutation.mutate(id, {
            onSuccess: () => {
              Swal.fire({
                position: "top",
                icon: "success",
                title: "Successfully delete The Loan Application",
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
        }
  
  
      });
    }

    return (
        <div>
              <h1 className='text-4xl font-bold  text-center custom-font text-primary my-10'>Pending Loan Applications</h1>
              <div className="overflow-x-auto my-15">
                <table className="table ">
                  {/* head */}
                  <thead>
                    <tr className='text-accent'>
                      <th>SL.No</th>
                      <th>
                        Loan ID
                      </th>
                      <th>User Info</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    { myLoans.map((loan,index) =>
                      <tr key={loan._id}>
                        <th>
                          {index + 1}
                        </th>
                        <td>
                          {loan._id}
                        </td>
                        <td>
                          <div className='flex flex-col'>
                            <div className="font-bold text-medium text-accent">{loan.loanTitle}</div>
                            
                          </div>
                        </td>
                        <td className='font-bold text-secondary'>
                          {convertAmount(loan.loanAmount)}
                        </td>
        
                        <td ><span className={`badge  border-none flex py-4 ${loan.status === 'rejected' ? 'badge-error' :
                          loan.status === 'approved' ? 'badge-success' : 'bg-[#feb600]'} font-semibold`}>{capitalizeText(loan.status)}</span></td>
                        <td className='flex gap-2'>
                          
        
                          <button onClick={() => navigate(`/loan-details/${loan.loanId}`)} className="btn btn-primary btn-sm">
                            <FaRegEye className='w-4 h-4' />View</button>

                            {
                                loan.status === 'pending' && (
                                    <button onClick={()=> handleDelete(loan._id)} className="btn bg-[#039487] text-white btn-sm flex items-center"><TiCancel 
                          className='w-4 h-4' />Cancel</button>
                                )
                            }

                            {
                                loan.applicationFeeStatus === 'unpaid'?(
                                    <button onClick={()=> handlePayment(loan)}  className="btn btn-accent text-white btn-sm flex items-center">
                            <MdOutlinePayments className='w-4 h-4'  />Pay</button>
                                ) : ( <button onClick={()=> openModal(loan)}  className="btn btn-secondary text-white btn-sm flex items-center">
                            <FcPaid  className='w-4 h-4'  />Paid</button> )
                            }
        
                          
                        </td>
        
                      </tr>)}
        
        
                  </tbody>
        
                </table>

                {
                  modal && selectedLoan &&(
                    <dialog open className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box space-y-4">
                              <div className='flex flex-col justify-center items-center gap-1'>

                            <h2 className='custom-font'>Payment Details</h2>
                                <h3 className="custom-font text-center text-xl text-primary mt-5">{selectedLoan?.paymentInfo?. loanTitle}</h3>
                                
                              </div>
                              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 my-8'>
                                  

                                <div className='flex items-center gap-1'>
                                  <label className="label my-3 text-sm font-bold">Borrower's Name:</label>
                                  <h3 className="font-bold text-center text-sm">{selectedLoan?.paymentInfo?.name}</h3>
                                </div>

                                <div className='flex items-center gap-1'>
                                  <label className="label my-3 text-sm font-bold">Email:</label>
                                  <h3 className="font-bold text-center text-sm">{selectedLoan?.paymentInfo?.email}</h3>
                                </div>

                                
                
                                <div className='flex items-center gap-1'>
                                  <label className="label my-3 text-sm font-bold">Transaction ID:</label>
                                  <h3 className="font-bold text-center text-sm">{selectedLoan?.paymentInfo?.transactionId}</h3>
                                </div>

                                 <div>

                                </div>
                
                                <div className='flex items-center gap-1'>
                                  <label className="label my-3 text-sm font-bold">Loan Status:</label>
                                  <h3 className="font-bold text-center text-sm">{capitalizeText(selectedLoan?.status)}</h3>
                                </div>
                
                                <div className='flex items-center gap-1'>
                                  <label className="label my-3 text-sm font-bold">Application Fee:</label>
                                  <h3 className="font-bold text-center text-sm flex items-center"><FaDollarSign />{selectedLoan?.paymentInfo?.applicationFee}</h3>
                                </div>
                
                                <div className='flex items-center gap-1'>
                                  <label className="label my-3 text-sm font-bold">Loan Id:</label>
                                  <h3 className="font-bold text-center text-sm flex gap-1">{selectedLoan?._id}</h3>
                                </div>

                                <div>

                                </div>

                                <div className='flex items-center gap-1'>
                                  <label className="label my-3 text-sm font-bold">Payment Date:</label>
                                  <h3 className="font-bold text-center text-sm flex gap-1">{formattedDate(selectedLoan?.paymentInfo?.paidAt)}</h3>
                                </div>
                
                                
                
                              </div>
                
                              <div className="modal-action flex justify-end mt-4">
                                <div className='flex'>
                
                                  <button onClick={closeModal}
                                    className='btn btn-primary'>
                                    Close
                                  </button>
                                </div>
                
                
                
                              </div>
                            </div>
                          </dialog>
                  )
                }
                
              </div>
            </div>
    )
}

export default MyLoans
