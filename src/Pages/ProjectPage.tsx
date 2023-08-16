import { useEffect, useState } from "react";
import {
    ModalCategoryComponent,
    ModalTaskTodoComponent,
    NavbarComponent,
    SidenavComponent,
} from "../Components";
import { ProjectLayout } from "../Layouts";
import axios from "axios";
import { useSelector } from "react-redux";
import { IProject, IProject_FullData, ISection, RootStates } from "../Global";
import clsx from "clsx";

const ProjectPage = () => {
    const _user = useSelector((state: RootStates) => state.rootUserReducer);
    const _modal = useSelector((state: RootStates) => state.rootModalReducer);

    const _newProject = useSelector(
        (state: RootStates) => state.rootProjectReducer
    );
    const _projectSoftDelete = useSelector(
        (state: RootStates) => state.rootProjectSoftDeleteReducer
    );
    const _newSection = useSelector(
        (state: RootStates) => state.rootSectionReducer
    );
    const _updatedProject = useSelector(
        (state: RootStates) => state.rootProjectUpdateReducer
    );

    const [fullDataProject, setFullDataProject] = useState<IProject_FullData[]>(
        []
    );
    const [listSections, setListSections] = useState<ISection[]>([]);
    const [listProjects, setListProjects] = useState<IProject[]>([]);

    useEffect(() => {
        axios({
            method: "GET",
            url: `/Project/fulldata/${_user.id}`,
        })
            .then((res) => {
                setFullDataProject(res.data.objectData);
            })
            .catch((error) => {
                console.error("Cannot get full data: " + error);
            });
    }, [_user.id]);

    useEffect(() => {
        setListProjects(() => {
            const projects: IProject[] = fullDataProject.map(
                (project: IProject) => ({
                    id: project.id,
                    name: project.name,
                    isFavorite: project.isFavorite,
                    isDeleted: project.isDeleted,
                    color: project.color,
                })
            );

            const uniqueArray = projects.reduce(
                (acc: IProject[], current: IProject) => {
                    if (!acc.find((element) => element.id === current.id)) {
                        acc.push(current);
                    }
                    return acc;
                },
                []
            );

            return uniqueArray;
        });

        setListSections(() => {
            const sections: ISection[] = fullDataProject.flatMap(
                (project: IProject_FullData) =>
                    project.sections.map((section: ISection) => ({
                        id: section.id,
                        name: section.name,
                        project_id: section.project_id,
                    }))
            );
            const uniqueArray = sections.reduce(
                (acc: ISection[], current: ISection) => {
                    if (!acc.find((element) => element.id === current.id)) {
                        acc.push(current);
                    }
                    return acc;
                },
                []
            );

            return uniqueArray;
        });
    }, [fullDataProject]);

    useEffect(() => {
        setListProjects((prevState) =>
            prevState.reduce((acc: IProject[], current: IProject) => {
                if (current.id === _projectSoftDelete.id) {
                    current.isDeleted = _projectSoftDelete.isDeleted;
                }
                return acc;
            }, [])
        );
    }, [_projectSoftDelete]);

    useEffect(() => {
        if (_newProject !== null) {
            setListProjects((prevState) => {
                if (prevState !== null) {
                    // window.location.assign(`/app/project/${_newProject.id}`);

                    return prevState.concat(_newProject);
                } else {
                    return [_newProject];
                }
            });
        }
    }, [_newProject]);

    useEffect(() => {
        if (_newSection !== null) {
            setListSections((prevState) => {
                if (prevState !== null) {
                    return prevState.concat(_newSection);
                } else {
                    return [_newSection];
                }
            });
        }
    }, [_newSection]);

    useEffect(() => {
        setListProjects((prevState) =>
            prevState.map((current: IProject) => {
                if (current.id === _updatedProject.id) {
                    // Return a new object with the updated name
                    return { ...current, name: _updatedProject.name };
                }
                // Return the original object
                return current;
            })
        );
    }, [_updatedProject]);

    return (
        <div
            className={clsx("h-screen", {
                "bg-neutral-800": _user.theme === "Dark",
            })}
        >
            <NavbarComponent />
            <SidenavComponent listProjects={listProjects} />
            <ProjectLayout
                listSections={listSections}
                listProjects={listProjects}
            />
            {_modal.isOpen && (
                <ModalTaskTodoComponent
                    listProjects={listProjects}
                    listSections={listSections}
                />
            )}
            <ModalCategoryComponent
                listProjects={listProjects}
                listSections={listSections}
            />
        </div>
    );
};

export default ProjectPage;
