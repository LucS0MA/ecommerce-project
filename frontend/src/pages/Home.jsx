import BigTitle from "../components/BigTitle";
import Comptoir from "../components/Comptoir";
import Connexion from "../components/Connexion";
import Cookies from "../components/Cookies";
import Navbar from "../components/Navbar";
import Nouveautés from "../components/Nouveautés";
import Phares from "../components/Phares";

import { ModalProvider } from "../contexts/ConnexionContext";

function Home() {
  return (
    <ModalProvider>
      <Connexion />
      <Cookies />
      <Navbar />
      <BigTitle />
      <Nouveautés />
      <Comptoir />
      <Phares />
    </ModalProvider>
  );
}

export default Home;
