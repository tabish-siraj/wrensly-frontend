import { Box, Input, InputGroup } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"

export const SearchBar: React.FC = () => {
    return (
        <Box width={{ base: "80%" }} my="10px">
            <InputGroup endElement={<LuSearch />}>
                <Input placeholder="Search" />
            </InputGroup>

        </Box>
    )
}

export default SearchBar;