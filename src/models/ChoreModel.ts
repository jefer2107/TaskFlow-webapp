export interface Model{
    id?:number | null;
    createdAt?:Date;
    updatedAt?:Date;
}

export interface ChoreOutput extends Model {
    userId: number | null;
    categoryId?: number | null;
    title: string;
    description: string;
    isCompleted: boolean;
}

export interface ChoreInputCreate{
    userId:number | null;
    title:string;
    description:string;
}

export interface ChoreInputUpdate{
    userId?:number;
    categoryId?:number | null;
    title?:string;
    description?:string;
    isCompleted?:boolean;
}