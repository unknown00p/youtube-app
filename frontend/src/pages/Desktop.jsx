import SideBar from '../subComponents/SideBar'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { currentUser } from '../api/authentication/authApi.js'
import userData from '../zustand/userData.js'


function Desktop() {
    const [isCurrentUser, setIsCurrentUser] = useState(true)
    const navigate = useNavigate();
    const [data, setData] = useState(null)

    useEffect(() => {
        async function process() {
            const response = await currentUser()
            setData(response.data.data)
        }
        process()
    }, [])

    const deskCategories = [
        {
            "id": 0,
            "name": "Videos",
            "url": "videos"
        },
        {
            "id": 1,
            "name": "Playlist",
            "url": "playlist"
        },
        {
            "id": 2,
            "name": "Tweets",
            "content": <div>Tweets</div>,
            "url": "tweets"
        },
        {
            "id": 3,
            "name": "Following",
            "url": "following"
        },
    ]

    return (
        <div className=''>
            <div>
                <div className='sm:left-[8px] sm:top-20 fixed sm:hidden z-40 sm:z-0 lg:block bottom-[0px] lg:bottom-auto w-full lg:w-[5rem]'>
                    <SideBar />
                </div>
            </div>

            <div className='lg:ml-[6rem]'>

                <div className='coverImage relative'>
                    <img className='w-full h-[14rem] object-cover' src={data?.coverImage} alt="" />
                </div>

                <div className='px-4'>
                    <div className='flex justify-between gap-3 flex-col sm:flex-row w-full pr-3  sm:pt-3'>
                        <div className='flex gap-3 flex-col sm:flex-row'>
                            <div>
                                <img src={data?.avatar} className='w-24 h-24 rounded-full object-cover relative top-[-3rem] sm:top-[-2rem]' alt="" />
                            </div>

                            <div className='text-white flex flex-col gap-1 top-[-3rem] relative sm:static pl-2 sm:pl-0'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-2xl font-bold'>{data?.username}</p>

                                    <Link to={"/"}>
                                        <div className='text-white gap-2 flex sm:hidden'>
                                            <img src="/leftArrow.svg" alt="" />
                                            <p>
                                                back
                                            </p>
                                        </div>
                                    </Link>
                                </div>

                                <p className='text-[#c1bfbf]'>@{data?.fullName}</p>
                                <div className='flex gap-1 items-center text-[#b8b8b8] text-sm'>
                                    <p>600k Subscribers</p>
                                    <img src="dot.svg" alt="" />
                                    <p>120 Subscribed</p>
                                </div>
                            </div>
                        </div>


                        <div>
                            <button type="button" className="text-[#c6c1c1] bg-[#661fbd] font-medium rounded-lg text-sm px-5 py-2.5 me-2 focus:outline-none top-[-3rem] relative sm:static pl-2">{isCurrentUser ? <div onClick={() => navigate("/dashboard/userDashboard")} className='flex items-center gap-2'><img src="/edit.svg" /> <p>Edit</p></div> : 'Subscribe'}</button>
                        </div>
                    </div>
                </div>

            </div>

            <div className='lg:ml-[6rem]'>
                <div className='flex justify-center'>
                    <div className='flex justify-between text-white border-b-2 w-[95%] gap-1 py-2'>
                        {deskCategories && deskCategories.map((value) => (
                            <div key={value.id} className='text-center w-full'>
                                <NavLink
                                    to={value.url}
                                    className={({ isActive }) => isActive ? "bg-white w-full inline-block rounded-sm text-black py-2 px-4 shadow-md"
                                        : "py-2 transition-colors inline-block duration-200 rounded-lg"}
                                >
                                    {value.name}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='text-white pb-20 sm:pb-0 w-[95%] m-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Desktop
