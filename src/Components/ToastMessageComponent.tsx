import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Toast, initTE } from "tw-elements";
import { IProject, RootStates } from "../Global";
import { setProject } from "../States/ProjectReducer";
import {
    setProjectSoftDelete,
    setProjectUndoDelete,
} from "../States/ProjectSoftDeleteReducer";
interface IToastMessageComponent {
    title: string;
    content: string;
}
const ToastMessageComponent: FC<IToastMessageComponent> = ({
    title,
    content,
}) => {
    useEffect(() => {
        initTE({ Toast });
    }, []);
    const dispatch = useDispatch();
    const _projectSoftDelete = useSelector(
        (state: RootStates) => state.rootProjectSoftDeleteReducer
    );
    const handleUndoProjectDeleted = () => {
        axios({
            method: "POST",
            url: `/Project/undo/${_projectSoftDelete.id}`,
        })
            .then((res) => {
                const undoProject: IProject = res.data.objectData;
                dispatch(
                    setProjectUndoDelete({
                        id: undoProject.id,
                        isDeleted: undoProject.isDeleted,
                    })
                );
            })
            .catch((error) => {
                console.error("Can not undo: " + error);
            });
    };

    return (
        <div
            className="absolute bottom-10 left-10 z-[99999]  pointer-events-auto mx-auto hidden w-96 max-w-full rounded-lg bg-warning-100 bg-clip-padding text-sm text-warning-700 shadow-lg shadow-black/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden"
            id="static-example"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-te-autohide="false"
            data-te-toast-init
            data-te-toast-show
        >
            <div className="flex items-center justify-between rounded-t-lg border-b-2 border-warning-200 bg-warning-100 bg-clip-padding px-4 pb-2 pt-2.5 text-warning-700">
                <p className="flex items-center font-bold text-warning-700">
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="exclamation-triangle"
                        className="mr-2 h-4 w-4 fill-current"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                    >
                        <path
                            fill="currentColor"
                            d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                        ></path>
                    </svg>
                    {title}
                </p>
                <div className="flex items-center">
                    <button
                        type="button"
                        className="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                        data-te-toast-dismiss
                        aria-label="Close"
                    >
                        <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex items-center break-words rounded-b-lg bg-warning-100 px-4 py-4 text-warning-700">
                <div className="flex-auto">{content}</div>

                <button
                    onClick={handleUndoProjectDeleted}
                    data-te-toast-dismiss
                    className="py-2 px-4  rounded-lg bg-white text-black hover:text-primary cursor-pointer"
                >
                    Undo
                </button>
            </div>
        </div>
    );
};

export default ToastMessageComponent;
