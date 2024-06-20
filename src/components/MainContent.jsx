import React, { useEffect } from 'react';
import { FaPause, FaPlay } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";
function MainContent({
  onTrackSelect,
  isPlaying,
  setIsPlaying,
  selectedTrack,
  tracks,
}) {


  const handlePlayPauseClick = () => {
    if (selectedTrack) {
      setIsPlaying(!isPlaying); // Toggle play/pause
    } else {
      // No track selected, play the first track
      onTrackSelect(tracks[0]);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#5038A0] to-[#000000] flex-grow overflow-y-auto p-4">
      <div className='flex mt-10 mx-10'>
        <div><img className='w-20' src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="" /></div>
        <div className='h-32 '>
          <h1 className='text-6xl my-auto text-TW1  mx-8'>Songs</h1>
        </div>
      </div>
      {/* <h1 className="text-2xl font-bold mb-4 text-TW1">Good afternoon</h1> */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-10">
        <div className="bg-gray-200 p-4 rounded">UrduNama</div>
        <div className="bg-gray-200 p-4 rounded">Conversations with Tyler</div>
        <div className="bg-gray-200 p-4 rounded">Lenny's Podcast</div>
       
      </div>
      <h2 className="text-xl font-bold mt-8 mb-4">Episodes for you</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-200 p-4 rounded">Episode 1</div>
        <div className="bg-gray-200 p-4 rounded">Episode 2</div>
        <div className="bg-gray-200 p-4 rounded">Episode 3</div>
       
      </div> */}


      <div className="flex items-center w-full p-4 justify-between mb-4 ">
        <button
          className="bg-green-500 rounded-full  p-3"
          onClick={handlePlayPauseClick}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <div className="flex space-x-4 text-white ">
          {/* <div> */}
          <p>List</p>
          <p><CiCircleList size={25} /></p>
          {/* </div> */}

        </div>
      </div>
      <div className="!overflow-auto pb-32 mx-6 custom-scrollbar">
        <table className="w-full text-left text-white">
          <thead className="md:text-2xl text-xl border-b sticky bg-gray-900 top-0 border-gray-700 ">
            <tr>
              <th className="p-4 hidden md:table-cell">#</th>
              <th className="p-4">Title</th>
              <th className="p-4">Singers</th>
              <th className="p-4 hidden md:table-cell">Language</th>
              <th className="p-4">Duration</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track) => (
              <tr
                key={track.id}
                className={`border-b text-sm border-gray-700 hover:bg-gray-700 hover:cursor-pointer
          ${selectedTrack && selectedTrack.id === track.id
                    ? "bg-gray-900"
                    : ""
                  } `}
                onClick={() => onTrackSelect(track)}
              >
                <td className="p-4 hidden md:table-cell">{track.id}</td>
                <td className="p-4 hover:underline">{track.title}</td>
                <td className="p-4 hover:underline">{track.singers}</td>
                <td className="p-4 hidden md:table-cell">{track.language}</td>
                <td className="p-4">{track.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default MainContent;
