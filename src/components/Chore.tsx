import { Dispatch, FC, SetStateAction } from "react"
import { ChoreOutput } from "../models/ChoreModel"

export interface ChoreProps{
    chore:ChoreOutput;
    handleDragStart: (e:any, id:number) => void;
    openModalChore: (id:number) => void;
    removeChore: (id:number) => void;
}

export const Chore:FC<ChoreProps> = ({chore, handleDragStart, openModalChore, removeChore}) => {
    return(
        <div 
            draggable="true" 
            onDragStart={(e) => handleDragStart(e, (chore?.id as number))} 
            className="flex flex-col w-full px-2 bg-white h-40 rounded-lg shadow-md gap-2 cursor-pointer"
        >
            <div className="flex flex-col p-2">
                <div className="flex flex-row justify-between">
                    <div className="text-start text-gray-400">{chore.title}</div>
                    <div onClick={() => removeChore(chore?.id as number)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EA3323"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="h-full text-gray-400 truncate">{chore.description}</div>
                <div onClick={() => openModalChore(chore?.id as number)} className="flex justify-center p-2">
                    {
                        chore.isCompleted?
                        <span className="bg-green-500 text-white font-bold p-2 rounded-xl">
                            Concluído
                        </span>
                        :
                        <span className="bg-red-500 text-white font-bold p-2 rounded-xl">
                            Não concluído
                        </span>
                    }
                </div>
            </div>

        </div>
    )
}