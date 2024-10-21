import { useState } from "react"
import { UserInputAuthenticate } from "../models/UserModel"
import { toastMessages } from "../utils/toastMessages"
import userApi from "../services/UserApi"
import { UserAuthenticateValidator } from "../validations/users/UserAuthenticateValidator"
import { ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Spinner } from "../components/Spinner"

export const Login = () => {
    const userModel:UserInputAuthenticate = {
        email:"",
        password:""
    }
    const [user, setUser] = useState<UserInputAuthenticate>(userModel)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const changeModel = ({target}:any) => {
        setUser((state:UserInputAuthenticate) => {
            return { ...state, [target.name]: target.value }
        })
    }

    const userLogin = async (e:any) => {
        e.preventDefault()
        setLoading(true)

        try {

            const validator = new UserAuthenticateValidator()
            const errorMessages = validator.errorMessage(user)

            if(!errorMessages){
                const {data} = await userApi.auth(user)
                if(!data.userToken){
                    toastMessages("error", data?.errorMessage)
                    setLoading(false)

                }else{
                    localStorage.setItem("token", data?.userToken?.token)
                    toastMessages("success","Login efetuado com sucesso")
                    setLoading(false)
                } 

                setTimeout(() => {
                    setLoading(false)
                    navigate("/home")
                }, 5 * 1000)

            }else{
                errorMessages.forEach((message) => {
                    toastMessages("error",message)
                })

                setLoading(false)
            }

        } catch (error) {
            setLoading(false)
            toastMessages("error", "Ocorreu um erro ao efetuar o login. Por favor, tente novamente.")
            console.error(`Erro ao efetuar o login: ${error}`)
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen px-2 bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
                <form onSubmit={userLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input onChange={changeModel} name="email" type="email" id="email" className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                        <input onChange={changeModel} name="password" type="password" id="password" className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md shadow hover:bg-gradient-to-l focus:outline-none">Login</button>
                </form>
                <div className="flex flex-col items-center mt-4 py-5 gap-2">
                    {
                        loading?
                        <Spinner />
                        :
                        <>
                        <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
                        <a href="#" className="text-sm text-gray-600">Don't have an account? <span className="text-blue-500 hover:underline">Sign up</span></a>
                        </>
                    }

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}