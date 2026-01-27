"use client"

import { Gift } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import SignUp from "./sign-up-form"


const SignUpDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                    Começar agora
                    <Gift className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Faça seu cadastro na plataforma</DialogTitle>
                <SignUp />
            </DialogContent>
        </Dialog>
    )
}

export default SignUpDialog