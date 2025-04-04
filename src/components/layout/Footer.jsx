import header_icon from "../../assets/icons/footer_icon.png";

export default function Footer() {
  return (
    <footer
      className="bg-zinc-900/30 text-white px-4 sm:px-8 py-8 sm:py-12 rounded-lg mx-4 sm:mx-40"
      style={{
        border: "2px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "20px",
        background:
          "linear-gradient(150deg, rgba(0, 0, 0, 0), rgba(250, 250, 250, 0))",
        backdropFilter: "blur(2px)",
      }}
    >
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Contact Section */}
          <div className="space-y-6">
            <img
              src={header_icon || "/placeholder.svg"}
              alt="Studio HOUARI Photography"
              width={180}
              height={60}
              className="mb-4"
            />
            <div className="space-y-2 text-sm">
              <p>ES Sénia Oran , Algérie</p>
              <p>Téléphone : (+213) 777 57 91 35</p>
            </div>
          </div>

          {/* Notre Localisation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Notre Localisation</h3>
            <ul className="space-y-2 text-sm">
              <li>Itinéraire Google map</li>
              <li>Horaires de travail</li>
            </ul>
          </div>

          {/* Nos Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Photographie de Portrait</li>
              <li>Photographie d&apos;Événements</li>
              <li>Photographie Commerciale</li>
              <li>Ateliers et Formations</li>
            </ul>
          </div>

          {/* Galerie */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Galerie</h3>
            <ul className="space-y-2 text-sm">
              <li>Portraits</li>
              <li>Événements</li>
              <li>Commercial</li>
              <li>Nature et Paysages</li>
              <li>Créatif/Artistique</li>
            </ul>
          </div>
        </div>

        {/* New Section: Photography Quote */}
        <div className="mt-8 text-center">
          <blockquote className="italic text-lg">
            &quot;La photographie est l&apos;art de figer un moment pour
            l&apos;éternité.&quot;
          </blockquote>
          <p className="mt-2 text-sm">- Studio Houari</p>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
            <p className="text-center sm:text-left mb-4 sm:mb-0">
              © 2024 Studio Houari - Tous droits réservés
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
              <span className="text-center sm:text-left">
                Politique de confidentialité
              </span>
              <span className="text-center sm:text-left">
                Conditions d&apos;utilisation
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
