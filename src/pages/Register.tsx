export const Register = () => {
    return(
        <div className="flex items-center justify-center min-h-screen px-2 bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-center">Cadastrar</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input type="text" id="text" className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                        <input type="password" id="password" className="block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md shadow hover:bg-gradient-to-l focus:outline-none">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}