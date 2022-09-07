import Head from "next/head";
import LatestBlog from "../components/blog/LatestBlog";
import { useEffect, useState } from "react";
import { HiArrowNarrowDown } from "react-icons/hi";
import Footer from "../components/layout/Footer";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const scrollFunc = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", scrollFunc);
    return () => {
      window.removeEventListener("scroll", scrollFunc);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Curatify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img className="w-screen h-screen" src="/bannar.jpg" alt="Curatigy" />

      <HiArrowNarrowDown
        className={
          scrollY === 0
            ? "absolute bottom-4 left-1/2 z-10 invert text-3xl animate-bounce"
            : "invisible"
        }
      />

      <div className="relative">
        <img src="/meter.jpg" className="w-screen h-screen opacity-30" />
        <div className="absolute top-52 left-72 text-white w-1/2">
          <h1 className="font-bold text-3xl text-center">Welcome To Curatify</h1>
          <p className="mt-5 text-base">
            We are fond of cars like you and we love to give you the best review
            of all the cars that we get to experience hands-on.
          </p>
        </div>
      </div>

      <LatestBlog />

      <div className="place-content-center mt-20">
        <Footer />
      </div>
    </div>
  );
}
