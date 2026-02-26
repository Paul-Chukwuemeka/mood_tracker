import React, { useContext } from "react";
import { appContext } from "@/contexts/appcontext";

const Day = () => {
  const { text, setText } = useContext(appContext);
  return (
    <div className=" flex flex-col gap-4">
      <h1 className="text-3xl font-normal">Write about your day.....</h1>
      <textarea
        placeholder="Today, I felt...."
        value={text}
        className={`p-3 text-xl border-2 border-gray-200 rounded-lg w-full h-50 resize-none focus:outline-none focus:ring-2 focus:ring-header duration-300 transition-colors focus:border-transparent`}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Day;
