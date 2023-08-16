import { Bars3Icon, PlusIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";
import ModalAddTaskComponent from "./Modals/ModalAddTaskComponent";
import ModalDueDateComponent from "./Modals/ModalDueDateComponent";
import ModalAccountComponent from "./Modals/ModalAccountComponent";
import ModalPriorityComponent from "./Modals/ModalPriorityComponent";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from "../States/ModalReducer";
import { RootStates } from "../Global";
import clsx from "clsx";

const NavbarComponent = () => {
    const baseURLServer = process.env.REACT_APP_BASE_SERVER_URL;

    const { theme, language, image } = useSelector(
        (state: RootStates) => state.rootUserReducer
    );
    const [isOpenModalAccount, setIsOpenModalAccount] = useState(false);

    const openAccountModal = () => {
        setIsOpenModalAccount(true);
    };

    const closeAccountModal = () => {
        setIsOpenModalAccount(false);
    };
    // console.log(image);

    return (
        <Fragment>
            <ModalAddTaskComponent />
            <ModalDueDateComponent />
            <ModalPriorityComponent />
            {isOpenModalAccount && (
                <ModalAccountComponent
                    handleCloseAccountModal={closeAccountModal}
                />
            )}

            <nav
                className={clsx(
                    "fixed flex-no-wrap h-12 z-10 flex w-full items-center justify-between  py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4",
                    {
                        "bg-neutral-100 text-neutral-700": theme === "Neutral",
                        "bg-primary text-white": theme === "Primary",
                        "bg-gray-800 text-white": theme === "Dark",
                    }
                )}
                data-te-navbar-ref
            >
                <div className="flex w-full flex-wrap items-center justify-between px-3 ">
                    {/* NAV-LEFT-SIDE */}
                    <button
                        type="button"
                        className={clsx(
                            "block border-0 bg-transparent px-2  rounded-lg transition duration-500 ease-linear"
                        )}
                        data-te-sidenav-toggle-ref
                        data-te-target="#sidebar"
                        aria-controls="#sidebar"
                    >
                        <span className="[&>svg]:w-7">
                            <Bars3Icon />
                        </span>
                    </button>

                    {/* NAV-RIGHT-SIDE */}
                    <div className="relative flex items-center">
                        {/* ADD-TASK */}
                        <button
                            type="button"
                            className={clsx(
                                "mr-4 hover:underline hover:opacity-80 rounded-lg px-2 py-1"
                            )}
                            data-te-toggle="modal"
                            data-te-target="#addtaskmodal"
                        >
                            <span className="[&>svg]:w-5 flex items-center gap-1 tracking-wider uppercase">
                                <PlusIcon />
                                {language === "en" ? "Add Task" : "Thêm tác vụ"}
                            </span>
                        </button>

                        {/* AVATAR */}
                        <div
                            className={clsx(
                                "relative rounded-full p-1 cursor-pointer  transition-all duration-500",
                                {
                                    "hover:bg-black": theme === "Neutral",
                                    "hover:bg-white":
                                        theme === "Primary" || "Black",
                                }
                            )}
                            onClick={openAccountModal}
                        >
                            <div className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none">
                                <img
                                    src={baseURLServer + image}
                                    className="rounded-full w-[40px] h-[40px]"
                                    alt=""
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
};

export default NavbarComponent;
