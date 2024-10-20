import { FC, useEffect, useState } from "react"
import { UserOutput } from "../models/UserModel"
import { Chore } from "./Chore"
import { CategoryOutput } from "../models/CategoryModel"
import categoryApi from "../services/CategoryApi"

export interface ListCategoriesProps{
    user:UserOutput | null
}

export const ListCategories:FC<ListCategoriesProps> = ({user}) => {
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

    }, [])

    const updateChore = async (id:number) => {}

    const handleDragStart = (e:any, id:number) => {
        e.dataTransfer.setData('text/plain', id)
    }

    const handleDragOver = (e:any) => {
        e.preventDefault()
    }

    const handleDrop = async (e:any, id:number) => {
        e.preventDefault();
    
        const itemId = e.dataTransfer.getData('text')
        alert(`Card com ID: ${itemId} solto na área com ID: ${id}`);
    }

    return(
        <div className="flex w-full h-full py-10 px-5 overflow-x-auto snap-x snap-mandatory gap-5">
            <div className="bg-blue-100 min-w-[50vw] h-screen flex justify-center flex-col px-5 py-10 gap-2">
                <>
                <h3>Lista de Tarefas</h3>
                {(user?.chores || []).map(chore => (
                    <Chore handleDragStart={handleDragStart} chore={chore} />
                ))}
                </>
            </div>
            {
                (categories || []).map(category => (
                    <div onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, category.id)}  className="bg-blue-100 min-w-[50vw] h-screen flex justify-center flex-col px-5 py-10 gap-2 snap-center">
                        <>
                        <h3> {category.name} </h3>
                        {(category?.chores || []).map(chore => (
                            <Chore handleDragStart={handleDragStart} chore={chore} />
                        ))}
                        </>
                    </div>
                ))
            }

            <div className="bg-blue-100 min-w-[50vw] h-auto flex justify-center p-5 snap-center">
                <span>+ Adicionar outra categoria</span>
            </div>
        </div>
    )
}