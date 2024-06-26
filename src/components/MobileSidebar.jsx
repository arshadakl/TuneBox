import { Sidebar } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { getYoutubeMusicDetails } from '../utils/Services';
import { _addMusic, _logout } from '../utils/API';
import { handleError } from '../utils/errorHandler';
import { getUsername, removeToken, removeUsername } from '../utils/tokenService';
import { initFlowbite } from 'flowbite';
import { toast } from 'sonner';

function MobileSidebar({ isOpen, toggleSidebar, updateData, setIsSidebarOpen }) {
  const navigate = useNavigate()
  const closeButtonRef = useRef(null);
  const [link, setLink] = useState("")
  const [musicData, setMusicData] = useState(null)
  const [isAdd, setIsAdd] = useState(false)
  const [user, setUser] = useState("P")
  useEffect(() => {
    initFlowbite();
    const userName = getUsername()
    setUser(userName)
  }, [])

  const handleFindMusic = async (e) => {
    e.preventDefault()

    const details = await getYoutubeMusicDetails(link)
    if (details.status) {
      setMusicData(details.data)
    } else {
      toast.warning(details.error)
    }
    // console.log(details);
  }


  const handileAddComp = () => {
    setMusicData(null);
    setLink('');
    setIsAdd(!isAdd)
  }

  const handleLogout = async () => {
    try {
      const response = await _logout()
      if (response.success) {
        toast.success(response.message)
        removeToken()
        removeUsername()
        navigate('/login')
      }
    } catch (error) {
      const errorMessage = handleError(error);
      toast.error(errorMessage);
    }
  }



  const addMusic = async () => {
    try {
      if (musicData == null) return;
      const response = await _addMusic(musicData);
      if (response.success) {
        toast.success(response.message);
        // Close the modal
        updateData()
        // Reset the state or perform any other necessary actions
        setMusicData(null);
        setLink('');
        setIsSidebarOpen(!isOpen)
      }
    } catch (error) {
      const errorMessage = handleError(error);
      toast.error(errorMessage);
    }
  };
  return (
    <div className={`fixed inset-0 z-0 bg-B2 text-white p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:hidden overflow-y-scroll`}>
      <div className="text-xl font-bold mb-4 mt-5 p-3">TuneBox</div>
      <nav className="flex flex-col p-4 space-y-4">

        <div className='bg-[#121212] flex flex-col gap-3 py-2 rounded-md '>
          <span className="p-3 rounded  mx-auto ">
            <svg data-encore-id="icon" className='w-10' role="img" aria-hidden="true" class="Svg-sc-ytk21e-0 bneLcE home-active-icon QbaKKdcHNA2x3_YJvpYu" viewBox="0 0 24 24">
              <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z" fill="white"></path>
            </svg>
            <span className='text-center'>Home</span>
          </span>

          <button onClick={handileAddComp} className='p-2 rounded mx-auto w-18'>
            <svg data-encore-id="icon" className='w-9 mx-auto' role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" fill='white'></path></svg>
            <span className='text-center'>Add Music</span>
          </button>
          <div className='w-full py-2' onClick={handleLogout}>
            <div className='bg-[#121212] rounded-full mx-auto p-1 text-center'>
              <button id="dropdownDefaultButton" data-dropdown-placement="right" data-dropdown-toggle="dropdown" className='bg-green-500 font-F2 font-bold text-[#121212]  rounded-full mx-auto p-2 w-10 text-center h-10 uppercase'>
                {user[0]}
              </button>
            </div>
            <p className='text-center font-semibold'>Logout</p>
          </div>
        </div>

        <hr className='mx-5' />

        <div className={`${isAdd ? "flex" : "hidden"} `} >

          <>

            {musicData == null ?

              <form className="p-4 md:p-5 w-full" onSubmit={handleFindMusic}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Youtube URL
                    </label>
                    <input
                      type="text" value={link} onChange={(e) => setLink(e.target.value)}
                      className="bg-gray-900 border border-gray-300 text-gray-50 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                      placeholder="paste your Link here"
                    />
                  </div>

                </div>
                <button
                  type="submit"
                  className="text-gray-900 font-bold inline-flex items-center bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  <p className='w-5 mx-2 '><svg data-encore-id="icon" role="img" aria-hidden="true" class="Svg-sc-ytk21e-0 bneLcE search-icon QbaKKdcHNA2x3_YJvpYu" viewBox="0 0 24 24"><path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z" fill='black'></path></svg></p>
                  Find Music
                </button>
              </form>
              :

              <div className='p-5'>
                <div className="  rounded-lg shadow">

                  <img className="rounded-t-lg w-full" src={musicData.thumbnailUrl} alt="" />

                  <div className="py-1">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {musicData.title}
                      </h5>
                    </a>
                    <button
                      onClick={addMusic}
                      className="text-gray-900 w-full font-bold items-center bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Add to My Box
                    </button>
                    <button type="submit" onClick={handileAddComp}
                      className="text-gray-50 mt-1 w-full  items-center border-1 hover:border-0   hover:bg-green-600  rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Not now
                    </button>


                  </div>
                </div>

              </div>
            }
          </>
        </div>



      </nav>




      <button
        id="sidebarToggle"
        className="md:hidden  rounded-md p-3  bg-gray-800/50 m-3 text-white fixed top-0 left-0"
        onClick={() => setIsSidebarOpen(!isOpen)}
      >
        <IoCloseSharp size={18} />
      </button>
    </div>
  );
}

export default MobileSidebar;
