import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, FC, Fragment, useEffect, useState } from "react";
import { ISection, ITaskTodo, RootStates, parseDate } from "../Global";
import clsx from "clsx";
import ShowDueDateComponent from "./ShowDueDateComponent";
import { FlagIcon as OFlagIcon } from "@heroicons/react/24/outline";
import { FlagIcon as SFlagIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSection } from "../States/SectionReducer";
import ModalOptionProjectComponent from "./Modals/ModalOptionProjectComponent";
import { formatDate } from "../Global";
import TaskComponent from "./TaskComponent";

const SectionComponent: FC<ISection> = ({ id, name }) => {
    const dispatch = useDispatch();
    const { projectId } = useParams();

    const { theme, language } = useSelector(
        (state: RootStates) => state.rootUserReducer
    );
    const { task_id, type, fullDateTime } = useSelector(
        (state: RootStates) => state.rootDueDateReducer
    );
    const _priority = useSelector(
        (state: RootStates) => state.rootPriorityReducer
    );
    const _newTaskTodo = useSelector(
        (state: RootStates) => state.rootTaskTodoReducer
    );
    const _taskTodoComplete = useSelector(
        (state: RootStates) => state.rootTaskTodoHandleCompleteReducer
    );

    const [tasks, setTasks] = useState<ITaskTodo[]>([]);
    const [dateTime, setDateTime] = useState("");
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [sectionName, setSectionName] = useState("");
    const [collapse, setCollapse] = useState(false);
    const [openAddTask, setOpenAddTask] = useState(false);
    const [checkValueTaskName, setCheckValueTaskName] = useState(true);
    const [checkValueSectionName, setCheckValueSectionName] = useState(true);
    const [openAddSection, setOpenAddSection] = useState(false);
    const tasksLength = tasks?.filter(
        (task) => task?.section_id === id && task?.isCompleted === false
    ).length;

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
        if (
            taskName.length < 0 ||
            taskName === "" ||
            dateTime === "07/01/2000 12:00:00 AM"
        ) {
            setCheckValueTaskName(true);
        } else {
            setCheckValueTaskName(false);
        }
    }, [taskName, dateTime]);

    useEffect(() => {
        if (sectionName.length < 0 || sectionName === "") {
            setCheckValueSectionName(true);
        } else {
            setCheckValueSectionName(false);
        }
    }, [sectionName]);

    useEffect(() => {
        axios({
            method: "GET",
            url: `TaskTodo/projectid/${projectId}`,
        })
            .then((res) => {
                setTasks(res.data.objectData);
                // console.log(res.data);
            })
            .catch((error) => console.error("Cannot get all Tasks: " + error));
    }, [projectId]);

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

    const handleChangeValueTaskname = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setTaskName(event.target.value);
    };

    const handleChangeValueDescription = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setDescription(event.target.value);
    };

    const hanldeCollapseSection = () => {
        setCollapse((previous) => !previous);
    };

    const hanldeOpenAddTask = () => {
        setOpenAddTask((previous) => !previous);
        setDescription("");
        setTaskName("");
    };

    const handleOpenAddSection = () => {
        setOpenAddSection((previous) => !previous);
    };

    const handleChangeValueSectionName = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setSectionName(event.target.value);
    };

    const handleAddSection = () => {
        axios({
            method: "POST",
            url: "/Section",
            data: {
                name: sectionName,
                project_Id: projectId,
            },
        })
            .then((res) => {
                // console.log(res.data.objectData);
                const newSection: ISection = res.data.objectData;
                dispatch(
                    setSection({
                        id: newSection.id,
                        name: newSection.name,
                        project_id: newSection.project_id,
                    })
                );
                handleOpenAddSection();
            })
            .catch((error) => {
                console.error("Cannot Create section: " + error);
            });
    };

    const handleAddTask = (sectionId: number) => {
        axios({
            method: "POST",
            url: "/TaskTodo",
            data: {
                name: taskName,
                description: description,
                priority: _priority.name === "" ? "P4" : _priority.name,
                isCompleted: false,
                due_Date: dateTime,
                createdAt: formatDate(new Date()),
                section_id: sectionId,
                sectionName: "",
            },
        })
            .then((res) => {
                // console.log(res.data.objectData);
                if (res.data.objectData !== null) {
                    setTasks((prevState) => {
                        if (prevState !== null) {
                            return prevState.concat(res.data.objectData);
                        } else {
                            return [res.data.objectData];
                        }
                    });
                    hanldeOpenAddTask();
                }
            })
            .catch((error) => {
                console.error("Cannot Create Task: ", error);
            });
    };

    return (
        <Fragment>
            <ModalOptionProjectComponent
                handleOpenAddSection={handleOpenAddSection}
            />

            <div className=" pt-4">
                {name !== "Default" && (
                    <div className=" flex items-center justify-between">
                        <div className=" flex items-center gap-2">
                            <button
                                type="button"
                                className={clsx(
                                    "left-4 top-31 tabletOrDesktop:left-52 Desktop:ml-64 Desktop:px-4 text-md text-neutral-500 hover:text-neutral-700 p-[6px] rounded-full hover:bg-gray-200 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                                )}
                                onClick={hanldeCollapseSection}
                            >
                                <span
                                    className={clsx(
                                        "[&>svg]:w-5 [&>svg]:transition-all duration-500 ease-in-out",
                                        {
                                            "[&>svg]:-rotate-90": collapse,
                                        }
                                    )}
                                >
                                    <ChevronDownIcon />
                                </span>
                            </button>
                            <h1
                                className={clsx("font-bold text-base", {
                                    "text-white": theme === "Dark",
                                })}
                            >
                                {name}
                            </h1>
                            <span className="inline-block whitespace-nowrap rounded-full  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary opacity-60">
                                {tasksLength !== 0 ? tasksLength : ""}
                            </span>
                        </div>
                        {/* <button
                            type="button"
                            className="text-md text-neutral-500 hover:text-neutral-700 p-[6px] rounded-xl hover:bg-gray-200 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                            data-te-toggle="modal"
                            data-te-target="#addtaskmodal"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                        >
                            <span className="[&>svg]:w-5">
                                <EllipsisHorizontalIcon />
                            </span>
                        </button> */}
                    </div>
                )}

                <div className="divide-y divide-gray-300 ">
                    <div
                        className={clsx("divide-y block", {
                            hidden: collapse,
                        })}
                    >
                        {tasks?.map((task) => {
                            return (
                                !task?.isCompleted &&
                                id === task?.section_id && (
                                    <TaskComponent
                                        key={task.id}
                                        id={task.id}
                                        name={task.name}
                                        priority={task.priority}
                                        section_id={task.section_id}
                                        due_Date={task.due_Date}
                                        description={task.description}
                                        isCompleted={task.isCompleted}
                                    />
                                )
                            );
                        })}
                        {openAddTask ? (
                            <div className="select-none divide-y w-full flex flex-col border mt-2 p-3 rounded-xl">
                                <div className="">
                                    <div className="flex flex-col gap-1">
                                        <input
                                            type="text"
                                            placeholder="Task name"
                                            className={clsx(
                                                "w-full font-bold border-0 outline-none",
                                                {
                                                    "bg-neutral-800 text-white":
                                                        theme === "Dark",
                                                }
                                            )}
                                            onChange={handleChangeValueTaskname}
                                            value={taskName}
                                            aria-autocomplete="none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Description"
                                            className={clsx(
                                                "w-full opacity-75 border-0 outline-none",
                                                {
                                                    "bg-neutral-800 text-white":
                                                        theme === "Dark",
                                                }
                                            )}
                                            onChange={
                                                handleChangeValueDescription
                                            }
                                            value={description}
                                            aria-autocomplete="none"
                                        />
                                    </div>
                                    <div className="mt-1">
                                        <div className="my-4 flex items-center gap-3">
                                            {/* DUE DATE */}
                                            <div
                                                className="flex items-center w-26 text-sm border border-opacity-50 rounded-lg p-[6px] hover:bg-gray-300 hover:cursor-pointer"
                                                data-te-toggle="modal"
                                                data-te-target="#calendaroption"
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                            >
                                                <ShowDueDateComponent
                                                    setDateTime={setDateTime}
                                                />
                                            </div>

                                            {/* RPIORITY */}
                                            <div
                                                className="flex items-center w-26 text-sm border border-opacity-50 rounded-lg p-[6px]  hover:bg-gray-300 hover:cursor-pointer"
                                                data-te-toggle="modal"
                                                data-te-target="#priorityoption"
                                            >
                                                {_priority.name === "" ||
                                                _priority.name === "P4" ? (
                                                    <div className="flex items-center opacity-50 ">
                                                        <span
                                                            className={clsx({
                                                                "text-white":
                                                                    theme ===
                                                                    "Dark",
                                                            })}
                                                        >
                                                            <OFlagIcon
                                                                className={clsx(
                                                                    `w-4 h-4 `
                                                                )}
                                                            />
                                                        </span>
                                                        <p
                                                            className={clsx(
                                                                "ml-2 ",
                                                                {
                                                                    "text-white":
                                                                        theme ===
                                                                        "Dark",
                                                                }
                                                            )}
                                                        >
                                                            Priority
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <span>
                                                            <SFlagIcon
                                                                className={clsx(
                                                                    `w-4 h-4 `,
                                                                    {
                                                                        "text-red-600":
                                                                            _priority.name ===
                                                                            "P1",
                                                                        "text-yellow-200":
                                                                            _priority.name ===
                                                                            "P2",
                                                                        "text-primary":
                                                                            _priority.name ===
                                                                            "P3",
                                                                    }
                                                                )}
                                                            />
                                                        </span>
                                                        <p
                                                            className={clsx(
                                                                "ml-2 font-thin",
                                                                {
                                                                    "text-white":
                                                                        theme ===
                                                                        "Dark",
                                                                }
                                                            )}
                                                        >
                                                            {_priority.name}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* MODAL-FOOTER */}
                                {/* CATEGORY */}

                                <div className="flex items-center justify-center pt-2 gap-4">
                                    <button
                                        type="button"
                                        className={clsx(
                                            "inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out ",
                                            {
                                                "text-primary-700 bg-primary-100 hover:bg-primary-accent-100 ":
                                                    theme === "Primary ",
                                                "text-white": theme === "Dark",
                                            }
                                        )}
                                        data-te-modal-dismiss
                                        data-te-ripple-init
                                        data-te-ripple-color="light"
                                        onClick={hanldeOpenAddTask}
                                    >
                                        {language === "en" ? "Cancel" : "Hủy"}
                                    </button>
                                    <button
                                        disabled={checkValueTaskName}
                                        type="button"
                                        className={clsx(
                                            "ml-1 cursor-pointer inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out   ",
                                            {
                                                "text-white bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]":
                                                    theme === "Primary",
                                                "text-neutral-800 bg-primary-100 hover:bg-opacity-70":
                                                    theme === "Dark",
                                                "text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] hover:opacity-80":
                                                    theme === "Neutral",
                                            }
                                        )}
                                        data-te-ripple-init
                                        data-te-modal-dismiss
                                        data-te-ripple-color="light"
                                        onClick={() => handleAddTask(id)}
                                    >
                                        {language === "en"
                                            ? "Add task"
                                            : "Thêm tác vụ"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="select-none w-full"
                                onClick={hanldeOpenAddTask}
                            >
                                <div className=" flex flex-col mt-2 ">
                                    <div className="flex flex-auto items-center gap-2 text-primary hover:text-primary cursor-pointer">
                                        <button
                                            type="button"
                                            className={clsx(
                                                "left-0 top-2 text-sm ",
                                                {
                                                    "text-neutral-500":
                                                        theme === "Primary",
                                                    "text-primary":
                                                        theme === "Dark",
                                                }
                                            )}
                                        >
                                            <span className="[&>svg]:w-5 [&>svg]:h-5  ">
                                                <PlusIcon />
                                            </span>
                                        </button>
                                        <p
                                            className={clsx("text-sm", {
                                                "text-white": theme === "Dark",
                                                "text-black":
                                                    theme === "Neutral",
                                            })}
                                        >
                                            {language === "en"
                                                ? "Add task"
                                                : "Thêm tác vụ"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {openAddSection && (
                    <div className="mt-6 p-2 w-full">
                        <input
                            type="text"
                            placeholder="Name this section"
                            className={clsx(
                                "font-bold border rounded-lg p-2 w-full outline-none ",
                                {
                                    "bg-neutral-800 text-white":
                                        theme === "Dark",
                                }
                            )}
                            onChange={handleChangeValueSectionName}
                            value={sectionName}
                            aria-autocomplete="none"
                        />
                        <div className="flex items-center mt-2">
                            <button
                                disabled={checkValueSectionName}
                                type="button"
                                className={clsx(
                                    "ml-1 cursor-pointer inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out   ",
                                    {
                                        "text-white bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]":
                                            theme === "Primary",
                                        "text-neutral-800 bg-primary-100 hover:bg-opacity-70":
                                            theme === "Dark",
                                        "text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] hover:opacity-80":
                                            theme === "Neutral",
                                    }
                                )}
                                data-te-ripple-init
                                data-te-modal-dismiss
                                data-te-ripple-color="light"
                                onClick={handleAddSection}
                            >
                                Add Section
                            </button>
                            <button
                                type="button"
                                className={clsx(
                                    "inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out ",
                                    {
                                        "text-primary-700 bg-primary-100 hover:bg-primary-accent-100 ":
                                            theme === "Primary ",
                                        "text-white": theme === "Dark",
                                    }
                                )}
                                data-te-modal-dismiss
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                onClick={handleOpenAddSection}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default SectionComponent;
