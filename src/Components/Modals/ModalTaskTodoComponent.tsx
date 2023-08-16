import { FC, Fragment, MouseEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCloseModal, setOpenModal } from "../../States/ModalReducer";
import { FlagIcon as OFlagIcon } from "@heroicons/react/24/outline";
import { FlagIcon as SFlagIcon } from "@heroicons/react/24/solid";
import {
    XMarkIcon,
    EllipsisHorizontalIcon,
    PlusIcon,
    CheckIcon,
    CalendarIcon,
    SunIcon,
    MusicalNoteIcon,
    ForwardIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
    IModalTaskTodoComponent,
    IProject,
    ISection,
    ITaskTodo,
    RootStates,
    formatDate,
    parseDate,
} from "../../Global";
import { Ripple, initTE } from "tw-elements";
import axios from "axios";
import {
    setTaskTodoComplete,
    setTaskTodoUndoComplete,
} from "../../States/TaskTodoHandleComplete";
import {
    isSameDay,
    isToday,
    isTomorrow,
    nextDay,
    startOfDay,
    subDays,
} from "date-fns";

import { setPriority } from "../../States/PriorityReducer";
import { setDueDate } from "../../States/DueDateReducer";

const ModalTaskTodoComponent: FC<IModalTaskTodoComponent> = ({
    listProjects,
    listSections,
}) => {
    useEffect(() => {
        initTE({ Ripple });
    }, []);

    const dispatch = useDispatch();

    const { fullDateTime } = useSelector(
        (state: RootStates) => state.rootDueDateReducer
    );
    const _priority = useSelector(
        (state: RootStates) => state.rootPriorityReducer
    );
    const _modal = useSelector((state: RootStates) => state.rootModalReducer);
    const _taskTodo: ITaskTodo = _modal.data;
    let dueDateTaskTodo = parseDate(_taskTodo.due_Date);

    const [section, setSection] = useState<ISection>();
    const [project, setProject] = useState<IProject>();
    const [completed, setCompleted] = useState(false);

    let dateTime = new Date(
        "Mon Jul 1 0000 00:00:00 GMT+0700 (Indochina Time)"
    );
    if (fullDateTime !== "Mon Jul 1 0000 00:00:00 GMT+0700 (Indochina Time)") {
        dateTime = new Date(fullDateTime);
    }

    const handleCloseModal = () => {
        dispatch(setCloseModal());
        dispatch(setPriority({ id: 0, type: "ADDTASK", name: "" }));
        dispatch(
            setDueDate({
                task_id: 0,
                type: "",
                fullDateTime:
                    "Mon Jul 1 0000 00:00:00 GMT+0700 (Indochina Time)",
            })
        );
    };

    const handlePreventEventFromParent = (
        event: MouseEvent<HTMLDivElement>
    ) => {
        event.stopPropagation();
    };

    const handleCompletedTaskTodo = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        if (!completed) {
            axios({
                method: "PUT",
                url: `TaskTodo/complete/${_taskTodo.id}`,
            })
                .then(() => {
                    dispatch(
                        setTaskTodoComplete({
                            id: _taskTodo.id,
                            isCompleted: true,
                        })
                    );
                    setCompleted(true);
                })
                .catch((error) => {
                    console.error(
                        "Cannot set completed for this task: ",
                        error
                    );
                });
        } else {
            axios({
                method: "PUT",
                url: `TaskTodo/undocomplete/${_taskTodo.id}`,
            })
                .then(() => {
                    dispatch(
                        setTaskTodoUndoComplete({
                            id: _taskTodo.id,
                            isCompleted: false,
                        })
                    );
                    setCompleted(false);
                })
                .catch((error) => {
                    console.error(
                        "Cannot undo completed for this task: ",
                        error
                    );
                });
        }
    };

    const handleClickCategory = () => {
        // navigate(`/app/project/${project?.id}`);
        dispatch(setCloseModal());
    };

    useEffect(() => {
        if (
            fullDateTime !==
                "Mon Jul 1 0000 00:00:00 GMT+0700 (Indochina Time)" &&
            fullDateTime !== ""
        ) {
            axios({
                method: "PUT",
                url: `TaskTodo/duedate/${_taskTodo.id}`,
                data: {
                    due_Date: formatDate(dateTime),
                },
            })
                .then((res) => {
                    // console.log(fullDateTime);
                    dispatch(
                        setDueDate({
                            task_id: _taskTodo.id,
                            type: "UPDATE",
                            fullDateTime,
                        })
                    );
                })
                .catch((error) => {
                    console.error(
                        "Cannot update DueDate for this Task: " + error
                    );
                });
        }
    }, [fullDateTime]);

    useEffect(() => {
        setSection(
            listSections.find((section) => section.id === _taskTodo.section_id)
        );
    }, [_taskTodo, listSections]);

    useEffect(() => {
        setProject(
            listProjects.find((project) => project.id === section?.project_id)
        );
    }, [section, listProjects]);

    // Copy _taskTodo
    const taskTodo = useMemo(() => {
        return {
            ..._taskTodo,
        };
    }, [_taskTodo]);

    if (_priority.name !== "") {
        taskTodo.priority = _priority.name;
    }

    useEffect(() => {
        axios({
            method: "PUT",
            url: `/TaskTodo/priority/${taskTodo.id}`,
            data: {
                priority: taskTodo.priority,
            },
        })
            .then((res) => {
                dispatch(
                    setPriority({
                        id: taskTodo.id,
                        name: taskTodo.priority,
                        type: "MODALTASK",
                    })
                );
            })
            .catch((error) => {
                console.error("Cannot update priority for this task: " + error);
            });
    }, [taskTodo.priority, taskTodo.id]);

    return (
        <div
            onClick={handleCloseModal}
            className="fixed z-30 inset-0 bg-neutral-500 bg-opacity-50 w-full"
        >
            <div
                onClick={handlePreventEventFromParent}
                className="z-40 absolute top-[10%] left-[30%] flex flex-col divide-y rounded-xl  text-black bg-white  w-[864px] h-[680px]"
            >
                <div className="py-2 px-4 flex justify-between items-center p-3">
                    <div className="flex items-center">
                        <span
                            className={clsx("mr-4 h-3 w-3 rounded-full", {
                                "bg-[#6d28d9]":
                                    project?.color.tailwindBgHexCode ===
                                    "bg-[#6d28d9]",
                                "bg-[#dbeafe]":
                                    project?.color.tailwindBgHexCode ===
                                    "bg-[#dbeafe]",
                                "bg-[#60a5fa]":
                                    project?.color.tailwindBgHexCode ===
                                    "bg-[#60a5fa]",
                                "bg-[#a3a3a3]":
                                    project?.color.tailwindBgHexCode ===
                                    "bg-[#a3a3a3]",
                                "bg-[#0d9488]":
                                    project?.color.tailwindBgHexCode ===
                                    "bg-[#0d9488]",
                            })}
                        ></span>
                        <div className="flex items-center text-black text-sm">
                            <p
                                className="hover:underline cursor-pointer"
                                onClick={handleClickCategory}
                            >
                                {project?.name !== undefined
                                    ? project?.name.length >= 15
                                        ? project?.name.substring(0, 10) + "..."
                                        : project?.name
                                    : ""}
                            </p>

                            {section?.name !== "Default" ? (
                                <p className="flex items-center">
                                    <span className="mx-2 text-2xl ">/</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M19.5 20a.5.5 0 010 1h-15a.5.5 0 010-1h15zM18 6a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h12zm0 1H6a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V8a1 1 0 00-1-1zm-6 2a.5.5 0 01.5.5v2h2a.5.5 0 010 1h-2v2a.5.5 0 01-1 0v-2h-2a.5.5 0 010-1h2v-2A.5.5 0 0112 9zm7.5-6a.5.5 0 010 1h-15a.5.5 0 010-1h15z"
                                        ></path>
                                    </svg>
                                    {project?.name !== undefined
                                        ? project?.name.length >= 15
                                            ? section?.name.substring(0, 10) +
                                              "..."
                                            : section?.name
                                        : ""}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2 items-center text-gray-500 ">
                        <span className="p-1 hover:bg-neutral-200 rounded-lg cursor-pointer transition-all duration-200 ease-in-out">
                            <EllipsisHorizontalIcon className="h-6 w-6 " />
                        </span>
                        <span
                            className="p-1 hover:bg-neutral-200 rounded-lg cursor-pointer transition-all duration-200 ease-in-out"
                            onClick={handleCloseModal}
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </span>
                    </div>
                </div>
                <div className="flex w-full h-full">
                    <div className="pt-6 px-4 flex-auto ">
                        <div className="flex gap-4">
                            {/* TASK-INFOR */}
                            <button
                                type="button"
                                onClick={handleCompletedTaskTodo}
                                className=" text-sm text-neutral-500 mb-9"
                            >
                                {completed ? (
                                    <div
                                        className={clsx(
                                            "p-[8px] cursor-pointer border-[2px] rounded-full w-5 h-5  ",
                                            {
                                                "border-red-600 ":
                                                    taskTodo.priority === "P1",
                                                "border-orange-500 ":
                                                    taskTodo.priority === "P2",
                                                "border-primary ":
                                                    taskTodo.priority === "P3",
                                                "border-neutral-500 ":
                                                    taskTodo.priority === "P4",
                                            }
                                        )}
                                    >
                                        <span className={clsx(" absolute")}>
                                            <CheckIcon
                                                className={clsx(
                                                    "relative rounded-full bg-opacity-30 right-2 bottom-2 h-4 w-4",
                                                    {
                                                        "text-red-600 bg-red-600":
                                                            taskTodo.priority ===
                                                            "P1",
                                                        "text-orange-500 bg-orange-500":
                                                            taskTodo.priority ===
                                                            "P2",
                                                        "text-primary bg-primary":
                                                            taskTodo.priority ===
                                                            "P3",
                                                        "text-neutral-500 bg-neutral-500":
                                                            taskTodo.priority ===
                                                            "P4",
                                                    }
                                                )}
                                            />
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className={clsx(
                                            "p-[8px] cursor-pointer border-[2px] rounded-full w-5 h-5 hover:bg-opacity-30 transition-all duration-200 ease-linear hover:w-6 hover:h-6 ",
                                            {
                                                "border-red-600 hover:bg-red-600":
                                                    taskTodo.priority === "P1",
                                                "border-orange-500 hover:bg-orange-500":
                                                    taskTodo.priority === "P2",
                                                "border-primary hover:bg-primary":
                                                    taskTodo.priority === "P3",
                                                "border-neutral-500 hover:bg-neutral-500":
                                                    taskTodo.priority === "P4",
                                            }
                                        )}
                                    ></div>
                                )}
                            </button>

                            <div className="flex flex-col gap-4">
                                <div
                                    className={clsx("text-2xl font-bold", {
                                        "line-through": completed,
                                    })}
                                >
                                    {_taskTodo.name}
                                </div>
                                <div className="">{_taskTodo.description}</div>
                            </div>
                        </div>
                        {!completed && (
                            <div className="ml-6 mt-5 transition-all duration-200 ease-in-out text-sm text-gray-500 font-bold flex items-center gap-1 cursor-pointer p-2 rounded-lg hover:bg-neutral-200">
                                <span className="">
                                    <PlusIcon className="h-5 w-5" />
                                </span>
                                Add sub-task
                            </div>
                        )}
                    </div>
                    <div
                        className={clsx(
                            "flex flex-col w-[15rem] h-full bg-neutral-100 p-5 px-8 text-sm divide-y gap-2 select-none"
                        )}
                    >
                        {/* DUE-DATE */}
                        <div
                            className={clsx("py-4", {
                                "opacity-50": completed,
                            })}
                        >
                            <p className="text-gray-500 font-bold">Due Date</p>
                            <div
                                className={clsx(
                                    "mt-2 cursor-pointer p-1 hover:bg-neutral-200 rounded-md "
                                )}
                                data-te-toggle="modal"
                                data-te-target="#calendaroption"
                            >
                                {fullDateTime ===
                                "Mon Jul 1 0000 00:00:00 GMT+0700 (Indochina Time)" ? (
                                    isToday(dueDateTaskTodo) ? (
                                        <div className="flex items-center text-lime-500 font-bold">
                                            <span>
                                                <CalendarIcon className="w-4 h-4 " />
                                            </span>
                                            <p className="ml-2 ">Today</p>
                                        </div>
                                    ) : isTomorrow(dueDateTaskTodo) ? (
                                        <div className="flex items-center text-yellow-500 font-bold">
                                            <span>
                                                <SunIcon className="w-4 h-4 " />
                                            </span>
                                            <p className="ml-2 ">Tomorrow</p>
                                        </div>
                                    ) : isSameDay(
                                          subDays(
                                              nextDay(
                                                  startOfDay(new Date()),
                                                  1
                                              ),
                                              1
                                          ),
                                          dueDateTaskTodo
                                      ) ? (
                                        <div className="flex items-center text-primary font-bold">
                                            <span>
                                                <MusicalNoteIcon className="w-4 h-4 " />
                                            </span>
                                            <p className="ml-2 ">
                                                {dueDateTaskTodo.toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        weekday: "long",
                                                    }
                                                )}
                                            </p>
                                        </div>
                                    ) : isSameDay(
                                          nextDay(startOfDay(new Date()), 1),
                                          dueDateTaskTodo
                                      ) ? (
                                        <div className="flex items-center text-purple-500 font-bold">
                                            <span>
                                                <ForwardIcon className="w-4 h-4 " />
                                            </span>
                                            <p className="ml-2 ">
                                                {dueDateTaskTodo.toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        weekday: "long",
                                                    }
                                                )}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center opacity-50 font-bold px-2">
                                            <span>
                                                <CalendarIcon className="w-4 h-4 " />
                                            </span>
                                            <p className="ml-2 ">
                                                {dueDateTaskTodo.toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        day: "2-digit",
                                                        weekday: "short",
                                                    }
                                                )}
                                            </p>
                                        </div>
                                    )
                                ) : isToday(dateTime) ? (
                                    <div className="flex items-center text-lime-500 font-bold">
                                        <span>
                                            <CalendarIcon className="w-4 h-4 " />
                                        </span>
                                        <p className="ml-2 ">Today</p>
                                    </div>
                                ) : isTomorrow(dateTime) ? (
                                    <div className="flex items-center text-yellow-500 font-bold">
                                        <span>
                                            <SunIcon className="w-4 h-4 " />
                                        </span>
                                        <p className="ml-2 ">Tomorrow</p>
                                    </div>
                                ) : isSameDay(
                                      subDays(
                                          nextDay(startOfDay(new Date()), 1),
                                          1
                                      ),
                                      dateTime
                                  ) ? (
                                    <div className="flex items-center text-primary font-bold">
                                        <span>
                                            <MusicalNoteIcon className="w-4 h-4 " />
                                        </span>
                                        <p className="ml-2 ">
                                            {dateTime.toLocaleDateString(
                                                "en-US",
                                                {
                                                    weekday: "long",
                                                }
                                            )}
                                        </p>
                                    </div>
                                ) : isSameDay(
                                      nextDay(startOfDay(new Date()), 1),
                                      dateTime
                                  ) ? (
                                    <div className="flex items-center text-purple-500 font-bold">
                                        <span>
                                            <ForwardIcon className="w-4 h-4 " />
                                        </span>
                                        <p className="ml-2 ">
                                            {dateTime.toLocaleDateString(
                                                "en-US",
                                                {
                                                    weekday: "long",
                                                }
                                            )}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex items-center opacity-50 font-bold px-2">
                                        <span>
                                            <CalendarIcon className="w-4 h-4 " />
                                        </span>
                                        <p className="ml-2 ">
                                            {dateTime.toLocaleDateString(
                                                "en-US",
                                                {
                                                    day: "2-digit",
                                                    weekday: "short",
                                                }
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* PRIORITY */}
                        <div
                            className={clsx("py-4", {
                                "opacity-50": completed,
                            })}
                        >
                            <p className="text-gray-500 font-bold">Priority</p>
                            <div
                                className="mt-2 cursor-pointer p-1 hover:bg-neutral-200 rounded-md "
                                data-te-toggle="modal"
                                data-te-target="#priorityoption"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                            >
                                {_priority.type === "MODALTASK" &&
                                _priority.name !== "" ? (
                                    <Fragment>
                                        {_priority.name === "P4" ? (
                                            <div className="flex items-center opacity-50 font-bold px-2">
                                                <span>
                                                    <OFlagIcon
                                                        className={clsx(
                                                            `w-4 h-4 `
                                                        )}
                                                    />
                                                </span>
                                                <p className="ml-2 ">
                                                    {_priority.name}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex items-center font-bold px-2">
                                                <span>
                                                    <SFlagIcon
                                                        className={clsx(
                                                            `w-4 h-4 `,
                                                            {
                                                                "text-red-600":
                                                                    _priority.name ===
                                                                    "P1",
                                                                "text-orange-500":
                                                                    _priority.name ===
                                                                    "P2",
                                                                "text-primary":
                                                                    _priority.name ===
                                                                    "P3",
                                                            }
                                                        )}
                                                    />
                                                </span>
                                                <p className="ml-2 font-thin">
                                                    {_priority.name}
                                                </p>
                                            </div>
                                        )}
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        {_taskTodo.priority === "P4" ? (
                                            <div className="flex items-center opacity-50 font-bold px-2">
                                                <span>
                                                    <OFlagIcon
                                                        className={clsx(
                                                            `w-4 h-4 `
                                                        )}
                                                    />
                                                </span>
                                                <p className="ml-2 ">P4</p>
                                            </div>
                                        ) : (
                                            <div className="flex items-center font-bold px-2">
                                                <span>
                                                    <SFlagIcon
                                                        className={clsx(
                                                            `w-4 h-4 `,
                                                            {
                                                                "text-red-600":
                                                                    _taskTodo.priority ===
                                                                    "P1",
                                                                "text-orange-500":
                                                                    _taskTodo.priority ===
                                                                    "P2",
                                                                "text-primary":
                                                                    _taskTodo.priority ===
                                                                    "P3",
                                                            }
                                                        )}
                                                    />
                                                </span>
                                                <p className="ml-2 font-thin">
                                                    {_taskTodo.priority}
                                                </p>
                                            </div>
                                        )}
                                    </Fragment>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalTaskTodoComponent;
