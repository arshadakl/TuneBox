import React from 'react';

function Sidebar() {
  return (
    <div className="hidden md:flex md:w-43 bg-[#000] text-white flex-shrink-0">
      <nav className="flex flex-col p-4 space-y-4">
        <div className="text-2xl font-bold mb-4 ">TuneBox</div>

        <div className='bg-[#121212] flex flex-col gap-3 py-2 rounded-md '>
        <p className="p-2 rounded w-10 mx-auto">
          <svg data-encore-id="icon" role="img" aria-hidden="true" class="Svg-sc-ytk21e-0 bneLcE home-active-icon QbaKKdcHNA2x3_YJvpYu" viewBox="0 0 24 24">
            <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z" fill="white"></path>
          </svg>
        </p>
        <p className='p-2 w-10 mx-auto'>
        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z" fill='white'></path></svg>
        </p>
        </div>
        
      <p className='w-10 border-2 rounded-full p-2 mx-auto'>
      <svg viewBox="0 0 1024 1024" aria-label="Profile" class="svelte-8gzfq1"><title>Profile</title><path d="M730.06 679.64q-45.377 53.444-101.84 83.443t-120 29.999q-64.032 0-120.75-30.503t-102.6-84.451q-40.335 13.109-77.645 29.747t-53.948 26.722l-17.142 10.084Q106.388 763.84 84.96 802.41t-21.428 73.107 25.461 59.242 60.754 24.705h716.95q35.293 0 60.754-24.705t25.461-59.242-21.428-72.603-51.679-57.225q-6.554-4.033-18.907-10.84t-51.427-24.453-79.409-30.755zm-221.84 25.72q-34.285 0-67.561-14.873t-60.754-40.335-51.175-60.502-40.083-75.124-25.461-84.451-9.075-87.728q0-64.032 19.915-116.22t54.452-85.964 80.67-51.931 99.072-18.151 99.072 18.151 80.67 51.931 54.452 85.964 19.915 116.22q0 65.04-20.167 130.58t-53.948 116.72-81.426 83.443-98.568 32.268z" fill='white'></path></svg>

      </p>
      </nav>
    </div>
  );
}

export default Sidebar;
