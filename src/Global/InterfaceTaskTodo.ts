export interface ITaskTodo {
    todayLayout?: boolean;
    id: number;
    name: string;
    priority: string;
    due_Date: string;
    description: string;
    isCompleted: boolean;
    section_id: number;
}
export interface ITaskTodoHandleComplete {
    id: number;
    isCompleted: boolean;
}

export interface ITaskReschedule {
    queueIdTasks: Array<number>;
    isSuccess: boolean;
    dueDate: string;
}
