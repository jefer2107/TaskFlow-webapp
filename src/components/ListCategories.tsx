import { FC, useEffect, useState } from "react"
import { UserOutput } from "../models/UserModel"
import { Chore } from "./Chore"
import { CategoryOutput } from "../models/CategoryModel"
import categoryApi from "../services/ChoreApi"

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

    return(
        <div className="flex w-full h-full py-10 px-5 overflow-x-auto snap-x snap-mandatory gap-5">
            <div className="bg-blue-100 min-w-[50vw] h-screen flex justify-center flex-col px-5 py-10 gap-2">
                <>
                <h3>Lista de Tarefas</h3>
                {(user?.chores || []).map(chore => (
                    <Chore chore={chore} />
                ))}
                </>
            </div>
            {
                (categories || []).map(category => (
                    <div className="bg-blue-100 min-w-[50vw] h-screen flex justify-center flex-col px-5 py-10 gap-2 snap-center">
                        <>
                        <h3> {category.name} </h3>
                        {(category?.chores || []).map(chore => (
                            <Chore chore={chore} />
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