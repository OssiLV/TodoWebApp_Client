import { CalendarIcon } from "@heroicons/react/24/solid";
import {
    isToday,
    isTomorrow,
    isSameDay,
    nextDay,
    startOfDay,
    subDays,
    isValid,
} from "date-fns";
import { FC, Fragment, useEffect } from "react";
import { RootStates, formatDate } from "../Global";
import { useSelector } from "react-redux";
import {
    ForwardIcon,
    MusicalNoteIcon,
    SunIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

interface IShowDueDateComponent {
    setDateTime: Function;
}
const ShowDueDateComponent: FC<IShowDueDateComponent> = ({ setDateTime }) => {
    const { theme, language } = useSelector(
        (state: RootStates) => state.rootUserReducer
    );
    const { type, fullDateTime } = useSelector(
        (state: RootStates) => state.rootDueDateReducer
    );
    let dateTime = new Date(
        fullDateTime === ""
            ? "Mon Jul 1 0000 00:00:00 GMT+0700 (Indochina Time)"
            : fullDateTime
    );

    useEffect(() => {
        if (isValid(dateTime) && type !== "UPDATE" && fullDateTime !== "") {
            setDateTime(formatDate(dateTime));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fullDateTime]);

    return (
        <Fragment>
            {isToday(dateTime) ? (
                <div className="flex items-center text-lime-500 font-bold px-2">
                    <span>
                        <CalendarIcon className="w-4 h-4 " />
                    </span>
                    <p className="ml-2 ">
                        {language === "en" ? "Today" : "Hôm nay"}
                    </p>
                </div>
            ) : isTomorrow(dateTime) ? (
                <div className="flex items-center text-yellow-500 font-bold px-2">
                    <span>
                        <SunIcon className="w-4 h-4 " />
                    </span>
                    <p className="ml-2 ">
                        {language === "en" ? "Tomorrow" : "Ngày mai"}
                    </p>
                </div>
            ) : isSameDay(
                  subDays(nextDay(startOfDay(new Date()), 1), 1),
                  dateTime
              ) ? (
                <div className="flex items-center text-primary font-bold px-2">
                    <span>
                        <MusicalNoteIcon className="w-4 h-4 " />
                    </span>
                    <p className="ml-2 ">
                        {language === "en"
                            ? dateTime.toLocaleDateString("en-US", {
                                  weekday: "long",
                              })
                            : dateTime.toLocaleDateString("vi-VN", {
                                  weekday: "long",
                              })}
                    </p>
                </div>
            ) : isSameDay(nextDay(startOfDay(new Date()), 1), dateTime) ? (
                <div className="flex items-center text-purple-500 font-bold px-2">
                    <span>
                        <ForwardIcon className="w-4 h-4 " />
                    </span>
                    <p className="ml-2 ">
                        {language === "en"
                            ? dateTime.toLocaleDateString("en-US", {
                                  weekday: "long",
                              })
                            : dateTime.toLocaleDateString("vi-VN", {
                                  weekday: "long",
                              })}
                    </p>
                </div>
            ) : (
                <div
                    className={clsx(
                        "flex items-center opacity-50 font-bold px-2",
                        {
                            "text-white": theme === "Dark",
                        }
                    )}
                >
                    <span>
                        <CalendarIcon className="w-4 h-4 " />
                    </span>
                    <p className="ml-2 ">
                        {language === "en"
                            ? fullDateTime ===
                              "Mon Jul 1 0000 00:00:00 GMT+0700 (Indochina Time)"
                                ? "Due Date"
                                : dateTime.toLocaleDateString("en-US", {
                                      day: "2-digit",
                                      weekday: "short",
                                  })
                            : fullDateTime ===
                              "Mon Jul 1 0000 00:00:00 GMT+0700 (Indochina Time)"
                            ? "Ngày đáo hạn"
                            : dateTime.toLocaleDateString("vi-VN", {
                                  day: "2-digit",
                                  weekday: "short",
                              })}
                    </p>
                </div>
            )}
        </Fragment>
    );
};

export default ShowDueDateComponent;
