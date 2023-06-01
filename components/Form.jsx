"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [selectedValue, setSelectedValue] = useState("");

  console.log("post", post);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const arabicCategories = [
    "النجاح والتطوير الشخصي",
    "الصحة والعافية",
    "العلاقات والزواج",
    "التعليم والتطوير العلمي",
    "الوظائف والتوظيف",
    "الأسرة والتربية",
    "الشباب والمراهقة",
    "الثقافة والفنون",
    "الرياضة واللياقة البدنية",
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
  return (
    <section className="w-full max-w-full  flex-col float-right">
      <h1 className="head_text text-right"> {type} </h1>
      <p className="text-right font-readex mt-4 text-gray-500">
        أضف نصيحة لغيرك
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-10 max-w-2xl flex gap-7 glassmorphism flex-col float-right "
      >
        <label className="flex items-end flex-col">
          <span className="font-readex font-semibold text-base text-gray-700 text-right">
            محتوى نصيحتك{" "}
          </span>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            className="form_textarea min-h-[100px]"
            placeholder="قم بإضافة نصيحتك هنا"
            required
          ></textarea>
        </label>
        <label className="flex items-end flex-col">
          <span className="font-readex font-semibold text-base text-gray-700">
            وسم
          </span>
          
          <input
          // limit the tag to 1 word
            type="text"

            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            className="form_input "
            placeholder="قم بإضافة وسم لنصيحتك"
            required
          ></input>
        </label>
        <label className="flex items-end flex-col">
          <span className="font-readex font-semibold text-base text-gray-700">
            فئة
          </span>
          <select
            required
            className="form_input"
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
          >
            {
              // default value is the first element of the array
              <option
                disabled
                selected
                value=""
              >
                قم بإضافة فئة لنصيحتك. فيما تتعلق هذه النصيحة؟
              </option>
            }
            {arabicCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <div className="flex-end  mb-4">
          <label
            htmlFor="default-checkbox"
            className="font-readex font-semibold text-base text-gray-700"
          >
            {" "}
            اجعل ظهوري مخفياً
          </label>
          <input
            id="default-checkbox"
            type="checkbox"
            checked={post.is_hidden}
            onChange={(e) => setPost({ ...post, is_hidden: e.target.checked })}
            className="w-4 h-4 mx-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="flex-end mx-3 mb-5 gap-4">
          
          <Link href={`/profile/${post?.creator._id}`} className="text-gray-500 text-sm font-readex">
            
            إلـــغــــــــــــــــــاء
          </Link>
          <button type="submit" className="black_btn" disabled={submitting}>
            {submitting ? "جاري الإضافة ..." : `${type}`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
