import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Modal from "./Modal"
import choreApi from "../services/ChoreApi";
import { ChoreInputUpdate, ChoreOutput } from "../models/ChoreModel";
import { toastMessages } from "../utils/toastMessages";
import moment from "moment";

export interface ModalChoreProps{
    setShowEditText: Dispatch<SetStateAction<boolean>>;
    setShowEditDescription: Dispatch<SetStateAction<boolean>>;
    showEditText: boolean;
    showEditDescription: boolean;
    isModalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    choreId: number | null;
    userId: number;
    setUpdate: Dispatch<SetStateAction<boolean>>;
}

export const ModalChore:FC<ModalChoreProps> = (
    {
        setShowEditText,
        setShowEditDescription,
        showEditText,
        showEditDescription, 
        isModalOpen, 
        setModalOpen,
        choreId,
        userId,
        setUpdate
    }
) => {

    const choreModel:ChoreOutput = {
        userId: null,
        categoryId: null,
        title: "",
        description: "",
        isCompleted: false,
    }
    const [chore, setChore] = useState<ChoreOutput | null>(choreModel)

    useEffect(() => {
        const loadChore = async () => {
            try {
                if(choreId && userId){
                    const {data} = await choreApi.findOne(choreId, userId)
                    setChore(data)
                }

            } catch (error) {
                console.error(`erro ao buscar tarefa: ${error}`)
            }
        }
        loadChore()

    }, [choreId])

    const modelChangeUpdate = ({target}:any) => {
        setChore((state:any) => {
            return {  ...state, [target.name]: target.value }
        })
    }

    const updateChore = async (id:number | null) => {
        try {
            setShowEditText(false)

            const data = {
                title: chore?.title,
                description: chore?.description
            }

            if(id && chore){
                await choreApi.update(id, data)
                setUpdate((x) => !x)
            }

        } catch (error) {
            setChore(null)
            setShowEditText(false)
            setShowEditDescription(false)
            toastMessages("error", "Ocorreu um erro ao atualizar a tarefa. Por favor, tente novamente.")
            console.error(`Erro ao atualizar tarefa: ${error}`)
        }
    }

    return(
        <div className="flex justify-center items-center">
            <Modal isOpen={isModalOpen}>
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <input onChange={modelChangeUpdate} disabled={showEditText} name="title" onBlur={() => updateChore(choreId)} className="text-xl font-bold py-1" type="text" value={chore?.title}/>
                        <button onClick={() => {setModalOpen(false);updateChore(choreId)}} className="text-gray-600 hover:text-gray-900">
                            &times;
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <span>Criado em {moment(chore?.createdAt).format("DD/MM/YY")}</span>
                        <span>Concluído em {chore?.isCompleted? moment(chore?.updatedAt).format("DD/MM/YY"): "________"}</span>
                    </div>
                    <div className="flex flex-col mt-5">
                        <div className="flex flex-col gap-2">
                            <span>Descrição</span>
                            <textarea 
                                onBlur={() => updateChore(choreId)} 
                                disabled={showEditDescription} 
                                onChange={modelChangeUpdate} 
                                name="description" 
                                className="bg-gray-300 h-100 p-2" value={chore?.description} 
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <div className="flex flex-row gap-1">
                        <input onChange={({target}) => modelChangeUpdate({ target:{ name:target.name, value:true } })} type="radio" id="completed" name="isCompleted" checked={chore?.isCompleted} />
                        <label htmlFor="completed">Concluído</label>
                    </div>

                    <div className="flex flex-row gap-1">
                        <input onChange={({target}) => modelChangeUpdate({ target:{ name:target.name, value:false } })} type="radio" id="Not-completed" name="isCompleted" checked={!chore?.isCompleted} />
                        <label htmlFor="Not-completed">Não concluído</label>
                    </div>
                </div>
            </Modal>
        </div>
        )
}