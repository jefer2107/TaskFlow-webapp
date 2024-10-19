import { Header } from "../components/Header"
import { ListCategories } from "../components/ListCategories"

export const Home = () => {
    return(
        <div className="w-full h-screen">
        <Header />
        <ListCategories />
      </div>
    )
}