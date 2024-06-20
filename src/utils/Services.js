import axios from "axios";


export async function getYoutubeMusicDetails(youtubeLink) {
    if (!isValidYoutubeLink(youtubeLink)) {
      return {status: false, error: "Invalid YouTube link"};
    }
    
    const videoId = youtubeLink.split('v=')[1];
    const apiKey = import.meta.env.VITE_YOUTUBE_API;
    
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`;
    
    try {
      const response = await axios.get(apiUrl);
      const videoDetails = response.data.items[0];
      
      if (!isMusicCategory(videoDetails.snippet.categoryId)) {
        return {status: false, error: "Video is not in the music category"};
      }
      
      const duration = videoDetails.contentDetails.duration;
      const formattedDuration = formatDuration(duration);
      
      // Convert duration to seconds
      const durationInSeconds = parseDuration(duration);
      
      const musicDetails = {
        title: videoDetails.snippet.title,
        singers: videoDetails.snippet.channelTitle,
        duration: formattedDuration,
        url: youtubeLink,
        startTime: 0,
        endTime: durationInSeconds, // Set endTime to the total duration in seconds
        thumbnailUrl: videoDetails.snippet.thumbnails.medium.url,
        language: videoDetails.snippet.defaultAudioLanguage || "Unknown"
      };
      
      return {status: true, data: musicDetails};
    } catch (error) {
      return {status: false, error: "Error fetching video details"};
    }
  }
  
  // Helper function to parse duration from ISO 8601 format to seconds
  function parseDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);
    
    return hours * 3600 + minutes * 60 + seconds;
  }
  
  function formatDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? parseInt(match[1].replace('H', '')) : 0;
    const minutes = match[2] ? parseInt(match[2].replace('M', '')) : 0;
    const seconds = match[3] ? parseInt(match[3].replace('S', '')) : 0;
  
    return `${hours > 0 ? hours + ':' : ''}${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
  
  // Check if the link is a valid YouTube link
  function isValidYoutubeLink(link) {
    return /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm.test(link);
  }
  
  // Check if the video is in the music category
  function isMusicCategory(categoryId) {
    return categoryId === '10';
  }

