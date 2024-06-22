import { initFlowbite } from 'flowbite';
import React, { useEffect, useRef, useState } from 'react';
import { getYoutubeMusicDetails } from '../utils/Services';
import { toast } from 'sonner';
import { _addMusic, _logout } from '../utils/API';
import { handleError } from '../utils/errorHandler';
import { useNavigate } from 'react-router-dom';
import { getUsername, removeToken, removeUsername } from '../utils/tokenService';

function Sidebar({updateData}) {
  const navigate = useNavigate()
  const crudModalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [link, setLink] = useState("")
  const [musicData, setMusicData] = useState(null)
  const [user,setUser] = useState("P")
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
    }else{
      toast.warning(details.error)
    }
    // console.log(details);
  }


  const handleLogout = async()=>{
    try {
      const response = await _logout()
    if(response.success){
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


  const closeModal = ()=>{
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
  }

  const addMusic = async () => {
    try {
      if (musicData == null) return;
      const response = await _addMusic(musicData);
      if (response.success) {
        toast.success(response.message);
        // Close the modal
        closeModal()
        updateData()
        // Reset the state or perform any other necessary actions
        setMusicData(null);
        setLink('');
      }
    } catch (error) {
      const errorMessage = handleError(error);
      toast.error(errorMessage);
    }
  };
  return (
    <div className="hidden md:flex flex-col md:w-auto bg-[#000]  text-white flex-shrink-0 rounded-md">
      <div className="text-xl font-bold mb-4 p-3">TuneBox</div>
      <nav className="flex flex-col p-4 space-y-4">

        <div className='bg-[#121212] flex flex-col gap-3 py-2 rounded-md '>
          <p className="p-2 rounded w-9 mx-auto">
            <svg data-encore-id="icon" role="img" aria-hidden="true" class="Svg-sc-ytk21e-0 bneLcE home-active-icon QbaKKdcHNA2x3_YJvpYu" viewBox="0 0 24 24">
              <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z" fill="white"></path>
            </svg>
          </p>
          <button  className='p-2 w-9 mx-auto' data-modal-target="crud-modal" data-modal-toggle="crud-modal">
            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" fill='white'></path></svg>
          </button>
          
          
        </div>
        <div className='bg-[#121212] rounded-full mx-auto p-1 text-center'>

        <button id="dropdownDefaultButton" data-dropdown-placement="right" data-dropdown-toggle="dropdown" className='bg-green-500 font-F2 font-bold text-[#121212]  rounded-full mx-auto p-2 w-10 text-center h-10 uppercase'>
           {user[0]}
          </button>
        </div>


        <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      
      <li>
        <p onClick={handleLogout} class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</p>
      </li>
    </ul>
</div>

        {/* <p className='w-10 border-2 rounded-full p-2 mx-auto'>
          <svg viewBox="0 0 1024 1024" aria-label="Profile" class="svelte-8gzfq1"><title>Profile</title><path d="M730.06 679.64q-45.377 53.444-101.84 83.443t-120 29.999q-64.032 0-120.75-30.503t-102.6-84.451q-40.335 13.109-77.645 29.747t-53.948 26.722l-17.142 10.084Q106.388 763.84 84.96 802.41t-21.428 73.107 25.461 59.242 60.754 24.705h716.95q35.293 0 60.754-24.705t25.461-59.242-21.428-72.603-51.679-57.225q-6.554-4.033-18.907-10.84t-51.427-24.453-79.409-30.755zm-221.84 25.72q-34.285 0-67.561-14.873t-60.754-40.335-51.175-60.502-40.083-75.124-25.461-84.451-9.075-87.728q0-64.032 19.915-116.22t54.452-85.964 80.67-51.931 99.072-18.151 99.072 18.151 80.67 51.931 54.452 85.964 19.915 116.22q0 65.04-20.167 130.58t-53.948 116.72-81.426 83.443-98.568 32.268z" fill='white'></path></svg>

        </p> */}
        
      </nav>



      <div  id="crud-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50"></div>

        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-[#000] ">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                Import music to Your Box
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal" ref={closeButtonRef}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}


            <>

              {musicData == null ?

                <form className="p-4 md:p-5" onSubmit={handleFindMusic}>
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
                      <button onClick={closeModal} type="submit"  
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
        </div>
      </div>



    </div>
  );
}

export default Sidebar;
