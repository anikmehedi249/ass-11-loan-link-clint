import { } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router'
import useAxiosSecure from '../../../useHooks/useAxiosSecure'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Sector, Pie } from 'recharts';
import useAuth from '../../../useHooks/useAuth';
import { ClipLoader } from 'react-spinners';
import LoadingAm from '../../Utility/LoadingAm';
import { FiLogOut } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { MdMessage } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";






const RADIAN = Math.PI / 180;
const statusColor = ['#14B884', '#B82F14', '#ffb900'];

const customizeLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (!cx || !cy) {
        return null
    }

    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text
            x={x}
            y={y}
            fill='white'
            textAnchor='middle'
            dominantBaseline='central'
            fontSize={12}
        >
            {(percent * 100).toFixed(0)}%
        </text>
    )

}


const CustomPaiChart = ({ data }) => {
    return (
        <div>
            <ResponsiveContainer width='100%' height={350}>
                <PieChart>
                    <Pie
                        data={data}
                        labelLine={false}
                        label={customizeLabel}
                        dataKey="value"
                        outerRadius='70%'



                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={statusColor[index % statusColor.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            <div className='flex justify-center gap-4 mt-4 flex-wrap'>
                {data.map((entry, index) => (
                    <div key={index} className='flex items-center gap-2'>
                        <div className='w-3 h-3 rounded-full' style={{ backgroundColor: statusColor[index % statusColor.length] }}>
                        </div>
                        <span className='text-sm'>{entry.name}</span>
                    </div>
                ))}
            </div>

        </div>
    )

}

export default function ManagerProfile() {

    const axiosSecure = useAxiosSecure()
    const { user, loading, signOutUser } = useAuth()

    const { data: loanDetail = [] } = ({
        queryKey: ['loan-detail'],
        queryFn: async () => {
            const res = await axiosSecure.get('loanDetail')
            return res.data
        }
    })

    const { data: loans = [] } = ({
        queryKey: ['loans'],
        queryFn: async () => {
            const res = await axiosSecure.get('loans')
            return res.data
        }
    })
    const { data: currentUser = {}, isLoading } = ({
        queryKey: ['currentUser', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data
        }
    })

    const CustomTick = ({ x, y, payload }) => {
        return (
            <text
                x={x}
                y={y}
                dy={16}
                textAnchor='end'
                fill='#666'
                transform={`rotate(-25, ${x}, ${y})`}
                fontSize={12}
            >
                {payload.value}
            </text>
        )
    }

    const handleSignOut = async () => {
        try {
            await signOutUser()
        } catch (error) {
            console.log(error);
        }
    }

    const approvedLoans = loanDetail.filter(loan => loan.status === 'approved').length
    const rejectedLoans = loanDetail.filter(loan => loan.status === 'rejected').length
    const pendingLoans = loanDetail.filter(loan => loan.status === 'pending').length

    const statusData = [
        { name: 'Approved', value: approvedLoans },
        { name: 'Rejected', value: rejectedLoans },
        { name: 'Pending', value: pendingLoans }
    ]

    const categoryData = {}

    loans.forEach((loan) => {
        if (!loan.category)
            return
        if (categoryData[loan.category]) {
            categoryData[loan.category]++
        }
        else {
            categoryData[loan.category] = 1;
        }
    });

    const chartData = Object.keys(categoryData).map((key) => {
        const remove = key.replace(/loan/gi, '').
            replace(/-/g, ' ').trim();

        const capitalizeText = remove.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');


        return {
            name: capitalizeText,
            value: categoryData[key],

        };


    });

    const colors = [
        '#FF3A29',
        '#FAFF47',
        '#4DF753',
        '#4DF7F4',
        '#4D7DF7',
        '#9D40D6',

    ]

    const capitalizeWord = (text) => {
        return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };





    if (isLoading)
        return <LoadingAm></LoadingAm>

    return (
        <div className='min-h-screen bg-gray-100 flex h-auto'>
            <div className='w-64 bg-blue-900 flex flex-col items-center py-10'>

                <div>
                    {loading ? (<ClipLoader />) :
                        user ? (

                            <>
                                <img src={user.photoURL || "https://i.ibb.co/jkghJTbZ/profile.jpg"} className='w-[50px] md:w-[70px] h-[50px] md:h-[70px] rounded-full mx-auto' alt="" />
                                <div className='my-5'>
                                    <h2 className='text-[10px] md:text-lg font-semibold px-2 md:px-0 text-white text-center'>{user.displayName || 'Manager Name'}</h2>
                                    <p className='text-[10px] md:text-sm px-2  text-white'>{user.email || 'Email'}</p>
                                </div>
                            </>

                        ) : null}
                </div>


                <div className='mt-10 space-y-4 w-full px-2 md:px-6 flex flex-col'>
                    <Link to={'/'} className='hover:bg-blue-700 p-2 rounded cursor-pointer text-white flex
                    items-center gap-2'><FaHome />Home</Link>
                    <Link to={'/dashboard/manage-loans'} className='hover:bg-blue-700 p-2 rounded cursor-pointer text-white flex
                    items-center gap-2'><TbMoneybag />Loans
                    </Link>
                    <p className='hover:bg-blue-700 p-2 rounded cursor-pointer text-white flex
                    items-center gap-2'><MdMessage />Message</p>
                    <p className='hover:bg-blue-700 p-2 rounded cursor-pointer text-white flex
                    items-center gap-2'><IoMdNotifications />Notification</p>
                    <p className='hover:bg-blue-700 p-2 rounded cursor-pointer text-white flex
                    items-center gap-2'><IoSettingsSharp />Settings</p>

                </div>

            </div>
            <div className='flex-1 p-4 md:p-8'>
                <h1 className=' text-lg md:text-2xl font-bold mb-6 text-accent custom-font'>Managers Dashboard</h1>

                <div className='flex flex-col md:flex-row justify-start md:justify-between gap-6'>
                    <div className='bg-primary text-white p-2 md:p-6 rounded-lx shadow text-center rounded-xl mx-auto md:mx-0 w-50 ml-5 '>
                        <p className='text-sm md:text-medium'>Total Loans</p>
                        <h2 className='tex-lg md:text-2xl font bold custom-font'>{loanDetail.length}</h2>
                    </div>
                    <div className='bg-secondary text-white p-2 md:p-6 rounded-lx shadow text-center rounded-xl mx-auto md:mx-0 w-50 ml-5'>
                        <p>Approved</p>
                        <h2 className='text-2xl font bold custom-font'>{approvedLoans}</h2>
                    </div>
                    <div className='bg-red-500 text-white p-2 md:p-6 rounded-lx shadow text-center rounded-xl mx-auto md:mx-0 w-50 ml-5'>
                        <p>Rejected</p>
                        <h2 className='text-2xl font bold custom-font'>{rejectedLoans}</h2>
                    </div>
                    <div className='bg-amber-400 text-white p-2 md:p-6 rounded-lx shadow text-center rounded-xl mx-auto md:mx-0 w-50 ml-5'>
                        <p>Pending</p>
                        <h2 className='text-2xl font bold custom-font'>{pendingLoans}</h2>
                    </div>
                </div>




                <h2 className='text-lg font-semibold mb-4 text-primary mt-20'>Loan Activity</h2>
                <div className='bg-white  rounded-xl shadow grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <div className='lg:col-span-2 bg-gray-100 rounded-2xl p-4 '>

                        <ResponsiveContainer width='100%' height={300}>
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 5,
                                    right: 0,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >

                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name"
                                    interval={0}
                                    angle={-25}
                                    height={100}
                                    tick={CustomTick}
                                />
                                <YAxis allowDecimals={false}
                                    domain={[0, 'dataMax + 2']}
                                />
                                <Tooltip />

                                <Bar dataKey="value" radius={[10, 10, 0, 0]} >
                                    {chartData.map((entry, index) => (
                                        <Cell key={index} fill={colors[index % colors.length]} />
                                    ))}
                                </Bar>

                            </BarChart>
                        </ResponsiveContainer>

                    </div>
                    <div className='w-auto bg-gray-100 rounded-2xl  flex justify-center items-center'>

                        <CustomPaiChart data={statusData} className='pr-5' />
                    </div>

                </div>

                <div className='mt-8 p-6 rounded-xl shadow'>
                    <h2 className='text-accent text-2xl font-semibold'>Profile Info</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
                        <p><strong className='custom-font'>Name: {currentUser?.displayName}</strong></p>
                        <p><strong className='custom-font'>Email: {currentUser?.email}</strong></p>
                        <p><strong className='custom-font'>Role: {capitalizeWord(currentUser?.role)}</strong></p>
                        <p><strong className='custom-font'>Employee ID:{currentUser?._id}</strong></p>
                    </div>



                </div>
                <button onClick={handleSignOut} className='btn w-30 mt-6 flex items-center gap-2 bg-red-500 text-white
                    rounded-xl hover:bg-red-800'><FiLogOut />Logout</button>
            </div>
        </div>

    )
}
