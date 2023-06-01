import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center font-readex font-bold leading-6">سيب نصيحتك للناس
        </h1>
        <h1 className="h-16 mt-5 text-4xl  leading-[1.15] sm:text-5xl text-center font-readex font-bold leading-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">        
    و خليها تتعمل

        </h1>

        <p className="text-center desc font-readex font-light"> 
        انضم لينا النهارده وشارك معانا نصيحتك عشان تبقى سبب إلهام للناس وتساهم في تحسين حياتهم. ممكن تقرا النصائح، تشارك تجاربك، وتستفيد من حكمة الناس اللي حواليك.
        </p>

        <Feed />
       
    </section>
  )
}

export default Home