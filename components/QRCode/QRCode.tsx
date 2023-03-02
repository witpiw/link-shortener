import {QRCodeCanvas} from 'qrcode.react';
import { Flex, Box } from '@chakra-ui/react';

interface IProps {
    url: string
}

function QRCode(props: IProps) {
    return (
        <Flex mt={4} justifyContent={"center"} align={"center"}>
            <Box border="2px solid" borderColor={"rgba(0,0,0,.4)"} borderRadius={10} p={6}>
                <QRCodeCanvas value={props.url}/>
            </Box>
        </Flex>
    )
}

export default QRCode