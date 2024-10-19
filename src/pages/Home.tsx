import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import { ListCategories } from "../components/ListCategories"
import { UserOutput } from "../models/UserModel"
import userApi from "../services/UserApi"

export const Home = () => {
    const userId = 1
    const [user, setUser] = useState<UserOutput | null>(null)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const { data } = await userApi.findOne(userId)
                setUser(data)

            } catch (error) {
                console.error(`erro ao listar usuários: ${error}`)
            }
        }
        loadUser()
    }, [])

    return(
        <div className="w-full h-screen">
        <Header />
        <ListCategories user={user} />
      </div>
    )
}