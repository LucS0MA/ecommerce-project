import Connexion from "../components/Connexion";
import FooterBis from "../components/FooterBis";
import Navbar from "../components/Navbar";
import { ModalProvider } from "../contexts/ConnexionContext";

function Catalogue() {
  return (
    <ModalProvider>
      <header>
        <Navbar />
        <Connexion />
      </header>
      <main>
        <h1>Catalogue</h1>
      </main>
      <footer>
        <FooterBis />
      </footer>
    </ModalProvider>
  );
}

export default Catalogue;
