export type InspectionStatus =
    | 'IN-PROCESS'
    | 'UPCOMING'
    | 'COMPLETED'
    | 'CANCELLED';

export interface IconCofig {
    iconBg: string,
    iconColor: string
}

export interface Inspection {
    title: string,
    id: number,
    icons?: string,
    dueDate: string,
    time?: string,
    status: InspectionStatus,
    iconConfig?: IconCofig
}