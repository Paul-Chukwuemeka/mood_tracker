"use client";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/header";
import { moodsValues } from "@/constants";
import { appContext } from "@/contexts/appcontext";
import Newlog from "@/components/new_log";
import Image from "next/image";
import Chart from "@/components/chart";

export function convertDate(dateString: string, format?: string | undefined) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: format == "short" ? "short" : "long",
    year: "numeric",
    month: format == "short" ? "short" : "long",
    day: "2-digit",
  };
  return date.toLocaleDateString("en-us", options).replace(/\b(\d+)\b/, (d) => {
    const n = +d;
    const suffix =
      n > 3 && n < 21 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th";
    return n + suffix;
  });
}

export default function Home() {
  const { data: session } = useSession();
  const { currentMood, moods, logged, loading } =
    useContext(appContext);

    console.log(loading)
  const [isNew, setIsNew] = useState(false);
  const [quote, setQuote] = useState("");

  const todayMood = moods.find(
    (m) => m.date.split("T")[0] == new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    if (!todayMood) return;
    const found = moodsValues.find((m) => m.name == todayMood.mood)?.advice;
    function fetchQuote() {
      if (!found) return;
      const random = Math.floor(Math.random() * found.length);
      setQuote(found[random]);
    }
    fetchQuote();
  }, [currentMood, todayMood]);

  return (
    <div className=" flex items-center  flex-col gap-5 font-fredoka justify-start p-4 h-fit min-h-dvh">
      <Header />
      <div className="text-center flex flex-col gap-1 lg:gap-2">
        <h1 className="text-3xl tracking-wide lg:text-5xl font-medium text-header">
          Hello, {session?.user?.name?.split(" ")[0] || "there"}!
        </h1>
        <p className="md:text-5xl text-3xl md:leading-20 font-medium lg:text-5xl text-body text-center">
          How are you feeling today?
        </p>
        <p className="text-lg lg:text-xl font-medium">
          {convertDate(new Date().toISOString())}
        </p>
      </div>
      {!logged && (
        <button
          className="text-lg cursor-pointer rounded-xl hover:bg-header/90 bg-header text-white w-40 h-13 font-medium tracking-wide"
          onClick={() => setIsNew(true)}
        >
          Add today&apos;s Log
        </button>
      )}
      {isNew && <Newlog setIsNew={setIsNew} />}

      <div className="grid grid-cols-1  lg:grid-cols-3 w-full max-w-250 mt-8 gap-4 lg:gap-10 px-5 lg:px-0 h-fit">
        {todayMood && (
          <>
            <div className="border-20 h-70 relative overflow-hidden flex flex-col lg:col-span-2 col-span-1 rounded-[30px] gap-2 p-3 pb-0 px-4 bg-light-peach shadow-sky shadow-[-10px_10px_0px] border-white w-full">
              <Image
                className="text-center absolute w-1/2 -bottom-10 right-0 transform translate-x-1/4"
                src={
                  moodsValues.find((v) => v.name === todayMood.mood)?.icon || ""
                }
                width={100}
                height={100}
                alt="mood icon"
              />
              <div className="flex z-1 flex-col justify-between font-medium relative p-5 h-full overflow-hidden gap-1">
                <h2 className="text-5xl font-medium  flex flex-col text-text-secondary ">
                  I&apos;m feeling
                  <span className=" text-body capitalize ">
                    {todayMood.mood}
                  </span>
                </h2>
                <p className="text-lg w-full text-text-primary max-w-100 ">
                  &quot;{quote} &quot;
                </p>
              </div>
            </div>
            <div className="border-20 flex flex-col gap-4 p-4 rounded-[30px] bg-light-peach shadow-sky shadow-[-10px_10px_0px] border-white w-full">
              <div className="flex items-center gap-4 text-xl font-medium">
                <Image
                  width={40}
                  height={40}
                  src={"/images/icon-reflection.svg"}
                  alt="mood chart"
                />
                <p>Reflection of the day</p>
              </div>
              <p className="flex-1 wrap-break-word text-text-primary text-lg">
                &quot;{todayMood && todayMood?.text}&quot;
              </p>

              <div>
                {todayMood && todayMood.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {todayMood.tags.map((t) => (
                      <span
                        key={t}
                        className="text-lg text-text-secondary bg-sky/20 px-2 py-1 rounded-full"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        <div className="rounded-2xl bg-light-peach flex flex-col items-end p-5 h-100 col-span-full">
          <h1 className="text-4xl self-start font-medium">Mood Trends</h1>
          {moods.length !== 0 ? (
            <div className="flex-1 relative calender w-full">
              <div className="h-10/12 w-full z-10 absolute  top-0 left-0 *:border-b *:border-gray-200 grid grid-cols-1">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <Chart />
            </div>
          ) : (
            <div className="p-5 text-center w-full h-full flex items-center justify-center">
              <h1 className="text-2xl font-semibold">
                Start logging to keep track of your moods
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
