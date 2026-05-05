import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../useHooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin5Line } from "react-icons/ri";

const AllLoan = () => {

  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: async ({ id, value }) => {
      return axiosSecure.patch(`/loans/show/${id}`, {
        showOnHome: value
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] })
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/loans/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loans'] })
    }
  });

  const handleToggle = (id, value) => {
    toggleMutation.mutate({ id, value });
  };

  const formatCategory =(category)=>{
    if(!category){
      return"";
    }  
     else{
       return category.split('-').map(word=>
       word.charAt(0).toUpperCase()+ word.slice(1)).join(' ');
     }
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this loan?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  }

  const { data: loans = [] } = useQuery({
    queryKey: ['loans'],
    queryFn: async () => {
      const res = await axiosSecure.get('/loans')
      return res.data
    }
  })
  return (
    <div className='space-y-20'>
      <h1 className='text-4xl font-bold  text-center custom-font text-primary my-10 custom-font'>All loans</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className='mx-auto'>
            <tr className='text-accent text-center'>
              <th>
                #
              </th>
              <th>Name</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody >
            {loans.map((loan, index) =>
              <tr key={loan._id} className='text-center px-15'>
                <th>
                  {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={loan.image}
                          alt={loan.title}
                          className='object-cover' />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{loan.title}</div>

                    </div>
                  </div>
                </td>
                <td className='font-bold text-red-500'>
                  {loan.interestRate} %
                </td>
                <td className='text-secondary font-semibold'>{formatCategory(loan.category)}</td>
                <td><span className='text-accent font-bold'>{loan.createdBy.name}</span>
                  <br />
                  <span >{loan.createdBy.email}</span>
                </td>
                <td>
                  <input type="checkbox"
                    className='toggle toggle-primary'
                    checked={loan.showOnHome}
                    onChange={(e) => handleToggle(loan._id, e.target.checked)}
                  />
                </td>
                <td className='flex gap-4 mt-2'>
                  <Link to={`/dashboard/updates-loan/${loan._id}`} className="btn btn-primary btn-sm flex items-center"><RxUpdate className='w-4 h-4' />Update</Link>
                  <button onClick={() => handleDelete(loan._id)} className="btn bg-red-500 btn-sm text-white"><RiDeleteBin5Line className='w-4 h-4' />Delete</button>
                </td>
              </tr>
            )}

          </tbody>
          {/* foot */}

        </table>
      </div>
    </div>
  );
};

export default AllLoan;