import { useState } from "react"
import { UserInputCreate } from "../models/UserModel"
import { useNavigate } from "react-router-dom"
import { toastMessages } from "../utils/toastMessages"
import { UserCreateValidator } from "../validations/users/UserCreateValidator"
import userApi from "../services/UserApi"
import { ToastContainer } from "react-toastify"

export const Register = () => {
    const userModel:UserInputCreate = {
        name:"",
        email:"",
        password:""
    }
    const [user, setUser] = useState<UserInputCreate>(userModel)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const changeModel = ({target}:any) => {
        setUser((state:UserInputCreate) => {
            return { ...state, [target.name]: target.value }
        })
    }

    const userCreate = async (e:any) => {
        e.preventDefault()

        const validator = new UserCreateValidator()
        const errorMessages = validator.errorMessage(user)

        try {

            if(!errorMessages){
                await userApi.create(user)
                toastMessages("success","Cadastro efetuado com sucesso")
                setLoading(false)

                setTimeout(() => {
                    setLoading(false)
                    navigate("/login")
                }, 10 * 1000)

            }else{
                errorMessages.forEach((message) => {
                    toastMessages("error",message)
                })
    
                setLoading(false)
            }
            
        } catch (error) {
            setLoading(false)
            toastMessages("error", "Ocorreu um erro ao efetuar o cadastro. Por favor, tente novamente.")
            console.error(`Erro ao efetuar o cadastro: ${error}`)
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen px-2 bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-center">Cadastrar</h2>
                <form onSubmit={userCreate} >
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input onChange={changeModel} name="name" type="text" id="text" className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input onChange={changeModel} name="email" type="email" id="email" className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                        <input onChange={changeModel} name="password" type="password" id="password" className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    {
                        loading?
                        <button type="button" className="w-full py-2 px-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md shadow hover:bg-gradient-to-l focus:outline-none" disabled>
                            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                            </svg>
                            Processing...
                        </button>
                        :
                        <button type="submit" className="w-full py-2 px-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md shadow hover:bg-gradient-to-l focus:outline-none">Cadastrar</button>
                    }
                    
 
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}