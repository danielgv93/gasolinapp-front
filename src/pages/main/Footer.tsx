
export const Footer = () => {
    return (
        <footer
            className="absolute bottom-0 w-full md:mb-0 mb-28 h-20 p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    2023. Made with ❤️ by <a href="https://github.com/danielgv93" target={'_blank'} className="hover:underline">Daniel Garcia Varela</a></span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">Acerca de</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contacto</a>
                </li>
            </ul>
        </footer>
    )
}