import axios from "axios";
import { UserInputAuthenticate, UserInputCreate, UserInputUpdate } from "../models/UserModel";

const host = "http://localhost:5272"

const findAll = () => axios.get(`${host}/users`)
const findOne = (id:number) => axios.get(`${host}/user/${id}`)
const create = (model:UserInputCreate) => axios.post(`${host}/user`, model)
const update = (id:number, model:UserInputUpdate) => axios.patch(`${host}/user/${id}`, model)
const remove = (id:number) => axios.delete(`${host}/user/${id}`)
const auth = (model:UserInputAuthenticate) => axios.post(`/login`, model)
.then(({  data }) => localStorage.setItem("token", data?.userToken?.token))

const userApi = {
    findAll,
    findOne,
    create,
    update,
    remove,
    auth
}

export default userApi