import Connexion from "../components/Connexion";
import FiltresArticles from "../components/FiltresArticles";
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
        <FiltresArticles />
      </main>
      <footer>
        <FooterBis />
      </footer>
    </ModalProvider>
  );
}

export default Catalogue;
