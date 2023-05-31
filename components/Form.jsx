import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
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
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            className="form_input"
            placeholder="قم بإضافة وسم لنصيحتك"
            required
          ></input>
        </label>
        <div class="flex-end  mb-4">
          <label
            for="default-checkbox"
            class="font-readex font-semibold text-base text-gray-700"
          >
            {" "}
            اجعل ظهوري مخفياً
          </label>
          <input
            id="default-checkbox"
            type="checkbox"
            checked={post.is_hidden}
            onChange={(e) => setPost({ ...post, is_hidden: e.target.checked })}
            class="w-4 h-4 mx-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm font-readex">
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
