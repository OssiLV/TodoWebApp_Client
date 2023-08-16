import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Ripple, initTE } from "tw-elements";
import { setProjectSoftDelete } from "../../States/ProjectSoftDeleteReducer";
interface IModalOptionProjectComponent {
    handleOpenAddSection: Function;
}
const ModalOptionProjectComponent: FC<IModalOptionProjectComponent> = ({
    handleOpenAddSection,
}) => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        initTE({ Modal, Ripple });
    }, []);
    const handleDeleteProject = () => {
        axios({
            method: "DELETE",
            url: `/Project/soft/${projectId}`,
        })
            .then((res) => {
                // console.log(res.data);
                if (projectId !== undefined) {
                    dispatch(
                        setProjectSoftDelete({
                            id: parseInt(projectId),
                            isDeleted: true,
                        })
                    );
                }
                navigate("/app/today");
            })
            .catch((error) => {
                console.error("Cannot delete project: " + error);
            });
    };
    const handleSetOpenAddSection = () => {
        handleOpenAddSection();
    };
    return (
        <div
            data-te-modal-init
            className="fixed left-0 top-20 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="projectOption"
            aria-labelledby="projectOption"
            aria-modal="true"
            role="dialog"
        >
            <div
                data-te-modal-dialog-ref
                className="relative pointer-events-none  w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[300px]"
            >
                <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                    <div className="relative p-4 flex flex-col gap-2 divide-y">
                        <div
                            data-te-modal-dismiss
                            className="w-full flex gap-3 p-1 cursor-pointer hover:bg-neutral-200 rounded-md"
                        >
                            <span className="w-5 h-5">
                                <PencilIcon />
                            </span>
                            Edit
                        </div>
                        <div
                            data-te-modal-dismiss
                            className="w-full flex gap-2 p-1 cursor-pointer hover:bg-neutral-200 rounded-md"
                            onClick={handleSetOpenAddSection}
                        >
                            <span>
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
                            </span>
                            Add Section
                        </div>
                        <div
                            data-te-modal-dismiss
                            className="w-full flex gap-3 p-1 cursor-pointer hover:bg-neutral-200 rounded-md text-red-500"
                            onClick={handleDeleteProject}
                        >
                            <span className="w-5 h-5 ">
                                <TrashIcon />
                            </span>
                            Delete This Project
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalOptionProjectComponent;
