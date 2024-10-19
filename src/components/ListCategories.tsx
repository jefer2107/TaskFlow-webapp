import { Chore } from "./Chore"

export const ListCategories = () => {
    return(
        <div className="flex w-full h-full py-10 px-5 overflow-x-auto snap-x snap-mandatory gap-5">
            <div className="bg-blue-100 min-w-[50vw] h-screen flex justify-center p-5 snap-center">
                <Chore />
            </div>
            <div className="bg-blue-100 min-w-[50vw] h-auto flex justify-center p-5 snap-center">
                <span>+ Adicionar outra categoria</span>
            </div>
        </div>
    )
}