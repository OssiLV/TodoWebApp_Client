import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITaskTodo } from "./../Global";

const initialTaskTodo: ITaskTodo = {
    id: 0,
    name: "",
    description: "",
    priority: "",
    due_Date: "",
    isCompleted: false,
    section_id: 0,
};

export const TaskTodoReducer = createSlice({
    name: "TaskTodoReducer",
    initialState: initialTaskTodo,
    reducers: {
        setTaskTodo: (state: ITaskTodo, action: PayloadAction<ITaskTodo>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.description = action.payload.description;
            state.priority = action.payload.priority;
            state.due_Date = action.payload.due_Date;
            state.isCompleted = action.payload.isCompleted;
            state.section_id = action.payload.section_id;
        },
    },
});

export const { setTaskTodo } = TaskTodoReducer.actions;
export default TaskTodoReducer.reducer;
