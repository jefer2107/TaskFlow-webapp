import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Protected } from "./components/Protected"

export const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Protected />}>
                <Route path="home" element={<Home />} />
            </Route>
        </Routes>
    )
}