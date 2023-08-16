import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProject } from "./../Global";

const initialProject: IProject = {
    id: 0,
    name: "",
    isFavorite: false,
    isDeleted: false,
    color: {
        id: 0,
        name: "",
        tailwindBgHexCode: "",
    },
};

export const ProjectReducer = createSlice({
    name: "ProjectReducer",
    initialState: initialProject,
    reducers: {
        setProject: (state: IProject, action: PayloadAction<IProject>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.isFavorite = action.payload.isFavorite;
            state.isDeleted = action.payload.isDeleted;
            state.color = action.payload.color;
        },
    },
});

export const { setProject } = ProjectReducer.actions;
export default ProjectReducer.reducer;
