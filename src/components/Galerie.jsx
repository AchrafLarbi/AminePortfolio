import img1 from "../assets/galerie/1.jpg";
import img2 from "../assets/galerie/2.jpg";
import img3 from "../assets/galerie/3.jpg";
import img4 from "../assets/galerie/4.jpg";
import img5 from "../assets/galerie/5.jpg";
import img6 from "../assets/galerie/6.jpg";
import img7 from "../assets/galerie/7.jpg";
import img8 from "../assets/galerie/8.jpg";
import img9 from "../assets/galerie/9.jpg";

const Gallery = () => {
  return (
    <section id="galerie" className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-4">
          Galerie - Découvrez Mon Univers Visuel
        </h2>
        <p className="text-lg text-center text-gray-600 mt-2 max-w-3xl mx-auto">
          Plongez dans mon portfolio et découvrez une sélection de mes meilleurs
          clichés. Chaque photo capture une émotion et un instant unique.
          Cliquez sur le bouton ci-dessous pour visiter mon site et en voir
          plus.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-9 gap-1">
        {/* Row 1 */}
        <div className="md:col-span-3">
          <img src={img1} alt="Gallery image 1" className="h-full w-full" />
        </div>
        <div className="md:col-span-3">
          <img src={img2} alt="Gallery image 2" className="w-full h-auto" />
        </div>
        <div className="md:col-span-3">
          <img src={img3} alt="Gallery image 3" className="w-full h-full" />
        </div>

        {/* Row 2 */}
        <div className="md:col-span-3">
          <img src={img4} alt="Gallery image 4" className="w-full h-auto" />
        </div>
        <div className="md:col-span-6">
          <img src={img5} alt="Gallery image 5" className="w-full h-full" />
        </div>

        {/* Row 3 */}
        <div className="md:col-span-4">
          <img src={img6} alt="Gallery image 6" className="w-full h-full" />
        </div>
        <div className="md:col-span-5">
          <img src={img7} alt="Gallery image 7" className="w-full h-full" />
        </div>

        {/* Row 4 */}
        <div className="md:col-span-5">
          <img src={img8} alt="Gallery image 8" className="w-full h-auto" />
        </div>
        <div className="md:col-span-4">
          <img src={img9} alt="Gallery image 9" className="w-full h-full" />
        </div>
      </div>

      {/* Button */}
      <div className="flex mt-8">
        <button className="bg-[#1687A7] hover:bg-teal-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 flex items-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.5559 24.8121H36.6666L25.5559 5.56299H14.4443L25.5559 24.8121Z"
              fill="#D4D4D4"
            />
            <path
              d="M14.4449 5.56348L3.33325 24.8118L8.88992 34.4368L19.9999 15.1885L14.4449 5.56348Z"
              fill="white"
            />
            <path
              d="M14.4449 24.8115L8.88989 34.4365H31.1116L36.6666 24.8115H14.4449Z"
              fill="#C4C4C4"
            />
          </svg>
          Visiter mon drive
        </button>
      </div>
    </section>
  );
};

export default Gallery;
