import { FC } from "react"
import { UserOutput } from "../models/UserModel"
import { Chore } from "./Chore"

export interface ListCategoriesProps{
    user:UserOutput | null
}

export const ListCategories:FC<ListCategoriesProps> = ({user}) => {
    return(
        <div className="flex w-full h-full py-10 px-5 overflow-x-auto snap-x snap-mandatory gap-5">
            <div className="bg-blue-100 min-w-[50vw] h-screen flex justify-center flex-col px-5 py-10 gap-2 snap-center">
                {(user?.chores || []).map(chore => (
                    <Chore chore={chore} />
                ))}
            </div>
            {/* <div className="bg-blue-100 min-w-[50vw] h-screen flex justify-center p-5 snap-center">
                <Chore chore={{}} />
            </div> */}
            <div className="bg-blue-100 min-w-[50vw] h-auto flex justify-center p-5 snap-center">
                <span>+ Adicionar outra categoria</span>
            </div>
        </div>
    )
}