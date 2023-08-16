import { IProject } from "./InterfaceProject";
import { ISection } from "./InterfaceSections";
import { ITheme } from "./InterfaceTheme";

export interface IProjectLayoutComponent {
    listSections: ISection[];
    listProjects: IProject[];
}

export interface IModalTaskTodoComponent {
    listSections: ISection[];
    listProjects: IProject[];
}

export interface ISidenavComponent {
    listProjects: IProject[];
}

export interface IModalAccountComponent {
    handleCloseAccountModal: Function;
}

export interface IThemeCardComponent {
    theme: ITheme;
    check: boolean;
    setThemeValue: Function;
}
