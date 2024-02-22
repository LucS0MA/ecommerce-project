import BigTitle from "../components/BigTitle";
import Comptoir from "../components/Comptoir";
import Connexion from "../components/Connexion";
import Cookies from "../components/Cookies";
import Navbar from "../components/Navbar";
import Nouveautés from "../components/Nouveautés";
import Phares from "../components/Phares";

import { ModalProvider } from "../contexts/ConnexionContext";
import Festival from "../components/Festival";
import FooterBis from "../components/FooterBis";
import Sellers from "../components/Sellers";

function Home() {
  return (
    <ModalProvider>
      <Connexion />
      <Cookies />
      <Navbar />
      <BigTitle />
      <Nouveautés />
      <Comptoir />
      <Sellers />
      <Phares />
      <Festival />
      <FooterBis />
    </ModalProvider>
  );
}

export default Home;
