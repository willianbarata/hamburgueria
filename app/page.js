import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cardapio from './components/Cardapio';
import Destaques from './components/Destaques';
import Montagem from './components/Montagem';
import Galeria from './components/Galeria';
import Depoimentos from './components/Depoimentos';
import Localizacao from './components/Localizacao';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Cardapio />
        <Destaques />
        <Montagem />
        <Galeria />
        <Depoimentos />
        <Localizacao />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
