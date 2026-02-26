import { convertDate } from "@/app/page";
import { appContext } from "@/contexts/appcontext";
import React, { useContext, useEffect, useState } from "react";
import ChartColumn from "./chartColumn";

const Chart = () => {
  const { moods } = useContext(appContext);
  const [dateList, setDateList] = useState<string[] | null>(null);

  useEffect(() => {
    function getChart() {
      if (moods.length === 0) {
        setDateList([]);
        return;
      }

      const dates: string[] = [];
      const yesterday = new Date().setDate(new Date().getDate() - 1);
      const today = moods.find(
        (m) => convertDate(m.date) == convertDate(new Date().toISOString()),
      )
        ? new Date()
        : new Date(yesterday);
      const startDate = new Date(moods[moods.length - 1].date);

      const current = new Date(startDate);
      dates.push(current.toISOString());
      while (current <= today) {
        current.setDate(current.getDate() + 1);
        const day = current.toISOString();
        dates.push(day);
      }
      setDateList(dates);
    }

    getChart();
  }, [moods]);

  return (
    <div className="h-full calender relative bg-linear-to-b from-white/50 to-bg-gray/30 rounded-2xl w-full overflow-x-auto overflow-y-hidden border border-white/40 shadow-sm">
      <div className="flex h-full  justify-end z-10 relative min-w-max items-end gap-3 md:gap-5  px-4">
        {dateList &&
          dateList.map((day, i) => {
            const found = moods.find((m) => {
              if (convertDate(m.date) == convertDate(day)) {
                return true;
              }
            });
            const parts = convertDate(day).split(", ")[1].split(" ");
            return (
              <div
                key={`${day}-${i}`}
                className="h-full items-center w-fit flex flex-col min-w-10 shrink-0 "
              >
                <div className="flex-1  flex items-end w-full">
                  {found && (
                    <ChartColumn
                      length={dateList.length}
                      idx={i}
                      found={found}
                    />
                  )}
                </div>
                <div className="mt-4 flex flex-col items-center gap-0">
                  <p className="text-text-secondary text-[10px] uppercase font-bold tracking-tighter">
                    {parts[0]}
                  </p>
                  <p className="font-fredoka text-sm font-semibold text-header">
                    {parts[1]}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Chart;
