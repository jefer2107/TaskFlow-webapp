import axios from "axios"
import { ChoreInputCreate, ChoreInputUpdate } from "../models/ChoreModel"

const host = "http://localhost:5272"

const findAll = () => axios.get(`${host}/chores`)
const findOne = (id:number, userId:number) => axios.get(`${host}/chore/${id}/user/${userId}`)
const create = (model:ChoreInputCreate) => axios.post(`${host}/chore`, model)
const update = (id:number, model:ChoreInputUpdate) => axios.patch(`${host}/chore/${id}`, model)
const remove = (id:number) => axios.delete(`${host}/chore/${id}`)

const choreApi = {
    findAll,
    findOne,
    create,
    update,
    remove
}

export default choreApi