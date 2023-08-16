import { IDataTransfer } from "./InterfaceDataTransfer";
import { IDueDate } from "./InterfaceDueDate";
import { IModal } from "./InterfaceModal";
import { IPriority } from "./InterfacePriority";
import {
    IProject,
    IProjectSoftDelete,
    IProjectUpdate,
} from "./InterfaceProject";
import { ISection } from "./InterfaceSections";
import {
    ITaskReschedule,
    ITaskTodo,
    ITaskTodoHandleComplete,
} from "./InterfaceTaskTodo";
import { IUser } from "./InterfaceUser";

export interface RootStates {
    rootUserReducer: IUser;
    rootProjectReducer: IProject;
    rootPriorityReducer: IPriority;
    rootDueDateReducer: IDueDate;
    // rootRescheduleDueDateReducer: IRescheduleDueDate;
    rootSectionReducer: ISection;
    rootProjectSoftDeleteReducer: IProjectSoftDelete;
    rootDataTransferReducer: IDataTransfer;
    rootTaskTodoReducer: ITaskTodo;
    rootTaskTodoHandleCompleteReducer: ITaskTodoHandleComplete;
    rootProjectUpdateReducer: IProjectUpdate;
    rootModalReducer: IModal;
    rootTasksRescheduleReducer: ITaskReschedule;
}
