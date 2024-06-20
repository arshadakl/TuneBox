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
    <div className="flex flex-col bg-gradient-to-b from-[#5038A0] to-[#000000] flex-grow overflow-y-auto ">
      <div className='flex mt-10 mx-10'>
        <div><img className='w-20' src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="" /></div>
        <div className='h-32 '>
          <h1 className='text-7xl my-auto text-TW1/70 font-F1 mx-8 font-extrabold'>PlayBox</h1>
        </div>
      </div>
  


      <div className='bg-[#000000]/20 h-full'>


        <div className="flex items-center w-full p-4  justify-between mb-4 ">
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
            <thead className="md:text-xl text-xl border-b sticky bg-gray-900/40 top-0 border-gray-700 ">
              <tr>
                <th className="p-4 hidden md:table-cell">#</th>
                <th className="p-4">Title</th>
                <th className="p-4 hidden md:table-cell"></th>
                <th className="p-4">Singers</th>
                {/* <th className="p-4 hidden md:table-cell">Language</th> */}
                <th className="p-4">Duration</th>
              </tr>
            </thead>
            <tbody>
              {tracks?.map((track) => (
                <tr
                  key={track._id}
                  className={`border-b text-sm border-gray-700 hover:bg-gray-700 hover:cursor-pointer
          ${selectedTrack && selectedTrack._id === track._id
                      ? "bg-gray-900"
                      : ""
                    } `}
                  onClick={() =>{ onTrackSelect(track);console.log(track);}}
                >
                  <td className="p-4 hidden md:table-cell">{1}</td>
                  <td className="p-4 hidden md:table-cell">
                    <img src={track.thumbnailUrl} alt="Cover" className="w-auto h-10 mr-4" />
                    </td>
                  <td className="p-4 hover:underline">{track.title}</td>
                  <td className="p-4 hover:underline">{track.singers}</td>
                  {/* <td className="p-4 hidden md:table-cell">{track.language}</td> */}
                  <td className="p-4">{track.duration}</td>
                </tr>
              ))}

            </tbody>

          </table>
          {tracks.length == 0 &&
            <div className='text-center w-full text-white/30 mt-5 font-F1 font-semibold text-xl '>No Music in you Play Box</div>
          }
        </div>
      </div>

    </div>
  );
}

export default MainContent;
