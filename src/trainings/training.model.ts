export class Training {

    constructor(
        public id: string,
        public trainingDate: string,
        public description: string,
        public distance: number | null,
        public calories: number | null,
        public time: number | null,
        public userId: number,
        public createdDate: Date,
        public lastUpdatedDateTime: Date,
        public isActive: boolean,
    ) {}
}
