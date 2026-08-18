import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MenuBar = ({ isMobile = false, closeMenu }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id, index, path) => {
    if (location.pathname === "/boutique" && !path) {
      navigate("/", { replace: true });
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    } else if (path) {
      navigate(path);
      if (path === "/" && id) {
        setTimeout(() => {
          const section = document.getElementById(id);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 50);
      }
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }

    setActiveIndex(index);

    if (isMobile && closeMenu) {
      closeMenu();
    }
  };

  const menuItems = useMemo(
    () => [
      { label: "Accueil", sectionId: "acceuil", path: "/" },
      { label: "Services", sectionId: "services" },
      { label: "Offres", sectionId: "offres-mariage" },
      { label: "Galerie", sectionId: "galerie" },
      { label: "Contactez-nous", sectionId: "contact" },
      { label: "Réseaux sociaux", sectionId: "footer" },
    ],
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const activeItemIndex = menuItems.findIndex(
              (item) => item.sectionId === sectionId,
            );
            if (activeItemIndex !== -1) {
              setActiveIndex(activeItemIndex);
            }
          }
        });
      },
      {
        rootMargin: "-50% 0px",
      },
    );

    menuItems.forEach((item) => {
      const section = document.getElementById(item.sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [menuItems]);

  return (
    <div>
      <nav
        className={`${
          isMobile
            ? "flex flex-col items-center space-y-6 px-6 py-8 text-black"
            : "flex items-center space-x-16 text-md text-black"
        }`}
        style={
          isMobile
            ? {
                border: "2px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "20px",
                backdropFilter: "blur(80px)",
                backgroundColor: "rgba(200, 200, 200, 0.3)",
                padding: "20px 30px",
                width: "90%",
                margin: "0 auto",
              }
            : {}
        }
      >
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(item.sectionId, index, item.path)}
            className={`relative p-2 text-center transition-colors ${
              isMobile ? "w-full" : ""
            } ${
              activeIndex === index ? "text-[#1687A7]" : "text-black"
            } hover:text-[#1687A7]`}
          >
            <span className="relative">
              {item.label}
              <span
                className={`absolute bottom-[-2px] left-0 h-[2px] w-full bg-[#1687A7] text-[#1687A7] transition-transform ${
                  activeIndex === index ? "scale-x-100" : "scale-x-0"
                } origin-left hover:scale-x-100`}
              ></span>
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MenuBar;
