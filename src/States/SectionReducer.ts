import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISection } from "./../Global";

const initialSection: ISection = {
    id: 0,
    name: "",
    project_id: 0,
};

export const SectionReducer = createSlice({
    name: "SectionReducer",
    initialState: initialSection,
    reducers: {
        setSection: (state: ISection, action: PayloadAction<ISection>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.project_id = action.payload.project_id;
        },
    },
});

export const { setSection } = SectionReducer.actions;
export default SectionReducer.reducer;
