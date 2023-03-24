import { Flex, Spinner } from "@chakra-ui/react"

interface IProps {
    width?: number | string
    height?: number | string
}

function Loading(props: IProps) {
    return <Flex width={props.width || "100%"} height={props.height || "100%"} justify={"center"} align={"center"}><Spinner/></Flex>
}

export {Loading}