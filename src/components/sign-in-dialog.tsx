"use client"

import SignIn from "./sign-in-form"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"


const SignInDialog = () => {


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="lg">
                    Já tenho conta
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <SignIn />
            </DialogContent>
        </Dialog>
    )
}

export default SignInDialog