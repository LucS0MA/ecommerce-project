import Connexion from "../components/Connexion";
import FooterBis from "../components/FooterBis";
import Navbar from "../components/Navbar";
import { ModalProvider } from "../contexts/ConnexionContext";

function Catalogue() {
  return (
    <ModalProvider>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Connexion />
      </main>
      <footer>
        <FooterBis />
      </footer>
    </ModalProvider>
  );
}

export default Catalogue;
