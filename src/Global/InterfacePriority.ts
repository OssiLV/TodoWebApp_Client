export interface IPriority {
    id: number;
    type: "" | "ADDTASK" | "MODALTASK";
    name: "" | "P1" | "P2" | "P3" | "P4" | string;
}
