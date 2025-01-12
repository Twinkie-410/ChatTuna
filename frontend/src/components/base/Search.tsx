function Search() {
    return(
    <form className="flex flex-row bg-[#D9D9D9] rounded-md align-middle max-w-[360px] w-[360px] h-[50px]">
        <button type="submit" className="px-[8px] flex items-center">
            <svg width="37" height="35" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27.4811 21.1313C23.4858 24.6146 16.9417 24.5973 12.8644 21.0425C8.78707 17.4877 8.76721 11.7822 12.7626 8.29889C16.7579 4.81554 23.302 4.83286 27.3793 8.38767C31.4566 11.9425 31.4765 17.6479 27.4811 21.1313Z" stroke="#97989A" stroke-width="3"/>
    <line y1="-1.5" x2="15.6622" y2="-1.5" transform="matrix(-0.753752 0.657159 -0.753752 -0.657159 11.8057 21.8184)" stroke="#97989A" stroke-width="3"/>
            </svg>

        </button>
        <input className="text-black bg-[#D9D9D9] pl-[5px] outline-none py-[4px] rounded-md" type="search"  placeholder="Поиск"/>
    </form> 
    )
}

export default Search