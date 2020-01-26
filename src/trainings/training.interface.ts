export interface ITraining {
    id?: string;
    trainingDate?: string;
    colorTag?: string | null;
    description?: string;
    distance?: number | null;
    calories?: number | null;
    time?: number | null;
    userId: string;
}
