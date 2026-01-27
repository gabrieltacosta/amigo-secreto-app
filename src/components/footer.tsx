const Footer = () => {
    return (
        <div className="flex flex-col w-full items-center justify-center">
            <div className="flex container justify-center mx-auto p-4">
                <span className="text-sm italic">&copy;{new Date().getFullYear()} | Amigo Secreto - Todos os direitos reservados.</span>
            </div>
        </div>
    )
}

export default Footer