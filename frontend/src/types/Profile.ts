export type ProfileProps = {
    username: string;
    role: string;
    createdAt: Date;
    tripsCount: number;
};

export type MyTripProps = {
    id: number;
    userId: number;
    destinationId: number;
    Title: string;
    Notes: string;
    StartDate: Date;
    EndDate: Date;
};
