import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import { ListCategories } from "../components/ListCategories"
import { UserOutput } from "../models/UserModel"
import userApi from "../services/UserApi"

export const Home = () => {
    const userId = 1
    const [user, setUser] = useState<UserOutput | null>(null)
    const [update, setUpdate] = useState<boolean>(true)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const { data } = await userApi.findOne(userId)
                setUser(data)

            } catch (error) {
                console.error(`erro ao buscar usuário: ${error}`)
            }
        }
        loadUser()
    }, [update])

    return(
        <div className="w-full h-screen">
        <Header />
        <ListCategories setUpdate={setUpdate} update={update} user={user} />
      </div>
    )
}