import OptimizedImage from "./shared/OptimizedImage";
import localisation from "../assets/services/locations.JPG";
import { useState, useEffect } from "react";
export default function LocationSection() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleOpen = () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      const currentHour = currentDate.getHours();

      // Check if the current day is between Saturday (6) and Thursday (4)
      const isOpenDay = currentDay >= 6 || currentDay <= 4;
      // Check if the current time is between 9 AM and 5 PM
      const isOpenHour = currentHour >= 9 && currentHour < 17;

      setIsOpen(isOpenDay && isOpenHour);
    };

    handleOpen();
  }, []);

  return (
    <section
      id="localisation"
      className="min-h-screen text-white py-8 px-4 md:pt-28 md:px-6 lg:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_2fr_1fr_1fr_1fr] gap-6">
          {/* Map Section */}
          <div className="rounded-3xl overflow-hidden shadow-lg h-full md:col-span-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d-0.6412!3d35.7062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQyJzIyLjMiTiAwwrAzOCc0OC40Ilc!5e0!3m2!1sen!2sdz!4v1234567890!5m2!1sen!2sdz"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location of Houari Photography Studio"
            ></iframe>
          </div>

          {/* Hours Section */}
          <div
            className="bg-zinc-900/30 backdrop-blur-sm p-10 rounded-3xl h-auto flex flex-col items-center justify-center text-center space-y-3 md:col-span-1"
            style={{
              border: "2px solid rgba(255, 255, 255, 0.3)", // Subtle border
              borderRadius: "20px",
              backdropFilter: "blur(2px)", // Control the blur effect intensity
            }}
          >
            <div className="space-y-2 text-white">
              <p className="text-2xl">Ouvert du</p>
              <p className="text-2xl font-bold">samedi au jeudi</p>
              <p className="text-2xl">de</p>
              <p className="text-2xl font-bold">9h à 17h</p>
              <p className="text-lg mt-2">pour vous accueillir</p>
              <p className="text-lg">à tout moment</p>
            </div>
            <div className="md:col-span-1">
              <OptimizedImage src={localisation} alt="Localisation" />
            </div>
          </div>

          {/* Location Details Section */}
          <div className="space-y-6  md:col-span-3 text-white">
            <h2 className="text-5xl font-bold">Où nous trouver</h2>
            <div>
              <h3 className="text-xl font-semibold text-amber-400 mb-2">
                Notre emplacement
              </h3>
              <p className="text-white text-base leading-relaxed">
                Le Studio de Photographie Houari est situé dans un quartier
                pratique et facilement accessible, idéalement positionné pour
                répondre à vos besoins en photographie. Avec des équipements
                modernes et une atmosphère accueillante, le studio est parfait
                pour capturer vos moments précieux.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <h4 className="text-amber-400 font-semibold mr-2">Accès :</h4>
                <p>Facilement accessible depuis le centre-ville</p>
              </div>

              <div className="flex items-center">
                <h4 className="text-amber-400 font-semibold mr-2">Parking :</h4>
                <p>Disponible gratuitement pour les clients</p>
              </div>

              <div className="flex items-center">
                <h4 className="text-amber-400 font-semibold mr-2">
                  On est maintenant :
                </h4>
                <p
                  className={
                    isOpen
                      ? "text-green-500 font-semibold"
                      : "text-red-500 font-semibold"
                  }
                >
                  {isOpen ? "Ouvert" : "Fermé"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
