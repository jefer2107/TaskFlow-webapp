import { ChoreOutput } from "./ChoreModel";

export interface Model{
    id:number;
    createdAt:Date;
    updatedAt:Date;
}

export interface CategoryOutput extends Model{
    userId:number;
    name:string;
    chores:ChoreOutput[]
}

export interface CategoryInputCreate{
    userId:number;
    name:string;
}

export interface CategoryInputUpdate{
    userId?:number;
    name?:string;
}