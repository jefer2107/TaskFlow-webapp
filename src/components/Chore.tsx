import { Dispatch, FC, SetStateAction } from "react"
import { ChoreOutput } from "../models/ChoreModel"

export interface ChoreProps{
    chore:ChoreOutput;
    handleDragStart: (e:any, id:number) => void;
    openModalChore: (id:number) => void;
}

export const Chore:FC<ChoreProps> = ({chore, handleDragStart, openModalChore}) => {
    return(
        <div 
            draggable="true" 
            onDragStart={(e) => handleDragStart(e, (chore?.id as number))} 
            className="flex flex-col w-full px-2 bg-white h-40 rounded-lg shadow-md cursor-pointer"
            onClick={() => openModalChore(chore?.id as number)}
        >
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