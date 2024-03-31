import React , { useEffect } from "react"
import { Stage, Layer, Image } from "react-konva"
import { Container } from "./common"

interface CanvasAreaPropType {
    traits: Array<{ traitIndex: number, itemIndex: number, item: string }>
}

const CanvasArea: React.FC<CanvasAreaPropType> = ({ traits }) => {

    useEffect(() => {
        console.log(traits)
    }, [JSON.stringify(traits.values)])

    return (
        <Container>
            { JSON.stringify(traits) }
        </Container>
    )
}

export default CanvasArea