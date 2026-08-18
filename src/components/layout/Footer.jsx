import { Instagram, Linkedin } from "lucide-react";
import logo from "../../assets/icons/footer_icon.webp";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full bg-[#8CCAD3] px-4 py-10 text-white sm:px-6 md:px-8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-6">
              <img
                src={logo || "/placeholder.svg"}
                alt="Logo"
                className="h-20 w-40 object-contain"
              />
            </div>

            <div className="space-y-2 text-center text-sm md:text-left">
              <p>
                E-mail :{" "}
                <a
                  href="mailto:captured.by.amine@gmail.com"
                  className="hover:underline"
                >
                  captured.by.amine@gmail.com
                </a>
              </p>
              <p>
                Téléphone :{" "}
                <a href="tel:+33759443811" className="hover:underline">
                  +33 (0) 7 59 44 38 11
                </a>
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4 pt-6 md:justify-start md:pt-10">
              <a
                href="https://www.instagram.com/captured.by.amine?igsh=cmU5ZWF3NDFyNTk3"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-80"
              >
                <Instagram className="h-10 w-10" />
              </a>
              <a
                href="https://www.linkedin.com/company/captured-by-amine/"
                aria-label="LinkedIn"
                className="transition-opacity hover:opacity-80"
              >
                <Linkedin className="h-10 w-10" />
              </a>
            </div>
          </div>

          <div className="mt-6 text-center md:mt-0 md:text-left">
            <h3 className="mb-4 font-bold text-black">Mes services</h3>
            <ul className="space-y-2 text-sm leading-relaxed">
              <li>Mariages</li>
              <li>Événements & soirées</li>
              <li>Portraits & séances photo</li>
              <li>Reportage photo</li>
            </ul>
          </div>

          <div className="mt-6 text-center md:mt-0 md:text-left">
            <h3 className="mb-4 font-bold text-black">Galerie</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <p className="cursor-pointer hover:underline">Mariages</p>
              </li>
              <li>
                <p className="cursor-pointer hover:underline">Événements</p>
              </li>
              <li>
                <p className="cursor-pointer hover:underline">Portraits</p>
              </li>
              <li>
                <p className="cursor-pointer hover:underline">Reportages</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t-2 border-white pt-6 text-center text-sm">
          <p>© 2026 Captured by Amine - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
