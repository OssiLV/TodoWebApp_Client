import { FlagIcon as OFlagIcon } from "@heroicons/react/24/outline";
import { FlagIcon as SFlagIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setPriority } from "../../States/PriorityReducer";
import { ITaskTodo, RootStates, isEmptyObject } from "../../Global";
import { Fragment } from "react";
import clsx from "clsx";

const ModalPriorityComponent = () => {
    const dispatch = useDispatch();
    const _modal = useSelector((state: RootStates) => state.rootModalReducer);
    const { language, theme } = useSelector(
        (state: RootStates) => state.rootUserReducer
    );

    const handleChangePriority_1 = (name: any) => {
        dispatch(setPriority({ id: 0, type: "ADDTASK", name }));
    };
    const handleChangePriority_2 = (name: any) => {
        dispatch(setPriority({ id: 0, type: "MODALTASK", name }));
    };

    const _taskTodo: ITaskTodo = _modal.data;
    const isEmptyTaskTodoObject: boolean = isEmptyObject(_taskTodo);

    return (
        <div
            data-te-modal-init
            className="fixed left-[1rem] top-[17rem] z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="priorityoption"
            aria-labelledby="priorityoption"
            aria-modal="true"
            role="dialog"
        >
            <div
                data-te-modal-dialog-ref
                className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[300px]"
            >
                <div
                    className={clsx(
                        "pointer-events-auto relative flex w-full flex-col rounded-md border-none  bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600",
                        {
                            "bg-white":
                                theme === "Primary" || theme === "Neutral",
                            "bg-gray-800": theme === "Dark",
                        }
                    )}
                >
                    {isEmptyTaskTodoObject ? (
                        <Fragment>
                            <div
                                className="relative"
                                onClick={() => handleChangePriority_1("P1")}
                                data-te-modal-dismiss
                            >
                                <div
                                    className={clsx(
                                        "relative flex h-10 w-full cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem]  outline-none transition duration-100 ease-linear ",
                                        {
                                            "text-gray-600 hover:bg-slate-300":
                                                theme === "Primary" ||
                                                theme === "Neutral",
                                            "text-white hover:bg-gray-500":
                                                theme === "Dark",
                                        }
                                    )}
                                >
                                    <span className="mr-4 h-6 w-6 text-red-600 ">
                                        <SFlagIcon className="" />
                                    </span>
                                    <span>
                                        {language === "en"
                                            ? "Priority 1"
                                            : "Ưu tiên 1"}
                                    </span>
                                </div>
                            </div>
                            <div
                                className="relative"
                                onClick={() => handleChangePriority_1("P2")}
                                data-te-modal-dismiss
                            >
                                <div
                                    className={clsx(
                                        "relative flex h-10 w-full cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem]  outline-none transition duration-100 ease-linear ",
                                        {
                                            "text-gray-600 hover:bg-slate-300":
                                                theme === "Primary" ||
                                                theme === "Neutral",
                                            "text-white hover:bg-gray-500":
                                                theme === "Dark",
                                        }
                                    )}
                                >
                                    <span className="mr-4 h-6 w-6 text-orange-500 ">
                                        <SFlagIcon className="" />
                                    </span>
                                    <span>
                                        {language === "en"
                                            ? "Priority 2"
                                            : "Ưu tiên 2"}
                                    </span>
                                </div>
                            </div>
                            <div
                                className="relative"
                                onClick={() => handleChangePriority_1("P3")}
                                data-te-modal-dismiss
                            >
                                <div
                                    className={clsx(
                                        "relative flex h-10 w-full cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem]  outline-none transition duration-100 ease-linear ",
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
                                        <SFlagIcon className="" />
                                    </span>
                                    <span>
                                        {language === "en"
                                            ? "Priority 3"
                                            : "Ưu tiên 3"}
                                    </span>
                                </div>
                            </div>
                            <div
                                className="relative"
                                onClick={() => handleChangePriority_1("P4")}
                                data-te-modal-dismiss
                            >
                                <div
                                    className={clsx(
                                        "relative flex h-10 w-full cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem]  outline-none transition duration-100 ease-linear ",
                                        {
                                            "text-gray-600 hover:bg-slate-300":
                                                theme === "Primary" ||
                                                theme === "Neutral",
                                            "text-white hover:bg-gray-500":
                                                theme === "Dark",
                                        }
                                    )}
                                >
                                    <span className="mr-4 h-6 w-6 opacity-50 ">
                                        <OFlagIcon className="" />
                                    </span>
                                    <span>
                                        {language === "en"
                                            ? "Priority 4"
                                            : "Ưu tiên 4"}
                                    </span>
                                </div>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div
                                className="relative"
                                onClick={() => handleChangePriority_2("P1")}
                                data-te-modal-dismiss
                            >
                                <div className="relative flex h-10 w-full cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem] text-gray-600 outline-none transition duration-100 ease-linear hover:bg-slate-300 hover:text-inherit hover:outline-none focus:bg-slate-300 focus:text-inherit focus:outline-none active:bg-slate-300 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none  dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10">
                                    <span className="mr-4 h-6 w-6 text-red-600 ">
                                        <SFlagIcon className="" />
                                    </span>
                                    <span>
                                        {" "}
                                        {language === "en"
                                            ? "Priority 1"
                                            : "Ưu tiên 1"}
                                    </span>
                                </div>
                            </div>
                            <div
                                className="relative"
                                onClick={() => handleChangePriority_2("P2")}
                                data-te-modal-dismiss
                            >
                                <div
                                    className={clsx(
                                        "relative flex h-10 w-full cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem]  outline-none transition duration-100 ease-linear ",
                                        {
                                            "text-gray-600 hover:bg-slate-300":
                                                theme === "Primary" ||
                                                theme === "Neutral",
                                            "text-white hover:bg-gray-500":
                                                theme === "Dark",
                                        }
                                    )}
                                >
                                    <span className="mr-4 h-6 w-6 text-orange-500 ">
                                        <SFlagIcon className="" />
                                    </span>
                                    <span>
                                        {" "}
                                        {language === "en"
                                            ? "Priority 2"
                                            : "Ưu tiên 2"}
                                    </span>
                                </div>
                            </div>
                            <div
                                className="relative"
                                onClick={() => handleChangePriority_2("P3")}
                                data-te-modal-dismiss
                            >
                                <div
                                    className={clsx(
                                        "relative flex h-10 w-full cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem]  outline-none transition duration-100 ease-linear ",
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
                                        <SFlagIcon className="" />
                                    </span>
                                    <span>
                                        {" "}
                                        {language === "en"
                                            ? "Priority 3"
                                            : "Ưu tiên 3"}
                                    </span>
                                </div>
                            </div>
                            <div
                                className="relative"
                                onClick={() => handleChangePriority_2("P4")}
                                data-te-modal-dismiss
                            >
                                <div
                                    className={clsx(
                                        "relative flex h-10 w-full cursor-pointer items-center truncate rounded-[5px] px-6 py-2 text-[0.875rem]  outline-none transition duration-100 ease-linear ",
                                        {
                                            "text-gray-600 hover:bg-slate-300":
                                                theme === "Primary" ||
                                                theme === "Neutral",
                                            "text-white hover:bg-gray-500":
                                                theme === "Dark",
                                        }
                                    )}
                                >
                                    <span className="mr-4 h-6 w-6 opacity-50 ">
                                        <OFlagIcon className="" />
                                    </span>
                                    <span>
                                        {" "}
                                        {language === "en"
                                            ? "Priority 4"
                                            : "Ưu tiên 4"}
                                    </span>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalPriorityComponent;
