import { Instagram, Linkedin } from "lucide-react";
import logo from "../../assets/icons/footer_icon.png";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full bg-[#8CCAD3] text-white py-10 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* Left Column - Logo and Contact */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-6">
              <img
                src={logo || "/placeholder.svg"}
                alt="Logo"
                className="w-40 h-20 object-contain"
              />
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-center md:text-left">
                E-mail :{" "}
                <a
                  href="mailto:captured.by.amine@gmail.com"
                  className="hover:underline"
                >
                  captured.by.amine@gmail.com
                </a>
              </p>
              <div className="text-center md:text-left">
                <p>
                  Téléphone :{" "}
                  <a href="tel:+21359317039" className="hover:underline">
                    +213 (0) 5 59 31 70 39
                  </a>
                </p>
                <p className="md:ml-[68px]">
                  <a href="tel:+21341911964" className="hover:underline">
                    +213 (0) 5 41 91 19 64
                  </a>
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-4 pt-6 md:pt-10">
              <a
                href="https://www.instagram.com/captured.by.amine?igsh=cmU5ZWF3NDFyNTk3"
                aria-label="Instagram"
                className="hover:opacity-80 transition-opacity"
              >
                <Instagram className="w-10 h-10" />
              </a>
              <a
                href="https://www.linkedin.com/company/captured-by-amine/"
                aria-label="LinkedIn"
                className="hover:opacity-80 transition-opacity"
              >
                <Linkedin className="w-10 h-10" />
              </a>
            </div>
          </div>

          {/* Middle Column - Services */}
          <div className="text-center md:text-left mt-6 md:mt-0">
            <h3 className="mb-4 text-black font-bold">Mes services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                Couverture des événements professionnels et institutionnels
              </li>
              <li>Couverture des soirées et réceptions</li>
              <li>
                Production de contenu visuel pour la communication et le
                marketing
              </li>
              <li>Post-production et optimisation des images</li>
            </ul>
          </div>

          {/* Right Column - Gallery */}
          <div className="text-center md:text-left mt-6 md:mt-0">
            <h3 className="mb-4 text-black font-bold">Galerie</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <p className="hover:underline cursor-pointer">Portraits</p>
              </li>
              <li>
                <p className="hover:underline cursor-pointer">Événements</p>
              </li>
              <li>
                <p className="hover:underline cursor-pointer">Commercial</p>
              </li>
              <li>
                <p className="hover:underline cursor-pointer">
                  Créatif/Artistique
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="mt-10 pt-6 border-t-2 border-white text-center text-sm">
          <p>© 2025 Captured by Amine - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
