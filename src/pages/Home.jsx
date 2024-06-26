import { useEffect, useState } from 'react'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import MusicPlayer from '../components/MusicPlayer';
import MainContent from '../components/MainContent';
import MobileSidebar from '../components/MobileSidebar';
import { _getPlaylist } from '../utils/API';
import { handleError } from '../utils/errorHandler';
import { IoMdMenu } from 'react-icons/io';


function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks,setTracks] = useState([])

  const fetchPLaylist = async()=>{
    try {
      const response = await _getPlaylist()
      if(response.success){
        setTracks(response.music)
      }
    } catch (error) {
      const errorMessage = handleError(error);
      toast.error(errorMessage)
    }
  }
  useEffect(() => {
    fetchPLaylist()
  }, [])
  

  // const tracks = [
  //   {
  //     "id": 1,
  //     "title": "Sita Kalyana",
  //     "singers": " AKHIL J CHAND, AKHILA ANAND",
  //     "duration": "2:20",
  //     "url": "https://www.youtube.com/watch?v=L8SE_bjd1V4",
  //     "startTime": 6,
  //     "endTime": 140,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 2,
  //     "title": "Mylanchi Monchulla Veedu",
  //     "singers": "Anwar Sadat,Rimi Tomy & Yazin Nisar",
  //     "duration": "4:37",
  //     "url": "https://www.youtube.com/watch?v=MXCvBGEvj4k",
  //     "startTime": 0,
  //     "endTime": 276,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 3,
  //     "title": "JIL JIL JIL-Sulaikha Manzil ",
  //     "singers": "Vishnu Vijay, Varsha Renjith, Meera Prakash",
  //     "duration": "5:33",
  //     "url": "https://www.youtube.com/watch?v=C7rJZjB6u7w",
  //     "startTime": 0,
  //     "endTime": 333,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 4,
  //     "title": "JILLAM JILLALA HONEYBEE 2 ",
  //     "singers": "Afsal,Rimi Tomy,Anwar",
  //     "duration": "4:14",
  //     "url": "https://www.youtube.com/watch?v=7Rv0Pi8eLUU",
  //     "startTime": 0,
  //     "endTime": 248.4,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 5,
  //     "title": "Thudakam Mangalyam ",
  //     "singers": "Vijay Yesudas, Sachin Warrier, Divya S. Menon",
  //     "duration": "3:49",
  //     "url": "https://www.youtube.com/watch?v=a3UNpjnYquI",
  //     "startTime": 0,
  //     "endTime": 229,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 6,
  //     "title": "Olam Up ",
  //     "singers": " Anarkali Marikkar, Dabzee, Jahaan ",
  //     "duration": "3:11",
  //     "url": "https://www.youtube.com/watch?v=A8hbw3-D610",
  //     "startTime": 0,
  //     "endTime": 192,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 7,
  //     "title": "Neela Nilave",
  //     "singers": " Kapil Kapilan ",
  //     "duration": "4.08",
  //     "url": "https://www.youtube.com/watch?v=nYEoxne_20Y",
  //     "startTime": 14,
  //     "endTime": 244.8,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 8,
  //     "title": "Uyyaram Payyaram",
  //     "singers": " Zia Ul Haq ",
  //     "duration": "4.08",
  //     "url": "https://www.youtube.com/watch?v=kYDMYNYHMRE",
  //     "startTime": 7,
  //     "endTime": 215,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 9,
  //     "title": "Rasoolallah - Salala Mobiles",
  //     "singers": " Gopi Sundar, Mohammed Maqbool Mansoor ",
  //     "duration": "5:33",
  //     "url": "https://www.youtube.com/watch?v=UsnYe_cseNA",
  //     "startTime": 0,
  //     "endTime": 333,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 10,
  //     "title": "Kolussu Thenni Thenni- Cousins",
  //     "singers": " Shreya Ghoshal, Yazin Nizar,Tippu ",
  //     "duration": "4:32",
  //     "url": "https://www.youtube.com/watch?v=xpOFOm_8I6Q",
  //     "startTime": 3,
  //     "endTime": 333,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 11,
  //     "title": "Manathe - Bus Conductor",
  //     "singers": " Rimi Tomy & Madhu Balakrishnan",
  //     "duration": "3:19",
  //     "url": "https://www.youtube.com/watch?v=c-KdeJN-YcI",
  //     "startTime": 0,
  //     "endTime": 199,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 12,
  //     "title": "Ajjappamada",
  //     "singers": " Hanan Shah, Badusha B.M, Salman S.V, Dana Razik ",
  //     "duration": "4:27",
  //     "url": "https://www.youtube.com/watch?v=50cvWS23Zt8",
  //     "startTime": 0,
  //     "endTime": 267,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 13,
  //     "title": "Kande Njanaakaashathoru",
  //     "singers": " Hesham Abdul Wahab, NadirShah & Muhammed Anas ",
  //     "duration": "4:27",
  //     "url": "https://www.youtube.com/watch?v=_TkJ-FubFJA",
  //     "startTime": 0,
  //     "endTime": 0,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 14,
  //     "title": "Kizhakku Pookkum",
  //     "singers": " Shreya Ghoshal, Sabari Brothers, Raqueeb Alam, Naveen Iyer  ",
  //     "duration": "3:32",
  //     "url": "https://www.youtube.com/watch?v=YrLRhuim5aM",
  //     "startTime": 0,
  //     "endTime": 212,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 15,
  //     "title": "Aa Oruthi - Anarkali",
  //     "singers": " Vineeth Sreenivasan | Manjari ",
  //     "duration": "3:32",
  //     "url": "https://www.youtube.com/watch?v=lbMgP5or1qc",
  //     "startTime": 0,
  //     "endTime": 212,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 16,
  //     "title": "Kettille Kettille- Pokiri Raja",
  //     "singers": " Vijay Yesudas, Anwar Sadath, Rijiya ",
  //     "duration": "3:19",
  //     "url": "https://www.youtube.com/watch?v=Zz4cKwwarpg",
  //     "startTime": 0,
  //     "endTime": 199,
  //     "language": "Malayalam"
  //   },
  //   {
  //     "id": 17,
  //     "title": "Gujarathi Kaalthala",
  //     "singers": " Vidhu Prathap, Jyotsna",
  //     "duration": "5:20",
  //     "url": "https://www.youtube.com/watch?v=WjdGTHc9ccI",
  //     "startTime": 0,
  //     "endTime": 0,
  //     "language": "Malayalam"
  //   }
  
  // ]
  
  return (
    <div className="flex flex-col h-screen bg-gray-950">
      <div className="flex h-full">
        <Sidebar updateData={fetchPLaylist} />
        <MainContent 
        onTrackSelect={setSelectedTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        selectedTrack={selectedTrack}
        tracks={tracks}
        />
      </div>
      <MusicPlayer 
       setSelectedTrack={setSelectedTrack}
       selectedTrack={selectedTrack}
       isPlaying={isPlaying}
       setIsPlaying={setIsPlaying}
       tracks={tracks}
      />
      <button 
        id="sidebarToggle" 
        className="md:hidden  rounded-md p-3  bg-gray-800/50 m-3 text-white fixed top-0 left-0"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <IoMdMenu size={18}/>
      </button>
      <MobileSidebar setIsSidebarOpen={setIsSidebarOpen} updateData={fetchPLaylist} isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
    </div>
  );
}

export default Home
