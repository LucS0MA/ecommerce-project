import BigTitle from "../components/BigTitle";
import Cookies from "../components/Cookies";
import Connexion from "../components/Connexion";
import Navbar from "../components/Navbar";
import { ModalProvider } from "../contexts/ConnexionContext";

function Home() {
  return (
    <ModalProvider>
      <Connexion />
      <Cookies />
      <Navbar />
      <BigTitle />
    </ModalProvider>
  );
}

export default Home;
