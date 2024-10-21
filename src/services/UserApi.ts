import axios from "axios";
import { UserInputAuthenticate, UserInputCreate, UserInputUpdate } from "../models/UserModel";

const host = "http://localhost:5272"

const findAll = async () => axios.get(`${host}/users`)
const findOne = async (id:number) => axios.get(`${host}/user/${id}`)
const create = async (model:UserInputCreate) => axios.post(`${host}/user`, model)
const update = async (id:number, model:UserInputUpdate) => axios.patch(`${host}/user/${id}`, model)
const remove = async (id:number) => axios.delete(`${host}/user/${id}`)
const auth = async (model:UserInputAuthenticate) => await axios.post(`${host}/login`, model)


const userApi = {
    findAll,
    findOne,
    create,
    update,
    remove,
    auth
}

export default userApi