import React, { useState } from "react";
import Image from "next/image";

type column = {
  mood: string;
  date: string;
  text: string;
  tags: string[];
};

const ChartColumn = ({
  found,
  idx,
  length,
}: {
  found: column;
  idx: number;
  length: number;
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  let url: string;
  switch (found.mood.toLowerCase()) {
    case "very happy":
      url = "/images/icon-very-happy-white.svg";
      break;
    case "happy":
      url = "/images/icon-happy-white.svg";
      break;
    case "neutral":
      url = "/images/icon-neutral-white.svg";
      break;
    case "sad":
      url = "/images/icon-sad-white.svg";
      break;
    case "very sad":
      url = "/images/icon-very-sad-white.svg";
      break;

    default:
      url = "/images/icon-happy-white";
  }
  return (
    <div
      className={`
      flex items-end
    ${found.mood.toLowerCase().trim() === "very happy" && "h-full"} 
        ${found.mood.toLowerCase().trim() === "happy" && " h-[85%]"} 
        ${found.mood.toLowerCase().trim() === "neutral" && " h-[65%]"} 
        ${found.mood.toLowerCase().trim() === "sad" && "h-[45%]"} 
        ${found.mood.toLowerCase().trim() === "very sad" && "h-[30%]"} 
    `}
    >
      <div
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        className={`flex group relative items-center border-2 column flex-col p-1 transition-all duration-500 ease-out hover:scale-105 hover:z-50 cursor-pointer
        ${found.mood.toLowerCase().trim() === "very happy" && "bg-yellow-400"} 
        ${found.mood.toLowerCase().trim() === "happy" && "bg-green-400"} 
        ${found.mood.toLowerCase().trim() === "neutral" && "bg-blue-300"} 
        ${found.mood.toLowerCase().trim() === "sad" && "bg-purple-300"} 
        ${found.mood.toLowerCase().trim() === "very sad" && "bg-red-400"} 
        w-full rounded-full border-white/30`}
      >
        <div
          className={`z-100 ${found.mood.toLowerCase().trim() === "very sad" || found.mood.toLowerCase().trim() === "sad" ? "bottom-0" : "top-0"} bg-white/95 ${idx == 0 && length > 3 ? "right-full" : "right-full"} duration-300 pointer-events-none transition-all 
          ${!hovered ? "opacity-0 translate-y-2 scale-95" : "opacity-100 translate-y-0 scale-100"} 
             ring-1 ring-black/5 min-w-48 absolute rounded-2xl p-4 flex flex-col gap-2`}
        >
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">
              Mood
            </p>
            <p className="text-sm font-fredoka capitalize font-semibold">
              {found.mood}
            </p>
          </div>
          <div className="h-px bg-gray-100 w-full" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">
              Reflection
            </p>
            <p className="text-sm text-text-primary line-clamp-3 leading-tight italic">
              &quot;{found.text}&quot;
            </p>
          </div>
          {found.tags.length > 0 && (
            <>
              <div className="h-px bg-gray-100 w-full" />
              <div className="flex flex-wrap gap-1">
                {found.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-sky/30 px-1.5 py-0.5 rounded text-header font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="w-8 h-8 md:w-10 md:h-10 bg-white/90  rounded-full flex items-center justify-center shadow-inner mt-0.5">
          <Image
            src={url}
            alt={found.mood}
            width={30}
            height={30}
            className="w-6 h-6 md:w-8 md:h-8"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartColumn;
