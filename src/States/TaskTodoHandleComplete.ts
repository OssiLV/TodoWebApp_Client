import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITaskTodoHandleComplete } from "../Global";

const initialTaskTodoHandleComplete: ITaskTodoHandleComplete = {
    id: 0,
    isCompleted: false,
};

export const TaskTodoHandleCompleteReducer = createSlice({
    name: "TaskTodoHandleCompleteReducer",
    initialState: initialTaskTodoHandleComplete,
    reducers: {
        setTaskTodoComplete: (
            state: ITaskTodoHandleComplete,
            action: PayloadAction<ITaskTodoHandleComplete>
        ) => {
            state.id = action.payload.id;
            state.isCompleted = action.payload.isCompleted;
        },
        setTaskTodoUndoComplete: (
            state: ITaskTodoHandleComplete,
            action: PayloadAction<ITaskTodoHandleComplete>
        ) => {
            state.id = action.payload.id;
            state.isCompleted = action.payload.isCompleted;
        },
    },
});

export const { setTaskTodoComplete, setTaskTodoUndoComplete } =
    TaskTodoHandleCompleteReducer.actions;
export default TaskTodoHandleCompleteReducer.reducer;
