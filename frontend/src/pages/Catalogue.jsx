import Connexion from "../components/Connexion";
import FiltresArticles from "../components/FiltresArticles";
import FooterBis from "../components/FooterBis";
import { ModalProvider } from "../contexts/ConnexionContext";
import Navbar from "../components/Navbar";

function Catalogue() {
  return (
    <ModalProvider>
      <header>
        <Navbar />
        <Connexion />
      </header>
      <main>
        <FiltresArticles />
      </main>
      <footer>
        <FooterBis />
      </footer>
    </ModalProvider>
  );
}

export default Catalogue;
