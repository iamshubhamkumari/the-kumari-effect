import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll to section with offset for fixed header
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu if open
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust this value based on your header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Update URL without page reload
      window.history.pushState(null, null, `#${sectionId}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link (for mobile view)
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-2xl font-bold text-dark hover:text-primary transition-colors"
          >
            Jane Doe
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "about")}
              className="text-dark hover:text-primary font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={(e) => scrollToSection(e, "skills")}
              className="text-dark hover:text-primary font-medium transition-colors"
            >
              Skills
            </a>
            <a
              href="#experience"
              onClick={(e) => scrollToSection(e, "experience")}
              className="text-dark hover:text-primary font-medium transition-colors"
            >
              Experience
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, "projects")}
              className="text-dark hover:text-primary font-medium transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="text-dark hover:text-primary font-medium transition-colors"
            >
              Contact
            </a>
            <div className="flex space-x-4">
              <a
                href="https://github.com/iamshubhamkumari"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark hover:text-primary text-xl transition-colors"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/shubhamkumari29/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark hover:text-primary text-xl transition-colors"
              >
                <FaLinkedin />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-dark"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <AiOutlineClose /> : <HiMenuAlt3 />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden bg-white shadow-lg rounded-lg mt-4 p-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#about"
                onClick={(e) => {
                  scrollToSection(e, "about");
                  closeMobileMenu();
                }}
                className="text-dark hover:text-primary font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#skills"
                onClick={(e) => {
                  scrollToSection(e, "skills");
                  closeMobileMenu();
                }}
                className="text-dark hover:text-primary font-medium transition-colors"
              >
                Skills
              </a>
              <a
                href="#experience"
                onClick={(e) => {
                  scrollToSection(e, "experience");
                  closeMobileMenu();
                }}
                className="text-dark hover:text-primary font-medium transition-colors"
              >
                Experience
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  scrollToSection(e, "projects");
                  closeMobileMenu();
                }}
                className="text-dark hover:text-primary font-medium transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  scrollToSection(e, "contact");
                  closeMobileMenu();
                }}
                className="text-dark hover:text-primary font-medium transition-colors"
              >
                Contact
              </a>
              <div className="flex space-x-4 pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark hover:text-primary text-xl transition-colors"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://linkedin.com/in/janedoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark hover:text-primary text-xl transition-colors"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="mailto:janedoe@email.com"
                  className="text-dark hover:text-primary text-xl transition-colors"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;