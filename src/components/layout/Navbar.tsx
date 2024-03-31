import React from "react"
import { Container } from "../common"
import MyWallet from "../MyWallet"

const Navbar = () => {
    return (
        <Container className="flex flex-col">
            <MyWallet />
        </Container>
    )
}

export default Navbar