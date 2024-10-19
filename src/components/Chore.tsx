import { FC } from "react"
import { ChoreOutput } from "../models/ChoreModel"

export interface ChoreProps{
    chore:ChoreOutput
}

export const Chore:FC<ChoreProps> = ({chore}) => {
    return(
        <div className="flex flex-col w-full px-2 bg-white h-40 rounded-lg shadow-md">
            <div>
                <div className="text-end">...</div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="text-start text-gray-400">{chore.title}</div>
                <div className="h-full text-gray-400 truncate">{chore.description}</div>
            </div>
            <div className="flex justify-center pt-5">
                <span className="text-green-500">
                    {
                        chore.isCompleted?
                        "Concluído":
                        "Não concluído"
                    }
                </span>
            </div>
        </div>
    )
}