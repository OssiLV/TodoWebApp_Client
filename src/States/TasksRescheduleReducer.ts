import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITaskReschedule, ITaskTodo } from "./../Global";

const initialTasksRescheduleReducer: ITaskReschedule = {
    queueIdTasks: [],
    isSuccess: false,
    dueDate: "",
};

export const TasksRescheduleReducer = createSlice({
    name: "TasksRescheduleReducer",
    initialState: initialTasksRescheduleReducer,
    reducers: {
        setQueueIdTask: (
            state: ITaskReschedule,
            action: PayloadAction<ITaskReschedule>
        ) => {
            state.queueIdTasks = action.payload.queueIdTasks;
            state.isSuccess = action.payload.isSuccess;
            state.dueDate = action.payload.dueDate;
        },

        setClearQueueIdTask: (state: ITaskReschedule) => {
            state.queueIdTasks = [];
        },
    },
});

export const { setQueueIdTask, setClearQueueIdTask } =
    TasksRescheduleReducer.actions;
export default TasksRescheduleReducer.reducer;
