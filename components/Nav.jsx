"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Profiler } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [Providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setNewProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    setNewProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <a href="/" className="flex gap-2 flex-center">
        {/* <Image
          src="/assets/images/logo.svg"
          width={40}
          height={40}
          alt="logo"
          className="object-contain text-green-400"
          // color it with css

        /> */}
        <p className="h-12 font-bold font-readex text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 ">
          إنصحني
        </p>
      </a>

      {/* DESKTOP */}
      <div className=" sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-2 md:gap-2">
            <button
              className="light_btn text-red-500"
              type="button"
              onClick={() =>  signOut({
                callbackUrl: `${window.location.origin}`
              })}
            >
              تسجيل الخروج
            </button>
            <Link href="/leaderboard" className="light_btn font-readex">
            زاوية النصائح القيِّمة            </Link>
            <Link href="/favourites" className="light_btn font-readex ">
            نصائحي المفضلة
            </Link>

            <Link href="/create-post" className="black_btn font-readex">
              أضف نصيحة
            </Link>
            <Link href={`/profile/${session?.user.id}`}>
              <Image
                src={session?.user?.image}
                width={30}
                height={30}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {Providers &&
              Object.values(Providers).map((provider, index) => (
                <button
                  key={index}
                  type="button"
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  تسجيل الدخول
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-post" className="black_btn font-readex">
              أضف نصيحة
              </Link>

              {/* <Link href="/profile"> */}
              <Image
                src={session?.user?.image}
                width={30}
                height={30}
                alt="profile"
                className="rounded-full"
                onClick={() => setToggleDropdown((prev) => !prev)}
              />
              {/* </Link> */}
            </div>
            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/" className="dropdown_link">
                  الصفحة الرئيسية
                </Link>
                <Link
                  href={`/profile/${session?.user.id}`}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  بروفايلي
                </Link>
                <Link
                  href="/create-post"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  أضف نصيحة
                </Link>
                <Link href="/favourites" className="dropdown_link">
                  نصائحي المفضلة
                </Link>
                <Link
                  href="/leaderboard"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
زاوية النصائح القيِّمة                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut({
                      callbackUrl: `${window.location.origin}`
                    });
                    
                  }}
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {Providers &&
              Object.values(Providers).map((provider, index) => (
                <button
                  key={index}
                  type="button"
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  تسجيل الدخول
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
