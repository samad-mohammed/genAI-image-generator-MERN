import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/theme";
// import { Container } from "@mui/material";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Navbar from "./components/Navbar";


const Container = styled.div`
  width:100%;
  height:100vh;
  display:flex;
  background:${({theme})=>theme.bg};
  // padding-top: 50px; /* Add padding top to accommodate the navbar */
`

const Wrapper = styled.div`
  height: 100%;
  width:100%;
  position:relative;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  color: ${({theme})=>theme.text_primary};
  overflow-x:hidden;
  // overflow-y:hidden;
`
function App() {
  return <ThemeProvider theme={darkTheme}>
    <Container>
      <Wrapper>
        <BrowserRouter>
        <Navbar/>
        <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/post" element={<CreatePost/>} />
        </Routes>
        </BrowserRouter>
        
        
      </Wrapper>
    </Container>
  </ThemeProvider>
}

export default App;
