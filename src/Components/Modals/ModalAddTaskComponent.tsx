import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { Modal, Ripple, initTE } from "tw-elements";
import { useDispatch, useSelector } from "react-redux";
import { IDataTransfer, ITaskTodo, RootStates } from "../../Global";
import { FlagIcon as OFlagIcon } from "@heroicons/react/24/outline";
import { FlagIcon as SFlagIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import ShowDueDateComponent from "../ShowDueDateComponent";
import axios from "axios";
import { formatDate } from "../../Global";
import { setTaskTodo } from "../../States/TaskTodoReducer";
import { setDueDate } from "../../States/DueDateReducer";
import { setPriority } from "../../States/PriorityReducer";
import { setDataTransfer } from "../../States/DataTransferReducer";

const ModalAddTaskComponent = () => {
    useEffect(() => {
        initTE({ Modal, Ripple });
    }, []);

    const dispatch = useDispatch();

    const { theme, language } = useSelector(
        (state: RootStates) => state.rootUserReducer
    );
    const _priority = useSelector(
        (state: RootStates) => state.rootPriorityReducer
    );
    const _dataTransfer = useSelector(
        (state: RootStates) => state.rootDataTransferReducer
    );
    let _projectName = _dataTransfer.categories.split("$_*_/_*_$")[0];
    let _sectionName = _dataTransfer.categories?.split("$_*_/_*_$")[1];

    const [dateTime, setDateTime] = useState("");
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [checkValue, setCheckValue] = useState(true);

    const handleChangeValueTaskName = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTaskName(event.target.value);
    };
    const handleChangeValueDescription = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescription(event.target.value);
    };

    const handleAddTask = () => {
        dispatch(
            setDueDate({
                task_id: 0,
                type: "",
                fullDateTime:
                    "Mon Jul 1 0000 00:00:00 GMT+0700 (Indochina Time)",
            })
        );

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
                project_id: _dataTransfer.project_id,
                section_id: _dataTransfer.section_id,
                sectionName: _dataTransfer.name,
            },
        })
            .then((res) => {
                const newTaskTodo: ITaskTodo = res.data.objectData;

                dispatch(
                    setTaskTodo({
                        id: newTaskTodo.id,
                        name: newTaskTodo.name,
                        description: newTaskTodo.description,
                        priority: newTaskTodo.priority,
                        due_Date: newTaskTodo.due_Date,
                        isCompleted: newTaskTodo.isCompleted,
                        section_id: newTaskTodo.section_id,
                    })
                );
            })
            .then(() => {
                handleCancel();
            })
            .catch((error) => {
                console.error("Cannot Create Task: ", error);
            });
    };

    const handleCancel = () => {
        dispatch(
            setDueDate({
                task_id: 0,
                type: "",
                fullDateTime:
                    "Mon Jul 1 0000 00:00:00 GMT+0700 (Indochina Time)",
            })
        );
        dispatch(setPriority({ id: 0, name: "", type: "" }));
        dispatch(
            setDataTransfer({
                project_id: 0,
                section_id: 0,
                name: "",
                categories: "",
                tailwindBgHexCode: "",
            })
        );
        setTaskName("");
        setDescription("");
    };

    useEffect(() => {
        if (
            taskName.length < 0 ||
            taskName === "" ||
            dateTime === "07/01/2000 12:00:00 AM"
        ) {
            setCheckValue(true);
        } else {
            setCheckValue(false);
        }
    }, [taskName, dateTime, _dataTransfer]);

    const priority = useMemo(() => {
        return {
            ..._priority,
        };
    }, [_priority]);

    switch (_priority.name) {
        case "":
            priority.name = "P4";
            break;
        case "P1":
            priority.name = "P1";
            break;
        case "P2":
            priority.name = "P2";
            break;
        case "P3":
            priority.name = "P3";
            break;
    }

    return (
        <div
            data-te-modal-init
            className="fixed  left-0 bottom-[10rem] z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="addtaskmodal"
            aria-labelledby="addtaskmodal"
            aria-modal="true"
            data-te-backdrop="static"
            data-te-keyboard="false"
            role="dialog"
        >
            <div
                data-te-modal-dialog-ref
                className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
            >
                <div
                    className={clsx(
                        "pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-clip-padding text-current shadow-lg outline-none ",
                        {
                            " bg-gray-800": theme === "Dark",
                            " bg-white":
                                theme === "Primary" || theme === "Neutral",
                        }
                    )}
                >
                    {/* MODAL-BODY */}
                    <div className="relative p-4 ">
                        {/* TASK-NAME */}
                        <div className="relative mb-3">
                            <input
                                className={clsx(
                                    "text-xl min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none",
                                    {
                                        "bg-neutral-800 text-white":
                                            theme === "Dark",
                                    }
                                )}
                                type="text"
                                placeholder={
                                    language === "en"
                                        ? "Task Name"
                                        : "Tên tác vụ"
                                }
                                value={taskName}
                                onChange={handleChangeValueTaskName}
                                aria-autocomplete="none"
                            />
                        </div>

                        {/* DESCRIPTION */}
                        <div className="relative mb-3">
                            <input
                                className={clsx(
                                    "text-sm min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none ",
                                    {
                                        "bg-neutral-800 text-white":
                                            theme === "Dark",
                                    }
                                )}
                                type="text"
                                placeholder={
                                    language === "en" ? "Description" : "Mô tả"
                                }
                                value={description}
                                onChange={handleChangeValueDescription}
                                aria-autocomplete="none"
                            />
                        </div>

                        {/* OPTIONS */}
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
                                data-te-ripple-init
                                data-te-ripple-color="light"
                            >
                                {priority.name === "P4" ? (
                                    <div
                                        className={clsx(
                                            "flex items-center opacity-50",
                                            {
                                                "text-white": theme === "Dark",
                                            }
                                        )}
                                    >
                                        <span>
                                            <OFlagIcon
                                                className={clsx(`w-4 h-4 `)}
                                            />
                                        </span>
                                        <p className="ml-2 ">
                                            {language === "en"
                                                ? "Priority"
                                                : "Ưu tiên"}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <span>
                                            <SFlagIcon
                                                className={clsx(`w-4 h-4 `, {
                                                    "text-red-600":
                                                        priority.name === "P1",
                                                    "text-orange-500":
                                                        priority.name === "P2",
                                                    "text-primary":
                                                        priority.name === "P3",
                                                })}
                                            />
                                        </span>
                                        <p
                                            className={clsx("ml-2 font-thin", {
                                                "text-white": theme === "Dark",
                                            })}
                                        >
                                            {priority.name}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* MODAL-FOOTER */}
                        {/* CATEGORY */}
                        <div className="flex items-center justify-between w-full">
                            <button
                                type="button"
                                className=" text-primary hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                                data-te-toggle="modal"
                                data-te-target="#modalCategoryComponent"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                            >
                                {_dataTransfer?.categories !== "" ? (
                                    <div className="flex items-center">
                                        <span
                                            className={clsx(
                                                "mr-4 h-3 w-3 rounded-full",
                                                {
                                                    "bg-[#6d28d9]":
                                                        _dataTransfer?.tailwindBgHexCode ===
                                                        "bg-[#6d28d9]",
                                                    "bg-[#dbeafe]":
                                                        _dataTransfer?.tailwindBgHexCode ===
                                                        "bg-[#dbeafe]",
                                                    "bg-[#60a5fa]":
                                                        _dataTransfer?.tailwindBgHexCode ===
                                                        "bg-[#60a5fa]",
                                                    "bg-[#a3a3a3]":
                                                        _dataTransfer?.tailwindBgHexCode ===
                                                        "bg-[#a3a3a3]",
                                                    "bg-[#0d9488]":
                                                        _dataTransfer?.tailwindBgHexCode ===
                                                        "bg-[#0d9488]",
                                                }
                                            )}
                                        ></span>
                                        <div
                                            className={clsx("flex ", {
                                                "text-white": theme === "Dark",
                                                "text-black":
                                                    theme === "Primary" ||
                                                    theme === "Neutral",
                                            })}
                                        >
                                            {_projectName.length >= 15
                                                ? _projectName.substring(
                                                      0,
                                                      10
                                                  ) + "..."
                                                : _projectName}

                                            {_sectionName ? (
                                                <p className="flex items-center">
                                                    <span className="mx-1">
                                                        /
                                                    </span>
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
                                                    {_projectName.length >= 15
                                                        ? _sectionName.substring(
                                                              0,
                                                              10
                                                          ) + "..."
                                                        : _sectionName}
                                                </p>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <span className="">
                                        <PlusIcon className="w-5" />
                                    </span>
                                )}
                            </button>

                            <div className="flex items-center ">
                                <button
                                    type="button"
                                    className={clsx(
                                        "inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out  ",
                                        {
                                            "text-primary-700 bg-primary-100 hover:bg-primary-accent-100 ":
                                                theme === "Primary ",
                                            "text-white": theme === "Dark",
                                        }
                                    )}
                                    data-te-modal-dismiss
                                    onClick={handleCancel}
                                >
                                    {language === "en" ? "Cancel" : "Hủy"}
                                </button>
                                <button
                                    type="button"
                                    disabled={checkValue}
                                    onClick={handleAddTask}
                                    className={clsx(
                                        "ml-1 inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ",
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
                                >
                                    {language === "en"
                                        ? "Add task"
                                        : "Thêm tác vụ"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAddTaskComponent;
