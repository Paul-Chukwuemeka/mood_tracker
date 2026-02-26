import { appContext } from "@/contexts/appcontext";
import React, { useContext } from "react";

const moodTags = [
  "Joyful",
  "Down",
  "Anxious",
  "Calm",
  "Excited",
  "Frustrated",
  "Lonely",
  "Grateful",
  "Overwhelmed",
  "Motivated",
  "Irritable",
  "Peaceful",
  "Tired",
  "Hopeful",
  "Confident",
  "Stressed",
  "Content",
  "Disappointed",
  "Optimistic",
  "Restless",
];

export const Tags = () => {
  const { setTags, tags } = useContext(appContext);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-normal">How do you feel?</h1>
      <p className="text-text-secondary text-xl">Select up to three tags</p>
      <div className="flex gap-2 py-2 flex-wrap">
        {moodTags.map((m, i) => (
          <button
            key={i}
            disabled={tags.length == 3 && !tags.includes(m)}
            className={`${tags.includes(m) && "text-white bg-header"}  disabled:bg-gray-100 disabled:opacity-55 flex items-center capitalize justify-between gap-2 border-2 border-gray-200 rounded-lg p-2 px-3 w-fit`}
            onClick={() => {
              setTags(() =>
                tags.includes(m) ? tags.filter((t) => t != m) : [...tags, m],
              );
            }}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
};
