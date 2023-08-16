import { ISection } from "./InterfaceSections";

export interface IProjectUpdate {
    id: 0;
    name: "";
}
export interface IProject {
    id: number;
    name: string;
    isFavorite: boolean;
    isDeleted: boolean;
    color: {
        id: number;
        tailwindBgHexCode: string;
        name: string;
    };
}
export interface IProject_FullData {
    id: number;
    name: string;
    isFavorite: boolean;
    isDeleted: boolean;
    color: {
        id: number;
        tailwindBgHexCode: string;
        name: string;
    };
    sections: ISection[];
}
export interface IProjectSoftDelete {
    id: number;
    isDeleted: boolean;
}
