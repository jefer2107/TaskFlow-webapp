import axios from "axios"
import { CategoryInputCreate, CategoryInputUpdate } from "../models/CategoryModel"

const host = "http://localhost:5272"

const findAll = (userId:number) => axios.get(`${host}/categories?userId=${userId}`)
const findOne = (id:number) => axios.get(`${host}/category/${id}`)
const create = (model:CategoryInputCreate) => axios.post(`${host}/category`, model)
const update = (id:number, model:CategoryInputUpdate) => axios.patch(`${host}/category/${id}`, model)
const remove = (id:number) => axios.delete(`${host}/category/${id}`)

const categoryApi = {
    findAll,
    findOne,
    create,
    update,
    remove
}

export default categoryApi