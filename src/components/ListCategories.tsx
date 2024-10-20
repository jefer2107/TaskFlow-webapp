import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import { UserOutput } from "../models/UserModel"
import { Chore } from "./Chore"
import { CategoryInputCreate, CategoryOutput } from "../models/CategoryModel"
import categoryApi from "../services/CategoryApi"
import choreApi from "../services/ChoreApi"
import { ChoreInputCreate, ChoreInputUpdate, ChoreOutput } from "../models/ChoreModel"
import { ChoreCreateValidator } from "../validations/chores/ChoreCreateValidator"
import { toastMessages } from "../utils/toastMessages"
import { ToastContainer } from "react-toastify"
import { ModalChore } from "./ModalChore"
import { CategoryValidator } from "../validations/categories/CategoryValidator"

export interface ListCategoriesProps{
    user:UserOutput | null;
    setUpdate: Dispatch<SetStateAction<boolean>>;
    update: boolean;
}

export const ListCategories:FC<ListCategoriesProps> = ({user, setUpdate, update}) => {
    const userId = 1
    const [categories, setCategories] = useState<CategoryOutput[]>([])
    const [showCardAddNewChore, setShowCardAddNewChore] = useState<boolean>(false)
    const [showCardAddNewCategory, setShowCardAddNewCategory] = useState<boolean>(false)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [showEditText, setShowEditText] = useState<boolean>(false)
    const [showEditDescription, setShowEditDescription] = useState<boolean>(false)

    const choreCreateModel:ChoreInputCreate = {
        userId:null,
        title:"",
        description: ""
    }
    const [choreInputCreate, setChoreInputCreate] = useState<ChoreInputCreate>(choreCreateModel)

    const categoryCreateModel:CategoryInputCreate = {
        userId: null,
        name: ""
    }
    const [category, setCategory] = useState<CategoryInputCreate>(categoryCreateModel)

    const [choreId, setChoreId] = useState<number | null>(null)

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

    const modelChangeCreateChore = ({ target }:any) => {
        setChoreInputCreate((state:ChoreInputCreate) => {
            return {  ...state, [target.name]: target.value }
        })
    }

    const modelChangeCreateCategory = ({ target }:any) => {
        setCategory((state:any) => {
            return {  ...state, [target.name]: target.value }
        })
    }

    const addNewChore = async () => {
        setShowCardAddNewChore(false)
        try {
            const body = {...choreInputCreate, userId}

            const validator = new ChoreCreateValidator()
            const errorMessages = validator.errorMessage(body)

            if(!errorMessages){
                await choreApi.create(body)
                setShowCardAddNewChore(false)
                setUpdate((x) => !x)
                setChoreInputCreate(choreCreateModel)

            }else{
                errorMessages.forEach((message) => {
                    toastMessages("error", message)
                })
            }

        } catch (error) {
            setChoreInputCreate(choreCreateModel)
            toastMessages("error", "Ocorreu um erro ao criar tarefa. Por favor, tente novamente.")
            console.error(`Erro ao criar tarefa: ${error}`)
        }
    }

    const addNewCategory = async () => {
        try {
            setShowCardAddNewCategory(false)

            const validator = new CategoryValidator()
            const errorMessages = validator.errorMessage({...category, userId})

            if(errorMessages){
                errorMessages.forEach((message:string) => {
                    toastMessages("error", message)
                })

            }else{
                if(userId){
                    await categoryApi.create({...category, userId})
                    setCategory(categoryCreateModel)
                    setUpdate((x) => !x)
                }
            }
            
        } catch (error) {
            setCategory(categoryCreateModel)
            toastMessages("error", "Ocorreu um erro ao criar tarefa. Por favor, tente novamente.")
            console.error(`Erro ao criar tarefa: ${error}`)
        }
    }

    const openModalChore = (id:number) => {
        setModalOpen(true)
        setChoreId(id)
    }

    return(
        <>
        
        <div className="px-4">
        <ModalChore 
            setShowEditText={setShowEditText}
            setShowEditDescription={setShowEditDescription}
            showEditText={showEditText}
            showEditDescription={showEditDescription}
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
            choreId={choreId}
            userId={userId}
            setUpdate={setUpdate}
        />
            <h2 className="font-bold text-center text-lg py-5">Lista de Tarefas - março, 2024</h2>
            <div className="flex overflow-x-auto h-[calc(100vh-4rem)] py-5">
                <div className="flex space-x-4">
                    <div 
                        onDragOver={handleDragOver} 
                        onDrop={removeChoreInCategory} 
                        className="flex flex-col w-72 bg-blue-200 p-4 rounded-md h-auto gap-2 overflow-y-auto"
                    >
                        <>
                        <h3>Lista de Tarefas</h3>
                        {(user?.chores || []).map(chore => (
                            <Chore openModalChore={openModalChore} handleDragStart={handleDragStart} chore={chore} />
                        ))}
                        </>
                        {
                        showCardAddNewChore?
                        <div onBlur={() => setShowCardAddNewChore(false)} className="flex flex-col w-full p-2 mt-auto bg-gray-200 h-auto rounded-lg shadow-md gap-2">
                            <div className="flex flex-col gap-2">
                                <input name="title" onChange={modelChangeCreateChore} className="h-10 p-2 rounded-lg" type="text" autoFocus placeholder="Insira um título" />
                                <input name="description" onChange={modelChangeCreateChore} className="h-15 p-2 h-20 rounded-lg" type="text" placeholder="Insira uma descrição" />
                            </div>
                            <button 
                                type="button" 
                                onClick={addNewChore} 
                                className="bg-blue-700 p-1 w-2/4 text-sm font-bold text-white rounded-lg"
                                >
                                Adicionar tarefa
                            </button>
                        </div>
                        :
                        <div 
                            onClick={() => setShowCardAddNewChore(true)} 
                            className="text-blue-600 cursor-pointer mt-auto"
                            >
                                + Adicionar um Tarefa
                        </div>
                        }
                    </div>
                    {
                        (categories || []).map(category => (
                            <div 
                                onDragOver={handleDragOver} 
                                onDrop={(e) => addChoreInCategory(e, category.id)}  
                                className="flex flex-col w-72 bg-blue-200 p-4 rounded-md h-auto gap-2 overflow-y-auto">
                                <>
                                <h3> {category.name} </h3>
                                {(category?.chores || []).map(chore => (
                                    <Chore openModalChore={openModalChore} handleDragStart={handleDragStart} chore={chore} />
                                ))}
                                </>
                            </div>
                        ))
                    }
                </div>

                <div className="flex flex-col w-72 bg-transparent px-4 justify-start items-center">
                    <div className="bg-blue-200 p-4 rounded-md text-blue-600 cursor-pointer">
                        <>
                        {
                            showCardAddNewCategory?
                            <div onBlur={() =>setShowCardAddNewCategory(false)} className="flex flex-col w-full p-2 mt-auto bg-gray-200 h-auto rounded-lg shadow-md gap-2">
                                <div className="flex flex-col gap-2">
                                    <input name="name" onChange={modelChangeCreateCategory} className="h-10 p-2 rounded-lg" type="text" autoFocus placeholder="Insira um Nome" />
                                </div>
                                <button 
                                    type="button" 
                                    onClick={addNewCategory} 
                                    className="bg-blue-700 p-1 w-2/4 text-sm font-bold text-white rounded-lg"
                                    >
                                    Adicionar categoria
                                </button>
                            </div>
                            :
                            <div onClick={() => setShowCardAddNewCategory(true)} className="flex flex-col w-full p-2 mt-auto h-auto">
                                {/* <input className="h-10 p-2" value={"+ Adicionar outra categoria"} disabled  autoFocus placeholder="" /> */}
                                <span className="w-full">+ Adicionar outra categoria</span>
                            </div>

                        }
                        </>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
        </>
    )
}