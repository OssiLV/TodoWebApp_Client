import { ChangeEvent, useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Modal, initTE } from "tw-elements";
import axios from "axios";
import { IColor, IProject, RootStates } from "../../Global";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { setProject } from "../../States/ProjectReducer";

const ModalAddProjectComponent = () => {
    const dispatch = useDispatch();
    const _user = useSelector((state: RootStates) => state.rootUserReducer);
    const [listColors, setListColors] = useState<IColor[]>([]);

    const [colorForClass, setColorForClass] = useState("");
    const [colorForHTML, setColorForHTML] = useState("");
    const [idColor, setIdColor] = useState(0);
    const [projectName, setProjectname] = useState("");
    const [isAddFavorites, setIsAddFavorites] = useState(false);

    const [checkValue, setCheckValue] = useState(true);

    const handleAddFavorites = (event: ChangeEvent<HTMLInputElement>) => {
        setIsAddFavorites(event.target.checked);
    };

    const handleChangeValueProjectName = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setProjectname(event.target.value);
    };

    const handleChangeColorPicker = (
        id: number,
        forClass: string,
        forHTML: string
    ) => {
        setColorForClass(forClass);
        setColorForHTML(forHTML);
        setIdColor(id);
    };

    const handleCreateProject = () => {
        axios({
            method: "Post",
            url: "/Project",
            data: {
                name: projectName,
                isFavorite: isAddFavorites,
                isDeleted: false,
                color_id: idColor,
                user_id: _user.id,
            },
        }).then((res) => {
            setProjectname("");
            const newProject: IProject = res.data.objectData;
            dispatch(
                setProject({
                    id: newProject.id,
                    name: newProject.name,
                    isFavorite: newProject.isFavorite,
                    isDeleted: newProject.isDeleted,
                    color: newProject.color,
                })
            );
            window.location.assign(`/app/project/${newProject.id}`);
        });
    };

    useEffect(() => {
        if (
            projectName.length < 0 ||
            projectName === "" ||
            (colorForClass === "" && colorForHTML === "")
        ) {
            setCheckValue(true);
        } else {
            setCheckValue(false);
        }
    }, [projectName, colorForClass, colorForHTML]);

    useEffect(() => {
        initTE({ Modal });

        axios({
            method: "GET",
            url: "/Color",
        })
            .then((res) => {
                // console.log(res.data);
                setListColors(res.data.objectData);
            })
            .catch((error) => {
                console.error("Cannot get all Colors: " + error);
            });
    }, []);

    return (
        <div
            data-te-modal-init
            className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="addprojectmodal"
            aria-labelledby="addprojectmodal"
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
                        "pointer-events-auto relative flex w-full flex-col rounded-md border-none  bg-clip-padding  shadow-lg outline-none dark:bg-neutral-600",
                        {
                            " bg-gray-800": _user.theme === "Dark",
                            " bg-white":
                                _user.theme === "Primary" ||
                                _user.theme === "Neutral",
                        }
                    )}
                >
                    <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        <h5
                            className={clsx(
                                "text-xl font-medium leading-normal",
                                {
                                    "text-black":
                                        _user.theme === "Primary" ||
                                        _user.theme === "Neutral",
                                    "text-white": _user.theme === "Dark",
                                }
                            )}
                        >
                            {_user.language === "en"
                                ? "Add Project"
                                : "Thêm dự án"}
                        </h5>
                    </div>

                    {/* MODAL-BODY */}
                    <div className="relative p-4 ">
                        {/* PROJECT-NAME */}
                        <div className="relative mb-3">
                            <input
                                id="project-name"
                                className={clsx(
                                    "text-xl min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none",
                                    {
                                        "bg-neutral-800 text-white":
                                            _user.theme === "Dark",
                                    }
                                )}
                                type="text"
                                placeholder={
                                    _user.language === "en"
                                        ? "Project name"
                                        : "Tên dự án"
                                }
                                value={projectName}
                                onChange={handleChangeValueProjectName}
                                aria-autocomplete="none"
                            />
                        </div>

                        {/* COLOR */}
                        <div className="relative mb-3">
                            <button
                                id="color-picker"
                                className="text-sm  w-full p-2  border bg-transparent   "
                                type="button"
                                data-te-toggle="modal"
                                data-te-target="#colorpicker"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                            >
                                <div className="flex items-center gap-2">
                                    <p
                                        className={` rounded-full ${colorForClass} w-4 h-4`}
                                    ></p>
                                    <p
                                        className={clsx(
                                            " text-left tracking-widest",
                                            {
                                                "text-black":
                                                    _user.theme === "Primary" ||
                                                    _user.theme === "Neutral",
                                                "text-white":
                                                    _user.theme === "Dark",
                                            }
                                        )}
                                    >
                                        {colorForHTML}
                                    </p>
                                </div>
                            </button>
                        </div>

                        {/*------------------- CHILD-MODAL-COLOR-PICKER -------------------*/}
                        <div
                            data-te-modal-init
                            className="absolute right-0 top-20 tabletOrDesktop:right-20 z-[1055] hidden w-full overflow-y-auto overflow-x-hidden outline-none"
                            id="colorpicker"
                            aria-labelledby="colorpicker"
                            aria-modal="true"
                            role="dialog"
                        >
                            <div
                                data-te-modal-dialog-ref
                                className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[300px]"
                            >
                                <div
                                    className={clsx(
                                        "pointer-events-auto p-4 relative flex w-full flex-col rounded-md border-none  bg-clip-padding shadow-lg outline-none ",
                                        {
                                            "bg-gray-800":
                                                _user.theme === "Dark",
                                            "bg-white":
                                                _user.theme === "Primary" ||
                                                _user.theme === "Neutral",
                                        }
                                    )}
                                >
                                    <div className="relative p-4">
                                        {listColors.map((color) => (
                                            <div
                                                key={color.id}
                                                onClick={() =>
                                                    handleChangeColorPicker(
                                                        color.id,
                                                        color.tailwindBgHexCode,
                                                        color.name
                                                    )
                                                }
                                                data-te-modal-dismiss
                                                className={clsx(
                                                    "p-2 flex items-center gap-4 rounded-xl text-base select-none cursor-pointer hover:bg-opacity-20",
                                                    {
                                                        "hover:bg-white":
                                                            _user.theme ===
                                                            "Dark",
                                                        "hover:bg-primary-200":
                                                            _user.theme ===
                                                            "Primary",
                                                        "hover:bg-gray-400":
                                                            _user.theme ===
                                                            "Neutral",
                                                    }
                                                )}
                                            >
                                                <span
                                                    className={clsx(
                                                        `rounded-full w-4 h-4 `,
                                                        {
                                                            "bg-[#6d28d9]":
                                                                color.tailwindBgHexCode ===
                                                                "bg-[#6d28d9]",
                                                            "bg-[#dbeafe]":
                                                                color.tailwindBgHexCode ===
                                                                "bg-[#dbeafe]",
                                                            "bg-[#60a5fa]":
                                                                color.tailwindBgHexCode ===
                                                                "bg-[#60a5fa]",
                                                            "bg-[#a3a3a3]":
                                                                color.tailwindBgHexCode ===
                                                                "bg-[#a3a3a3]",
                                                            "bg-[#0d9488]":
                                                                color.tailwindBgHexCode ===
                                                                "bg-[#0d9488]",
                                                        }
                                                    )}
                                                ></span>
                                                <span
                                                    className={clsx(
                                                        " text-left tracking-widest",
                                                        {
                                                            "text-black":
                                                                _user.theme ===
                                                                    "Primary" ||
                                                                _user.theme ===
                                                                    "Neutral",
                                                            "text-white":
                                                                _user.theme ===
                                                                "Dark",
                                                        }
                                                    )}
                                                >
                                                    {color.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={clsx(
                                " flex mt-8 hover:bg-opacity-20 px-1 rounded-lg py-[2px]",
                                {
                                    "hover:bg-white": _user.theme === "Dark",
                                    "hover:bg-primary-200":
                                        _user.theme === "Primary",
                                    "hover:bg-gray-400":
                                        _user.theme === "Neutral",
                                }
                            )}
                        >
                            <input
                                className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem]  before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-red-600 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-red-600 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-red-600 checked:focus:bg-red-600 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-red-600 dark:checked:after:bg-red-600 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                type="checkbox"
                                onChange={handleAddFavorites}
                                checked={isAddFavorites}
                                role="switch"
                                id="flexSwitchChecked"
                            />
                            <label
                                className={clsx(
                                    "w-full tracking-wider flex gap-1 pl-[0.15rem] hover:cursor-pointer",
                                    {
                                        "text-white": _user.theme === "Dark",
                                    }
                                )}
                                htmlFor="flexSwitchChecked"
                            >
                                {_user.language === "en"
                                    ? "Add to favorites"
                                    : "Thêm vào yêu thích"}

                                <HeartIcon className="text-red-600 w-6 h-6" />
                            </label>
                        </div>
                    </div>

                    {/* MODAL-FOOTER */}
                    <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        <button
                            type="button"
                            className={clsx(
                                "inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  transition duration-150 ease-in-out",
                                {
                                    "text-primary-700 bg-primary-100 hover:bg-primary-accent-100 ":
                                        _user.theme === "Primary ",
                                    "text-white": _user.theme === "Dark",
                                }
                            )}
                            data-te-modal-dismiss
                            data-te-ripple-init
                            data-te-ripple-color="light"
                        >
                            {_user.language === "en" ? "Cancel" : "Hủy"}
                        </button>
                        <button
                            disabled={checkValue}
                            onClick={handleCreateProject}
                            type="button"
                            className={clsx(
                                "ml-1 inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ",
                                {
                                    "text-white bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]":
                                        _user.theme === "Primary",
                                    "text-neutral-800 bg-primary-100 hover:bg-opacity-70":
                                        _user.theme === "Dark",
                                    "text-neutral-800 shadow-[0_4px_9px_-4px_#3b71ca] hover:opacity-80":
                                        _user.theme === "Neutral",
                                }
                            )}
                            data-te-ripple-init
                            data-te-modal-dismiss
                            data-te-ripple-color="light"
                        >
                            {_user.language === "en"
                                ? "Add project"
                                : "Thêm dự án "}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAddProjectComponent;
