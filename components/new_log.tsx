import { useContext, useState } from "react";
import { appContext } from "@/contexts/appcontext";
import { FaX } from "react-icons/fa6";
import Mood from "./mood";
import { Tags } from "./tags";
import Day from "./day";
import { createMoodEntry } from "@/app/actions/mood-actions";

const Newlog = ({ setIsNew }: { setIsNew: (b: boolean) => void }) => {
  const {
    setCurrentMood,
    currentMood,
    setTags,
    tags,
    setText,
    text,
    logError,
    setLogError,
    userId,
    refreshMoods,
  } = useContext(appContext);
  const [active, setActive] = useState(0);
  const [saving, setSaving] = useState(false);

  function handleUpdate() {
    if (!currentMood) {
      setLogError("Please select a mood");
      return;
    }
    if (active == 1 && tags.length == 0) {
      setLogError("Please select at least one tag");
      return;
    }
    if (active == 2 && !text) {
      setLogError("Please write a few words about your day");
      return;
    }
    setLogError(null);

    if (active < 2) {
      setActive(active + 1);
    } else {
      handleSave();
    }
  }

  async function handleSave() {
    if (!userId) {
      setLogError("You must be logged in to save.");
      return;
    }

    setSaving(true);
    try {
      const result = await createMoodEntry({
        userId,
        mood: currentMood,
        tags,
        text,
      });

      if (result.success) {
        await refreshMoods();
        setCurrentMood("");
        setTags([]);
        setText("");
        setIsNew(false);
      } else {
        setLogError(result.error ?? "Failed to save. Please try again.");
      }
    } catch (err) {
      console.error("Failed to save mood entry:", err);
      setLogError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="absolute top-0 z-1000 left-0 bg-sky/50 flex items-center justify-center w-full h-dvh p-10"
      onClick={() => setIsNew(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="border-20 p-2 flex gap-4 flex-col bg-white rounded-[30px] relative shadow-sky shadow-[-10px_10px_0px] border-white w-full max-w-150 h-fit"
      >
        <button
          className="absolute right-2 top-2 text-text-secondary text-md  cursor-pointer font-semibold p-2"
          onClick={() => setIsNew(false)}
        >
          <FaX />
        </button>
        <h1 className="text-4xl font-medium">Log your mood</h1>
        <div className="w-full *:cursor-pointer gap-2 grid grid-cols-3">
          <button
            className={`bg-header h-1.5 rounded-full`}
            onClick={() => setActive(0)}
          ></button>
          <button
            onClick={() => setActive(1)}
            disabled={active < 1}
            className={`${active > 0 ? "bg-sky-500" : "bg-gray-300"} h-1.5  rounded-full`}
          ></button>
          <button
            onClick={() => setActive(2)}
            disabled={active < 2}
            className={`${active > 1 ? "bg-header" : "bg-gray-300"} h-1.5  rounded-full`}
          ></button>
        </div>
        {active == 0 && <Mood setMood={setCurrentMood} mood={currentMood} />}
        {active == 1 && <Tags />}
        {active == 2 && <Day />}
        {logError && <p className="text-md text-red-500">{logError}</p>}
        <button
          className="w-full text-2xl font-medium cursor-pointer text-white p-3 bg-header rounded-xl disabled:opacity-50"
          onClick={handleUpdate}
          disabled={saving}
        >
          {saving ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Newlog;
