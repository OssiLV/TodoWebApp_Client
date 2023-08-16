import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProjectSoftDelete } from "./../Global";

const initialProjectSoftDelete: IProjectSoftDelete = {
    id: 0,
    isDeleted: false,
};

export const ProjectSoftDeleteReducer = createSlice({
    name: "ProjectSoftDeleteReducer",
    initialState: initialProjectSoftDelete,
    reducers: {
        setProjectSoftDelete: (
            state: IProjectSoftDelete,
            action: PayloadAction<IProjectSoftDelete>
        ) => {
            state.id = action.payload.id;
            state.isDeleted = action.payload.isDeleted;
        },
        setProjectUndoDelete: (
            state: IProjectSoftDelete,
            action: PayloadAction<IProjectSoftDelete>
        ) => {
            state.id = action.payload.id;
            state.isDeleted = action.payload.isDeleted;
        },
    },
});

export const { setProjectSoftDelete, setProjectUndoDelete } =
    ProjectSoftDeleteReducer.actions;
export default ProjectSoftDeleteReducer.reducer;
