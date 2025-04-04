import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MenuBar = ({ isMobile = false, closeMenu }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook to access the current path

  const scrollToSection = (id, index, path) => {
    if (location.pathname === "/boutique" && !path) {
      // If currently on /boutique and the clicked item is a section (not a path),
      // navigate to "/" and then scroll to the section
      navigate("/", { replace: true });
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 50); // Delay to ensure navigation is complete before scrolling
    } else if (path) {
      // For route navigation, use `navigate`
      navigate(path);
      if (path === "/" && id) {
        // If the path is "/" (Accueil), scroll to the "Accueil" section
        setTimeout(() => {
          const section = document.getElementById(id);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 50);
      }
    } else {
      // For section scrolling, use `scrollIntoView`
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
      { label: "Galerie", sectionId: "galerie" },
      { label: "Localisation", sectionId: "localisation" },
      { label: "FeedBacks", sectionId: "feedbacks" },
      { label: "Boutique", sectionId: "boutique", path: "/boutique" },
    ],
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const activeItemIndex = menuItems.findIndex(
              (item) => item.sectionId === sectionId
            );
            if (activeItemIndex !== -1) {
              setActiveIndex(activeItemIndex);
            }
          }
        });
      },
      {
        rootMargin: "-50% 0px",
      }
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
            ? "flex flex-col items-center space-y-6 py-8 px-6 text-black "
            : "flex items-center space-x-16 text-black text-md"
        }`}
        style={
          isMobile
            ? {
                border: "2px solid rgba(255, 255, 255, 0.2)", // Subtle border for mobile
                borderRadius: "20px", // Rounded corners
                backdropFilter: "blur(80px)", // Blur effect for mobile
                backgroundColor: "rgba(200, 200, 200, 0.3)",
                padding: "20px 30px", // Padding for mobile
                width: "90%", // Reduce width to leave some space on the sides
                margin: "0 auto", // Shadow for depth
              }
            : {}
        }
      >
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(item.sectionId, index, item.path)} // Adjusted for path
            className={`relative transition-colors ${
              isMobile ? "w-full" : ""
            } text-center p-2 ${
              activeIndex === index ? "text-[#1687A7]" : "text-black"
            } hover:text-[#1687A7]`}
          >
            <span className="relative">
              {item.label}
              <span
                className={`absolute left-0 bottom-[-2px] w-full h-[2px] bg-[#1687A7] text-[#1687A7] transition-transform ${
                  activeIndex === index ? "scale-x-100" : "scale-x-0"
                } hover:scale-x-100 origin-left`}
              ></span>
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MenuBar;
