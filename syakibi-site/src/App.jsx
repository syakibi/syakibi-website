import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Schedules from "./components/Schedules";
import Socials from "./components/Socials";
import './App.scss';

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [direction, setDirection] = useState("right");
  const sections = ["Home", "About", "Gallery", "Schedules", "Socials"];

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const currentIndex = sections.indexOf(currentPage);

      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        setDirection("right");
        setCurrentPage(sections[currentIndex + 1]);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setDirection("left");
        setCurrentPage(sections[currentIndex - 1]);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "Home": return <Hero />;
      case "About": return <About />;
      case "Gallery": return <Gallery />;
      case "Schedules": return <Schedules />;
      case "Socials": return <Socials />;
      default: return <Hero />;
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className={`page-container ${direction}`}></div>
      {renderPage()}
    </div>
  );
}
