"use client";
import { useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { useSession } from "next-auth/react";
import { getMoodEntries } from "@/app/actions/mood-actions";

type MoodEntryType = {
  id: string;
  mood: string;
  tags: string[];
  text: string;
  date: string;
};

type AppContextType = {
  moods: MoodEntryType[];
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setMoods: React.Dispatch<React.SetStateAction<MoodEntryType[]>>;
  currentMood: string;
  setCurrentMood: React.Dispatch<React.SetStateAction<string>>;
  setLogError: React.Dispatch<React.SetStateAction<string | null>>;
  logError: string | null;
  setText: React.Dispatch<React.SetStateAction<string>>;
  logged: boolean;
  text: string;
  userId: string;
  loading: boolean;
  refreshMoods: () => Promise<void>;
};

export const appContext = createContext<AppContextType>({
  moods: [],
  setMoods: () => {},
  currentMood: "",
  setCurrentMood: () => {},
  setTags: () => {},
  tags: [],
  logError: null,
  setLogError: () => {},
  text: "",
  setText: () => {},
  logged: false,
  userId: "",
  loading: true,
  refreshMoods: async () => {},
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? "";

  const [moods, setMoods] = useState<MoodEntryType[]>([]);
  const [currentMood, setCurrentMood] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [logError, setLogError] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [dataLoaded, setDataLoaded] = useState(false);

  async function refreshMoods() {
    if (!userId) return;
    try {
      const result = await getMoodEntries(userId);
      if (result.success && result.data) {
        setMoods(result.data);
      } else {
        console.error("Failed to fetch moods:", result.error);
        setLogError(result.error ?? "Failed to fetch moods");
      }
    } catch (err) {
      console.error("Failed to fetch moods:", err);
      setLogError("An unexpected error occurred");
    }
  }

  useEffect(() => {
    async function fetchMoods() {
      if (!userId) {
        setDataLoaded(true);
        return;
      }
      setDataLoaded(false);
      getMoodEntries(userId)
        .then((result) => {
          if (result.success && result.data) {
            setMoods(result.data);
          } else {
            console.error("Failed to fetch moods:", result.error);
            setLogError(result.error ?? "Failed to fetch moods");
          }
        })
        .catch((err) => {
          console.error("Failed to fetch moods:", err);
          setLogError("An unexpected error occurred");
        })
        .finally(() => {
          setDataLoaded(true);
        });
    }
    fetchMoods();
  }, [userId]);

  const logged = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return moods.some((m) => m.date.split("T")[0] == today);
  }, [moods]);

  const loading = !dataLoaded;

  return (
    <appContext.Provider
      value={{
        moods,
        text,
        setText,
        setMoods,
        tags,
        setTags,
        currentMood,
        setCurrentMood,
        logError,
        logged,
        setLogError,
        userId,
        loading,
        refreshMoods,
      }}
    >
      {children}
    </appContext.Provider>
  );
};
