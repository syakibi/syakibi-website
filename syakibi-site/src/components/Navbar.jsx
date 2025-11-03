import { useState, useEffect } from "react";

function Navbar({ currentPage, setCurrentPage }) {
  const sections = ["Home", "About", "Gallery", "Schedules", "Socials"];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Desktop menu */}
      <div className="menu-desktop">
        {sections.map((section, index) => (
          <button
            key={section}
            className={currentPage === section ? "active" : ""}
            onClick={() => setCurrentPage(section)}
          >
            {section}
            {index < sections.length - 1 && <span className="divider">/</span>}
          </button>
        ))}
      </div>

      {/* Mobile menu */}
      <div className="menu-mobile">
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        {isOpen && (
          <div className="dropdown">
            {sections.map((section) => (
              <button
                key={section}
                className={currentPage === section ? "active" : ""}
                onClick={() => {
                  setCurrentPage(section);
                  setIsOpen(false);
                }}
              >
                {section}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
