import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDataTransfer } from "../Global";

const initialDataTransfer: IDataTransfer = {
    project_id: 0,
    section_id: 0,
    name: "",
    categories: "",
    tailwindBgHexCode: "",
};

export const DataTransferReducer = createSlice({
    name: "DataTransferReducer",
    initialState: initialDataTransfer,
    reducers: {
        setDataTransfer: (
            state: IDataTransfer,
            action: PayloadAction<IDataTransfer>
        ) => {
            state.project_id = action.payload.project_id;
            state.section_id = action.payload.section_id;
            state.name = action.payload.name;
            state.categories = action.payload.categories;
            state.tailwindBgHexCode = action.payload.tailwindBgHexCode;
        },
    },
});

export const { setDataTransfer } = DataTransferReducer.actions;
export default DataTransferReducer.reducer;
