import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"

import { Container, Canvas, Button } from "../common"
import TraitPalette from "../TraitPalette"

const HomePageContainer = styled(Container)({
    display: "flex",
    padding: "10px",
    justifyContent: "center",
    gap: "10%"
})

const NFTCanvas = styled(Canvas)({
    display: "flex",
    width: "300px",
    height: "300px",
    boxShadow: "rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px"
})

const NFTCanvasContainer = styled(Container)({
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
})

const NFTDownloadButton = styled(Button)({
    paddingTop: "10px",
    paddingBottom: "10px",
    background: "#d7e600",
    border: "none",
    color: "#ffffff",
    boxShadow: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
    cursor: "pointer"
})

const HomePage = () => {
    const CANVAS_WIDTH = 1000
    const CANVAS_HEIGHT = 1000

    const canvas = useRef<HTMLCanvasElement>(null)
    const [context, setContext] = useState<CanvasRenderingContext2D | null>()

    const [traits, setTraits] = useState<Array<{ traitIndex: number, itemIndex: number, item: string }>>([])


    const onTraitSelect = (traitIndex: number, itemIndex: number, item: string) => {
        const preTraits = traits
        preTraits[traitIndex] = { traitIndex,  itemIndex, item}
        setTraits(preTraits)

        context?.clearRect(0, 0, canvas.current?.width || CANVAS_WIDTH, canvas.current?.height || CANVAS_HEIGHT)

        preTraits.forEach(trait => {
            const image = new Image()
            image.src = trait.item
            image.onload = () => {
                context?.drawImage(image, 0, 0, canvas.current?.width || CANVAS_WIDTH, canvas.current?.height || CANVAS_HEIGHT)
            }
        })
    }

    const downloadImage = () => {
        const url = canvas.current?.toDataURL('image/png')
        const link = document.createElement('a')
        link.download = "nft-collection.png"
        link.href = url || ""
        link.click()
    }

    useEffect(() => {
        if(canvas) {
            setContext(canvas.current?.getContext('2d'))
        }
    }, [canvas])

    return (
        <HomePageContainer>
            <Container>
                <TraitPalette onTraitSelect={(traitIndex, itemIndex, item) => onTraitSelect(traitIndex, itemIndex, item)} />
            </Container>
            <Container>
                <NFTCanvasContainer>
                    <NFTCanvas ref={canvas} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
                    <NFTDownloadButton onClick={downloadImage} >Download</NFTDownloadButton>
                </NFTCanvasContainer>
            </Container>
        </HomePageContainer>
    )
}

export default HomePage