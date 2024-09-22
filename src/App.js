import logo from "./logo.svg";
import "./App.css";
import MusicPlayer from "./components/MusicPlayer";
import { Container } from "@mui/material";

function App() {
  return (
    <Container maxWidth="md">
      <MusicPlayer />
    </Container>
  );
}

export default App;
