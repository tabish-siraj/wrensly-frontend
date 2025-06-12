import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "./components/ui/sidebar";
import { Main } from "./components/ui/main";
function App() {
  // Generating 1 screen with 1 main content area in the middle and 2 sidebars on the left and right
  // Must be responsive, right one would hide on small screens while the left one would be changed into
  // a sandwich menu on small screens
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      height="100vh"
      width="100vw"
      overflow="hidden"
    >
      <Box
        width={{ base: "100%", md: "20%" }}
        height="100%"
        display={{ base: "none", md: "block" }}
      >
        <Sidebar />
      </Box>
      <Box
        flex="1"
        p={1}
        height="100%"
        display="flex"
        justifyContent="center"
      >
        <Main />
      </Box>
      <Box
        width={{ base: "100%", md: "20%" }}
        height="100%"
        bg="red.500"
        display={{ base: "none", md: "block" }}
      >
        Right Sidebar
      </Box>
    </Flex>
  );
}

export default App;
