import {
    BriefcaseIcon,
    CalendarDaysIcon,
    CalendarIcon,
    HeartIcon,
} from "@heroicons/react/24/solid";
import { FC, Fragment, useEffect } from "react";
import { Sidenav, initTE } from "tw-elements";
import { useMediaQuery } from "react-responsive";
import ModalAddProjectComponent from "./Modals/ModalAddProjectComponent";

import { ISidenavComponent, RootStates } from "../Global";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SidenavComponent: FC<ISidenavComponent> = ({ listProjects }) => {
    useEffect(() => {
        initTE({ Sidenav });
    }, []);
    const { theme, language } = useSelector(
        (state: RootStates) => state.rootUserReducer
    );

    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: "(max-width: 420px)" });

    const handleClickProject = (projectId: number, projectName: string) => {
        navigate(`/app/project/${projectId}`);
    };

    return (
        <Fragment>
            <ModalAddProjectComponent />
            <nav
                id="sidebar"
                className={clsx(
                    "fixed mt-[3rem] left-0 top-0 z-10 h-screen w-60 -translate-x-full overflow-hidden  shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800 ",
                    {
                        "bg-white": theme === "Primary",
                        "bg-gray-800": theme === "Dark",
                        "bg-neutral-100": theme === "Neutral",
                    }
                )}
                data-te-sidenav-init
                data-te-sidenav-hidden="false"
                data-te-sidenav-mode={isMobile ? "over" : "side"}
                data-te-sidenav-content="#content"
            >
                <ul
                    className="relative m-0 list-none px-[0.2rem] select-none "
                    data-te-sidenav-menu-ref
                >
                    {/* TODAY */}
                    <li className="relative">
                        <Link
                            to="/app/today"
                            className={clsx(
                                "flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem]  transition duration-300 ease-linear  ",
                                {
                                    "hover:bg-gray-900 ": theme === "Dark",
                                    "hover:bg-slate-300": theme === "Neutral",
                                    "hover:bg-primary-100": theme === "Primary",
                                }
                            )}
                            data-te-sidenav-link-ref
                        >
                            <span className="mr-4 h-4 w-4 text-lime-500">
                                <CalendarIcon className="" />
                            </span>
                            <span
                                className={clsx("tracking-wider", {
                                    "text-white": theme === "Dark",
                                    "text-gray-600":
                                        theme === "Primary" || "Neutral",
                                })}
                            >
                                {language === "en" ? "Today" : "Hôm nay"}
                            </span>
                        </Link>
                    </li>

                    {/* UPCOMMING */}
                    {/* <li className="relative">
                        <Link
                            to="/app/upcomming"
                            className={clsx(
                                "flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem]  transition duration-300 ease-linear  hover:text-inherit hover:outline-none ",
                                {
                                    "hover:bg-gray-900 ": theme === "Dark",
                                    "hover:bg-slate-300": theme === "Neutral",
                                    "hover:bg-primary-100": theme === "Primary",
                                }
                            )}
                            data-te-sidenav-link-ref
                        >
                            <span className="mr-4 h-4 w-4 text-purple-500 dark:text-gray-300">
                                <CalendarDaysIcon className="" />
                            </span>
                            <span
                                className={clsx("tracking-wider",{
                                    "text-white": theme === "Dark",
                                })}
                            >
                            {language === "en" ? "Calendar" : "Lịch"}
                                
                            </span>
                        </Link>
                    </li> */}

                    {/* FAVORITES */}
                    <li className="relative">
                        <div
                            className={clsx(
                                "flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem]  transition duration-300 ease-linear  hover:text-inherit hover:outline-none ",
                                {
                                    "hover:bg-gray-900 ": theme === "Dark",
                                    "hover:bg-slate-300": theme === "Neutral",
                                    "hover:bg-primary-100": theme === "Primary",
                                }
                            )}
                            data-te-sidenav-link-ref
                        >
                            <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 text-red-600 dark:[&>svg]:text-gray-300">
                                <HeartIcon className="" />
                            </span>
                            <span
                                className={clsx("tracking-wider", {
                                    "text-white": theme === "Dark",
                                })}
                            >
                                {language === "en" ? "Favorites" : "Yêu thích"}
                            </span>

                            <span
                                className={clsx(
                                    "absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linea",
                                    {
                                        "text-white": theme === "Dark",
                                        "text-primary": theme === "Primary",
                                        "text-neutral-700": theme === "Neutral",
                                    }
                                )}
                                data-te-sidenav-rotate-icon-ref
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </div>
                        <ul
                            className="!visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block "
                            data-te-sidenav-collapse-ref
                        >
                            {listProjects?.map(
                                (project) =>
                                    project?.isFavorite &&
                                    !project.isDeleted &&
                                    project.id !== 0 && (
                                        <li
                                            key={project?.id}
                                            onClick={() =>
                                                handleClickProject(
                                                    project.id,
                                                    project.name
                                                )
                                            }
                                            className={clsx(
                                                "flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[2.8rem] pr-6 text-[0.78rem]  outline-none transition duration-300 ease-linear",
                                                {
                                                    "hover:bg-gray-900 ":
                                                        theme === "Dark",
                                                    "hover:bg-slate-300":
                                                        theme === "Neutral",
                                                    "hover:bg-primary-100":
                                                        theme === "Primary",
                                                }
                                            )}
                                            data-te-sidenav-link-ref
                                        >
                                            <span
                                                className={clsx(
                                                    "mr-4 h-3 w-3 rounded-full",
                                                    {
                                                        "bg-[#6d28d9]":
                                                            project.color
                                                                .tailwindBgHexCode ===
                                                            "bg-[#6d28d9]",
                                                        "bg-[#dbeafe]":
                                                            project.color
                                                                .tailwindBgHexCode ===
                                                            "bg-[#dbeafe]",
                                                        "bg-[#60a5fa]":
                                                            project.color
                                                                .tailwindBgHexCode ===
                                                            "bg-[#60a5fa]",
                                                        "bg-[#a3a3a3]":
                                                            project.color
                                                                .tailwindBgHexCode ===
                                                            "bg-[#a3a3a3]",
                                                        "bg-[#0d9488]":
                                                            project.color
                                                                .tailwindBgHexCode ===
                                                            "bg-[#0d9488]",
                                                    }
                                                )}
                                            ></span>
                                            <div
                                                className={clsx({
                                                    "text-white":
                                                        theme === "Dark",
                                                })}
                                            >
                                                {project.name.length >= 15
                                                    ? project.name.substring(
                                                          0,
                                                          15
                                                      ) + "...."
                                                    : project.name}
                                            </div>
                                        </li>
                                    )
                            )}
                        </ul>
                    </li>

                    {/* PROJECTS */}
                    <li className="relative">
                        <div
                            className={clsx(
                                "flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem]  transition duration-300 ease-linear ",
                                {
                                    "hover:bg-gray-900 ": theme === "Dark",
                                    "hover:bg-slate-300": theme === "Neutral",
                                    "hover:bg-primary-100": theme === "Primary",
                                }
                            )}
                            data-te-sidenav-link-ref
                        >
                            <span className="mr-4 [&>svg]:h-4 [&>svg]:w-4 text-primary">
                                <BriefcaseIcon />
                            </span>
                            <span
                                className={clsx("tracking-wider", {
                                    "text-white": theme === "Dark",
                                })}
                            >
                                {language === "en" ? "Projects" : "Dự án"}
                            </span>

                            <span
                                className={clsx(
                                    "absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 ease-linea",
                                    {
                                        "text-white": theme === "Dark",
                                        "text-primary": theme === "Primary",
                                        "text-neutral-700": theme === "Neutral",
                                    }
                                )}
                                data-te-sidenav-rotate-icon-ref
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </div>
                        <ul
                            className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block "
                            data-te-sidenav-collapse-ref
                        >
                            <li className="relative">
                                <button
                                    className={clsx(
                                        "flex h-6 font-bold cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] outline-none transition duration-300 ease-linear",
                                        {
                                            "hover:bg-gray-900 text-white":
                                                theme === "Dark",
                                            "hover:bg-slate-300 text-primary ":
                                                theme === "Neutral",
                                            "hover:bg-primary-100 text-primary ":
                                                theme === "Primary",
                                        }
                                    )}
                                    data-te-sidenav-link-ref
                                    data-te-toggle="modal"
                                    data-te-target="#addprojectmodal"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    type="button"
                                >
                                    {language === "en"
                                        ? "- - - - - Add A Project - - - - -"
                                        : "- - - - - Thêm một dự án - - - - -"}
                                </button>
                            </li>

                            {listProjects?.map(
                                (project) =>
                                    !project?.isDeleted &&
                                    project?.id !== 0 && (
                                        <li
                                            key={project?.id}
                                            onClick={() =>
                                                handleClickProject(
                                                    project.id,
                                                    project.name
                                                )
                                            }
                                            className={clsx(
                                                "flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[2.8rem] pr-6 text-[0.78rem]  outline-none transition duration-300 ease-linear ",
                                                {
                                                    "hover:bg-gray-900 ":
                                                        theme === "Dark",
                                                    "hover:bg-slate-300  ":
                                                        theme === "Neutral",
                                                    "hover:bg-primary-100 ":
                                                        theme === "Primary",
                                                }
                                            )}
                                            data-te-sidenav-link-ref
                                        >
                                            <span
                                                className={clsx(
                                                    "mr-4 h-3 w-3 rounded-full",
                                                    {
                                                        "bg-[#6d28d9]":
                                                            project?.color
                                                                .tailwindBgHexCode ===
                                                            "bg-[#6d28d9]",
                                                        "bg-[#dbeafe]":
                                                            project?.color
                                                                .tailwindBgHexCode ===
                                                            "bg-[#dbeafe]",
                                                        "bg-[#60a5fa]":
                                                            project?.color
                                                                .tailwindBgHexCode ===
                                                            "bg-[#60a5fa]",
                                                        "bg-[#a3a3a3]":
                                                            project?.color
                                                                .tailwindBgHexCode ===
                                                            "bg-[#a3a3a3]",
                                                        "bg-[#0d9488]":
                                                            project?.color
                                                                .tailwindBgHexCode ===
                                                            "bg-[#0d9488]",
                                                    }
                                                )}
                                            ></span>
                                            <div
                                                className={clsx({
                                                    "text-white":
                                                        theme === "Dark",
                                                })}
                                            >
                                                {project?.name.length >= 15
                                                    ? project?.name.substring(
                                                          0,
                                                          15
                                                      ) + "...."
                                                    : project?.name}
                                            </div>
                                        </li>
                                    )
                            )}
                        </ul>
                    </li>
                </ul>
            </nav>
        </Fragment>
    );
};

export default SidenavComponent;
