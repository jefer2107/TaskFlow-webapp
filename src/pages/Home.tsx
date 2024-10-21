import { useContext, useEffect, useState } from "react"
import { Header } from "../components/Header"
import { ListCategories } from "../components/ListCategories"
import { UserOutput } from "../models/UserModel"
import userApi from "../services/UserApi"
import { ModalChore } from "../components/ModalChore"
import { contextUser } from "../components/context/ContextUser"

export const Home = () => {
    const { payload } = useContext<any>(contextUser)
    const userId = payload.id

    const [user, setUser] = useState<UserOutput | null>(null)
    const [update, setUpdate] = useState<boolean>(true)

    console.log("userId", userId)

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
        <>
        <div className="h-screen w-full">
            <Header />
            <ListCategories setUpdate={setUpdate} update={update} user={user} />
        </div>
        </>
    )
}