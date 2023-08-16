import { FC, Fragment, useEffect, useState } from "react";
import { Modal, Ripple, initTE } from "tw-elements";
import { IProject, IProject_FullData, ISection } from "../../Global";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setDataTransfer } from "../../States/DataTransferReducer";
interface IModalCategoryComponent {
    listProjects: IProject[];
    listSections: ISection[];
}
const ModalCategoryComponent: FC<IModalCategoryComponent> = ({
    listProjects,
    listSections,
}) => {
    useEffect(() => {
        initTE({ Modal, Ripple });
    }, []);
    const [fullDataProject, setFullDataProject] = useState<IProject_FullData[]>(
        []
    );
    useEffect(() => {
        const mergedArray = listProjects?.map((project) => {
            const sections = listSections?.filter(
                (section) => section?.project_id === project?.id
            );
            const fullDataProject: IProject_FullData = {
                id: project?.id,
                name: project?.name,
                isFavorite: project?.isFavorite,
                isDeleted: project?.isDeleted,
                color: project?.color,
                sections: sections,
            };

            return fullDataProject;
        });
        setFullDataProject(mergedArray);
    }, [listProjects, listSections]);

    const dispatch = useDispatch();

    const handleSelectSection = (
        categories: string,
        tailwindBgHexCode: string,
        name?: string,
        project_id?: number,
        section_id?: number
    ) => {
        // When select project it send default name section and id project
        // When select section in project it send id section and empty name

        console.log({
            project_id: project_id,
            section_id: section_id,
            name,
            categories,
            tailwindBgHexCode,
        });

        dispatch(
            setDataTransfer({
                project_id,
                section_id,
                name,
                categories,
                tailwindBgHexCode,
            })
        );
    };

    return (
        <div
            data-te-modal-init
            className="fixed left-20 top-20 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="modalCategoryComponent"
            aria-labelledby="category"
            aria-hidden="false"
        >
            <div
                data-te-modal-dialog-ref
                className="pointer-events-none relative h-[calc(100%-1rem)] w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
            >
                <div className="pointer-events-auto relative flex max-h-[54%] w-96 flex-col overflow-hidden rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                    {/* BODY */}
                    <div className="relative overflow-y-auto p-4">
                        <ul className="relative">
                            {fullDataProject?.map(
                                (project) =>
                                    !project.isDeleted &&
                                    project.id > 0 && (
                                        <Fragment key={project.id}>
                                            <li
                                                data-te-modal-dismiss
                                                onClick={() =>
                                                    handleSelectSection(
                                                        `${project.name}`,
                                                        `${project.color.tailwindBgHexCode}`,
                                                        "Default",
                                                        project.id,
                                                        0
                                                    )
                                                }
                                                className="w-full items-center flex gap-2 font-bold py-1 cursor-pointer hover:bg-neutral-200 rounded-md "
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
                                                <div className="flex">
                                                    {project.name.length >= 15
                                                        ? project.name.substring(
                                                              0,
                                                              15
                                                          ) + "...."
                                                        : project.name}
                                                </div>
                                            </li>
                                            <ul className="ml-8 mb-3">
                                                {project.sections?.map(
                                                    (section) =>
                                                        section.name !==
                                                            "Default" && (
                                                            <li
                                                                data-te-modal-dismiss
                                                                key={section.id}
                                                                onClick={() =>
                                                                    handleSelectSection(
                                                                        `${project.name}$_*_/_*_$${section.name}`,
                                                                        `${project.color.tailwindBgHexCode}`,
                                                                        "",
                                                                        0,
                                                                        section.id
                                                                    )
                                                                }
                                                            >
                                                                <div className="w-full flex gap-2 py-1 cursor-pointer hover:bg-neutral-200 text-gray-500 rounded-md">
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
                                                                    {section
                                                                        .name
                                                                        .length >=
                                                                    15
                                                                        ? section.name.substring(
                                                                              0,
                                                                              15
                                                                          ) +
                                                                          "...."
                                                                        : section.name}
                                                                </div>
                                                            </li>
                                                        )
                                                )}
                                            </ul>
                                        </Fragment>
                                    )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCategoryComponent;
