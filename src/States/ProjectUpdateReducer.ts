import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProjectUpdate } from "../Global";

const initialProjectUpdate: IProjectUpdate = {
    id: 0,
    name: "",
};

export const ProjectUpdateReducer = createSlice({
    name: "ProjectReducer",
    initialState: initialProjectUpdate,
    reducers: {
        setProjectUpdate: (
            state: IProjectUpdate,
            action: PayloadAction<IProjectUpdate>
        ) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
        },
    },
});

export const { setProjectUpdate } = ProjectUpdateReducer.actions;
export default ProjectUpdateReducer.reducer;
