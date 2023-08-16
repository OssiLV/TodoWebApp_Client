import { useEffect, useState } from "react";
import {
    AdjustmentsHorizontalIcon,
    ChevronDownIcon,
    EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { ITaskTodo, RootStates, formatDate, parseDate } from "../Global";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TaskComponent } from "../Components";
import { isPast, isToday } from "date-fns";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import {
    setClearQueueIdTask,
    setQueueIdTask,
} from "../States/TasksRescheduleReducer";

const TodayLayout = () => {
    const { projectId } = useParams();
    const dispatch = useDispatch();

    const _user = useSelector((state: RootStates) => state.rootUserReducer);
    const _newTaskTodo = useSelector(
        (state: RootStates) => state.rootTaskTodoReducer
    );
    const _taskReschedule = useSelector(
        (state: RootStates) => state.rootTasksRescheduleReducer
    );
    const _taskTodoComplete = useSelector(
        (state: RootStates) => state.rootTaskTodoHandleCompleteReducer
    );
    const _priority = useSelector(
        (state: RootStates) => state.rootPriorityReducer
    );

    const { task_id, type, fullDateTime } = useSelector(
        (state: RootStates) => state.rootDueDateReducer
    );

    const [tasks, setTasks] = useState<Array<ITaskTodo>>([]);
    const [collapseOverdue, setCollapseOverdue] = useState(false);
    const [collapseToday, setCollapseToday] = useState(false);

    const taskLengthOverdue = tasks?.filter(
        (task) => !task.isCompleted && isPast(parseDate(task.due_Date))
    ).length;
    const taskLengthToday = tasks?.filter(
        (task) => !task.isCompleted && isToday(parseDate(task.due_Date))
    ).length;

    const hanldeCollapseOverdue = () => {
        setCollapseOverdue((previous) => !previous);
    };
    const hanldeCollapseToday = () => {
        setCollapseToday((previous) => !previous);
    };
    const handleSetIdTasksReschedule = () => {
        const tasksIdOverDue = tasks
            ?.filter(
                (task) => isPast(parseDate(task.due_Date)) && !task.isCompleted
            )
            .map((task) => task.id);

        dispatch(
            setQueueIdTask({
                queueIdTasks: tasksIdOverDue,
                isSuccess: false,
                dueDate: "",
            })
        );
    };

    useEffect(() => {
        if (projectId === undefined) {
            axios({
                method: "GET",
                url: `TaskTodo/userid/${_user?.id}`,
            })
                .then((res) => {
                    setTasks(res.data.objectData);
                })
                .catch((error) =>
                    console.error("Cannot get all Tasks: " + error)
                );
        }
    }, [_user.id, projectId]);

    useEffect(() => {
        if (_newTaskTodo !== null) {
            setTasks((prevState) => {
                if (prevState !== null) {
                    return prevState.concat(_newTaskTodo);
                } else {
                    return [_newTaskTodo];
                }
            });
        }
    }, [_newTaskTodo]);

    useEffect(() => {
        if (_taskReschedule.isSuccess) {
            setTasks((prevState) => {
                const rescheduleTask = prevState.map((task) => {
                    if (isPast(parseDate(task.due_Date)) && !task.isCompleted) {
                        return {
                            ...task,
                            due_Date: _taskReschedule.dueDate,
                        };
                    }
                    return task;
                });

                return rescheduleTask;
            });
        }
    }, [_taskReschedule]);
    // dispatch(setClearQueueIdTask());

    useEffect(() => {
        if (_taskTodoComplete !== null) {
            setTasks((prevState) => {
                if (prevState !== null) {
                    const taskTodoAfterSetIsCompleted = prevState.map(
                        (taskTodo, index, arr) => {
                            if (taskTodo.id === _taskTodoComplete.id) {
                                return {
                                    ...taskTodo,
                                    isCompleted: _taskTodoComplete?.isCompleted,
                                };
                            }
                            return taskTodo;
                        }
                    );
                    return taskTodoAfterSetIsCompleted;
                } else {
                    return [prevState];
                }
            });
        }
    }, [_taskTodoComplete]);

    useEffect(() => {
        if (tasks !== null) {
            const tasksCopy = Array.from(tasks);

            tasksCopy.map((task) => {
                if (task.id === _priority.id) {
                    task.priority = _priority.name;
                }
            });

            setTasks(tasksCopy);
        }
    }, [_priority]);

    useEffect(() => {
        if (type === "UPDATE" && task_id !== 0) {
            const tasksCopy = [...tasks];
            tasksCopy.map((task) => {
                if (task.id === task_id) {
                    task.due_Date = formatDate(new Date(fullDateTime));
                }
            });

            setTasks(tasksCopy);
        }
    }, [fullDateTime, task_id]);

    return (
        <div
            id="content"
            className={clsx("pt-[70px] flex-col flex items-center")}
        >
            <div className="flex flex-col  divide-gray-300 gap-2">
                {/* HEADER */}
                <div className="flex justify-between">
                    <div className=" flex items-baseline gap-2 w-56 tabletOrDesktop:w-[40rem] ">
                        <h1
                            className={clsx("text-2xl font-bold flex-initial", {
                                "text-primary": _user.theme === "Primary",
                                "text-white": _user.theme === "Dark",
                                "text-black": _user.theme === "Neutral",
                            })}
                        >
                            Today
                        </h1>
                        <p className="text-sm text-gray-500">
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "short",
                                day: "2-digit",
                                month: "short",
                            })}
                        </p>
                    </div>

                    {/* VIEW */}
                    {/* <div className="flex gap-4 select-none">
                        <button
                            type="button"
                            className="text-md text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                            // data-te-toggle="modal"
                            // data-te-target="#addtaskmodal"
                            // data-te-ripple-init
                            // data-te-ripple-color="light"
                        >
                            <div className="flex gap-2">
                                <span className="[&>svg]:w-5">
                                    <AdjustmentsHorizontalIcon />
                                </span>
                                View
                            </div>
                        </button>
                    </div> */}
                </div>

                {/* SECTIONS */}
                <div>
                    {/* OVERDUE */}

                    {tasks?.filter(
                        (task) =>
                            isPast(parseDate(task.due_Date)) &&
                            !task.isCompleted &&
                            !isToday(parseDate(task.due_Date))
                    ).length > 0 && (
                        <div className="pt-4">
                            <div className=" flex items-center justify-between">
                                <div className=" flex items-center gap-2">
                                    <button
                                        type="button"
                                        className={clsx(
                                            "left-4 top-31 tabletOrDesktop:left-52 Desktop:ml-64 Desktop:px-4 text-md text-neutral-500 hover:text-neutral-700 p-[6px] rounded-full hover:bg-gray-200 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                                        )}
                                        onClick={hanldeCollapseOverdue}
                                    >
                                        <span
                                            className={clsx(
                                                "[&>svg]:w-5 [&>svg]:transition-all duration-500 ease-in-out",
                                                {
                                                    "[&>svg]:-rotate-90":
                                                        collapseOverdue,
                                                }
                                            )}
                                        >
                                            <ChevronDownIcon />
                                        </span>
                                    </button>
                                    <h1
                                        className={clsx("font-bold text-base", {
                                            "text-white":
                                                _user.theme === "Dark",
                                        })}
                                    >
                                        Overdue
                                    </h1>
                                    <span className="inline-block whitespace-nowrap rounded-full  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary opacity-60">
                                        {taskLengthOverdue !== 0
                                            ? taskLengthOverdue
                                            : ""}
                                    </span>
                                </div>

                                <span
                                    data-te-toggle="modal"
                                    data-te-target="#calendaroption"
                                    onClick={handleSetIdTasksReschedule}
                                    className={clsx(
                                        "  hover:underline cursor-pointer select-none",
                                        {
                                            "text-primary":
                                                _user.theme === "Primary",
                                            "text-white":
                                                _user.theme === "Dark",
                                            "text-black":
                                                _user.theme === "Neutral",
                                        }
                                    )}
                                >
                                    Reschedule
                                </span>
                            </div>
                        </div>
                    )}

                    {/* TASKS */}
                    <div className=" divide-gray-300">
                        <div
                            className={clsx("divide-y block", {
                                hidden: collapseOverdue,
                            })}
                        >
                            {tasks
                                ?.filter(
                                    (task) =>
                                        isPast(parseDate(task.due_Date)) &&
                                        !task.isCompleted &&
                                        !isToday(parseDate(task.due_Date))
                                )
                                .map((task) => (
                                    <TaskComponent
                                        key={task.id}
                                        todayLayout={true}
                                        id={task.id}
                                        name={task.name}
                                        section_id={task.section_id}
                                        priority={task.priority}
                                        due_Date={task.due_Date}
                                        description={task.description}
                                        isCompleted={task.isCompleted}
                                    />
                                ))}
                        </div>
                    </div>

                    {/* TODAY */}
                    <div className="pt-4">
                        <div className=" flex items-center justify-between">
                            <div className=" flex items-center gap-2">
                                <button
                                    type="button"
                                    className={clsx(
                                        "left-4 top-31 tabletOrDesktop:left-52 Desktop:ml-64 Desktop:px-4 text-md text-neutral-500 hover:text-neutral-700 p-[6px] rounded-full hover:bg-gray-200 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                                    )}
                                    onClick={hanldeCollapseToday}
                                >
                                    <span
                                        className={clsx(
                                            "[&>svg]:w-5 [&>svg]:transition-all duration-500 ease-in-out",
                                            {
                                                "[&>svg]:-rotate-90":
                                                    collapseToday,
                                            }
                                        )}
                                    >
                                        <ChevronDownIcon />
                                    </span>
                                </button>
                                <h1
                                    className={clsx("font-bold text-base", {
                                        "text-primary":
                                            _user.theme === "Primary",
                                        "text-white": _user.theme === "Dark",
                                        "text-black": _user.theme === "Neutral",
                                    })}
                                >
                                    {new Date().toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "short",
                                    }) +
                                        " . " +
                                        "Today" +
                                        " . " +
                                        new Date().toLocaleDateString("en-US", {
                                            weekday: "long",
                                        })}
                                </h1>
                                <span className="inline-block whitespace-nowrap rounded-full  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary opacity-60">
                                    {taskLengthToday !== 0
                                        ? taskLengthToday
                                        : ""}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* TASKS */}
                    <div className=" divide-gray-300">
                        <div
                            className={clsx("divide-y block", {
                                hidden: collapseToday,
                            })}
                        >
                            {tasks
                                ?.filter(
                                    (task) =>
                                        isToday(parseDate(task.due_Date)) &&
                                        !task.isCompleted
                                )
                                .map((task) => (
                                    <TaskComponent
                                        key={task.id}
                                        todayLayout={true}
                                        id={task.id}
                                        name={task.name}
                                        section_id={task.section_id}
                                        priority={task.priority}
                                        due_Date={task.due_Date}
                                        description={task.description}
                                        isCompleted={task.isCompleted}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodayLayout;
