import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useWallet } from "@solana/wallet-adapter-react"

import { Container, H1, H3, Image, Button } from "./common"
import { traits } from "../constants"
import { getSplBalanceAlchemy } from "../helper"

const TraitPaletteContainer = styled(Container)({
    position: "relative",
    justifyContent: "center",
    width: "600px",
    minWidth: "500px",
    backgroundColor: "#d7e600",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
})

const TraitThumbnail = styled(Image)({
    width: "100%",
    height: "100%"
})

const TraitButton = styled(Button)<{ active?: boolean }>(({ active }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: "100px",
    minWidth: "100px",
    height: "auto",
    padding: "0px",
    cursor: "pointer",
    border: "none",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: active ? "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px" : "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
}))

const TraitsContainer = styled(Container)({
    width: "500px",
    overflowX: "auto",
    gap: "10px",
    padding: "5px",
    "&::-webkit-scrollbar": {
        height: "10px"
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: "10px"
    }
})

const OverlayContainer = styled(Container)<{ active?: boolean }>(({ active }) => ({
    display: active ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
    zIndex: 2,
    color: "#ffffff"
}))

interface TraitPalettePropType {
    onTraitSelect: (traitIndex: number, itemIndex: number, item: string) => void
}

const TraitPalette: React.FC<TraitPalettePropType> = ({ onTraitSelect }) => {
    const wallet = useWallet()

    const [walletAllowed, setWalletAllowed] = useState<boolean>(false)

    const [activeItemInTraits, setActiveItemInTraits] = useState<{ [key: number]: number }>()

    const handleTraitSelection = (traitIndex: number, itemIndex: number, item: string) => {
        setActiveItemInTraits({ ...activeItemInTraits, [traitIndex]: itemIndex })
        onTraitSelect(traitIndex, itemIndex, item)
    }

    useEffect(() => {
        traits.forEach((trait, index) => {
            onTraitSelect(index, 0, trait.items[0])
        })
    }, [onTraitSelect])

    useEffect(() => {
        (async () => {
            if(wallet.connected && wallet.publicKey) {
                try {
                    const balance = await getSplBalanceAlchemy(wallet.publicKey.toString(), "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB")
                    
                    if(balance > 0) {
                        setWalletAllowed(true)
                    }
                    else {
                        setWalletAllowed(false)
                    }
                }
                catch(error) {
                    setWalletAllowed(false)
                    console.error(error)
                }
            }
            else {
                setWalletAllowed(false)
            }
        })()
    }, [ wallet.connected, wallet.publicKey ])

    return (
        <TraitPaletteContainer className="flex flex-col justify-center items-center">
            <OverlayContainer active={!walletAllowed}>
                {
                    (wallet.connected && wallet.publicKey)?
                    <H1 className="flex">You must hold our token to generate NFT</H1>:
                    <H1 className="flex">You must connect wallet to use generator</H1>
                }
            </OverlayContainer>
            <Container className="flex">
                <H1>Create your NFT</H1>
            </Container>
            {
                traits.map((item, trait_index) =>
                    <Container key={trait_index} className="flex flex-col justify-center items-center">
                        <Container className="flex">
                            <H3>{item.name}</H3>
                        </Container>
                        <TraitsContainer className="flex traits-container" style={{ width: "500px", overflowX: "auto", gap: "10px", padding: "5px" }}>
                            {
                                item.items.map((item, item_index) =>
                                    <TraitButton  active={ activeItemInTraits && activeItemInTraits[trait_index] === item_index } onClick={() => handleTraitSelection(trait_index, item_index, item)}>
                                        <TraitThumbnail key={item_index} src={item} />
                                    </TraitButton>

                                )
                            }
                        </TraitsContainer>
                    </Container>
                )
            }
        </TraitPaletteContainer>
    )
}

export default TraitPalette