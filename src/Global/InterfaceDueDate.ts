export interface IDueDate {
    task_id: number;
    type: "" | "OPTIONS" | "CALENDAR" | "MODAL" | "UPDATE" | "RESCHEDULE";
    fullDateTime: string;
}

export interface IRescheduleDueDate {}
