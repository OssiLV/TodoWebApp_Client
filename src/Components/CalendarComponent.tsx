import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameMonth,
    isToday,
    parse,
    startOfToday,
    endOfDay,
    isPast,
} from "date-fns";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDueDate } from "../States/DueDateReducer";
import { RootStates, formatDate } from "../Global";
import clsx from "clsx";
import { enUS, vi } from "date-fns/locale";
import axios from "axios";
import { setQueueIdTask } from "../States/TasksRescheduleReducer";
function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

export default function CalendarComponent() {
    const dispatch = useDispatch();

    const { queueIdTasks } = useSelector(
        (state: RootStates) => state.rootTasksRescheduleReducer
    );
    const { language, theme } = useSelector(
        (state: RootStates) => state.rootUserReducer
    );

    let today = startOfToday();
    let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
    let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });

    const handleChangeDay = (fullDateTime: Date) => {
        if (queueIdTasks.length !== 0) {
            axios({
                method: "PUT",
                url: "TaskTodo/reschedule",
                data: {
                    tasks_id: queueIdTasks,
                    dueDate: formatDate(fullDateTime),
                },
            })
                .then((res) => {
                    dispatch(
                        setQueueIdTask({
                            queueIdTasks,
                            isSuccess: true,
                            dueDate: formatDate(fullDateTime),
                        })
                    );
                })
                .catch((error) => {
                    console.error("Cannot reschedule: " + error);
                });
        }

        dispatch(
            setDueDate({
                task_id: 0,
                type: "CALENDAR",
                fullDateTime: endOfDay(fullDateTime).toString(),
            })
        );
    };

    const previousMonth = () => {
        let firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayPreviousMonth, "MMM-yyyy"));
    };

    const nextMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    };

    return (
        <div className="max-w-xs mx-auto ">
            <div className="flex items-center">
                <h2
                    className={clsx("flex-auto font-semibold ", {
                        "text-gray-900":
                            theme === "Primary" || theme === "Neutral",
                        "text-white": theme === "Dark",
                    })}
                >
                    {language === "en"
                        ? format(firstDayCurrentMonth, "MMMM yyyy", {
                              locale: enUS,
                          })
                        : format(firstDayCurrentMonth, "MMMM yyyy", {
                              locale: vi,
                          })}
                </h2>
                <button
                    type="button"
                    onClick={previousMonth}
                    className={clsx(
                        "-my-1.5 flex flex-none items-center justify-center p-1.5 ",
                        {
                            "text-gray-400 hover:text-gray-500":
                                theme === "Primary" || theme === "Neutral",
                            "text-white hover:text-gray-500": theme === "Dark",
                        }
                    )}
                >
                    <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                    onClick={nextMonth}
                    type="button"
                    className={clsx(
                        "-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 ",
                        {
                            "text-gray-400 hover:text-gray-500":
                                theme === "Primary" || theme === "Neutral",
                            "text-white hover:text-gray-500": theme === "Dark",
                        }
                    )}
                >
                    <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </button>
            </div>
            <div
                className={clsx(
                    "grid grid-cols-7 mt-10 text-xs leading-6 text-center ",
                    {
                        "text-gray-500":
                            theme === "Primary" || theme === "Neutral",
                        "text-white": theme === "Dark",
                    }
                )}
            >
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
            </div>
            {/*  */}
            <div className="grid grid-cols-7 text-sm">
                {days.map((day, dayIdx) =>
                    isPast(day) && !isToday(day) ? (
                        <div
                            // onClick={() => handleChangeDay(day)}
                            key={day.toString()}
                            className={classNames(
                                dayIdx === 0 && colStartClasses[getDay(day)],
                                "py-1.5"
                            )}
                        >
                            <button
                                type="button"
                                className={clsx(
                                    "mx-auto cursor-default p-4 flex h-8 w-8 items-center justify-center rounded-full",
                                    {
                                        "text-neutral-800 bg-white":
                                            isEqual(day, today) &&
                                            theme === "Dark",
                                        "text-gray-600":
                                            !isEqual(day, today) &&
                                            theme === "Dark",

                                        "text-white bg-neutral-700":
                                            isEqual(day, today) &&
                                            theme === "Neutral",
                                        "text-gray-300 ":
                                            !isEqual(day, today) &&
                                            theme === "Neutral",

                                        "text-white bg-primary":
                                            isEqual(day, today) &&
                                            theme === "Primary",
                                        "text-gray-300":
                                            !isEqual(day, today) &&
                                            theme === "Primary",
                                    }
                                )}
                            >
                                <time dateTime={format(day, "yyyy-MM-dd")}>
                                    {format(day, "d")}
                                </time>
                            </button>
                        </div>
                    ) : (
                        <div
                            data-te-modal-dismiss
                            onClick={() => handleChangeDay(day)}
                            key={day.toString()}
                            className={classNames(
                                dayIdx === 0 && colStartClasses[getDay(day)],
                                "py-1.5"
                            )}
                        >
                            <button
                                type="button"
                                className={clsx(
                                    "mx-auto p-4 flex h-8 w-8 items-center justify-center rounded-full",
                                    {
                                        "text-neutral-800 bg-white":
                                            isEqual(day, today) &&
                                            theme === "Dark",
                                        "text-white hover:bg-gray-500":
                                            !isEqual(day, today) &&
                                            theme === "Dark",

                                        "text-white bg-neutral-700":
                                            isEqual(day, today) &&
                                            theme === "Neutral",
                                        "text-black hover:bg-neutral-400":
                                            !isEqual(day, today) &&
                                            theme === "Neutral",

                                        "text-white bg-primary":
                                            isEqual(day, today) &&
                                            theme === "Primary",
                                        "text-black hover:bg-primary-300":
                                            !isEqual(day, today) &&
                                            theme === "Primary",
                                    }
                                )}
                            >
                                <time dateTime={format(day, "yyyy-MM-dd")}>
                                    {format(day, "d")}
                                </time>
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

let colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
];
