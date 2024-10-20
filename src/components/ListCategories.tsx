import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { UserOutput } from "../models/UserModel"
import { Chore } from "./Chore"
import { CategoryOutput } from "../models/CategoryModel"
import categoryApi from "../services/CategoryApi"
import choreApi from "../services/ChoreApi"

export interface ListCategoriesProps{
    user:UserOutput | null;
    setUpdate: Dispatch<SetStateAction<boolean>>;
    update: boolean;
}

export const ListCategories:FC<ListCategoriesProps> = ({user, setUpdate, update}) => {
    const userId = 1
    const [categories, setCategories] = useState<CategoryOutput[]>([])

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const { data } = await categoryApi.findAll(userId)
                setCategories(data)
    
            } catch (error) {
                console.error(`erro ao listar categorias: ${error}`)
            }
        }
        loadCategories()

    }, [update])

    const handleDragStart = (e:any, id:number) => {
        e.dataTransfer.setData('text/plain', id)
    }

    const handleDragOver = (e:any) => {
        e.preventDefault()
    }

    const removeChoreInCategory = async (e:any) => {
        e.preventDefault();
    
        const itemId = e.dataTransfer.getData('text')
 
        if(itemId){
            const choreId = parseInt(itemId)
            const {data} = await choreApi.update(choreId, { categoryId:null })

            if(!data?.id) console.error("Erro ao atualizar a tarefa")
            else setUpdate((x) => !x)
        }
    }

    const addChoreInCategory = async (e:any, id:number) => {
        e.preventDefault();
    
        const itemId = e.dataTransfer.getData('text')
        if(itemId){
            const choreId = parseInt(itemId)
            const {data} = await choreApi.update(choreId, { categoryId: id })

            if(!data?.id) console.error("Erro ao atualizar a tarefa")
            else setUpdate((x) => !x)
        }
    }

    return(
        <div className="flex overflow-x-auto h-[calc(100vh-4rem)] p-4">
            <div className="flex space-x-4">
                <div 
                    onDragOver={handleDragOver} 
                    onDrop={removeChoreInCategory} 
                    className="flex flex-col w-64 bg-blue-200 p-4 rounded-md h-full gap-2 overflow-y-auto"
                >
                    <>
                    <h3>Lista de Tarefas</h3>
                    {(user?.chores || []).map(chore => (
                        <Chore handleDragStart={handleDragStart} chore={chore} />
                    ))}
                    </>
                </div>
                {
                    (categories || []).map(category => (
                        <div 
                            onDragOver={handleDragOver} 
                            onDrop={(e) => addChoreInCategory(e, category.id)}  
                            className="flex flex-col w-64 bg-blue-200 p-4 rounded-md h-full gap-2 overflow-y-auto">
                            <>
                            <h3> {category.name} </h3>
                            {(category?.chores || []).map(chore => (
                                <Chore handleDragStart={handleDragStart} chore={chore} />
                            ))}
                            </>
                        </div>
                    ))
                }
            </div>

            <div className="flex flex-col w-64 bg-transparent justify-start items-center">
                <div className="bg-blue-200 p-4 rounded-md text-blue-600 cursor-pointer">
                    <span>+ Adicionar outra categoria</span>
                </div>
            </div>
        </div>
    )
}