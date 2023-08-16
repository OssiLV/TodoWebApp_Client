import { FC, useEffect, useState } from "react";
import {
    AdjustmentsHorizontalIcon,
    EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { SectionComponent } from "../Components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IProjectLayoutComponent } from "../Global/InterfaceComponents";
import { IProject, IProjectUpdate, RootStates } from "../Global";
import { useDispatch, useSelector } from "react-redux";
import { setProjectUpdate } from "../States/ProjectUpdateReducer";
import clsx from "clsx";

const ProjectLayout: FC<IProjectLayoutComponent> = ({
    listSections,
    listProjects,
}) => {
    const { projectId } = useParams();
    const dispatch = useDispatch();

    const { theme } = useSelector((state: RootStates) => state.rootUserReducer);

    const [isOpenEditProjectName, setOpenEditprojectName] = useState(false);
    const [projectNameValue, setProjectNameValue] = useState("");

    const projectById = listProjects.find(
        (project) => project.id.toString() === projectId
    );

    useEffect(() => {
        if (projectById) {
            setProjectNameValue(projectById.name);
        }
    }, [projectById]);

    const sectionsWithProjectId = listSections.filter((section) => {
        return section.project_id === projectById?.id;
    });

    const handleChangeProjectNameValue = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProjectNameValue(event.target.value);
    };
    const openEditprojectName = () => {
        setOpenEditprojectName(true);
    };
    const closeEditprojectName = () => {
        setOpenEditprojectName(false);
    };
    const handleUpdateProjectName = () => {
        axios({
            method: "PUT",
            url: `/Project/${projectById?.id}`,
            data: {
                name: projectNameValue,
            },
        })
            .then((res) => {
                const projectUpdated: IProjectUpdate = res.data.objectData;
                setProjectNameValue(projectUpdated.name);
                dispatch(
                    setProjectUpdate({
                        id: projectUpdated.id,
                        name: projectUpdated.name,
                    })
                );
                closeEditprojectName();
            })
            .catch((error) => {
                console.error("Cannot Update Project Name: ", error);
            });
    };

    return (
        <div
            id="content"
            className="relative pt-[70px] px-4 tabletOrDesktop:px-14 flex-col w-full flex items-center"
        >
            <div className="flex flex-col divide-y pb-4 divide-gray-300 gap-2">
                {/* HEADER */}
                <div className="flex justify-between">
                    <div className=" w-full rounded-lg flex-initial tabletOrDesktop:mr-[34rem] ">
                        {isOpenEditProjectName ? (
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className={clsx(
                                        " text-2xl w-44 p-1 font-bold min-h-[auto]  rounded-lg border-2 outline-none",
                                        {
                                            "bg-neutral-800 border-white  text-white":
                                                theme === "Dark",
                                        }
                                    )}
                                    value={projectNameValue}
                                    onChange={handleChangeProjectNameValue}
                                    aria-autocomplete="none"
                                />
                                <div className="flex items-center mt-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={handleUpdateProjectName}
                                        className={clsx(
                                            "ml-1 inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out   ",
                                            {
                                                "text-white bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]":
                                                    theme === "Primary",
                                                "text-neutral-800 bg-primary-100 hover:bg-opacity-70":
                                                    theme === "Dark",
                                                "text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] hover:opacity-80":
                                                    theme === "Neutral",
                                            }
                                        )}
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={closeEditprojectName}
                                        type="button"
                                        className={clsx(
                                            "inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out ",
                                            {
                                                "text-primary-700 bg-primary-100 hover:bg-primary-accent-100 ":
                                                    theme === "Primary ",
                                                "text-white": theme === "Dark",
                                            }
                                        )}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p
                                className={clsx(
                                    "text-2xl font-bold p-1 cursor-pointer rounded-md",
                                    {
                                        "text-white hover:bg-neutral-400":
                                            theme === "Dark",
                                        "hover:bg-neutral-200":
                                            theme === "Primary" || "Neutral",
                                    }
                                )}
                                onClick={openEditprojectName}
                            >
                                {projectNameValue}
                            </p>
                        )}
                    </div>
                    {/* VIEW */}
                    <div className="flex gap-4 select-none">
                        {/* <button
                            type="button"
                            className="text-md text-neutral-500 hover:text-neutral-700 p-[6px] rounded-xl hover:bg-gray-200 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
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
                        </button> */}

                        {/* SETTING */}
                        <button
                            type="button"
                            className="text-md text-neutral-500 hover:text-neutral-700 p-[6px] rounded-xl hover:bg-gray-200 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                            data-te-toggle="modal"
                            data-te-target="#projectOption"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                        >
                            <span className="[&>svg]:w-5">
                                <EllipsisHorizontalIcon />
                            </span>
                        </button>
                    </div>
                </div>
                {/* SECTION */}
                <div className="">
                    {sectionsWithProjectId?.map((section) => (
                        <SectionComponent
                            key={section.id}
                            id={section.id}
                            name={section.name}
                            project_id={section.project_id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectLayout;
