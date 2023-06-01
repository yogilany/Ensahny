"use client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@styles/globals.css";
import { useState, useEffect } from "react";
import PostCardList from "./PostCardList";
import { set } from "mongoose";

const Feed = () => {
  const notify = () => {

    toast.success("تم نسخ النصيحة.", {
      position: toast.POSITION.BOTTOM_RIGHT,
      toastClassName: 'my-custom-toast',
      bodyClassName: ' font-readex rtl_direction text-xs  ',
      autoClose: 3000, // Close the toast after 3 seconds
      theme: "colored"


    });


  

  };

  const [posts, setPosts] = useState([]);
  const [tagClicked, setTagClicked] = useState(false);
  const [categoryClicked, setCategoryClicked] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [tagQuery, setTagQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setCategoryQuery("")

    } else {
      setSelectedCategory(category);
      setCategoryQuery(category)
    }
  };

  const arabicCategories = [
    "التطوير الشخصي",
    "الصحة والعافية",
    "العلاقات والزواج",
    "التعليم والتطوير",
    "الوظائف والتوظيف",
    "الأسرة والتربية",
    "الشباب والمراهقة",
    "الثقافة والفنون",
    "الرياضة واللياقة ",
    "التكنولوجيا والابتكار",
    "السفر والسياحة",
    "الدين والروحانية",
    "التغذية والطهي",
    "الاستدامة والبيئة",
    "الاستثمار والمالية",
    "الفعاليات والتنظيم",
    "الإدارة والقيادة",
    "الذات والتأمل",
    "الفنون الإبداعية",
    "الأدب والكتابة",
  ];

  function handleSearchChange(e) {
    e.preventDefault();
    setSearchQuery(e.target.value);
    // setFilteredPosts(posts.filter(post => post.content.includes(e.target.value) || post.tag.includes(e.target.value)))
  }

  function handleCategoryClick(e) {
    if (categoryClicked) {
      setCategoryQuery("");
      setCategoryClicked(false);
      return;
    }
    setCategoryQuery(e);
    setCategoryClicked(true);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      
        setLoading(true);
        var url = "/api/post";

        var params = {
          param: searchQuery,
          tag: categoryQuery,
          category: categoryQuery
        };
        
        // Convert the parameters object to a query string
        var queryString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
        
        // Append the query string to the URL
        url = url + '?' + queryString;

      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);
      setPosts(data);
      setLoading(false);


    };
    fetchPosts();
    console.log("Feed mounted");
    

  }, [searchQuery, tagQuery, categoryQuery, ]);

  return (<>
    <section className="mt-16 mx-auto w-full  max-w-6xl flex justify-center items-center flex-col gap-2">
      <form className="relative w-full max-w-2xl flex-center">
        <input
          type="text"
          placeholder="بحث"
          className="search_input peer "
          required
          onChange={handleSearchChange}
        />
      </form>

<div className="flex flex-row  items-center text-sm font-medium text-center text-gray-500  border-gray-200 dark:text-gray-400 dark:border-gray-700">
<svg fill="none" className="w-4 h-4  mx-2" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"></path>
</svg>
    <div className="overflow-x-scroll  overflow-y-hidden max-w-xs  sm:max-w-md md:max-w-xl  lg:max-w-4xl">
  
    <ul className="flex flex-nowrap -mb-px">
      
      {arabicCategories.map((category) => (
        <li className="mr-2 w-auto" key={category}>
          <button
            className={`font-normal text-gray-500 text-xs font-readex inline-block p-4 border-b-4 border-transparent rounded-t-lg hover:text-gray-800 hover:border-gray-300 ${
              selectedCategory === category ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400  border-red-300   border-b-2 " : ""
            }`}
            onClick={() => handleClick(category)}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
    </div>
    <svg fill="none" className="w-4 h-4 mx-2"  stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"></path>
</svg>
</div>

<div>

<p className="text-center desc font-readex font-light"> 
{tagClicked && <span style={{direction: "ltr"}} id="badge-dismiss-dark" class="inline-flex items-center px-2 py-1.5 text-xs font-light text-pink-800 bg-pink-100 rounded mx-2 ">
{tagClicked ? tagQuery : null}

  <button onClick={() => {

    setTagClicked(false)
    setTagQuery("")

  }} type="button" class="inline-flex items-center p-0.5 ml-2 text-sm text-pink-400 bg-transparent rounded-sm hover:bg-pink-200 hover:text-pink-900" data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
      <svg aria-hidden="true" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      <span class="sr-only">Remove badge</span>
  </button>
</span>}

{ categoryClicked && <span style={{direction: "ltr"}} id="badge-dismiss-dark" class="inline-flex items-center px-2 py-1.5 text-xs font-light text-blue-800 bg-blue-100 rounded  mx-2">
{categoryClicked ? categoryQuery : null}

<button onClick={() => {
  setCategoryClicked(false)
  setCategoryQuery("")
}} type="button" class="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900" data-dismiss-target="#badge-dismiss-dark" aria-label="Remove">
      <svg aria-hidden="true" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      <span class="sr-only">Remove badge</span>
  </button>
</span>}


        </p>
        <p className="text-center desc font-readex font-light"> 






        </p>

  
</div>


      {loading ? (
        <>
        
        <div role="status" className=" flex-1 mt-8  text-center   break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-12  backdrop-blur-lg backdrop-filter  w-full h-fit">
          <svg
            aria-hidden="true"
            className="inline w-24 h-24 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        </>
      ) : (
        <PostCardList
          posts={posts}
          notify={notify}
          handleTagClick={(e) => {
            if (tagClicked) {
              setTagQuery("");
              setTagClicked(false);
              return;
            }
            setTagQuery(e);
            setTagClicked(true);
          }}
          handleCategoryClick={handleCategoryClick}
        />
      )}

    </section>
    <ToastContainer />

    </>
  );
};

export default Feed;
