import { ChoreOutput } from "./ChoreModel";

export interface Model{
    id:number;
    createdAt:Date;
    updatedAt:Date;
}

export interface UserInputCreate {
    name: string;
    email: string;
    password: string;
}

export interface UserInputUpdate {
    name?: string;
    email?: string;
    password?: string;
}

export interface UserOutput extends Model {
    name: string;
    email: string;
    password: string;
    chores: ChoreOutput[];
}

export interface UserInputAuthenticate{
    email: string;
    password: string;
}

export interface PayloadUser{
    id: number;
    name: string;
    email: string;
}