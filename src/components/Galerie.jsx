"use client";

import { useState } from "react";
import OptimizedImage from "./shared/OptimizedImage";
// import img1 from "../assets/galerie/1.jpg";
import img1 from "../assets/galerie/catherale.webp";
import img2 from "../assets/galerie/2.jpg";
import img3 from "../assets/galerie/3.jpg";
import img4 from "../assets/galerie/4.jpg";
// import img5 from "../assets/galerie/5.jpg";
import img5 from "../assets/galerie/cat.JPG";
import img6 from "../assets/galerie/6.jpg";
// import img7 from "../assets/galerie/7.jpg";
import img7 from "../assets/galerie/oran.jpg";
import img8 from "../assets/galerie/8.jpg";
// import img9 from "../assets/galerie/9.webp";
import img9 from "../assets/galerie/makam.jpg";
import img10 from "../assets/galerie/10.jpg";
import img11 from "../assets/galerie/11.jpg";

const Galerie = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const photos = [
    {
      src: img6,
      category: "landscape",
      desktopSize: "col-start-3 row-start-2 row-span-2",
      mobileSize: "col-span-2",
      style: { height: "560px" },
    },
    {
      src: img9,
      category: "portrait",
      desktopSize: "col-start-4 row-start-1",
      mobileSize: "col-span-2",
      style: { height: "560px", margin: "5px" },
    },
    {
      src: img1,
      category: "detail",
      desktopSize: "row-start-4 col-start-1",
      mobileSize: "col-span-2",
      style: { height: "275px" },
    },
    {
      src: img4,
      category: "landscape",
      desktopSize: "row-start-5 col-start-2 col-span-2",
      mobileSize: "col-span-2",
      style: { width: "630px", height: "275px" },
    },
    {
      src: img5,
      category: "portrait",
      desktopSize: "row-start-6 col-start-2",
      mobileSize: "col-span-2",
      style: {
        height: "275px",
        objectFit: "contain",
        objectPosition: "center",
        transform: "scale(1)",
      },
    },
    {
      src: img3,
      category: "landscape",
      desktopSize: "row-start-3 col-start-2",
      mobileSize: "col-span-2",
      style: { height: "570px" },
    },
    {
      src: img7,
      category: "detail",
      desktopSize: "row-start-4 col-start-3",
      mobileSize: "col-span-2",
      style: {
        width: "306px",
        height: "275px",
        objectFit: "cover",
        objectPosition: "center",
      },
    },
    {
      src: img11,
      category: "portrait",
      desktopSize: "row-start-4 col-start-4",
      mobileSize: "col-span-2",
      style: { height: "565px" },
    },
    {
      src: img2,
      category: "landscape",
      desktopSize: "row-start-5 col-start-1",
      mobileSize: "col-span-2",
      style: { height: "565px" },
    },
    {
      src: img8,
      category: "detail",
      desktopSize: "col-span-2 row-start-6",
      mobileSize: "col-span-2",
      style: {
        width: "640px",
        height: "275px",
      },
    },
    {
      src: img10,
      category: "portrait",
      desktopSize: "col-start-4 row-start-3",
      mobileSize: "col-span-2",
      style: { height: "275px" },
    },
  ];

  // Filter photos if needed
  const filteredPhotos =
    activeFilter === "all"
      ? photos
      : photos.filter((photo) => photo.category === activeFilter);

  return (
    <section id="galerie" className="min-h-screen p-4 md:p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Text Section - Appears at the top on mobile */}
        <div className="md:hidden text-center mb-6 px-4">
          <h1 className="text-3xl font-bold mb-4">Ma galerie</h1>
          <p className="text-base mb-6">
            Découvrez l’univers de Houari Photography, où chaque photo révèle
            une histoire. Passionné par la nature, Houari capture des paysages
            fascinants tout en immortalisant des moments uniques à travers des
            portraits, des événements et des projets artistiques. Explorez une
            collection où l’émotion rencontre l’esthétique.
          </p>
          <div className="flex justify-center space-x-2 mb-4">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1 rounded ${
                activeFilter === "all"
                  ? "bg-yellow-500 "
                  : "bg-white text-black"
              }`}
            >
              Tout
            </button>
            <button
              onClick={() => setActiveFilter("landscape")}
              className={`px-3 py-1 rounded ${
                activeFilter === "landscape"
                  ? "bg-yellow-500 "
                  : "bg-white text-black"
              }`}
            >
              Paysages
            </button>
            <button
              onClick={() => setActiveFilter("portrait")}
              className={`px-3 py-1 rounded ${
                activeFilter === "portrait"
                  ? "bg-yellow-500 "
                  : "bg-white text-black"
              }`}
            >
              Portraits
            </button>
          </div>
        </div>

        {/* Mobile Grid Layout */}
        <div className="md:hidden grid grid-cols-2 gap-2">
          {filteredPhotos.map((photo, index) => (
            <OptimizedImage
              key={index}
              src={photo.src}
              alt={`Photo ${index + 1}`}
              className={`rounded w-full ${photo.mobileSize}`}
              style={{
                height: "auto",
                maxHeight: "50vh",
                objectFit: "cover",
                width: "100%",
              }}
            />
          ))}
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-4 gap-4 auto-rows-[275px]">
          {/* Desktop Text Section */}
          <div className="row-start-2 lg:col-span-2 p-4 rounded shadow-lg flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">Ma galerie</h1>
            <p className="text-lg mb-6 mr-4">
              Découvrez l&apos;univers de Houari Photography, où chaque photo
              révèle une histoire. Passionné par la nature, Houari capture des
              paysages fascinants tout en immortalisant des moments uniques à
              travers des portraits, des événements et des projets artistiques.
              Explorez une collection où l&apos;émotion rencontre
              l&apos;esthétique.
            </p>
          </div>

          {/* Desktop Image Grid */}
          {photos.map((photo, index) => (
            <OptimizedImage
              key={index}
              src={photo.src}
              alt={`Photo ${index + 1}`}
              className={`rounded ${photo.desktopSize}`}
              style={{
                ...photo.style,
                maxWidth: "100%",
                "@media (min-width: 730px) and (max-width: 1030px)": {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                },
              }}
            />
          ))}
        </div>

        {/* Medium screen grid layout */}
      </div>
    </section>
  );
};

export default Galerie;
