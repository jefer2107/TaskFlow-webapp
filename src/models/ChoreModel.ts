export interface Model{
    id:number;
    createdAt:Date;
    updatedAt:Date;
}

export interface ChoreOutput extends Model {
    userId: number;
    categoryId?: number;
    title: string;
    description: string;
    isCompleted: boolean;
}