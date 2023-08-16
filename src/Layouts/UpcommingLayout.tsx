import {
    add,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    parse,
    startOfToday,
    startOfWeek,
} from "date-fns";
import React, { useState } from "react";

const UpcommingLayout = () => {
    const today = startOfToday();
    const [currentWeek, setCurrentWeek] = useState(format(today, "dd-EEE"));

    // Get the first day of the current week
    const firstDayCurrentWeek = startOfWeek(
        parse(currentWeek, "dd-EEE", new Date()),
        { weekStartsOn: 1 }
    );

    let daysOfWeek = eachDayOfInterval({
        start: firstDayCurrentWeek,
        end: endOfWeek(firstDayCurrentWeek, { weekStartsOn: 1 }),
    });

    const previousWeek = () => {
        let firstDayPreviousWeek = add(firstDayCurrentWeek, { weeks: -1 });
        setCurrentWeek(format(firstDayPreviousWeek, "dd-EEE"));
    };

    const nextWeek = () => {
        let firstDayNextWeek = add(firstDayCurrentWeek, { weeks: 1 });
        setCurrentWeek(format(firstDayNextWeek, "dd-EEE"));
    };

    const setTodayCurrentWeek = () => {
        setCurrentWeek(format(today, "dd-EEE"));
    };

    // Console log for debugging
    // console.log(daysOfWeek);

    return (
        <div id="content" className="pt-[55px] flex gap-5 flex-col ">
            <button onClick={previousWeek}>previous week</button>
            <button onClick={nextWeek}>next week</button>
            <button onClick={setTodayCurrentWeek}>today</button>
        </div>
    );
};

export default UpcommingLayout;
