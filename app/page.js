import Image from "next/image";
import Splash from "./components/Splash";
import About from "./components/About";
import Nav from "./components/Nav";
import Events from "./components/Events";
import Shop from "./components/Shop";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import Freshmen from "./components/Freshmen";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Nav />
      <Splash />
      <About />
      <Freshmen />
      <Events />
      <Contacts />
      <Footer />
    </div>
  );
}
