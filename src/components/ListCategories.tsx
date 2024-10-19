export const ListCategories = () => {
    return(
        <div className="flex w-full h-full py-10 px-5 overflow-x-auto snap-x snap-mandatory gap-5">
            <div className="bg-blue-100 min-w-[50vw] h-screen flex justify-center p-5 snap-center">
                <div className="flex flex-col w-full px-2 bg-white h-40 rounded-lg shadow-md">
                    <div>
                        <div className="text-end">...</div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="text-start text-gray-400">Title</div>
                        <div className="h-full text-gray-400">ddddddddddddddd...</div>
                    </div>
                    <div className="flex justify-center pt-5">
                        <span className="text-green-500">concluído</span>
                    </div>
                </div>
            </div>
            <div className="bg-blue-100 min-w-[50vw] h-auto flex justify-center p-5 snap-center">
                <span>+ Adicionar outra categoria</span>
            </div>
        </div>
    )
}