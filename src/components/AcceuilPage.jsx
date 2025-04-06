"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import images from assets
import photographer1 from "../assets/acceuil/acc1-1.png";
import cameraDisplay1 from "../assets/acceuil/acc1-3.jpg";
import eventVenue1 from "../assets/acceuil/acc1-2.jpg";

// Import additional sets of images for other slides
import photographer2 from "../assets/acceuil/acc2-1.jpg";
import cameraDisplay2 from "../assets/acceuil/acc2-2.jpg";
import eventVenue2 from "../assets/acceuil/acc2-3.jpg";

export default function AcceuilPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState("right");
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const slideContainerRef = useRef(null);

  const slides = [
    {
      title: "Photographe Événementiel",
      subtitle: "Précision et Expertise",
      description:
        "En tant que photographe événementiel professionnel, je capture chaque moment important de vos événements avec précision. Que ce soit des galas, conférences, séminaires, salons, stands d'exposition, lancements de produits ou soirées d'entreprise, chaque photo reflète l'ambiance et l'émotion du moment. Mon objectif est de vous offrir des images de haute qualité qui valorisent votre événement.",
      cta: "Planifiez votre shooting",
      images: {
        main: photographer1,
        camera: cameraDisplay1,
        venue: eventVenue1,
      },
    },
    {
      title: "Mise en Valeur de Votre Événement",
      subtitle: "",
      description:
        "Grâce à mon expérience et à une attention particulière aux détails, je réalise des images qui subliment votre travail et renforcent votre communication visuelle. Chaque photo raconte une histoire : celle de votre entreprise, de vos collaborateurs, de vos invités et de l'ambiance qui fait la réussite de votre événement. Que ce soit pour des publications sur vos réseaux sociaux, vos supports de communication ou votre site web, mes clichés vous permettent d'avoir un contenu de qualité qui attire et engage votre audience.",
      cta: "Réservez votre shooting",
      images: {
        main: photographer2,
        camera: cameraDisplay2,
        venue: eventVenue2,
      },
    },
  ];

  const handleSlideChange = (newSlide, newDirection) => {
    if (isTransitioning) return;

    setDirection(newDirection);
    setIsTransitioning(true);

    // Short delay to allow CSS transitions to complete
    setTimeout(() => {
      setCurrentSlide(newSlide);

      // Allow time for the new slide to render before removing transition class
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const nextSlide = () => {
    const newSlide = (currentSlide + 1) % slides.length;
    handleSlideChange(newSlide, "right");
  };

  const prevSlide = () => {
    const newSlide = (currentSlide - 1 + slides.length) % slides.length;
    handleSlideChange(newSlide, "left");
  };

  const goToSlide = (index) => {
    const newDirection = index > currentSlide ? "right" : "left";
    handleSlideChange(index, newDirection);
  };

  // Handle touch events for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const currentImages = slides[currentSlide].images;

  // Auto-advance slides (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 70000);

    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning]);

  // Determine transition classes based on direction and transition state
  const getTransitionClass = () => {
    if (!isTransitioning) return "";

    return direction === "right"
      ? "translate-x-full opacity-0"
      : "-translate-x-full opacity-0";
  };

  return (
    <section id="acceuil" className="py-20 sm:py-20 lg:py-20 relative">
      {/* Navigation arrows - hidden on mobile */}
      <button
        onClick={prevSlide}
        className="absolute left-20 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-20 transition-transform hover:scale-110 active:scale-95 hidden md:block"
        aria-label="Previous slide"
        disabled={isTransitioning}
      >
        <ChevronLeft className="text-slate-700 h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-20 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-20 transition-transform hover:scale-110 active:scale-95 hidden md:block"
        aria-label="Next slide"
        disabled={isTransitioning}
      >
        <ChevronRight className="text-slate-700 h-6 w-6" />
      </button>

      <div
        className="relative w-full max-w-[1200px] mx-auto bg-white py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-8 overflow-hidden"
        ref={slideContainerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
          {/* Main content */}
          <div
            className={`relative z-10 max-w-lg transition-all duration-500 ease-in-out ${getTransitionClass()}`}
          >
            <h1
              className={`mx-10 text-xl sm:text-2xl md:text-4xl font-bold bg-white text-slate-800 mb-2 ${
                currentSlide === 1 ? "" : "whitespace-nowrap"
              }  md:w-full`}
            >
              {slides[currentSlide].title}
            </h1>
            <h1 className=" mx-10 text-xl sm:text-xl md:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 ">
              <span> {slides[currentSlide].subtitle} </span>
            </h1>
            <div className="bg-white p-4 sm:p-6 rounded-lg mt-6 sm:mt-10 shadow-sm">
              <p className="text-xs sm:text-sm md:text-base text-[#2B3D4F] leading-relaxed">
                {slides[currentSlide].description}
              </p>
            </div>
            <button className="mt-4 sm:mt-6 bg-[#1687A7] hover:bg-[#168799] text-white px-4 sm:px-6 py-2 sm:py-3 rounded flex items-center gap-2 transition-colors group">
              <span>{slides[currentSlide].cta}</span>
              <svg
                width="27"
                height="26"
                viewBox="0 0 27 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:-translate-y-1 transition-transform"
              >
                <path
                  d="M3.75 11.9167L24.3333 2.16669L14.5833 22.75L12.4167 14.0834L3.75 11.9167Z"
                  stroke="white"
                />
              </svg>
            </button>
          </div>

          {/* Images positioned absolutely - optimized for 720-1080px range */}
          <div className="absolute top-0 right-0 w-1/3 md:w-[55%] lg:w-[60%] h-3/4 md:h-[70%] lg:h-[85%] z-0 hidden md:block">
            <div className="relative w-full h-full">
              {/* Main photographer image */}
              <div
                className={`absolute top-0 right-0 w-full max-h-[400px] md:max-h-[450px] transition-all duration-700 ease-in-out ${
                  isTransitioning
                    ? "opacity-0 scale-95"
                    : "opacity-100 scale-100"
                }`}
              >
                <img
                  src={currentImages.main || "/placeholder.svg"}
                  alt="Photographer taking photos"
                  className="object-cover rounded-md shadow-lg w-full h-full"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>

              {/* Camera display image */}
              <div
                className={`absolute bottom-0 left-0 w-[48%] h-[150px] md:h-[180px] transition-all duration-700 delay-100 ease-in-out ${
                  isTransitioning
                    ? "opacity-0 scale-95"
                    : "opacity-100 scale-100"
                }`}
              >
                <img
                  src={currentImages.camera || "/placeholder.svg"}
                  alt="Camera display"
                  className="object-cover rounded-md shadow-lg w-full h-full"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>

              {/* Event venue image - reduced gap */}
              <div
                className={`absolute bottom-0 right-0 w-[48%] h-[150px] md:h-[180px] transition-all duration-700 delay-200 ease-in-out ${
                  isTransitioning
                    ? "opacity-0 scale-95"
                    : "opacity-100 scale-100"
                }`}
              >
                <img
                  src={currentImages.venue || "/placeholder.svg"}
                  alt="Event venue with purple lighting"
                  className="object-cover rounded-md shadow-lg w-full h-full"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </div>
          </div>

          {/* Mobile images (stacked) */}
          <div className="md:hidden mt-8 space-y-4 w-full sm:w-[90%] mx-auto overflow-x-auto">
            <div
              className={`relative w-full h-[180px] sm:h-[220px] transition-all duration-500 ease-in-out ${
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <img
                src={currentImages.main || "/placeholder.svg"}
                alt="Photographer taking photos"
                className="object-cover rounded-md shadow-lg w-full h-full"
                style={{ aspectRatio: "16/9" }}
              />
            </div>
            <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 snap-x">
              <div
                className={`relative w-1/2 h-[100px] sm:h-[120px] transition-all duration-500 delay-100 ease-in-out snap-center ${
                  isTransitioning
                    ? "opacity-0 scale-95"
                    : "opacity-100 scale-100"
                }`}
              >
                <img
                  src={currentImages.camera || "/placeholder.svg"}
                  alt="Camera display"
                  className="object-cover rounded-md shadow-lg w-full h-full"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
              <div
                className={`relative w-1/2 h-[100px] sm:h-[120px] transition-all duration-500 delay-200 ease-in-out snap-center ${
                  isTransitioning
                    ? "opacity-0 scale-95"
                    : "opacity-100 scale-100"
                }`}
              >
                <img
                  src={currentImages.venue || "/placeholder.svg"}
                  alt="Event venue with purple lighting"
                  className="object-cover rounded-md shadow-lg w-full h-full"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pagination dots - larger size */}
        <div className="flex justify-center gap-3 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-12 bg-[#1687A7]"
                  : "w-3 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
