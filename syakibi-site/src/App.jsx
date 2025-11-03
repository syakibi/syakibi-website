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
    const section = document.querySelector(".page-container section");
    if (!section) return;

    const atTop = section.scrollTop <= 0;
    const atBottom =
      section.scrollTop + section.clientHeight >= section.scrollHeight;

    // If user can scroll inside section, allow normal scroll
    if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return;

    // Otherwise, change section
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

  // attach globally so you can scroll anywhere on screen
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
      <div className={`page-container ${direction}`} key={currentPage}>
        {renderPage()}
      </div>
    </div>
  );
}
