import React from 'react'

const Footer = () => {
  return (
    
<footer className=" rounded-lg  m-4 break-inside-avoid w-full border border-gray-300 bg-white/20 bg-clip-padding backdrop-blur-lg backdrop-filter">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between leading-3">
      <span className="font-readex font-normal text-xs text-gray-500 sm:text-center ">© 2023 <a href="https://flowbite.com/" className="hover:underline">Ensahny™</a>. <br /> This website is designed and developed by <a class="font-normal text-blue-600 dark:text-blue-500 hover:underline" target='_blank' href='https://www.yousefgilany.com/'>Yousef Gilany</a>.
    </span>
    {/* <ul className="flex flex-wrap items-center mt-3 text-xs font-normal text-gray-500  sm:mt-0">
        <li>
            <a href="/favourites" className="font-readex mr-4 hover:underline md:mr-6 ">المفضلة</a>
        </li>
        <li>
            <a href="/leaderboard" className="font-readex mr-4 hover:underline md:mr-6">لوحة الشرف</a>
        </li>
        <li>
            <a href="#" className=" font-readex mr-4 hover:underline md:mr-6">الترخيص</a>
        </li>
        <li>
            <a href="#" className="font-readex  hover:underline">للتواصل</a>
        </li>
    </ul> */}
    </div>
</footer>

  )
}

export default Footer