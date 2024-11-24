export type Vessel = {
    imo: number;
    name: string;
};

export type LogEntries = {
    updatedField: string;
    arrival: string | null;
    departure: string | null;
    isOmitted: boolean | null;
    createdDate: string | null;
};

export type Port = {
    id: string;
    name: string;
};

export type PortCall = {
    port: Port;
    updatedField: string;
    arrival: string;
    departure: string | null;
    isOmitted: boolean | null;
    createdDate: string | null;
    service: string | null;
    logEntries: LogEntries[];
};

export type Schedule = {
    vessel: Vessel;
    portCalls: PortCall[];
};