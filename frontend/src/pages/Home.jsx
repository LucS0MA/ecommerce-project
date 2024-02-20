import BigTitle from "../components/BigTitle";
import Nouveautés from "../components/Nouveautés";
import Phares from "../components/Phares";
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
      <Nouveautés />
      <Phares />
    </ModalProvider>
  );
}

export default Home;
