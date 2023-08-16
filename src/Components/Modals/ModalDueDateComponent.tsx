import { CalendarIcon } from "@heroicons/react/24/solid";
import CalendarComponent from "../CalendarComponent";
import {
    SunIcon,
    ForwardIcon,
    MusicalNoteIcon,
} from "@heroicons/react/24/outline";
import {
    startOfWeek,
    addWeeks,
    getDay,
    addDays,
    endOfDay,
    startOfDay,
} from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setDueDate } from "../../States/DueDateReducer";
import { RootStates, formatDate } from "../../Global";
import clsx from "clsx";
import axios from "axios";
import {
    setClearQueueIdTask,
    setQueueIdTask,
} from "../../States/TasksRescheduleReducer";

const ModalDueDateComponent = () => {
    const dispatch = useDispatch();

    const { queueIdTasks } = useSelector(
        (state: RootStates) => state.rootTasksRescheduleReducer
    );
    const { language, theme } = useSelector(
        (state: RootStates) => state.rootUserReducer
    );

    let today = startOfDay(new Date());
    let tomorrow = startOfDay(addDays(new Date(), 1));
    let firstDayOfNextWeek = startOfWeek(addWeeks(new Date(), 1), {
        weekStartsOn: 1,
    });
    let lastDayOfWeek = startOfDay(
        addDays(today, ((6 - getDay(today) + 7) % 7) + 1)
    );

    const hanldeChangeOptionDueDate = (fullDateTime: Date) => {
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
                type: "OPTIONS",
                fullDateTime: endOfDay(fullDateTime).toString(),
            })
        );
    };

    return (
        <div
            data-te-modal-init
            className="select-none fixed left-0 bottom-[3.4rem] z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="calendaroption"
            aria-labelledby="calendaroption"
            aria-modal="true"
            role="dialog"
        >
            <div
                data-te-modal-dialog-ref
                className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
            >
                <div
                    className={clsx(
                        "pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600",
                        {
                            "bg-white":
                                theme === "Primary" || theme === "Neutral",
                            "bg-gray-800": theme === "Dark",
                        }
                    )}
                >
                    <div className="flex flex-col flex-shrink-0  rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        {/* TODAY */}
                        <div
                            className="relative"
                            onClick={() =>
                                hanldeChangeOptionDueDate(new Date())
                            }
                            data-te-modal-dismiss
                        >
                            <div
                                className={clsx(
                                    "flex h-10 w-full cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] outline-none transition duration-100 ease-linear  ",
                                    {
                                        "text-gray-600 hover:bg-slate-300":
                                            theme === "Primary" ||
                                            theme === "Neutral",
                                        "text-white hover:bg-gray-500":
                                            theme === "Dark",
                                    }
                                )}
                            >
                                <span className="mr-4 h-6 w-6 text-lime-500 ">
                                    <CalendarIcon className="" />
                                </span>
                                <span className="font-bold">
                                    {language === "en" ? "Today" : "Hôm nay"}
                                </span>
                                <span className="absolute right-0 mr-4 opacity-60">
                                    {language === "en"
                                        ? new Date().toLocaleDateString(
                                              "en-US",
                                              {
                                                  weekday: "short",
                                              }
                                          )
                                        : new Date().toLocaleDateString(
                                              "vi-VN",
                                              {
                                                  weekday: "short",
                                              }
                                          )}
                                </span>
                            </div>
                        </div>

                        {/* TOMORROW */}
                        <div
                            className="relative"
                            onClick={() => hanldeChangeOptionDueDate(tomorrow)}
                            data-te-modal-dismiss
                        >
                            <div
                                className={clsx(
                                    "flex h-10 w-full cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] outline-none transition duration-100 ease-linear  ",
                                    {
                                        "text-gray-600 hover:bg-slate-300":
                                            theme === "Primary" ||
                                            theme === "Neutral",
                                        "text-white hover:bg-gray-500":
                                            theme === "Dark",
                                    }
                                )}
                            >
                                <span className="mr-4 h-6 w-6 text-yellow-500 ">
                                    <SunIcon className="" />
                                </span>
                                <span className="font-bold">
                                    {language === "en"
                                        ? "Tomorrow"
                                        : "Ngày mai"}
                                </span>
                                <span className="absolute right-0 mr-4 opacity-60">
                                    {language === "en"
                                        ? tomorrow.toLocaleDateString("en-US", {
                                              weekday: "short",
                                              day: "2-digit",
                                          })
                                        : tomorrow.toLocaleDateString("vi-VN", {
                                              weekday: "short",
                                              day: "2-digit",
                                          })}
                                </span>
                            </div>
                        </div>

                        {/* THIS-WEEKEND */}
                        <div
                            className="relative"
                            onClick={() =>
                                hanldeChangeOptionDueDate(lastDayOfWeek)
                            }
                            data-te-modal-dismiss
                        >
                            <div
                                className={clsx(
                                    "flex h-10 w-full cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] outline-none transition duration-100 ease-linear  ",
                                    {
                                        "text-gray-600 hover:bg-slate-300":
                                            theme === "Primary" ||
                                            theme === "Neutral",
                                        "text-white hover:bg-gray-500":
                                            theme === "Dark",
                                    }
                                )}
                            >
                                <span className="mr-4 h-6 w-6 text-primary ">
                                    <MusicalNoteIcon className="" />
                                </span>
                                <span className="font-bold">
                                    {language === "en"
                                        ? "This Weekend"
                                        : "Cuối tuần"}
                                </span>
                                <span className="absolute right-0 mr-4 opacity-60">
                                    {language === "en"
                                        ? lastDayOfWeek.toLocaleDateString(
                                              "en-US",
                                              {
                                                  weekday: "short",
                                                  day: "2-digit",
                                              }
                                          )
                                        : lastDayOfWeek.toLocaleDateString(
                                              "vi-VN",
                                              {
                                                  weekday: "short",
                                                  day: "2-digit",
                                              }
                                          )}
                                    {}
                                </span>
                            </div>
                        </div>

                        {/* NEXT_WEEK */}
                        <div
                            className="relative"
                            onClick={() =>
                                hanldeChangeOptionDueDate(firstDayOfNextWeek)
                            }
                            data-te-modal-dismiss
                        >
                            <div
                                className={clsx(
                                    "flex h-10 w-full cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] outline-none transition duration-100 ease-linear  ",
                                    {
                                        "text-gray-600 hover:bg-slate-300":
                                            theme === "Primary" ||
                                            theme === "Neutral",
                                        "text-white hover:bg-gray-500":
                                            theme === "Dark",
                                    }
                                )}
                            >
                                <span className="mr-4 h-6 w-6 text-purple-500 ">
                                    <ForwardIcon className="" />
                                </span>
                                <span className="font-bold">
                                    {" "}
                                    {language === "en"
                                        ? "Next week"
                                        : "Tuần sau"}
                                </span>
                                <span className="absolute right-0 mr-4 opacity-60">
                                    {language === "en"
                                        ? firstDayOfNextWeek.toLocaleDateString(
                                              "en-US",
                                              {
                                                  weekday: "short",
                                                  month: "short",
                                                  day: "2-digit",
                                              }
                                          )
                                        : firstDayOfNextWeek.toLocaleDateString(
                                              "vi-VN",
                                              {
                                                  weekday: "short",
                                                  month: "short",
                                                  day: "2-digit",
                                              }
                                          )}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* MODAL BODY */}
                    <div className="relative p-4">
                        <CalendarComponent />
                    </div>

                    {/* MODAL FOOTER */}
                    <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50"></div>
                </div>
            </div>
        </div>
    );
};

export default ModalDueDateComponent;
