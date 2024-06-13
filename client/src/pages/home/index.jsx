import { Box, Container} from "@mui/material";
import Wrapper from "../../components/todos/todoWrapper";

const Home = () => {
    return <Box sx={{my: 6, backgroundColor: '#FAFAFA'}} data-testid="home-component">
    <Container maxWidth="md" >
        <Wrapper data-testid="wrapper-component" />
    </Container>
    </Box>
}

export default Home;