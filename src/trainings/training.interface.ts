export interface ITraining {
    id?: string;
    trainingDate?: string;
    description?: string;
    distance?: number | null;
    calories?: number | null;
    time?: number | null;
    userId: string;
}
