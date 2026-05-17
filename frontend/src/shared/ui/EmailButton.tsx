import { Button, HStack } from "@chakra-ui/react"
import { RiMailLine } from "react-icons/ri"

interface EmailButtonProp {
    handleClick: () => void;
}

export const EmailButton = ({ handleClick }: EmailButtonProp) => {
    return (
        <HStack>
            <Button onClick={handleClick} colorPalette="teal" variant="solid">
                <RiMailLine /> Email
            </Button>
        </HStack>
    )
}
