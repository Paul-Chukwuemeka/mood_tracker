import { Dispatch } from "react";
import Image from "next/image";
import { moodsValues } from "@/constants";

const Mood = ({
  setMood,
  mood,
}: {
  setMood: Dispatch<React.SetStateAction<string>>;
  mood: string;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-normal">How was your mood Today</h1>
      <div className="gap-2 mt-3 flex flex-col">
        {moodsValues.map((m) => (
          <button
            key={m.name}
            className={` ${mood === m.name ? "bg-header text-white" : ""} flex items-center capitalize justify-between gap-2 border-2 border-gray-200 rounded-xl p-2 px-3 w-full`}
            onClick={() => setMood(m.name)}
          >
            <p className="text-lg">{m.name}</p>
            <Image src={m.icon} alt={m.name} width={40} height={40} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Mood;
