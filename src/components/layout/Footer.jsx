import { Instagram, Linkedin } from "lucide-react";
import logo from "../../assets/icons/footer_icon.png";
export default function Footer() {
  return (
    <footer
      id="footer"
      className="mx-auto  bg-[#8CCAD3] text-white py-10 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Column - Logo and Contact */}
          <div className=" xl:pl-28">
            <div className="mb-6">
              <img src={logo} alt="Logo" className="w-40 h-20" />
            </div>

            <div className="space-y-2 text-sm">
              <p>
                E-mail :{" "}
                <a
                  href="mailto:captured.by.amine@gmail.com"
                  className="hover:underline"
                >
                  captured.by.amine@gmail.com
                </a>
              </p>
              <div>
                <p>
                  Téléphone :{" "}
                  <a href="tel:+21359317039" className="hover:underline">
                    +213 (0) 5 59 31 70 39
                  </a>
                </p>
                <p className="ml-[68px]">
                  <a href="tel:+21341911964" className="hover:underline">
                    +213 (0) 5 41 91 19 64
                  </a>
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-4 pt-10">
              <a
                href="https://www.instagram.com/captured.by.amine?igsh=cmU5ZWF3NDFyNTk3"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/amine-benbakreti-33509235a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Middle Column - Services */}
          <div>
            <h3 className=" mb-4 text-black font-bold">Mes services</h3>
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
          <div>
            <h3 className=" mb-4 text-black font-bold">Galerie</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <p className="hover:underline">Portraits</p>
              </li>
              <li>
                <p className="hover:underline">Événements</p>
              </li>
              <li>
                <p className="hover:underline">Commercial</p>
              </li>
              <li>
                <p className="hover:underline">Nature et Paysages</p>
              </li>
              <li>
                <p className="hover:underline">Créatif/Artistique</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="mt-12 pt-6 border-t-2 border-white text-center text-sm">
          <p>© 2025 Captured by Amine - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
