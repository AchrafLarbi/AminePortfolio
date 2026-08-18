"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import photographer1 from "../assets/acceuil/acc1-1.webp";
import cameraDisplay1 from "../assets/acceuil/xx.webp";
import eventVenue1 from "../assets/acceuil/xxx.webp";
import photographer2 from "../assets/acceuil/acc2-1.webp";
import cameraDisplay2 from "../assets/acceuil/xxxx.webp";
import eventVenue2 from "../assets/acceuil/xxxxx.webp";

const slides = [
  {
    title: "Photographe Professionnel",
    subtitle: "",
    description:
      "Je suis un photographe souriant, naturel et à l’écoute, avec une approche élégante et discrète. Lors de votre mariage, je veille à créer une atmosphère détendue afin que vous puissiez profiter pleinement de chaque instant. Je capture naturellement les émotions, les regards, les sourires et les moments spontanés, tout en restant attentif aux détails qui rendent votre journée unique et inoubliable.",
    images: {
      main: photographer1,
      camera: cameraDisplay1,
      venue: eventVenue1,
    },
  },
  {
    title: "Vos Moments, Vos Émotions, Votre Histoire",
    subtitle: "",
    description:
      "Votre mariage est rempli de moments qui ne se répètent qu’une fois : un regard, un sourire, une larme, un éclat de rire, une étreinte. Je les capture naturellement, avec discrétion et attention, pour créer des images élégantes et authentiques qui vous permettront de revivre votre journée encore et encore.",
    images: {
      main: photographer2,
      camera: cameraDisplay2,
      venue: eventVenue2,
    },
  },
];

export default function AcceuilPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState("right");
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const slideContainerRef = useRef(null);

  const handleSlideChange = (newSlide, newDirection) => {
    if (isTransitioning) return;

    setDirection(newDirection);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentSlide(newSlide);

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 70000);

    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning]);

  const getTransitionClass = () => {
    if (!isTransitioning) return "";

    return direction === "right"
      ? "translate-x-full opacity-0"
      : "-translate-x-full opacity-0";
  };

  return (
    <section id="acceuil" className="relative py-20 sm:py-20 lg:py-20">
      <button
        onClick={prevSlide}
        className="absolute left-20 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-transform hover:scale-110 hover:bg-white active:scale-95 z-20 md:block"
        aria-label="Previous slide"
        disabled={isTransitioning}
      >
        <ChevronLeft className="h-6 w-6 text-slate-700" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-20 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-transform hover:scale-110 hover:bg-white active:scale-95 z-20 md:block"
        aria-label="Next slide"
        disabled={isTransitioning}
      >
        <ChevronRight className="h-6 w-6 text-slate-700" />
      </button>

      <div
        className="relative mx-auto w-full max-w-[1200px] overflow-hidden bg-white px-3 py-6 sm:px-4 sm:py-8 md:px-8 md:py-10"
        ref={slideContainerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
          <div
            className={`relative z-10 flex min-h-[430px] max-w-xl flex-col px-4 text-left transition-all duration-500 ease-in-out sm:px-6 md:min-h-[520px] md:px-8 ${getTransitionClass()}`}
          >
            <h1 className="min-h-[72px] text-2xl font-bold leading-tight text-slate-800 sm:min-h-[84px] sm:text-3xl md:min-h-[112px] md:text-4xl">
              {slides[currentSlide].title}
            </h1>

            {slides[currentSlide].subtitle ? (
              <p className="mb-4 min-h-[40px] text-lg font-semibold text-slate-700 sm:mb-6 sm:text-xl md:min-h-[48px] md:text-2xl">
                {slides[currentSlide].subtitle}
              </p>
            ) : (
              <div className="min-h-0 md:min-h-[12px]" />
            )}

            <div className="mt-6 flex-1 rounded-lg bg-white p-5 shadow-sm sm:mt-8 sm:p-6">
              <p className="text-sm leading-8 text-[#2B3D4F] sm:text-base">
                {slides[currentSlide].description}
              </p>
            </div>

            <div className="mt-5 sm:mt-6">
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center gap-2 rounded bg-[#1687A7] px-5 py-2.5 text-white transition-colors hover:bg-[#168799] sm:px-6 sm:py-3"
              >
                <span>Contactez-moi</span>
                <svg
                  width="27"
                  height="26"
                  viewBox="0 0 27 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform group-hover:-translate-y-1"
                >
                  <path
                    d="M3.75 11.9167L24.3333 2.16669L14.5833 22.75L12.4167 14.0834L3.75 11.9167Z"
                    stroke="white"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="absolute right-0 top-0 hidden h-3/4 w-1/3 z-0 md:block md:h-[70%] md:w-[55%] lg:h-[85%] lg:w-[60%]">
            <div className="relative h-full w-full">
              <div
                className={`absolute right-0 top-0 w-full max-h-[400px] transition-all duration-700 ease-in-out md:max-h-[450px] ${
                  isTransitioning ? "scale-95 opacity-0" : "scale-100 opacity-100"
                }`}
              >
                <img
                  src={currentImages.main || "/placeholder.svg"}
                  alt="Photographer taking photos"
                  className="h-full w-full rounded-md object-cover object-top shadow-lg"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>

              <div
                className={`absolute bottom-0 left-0 h-[150px] w-[48%] transition-all duration-700 delay-100 ease-in-out md:h-[180px] ${
                  isTransitioning ? "scale-95 opacity-0" : "scale-100 opacity-100"
                }`}
              >
                <img
                  src={currentImages.camera || "/placeholder.svg"}
                  alt="Camera display"
                  className="h-full w-full rounded-md object-cover shadow-lg"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>

              <div
                className={`absolute bottom-0 right-0 h-[150px] w-[48%] transition-all duration-700 delay-200 ease-in-out md:h-[180px] ${
                  isTransitioning ? "scale-95 opacity-0" : "scale-100 opacity-100"
                }`}
              >
                <img
                  src={currentImages.venue || "/placeholder.svg"}
                  alt="Event venue"
                  className="h-full w-full rounded-md object-cover shadow-lg"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 w-full space-y-4 overflow-x-auto sm:w-[90%] md:hidden">
            <div
              className={`relative h-[180px] w-full transition-all duration-500 ease-in-out sm:h-[220px] ${
                isTransitioning ? "scale-95 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <img
                src={currentImages.main || "/placeholder.svg"}
                alt="Photographer taking photos"
                className="h-full w-full rounded-md object-cover object-top shadow-lg"
                style={{ aspectRatio: "16/9" }}
              />
            </div>
            <div className="flex snap-x gap-1 overflow-x-auto pb-2 sm:gap-2">
              <div
                className={`relative h-[100px] w-1/2 snap-center transition-all duration-500 delay-100 ease-in-out sm:h-[120px] ${
                  isTransitioning ? "scale-95 opacity-0" : "scale-100 opacity-100"
                }`}
              >
                <img
                  src={currentImages.camera || "/placeholder.svg"}
                  alt="Camera display"
                  className="h-full w-full rounded-md object-cover shadow-lg"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
              <div
                className={`relative h-[100px] w-1/2 snap-center transition-all duration-500 delay-200 ease-in-out sm:h-[120px] ${
                  isTransitioning ? "scale-95 opacity-0" : "scale-100 opacity-100"
                }`}
              >
                <img
                  src={currentImages.venue || "/placeholder.svg"}
                  alt="Event venue"
                  className="h-full w-full rounded-md object-cover shadow-lg"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
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
