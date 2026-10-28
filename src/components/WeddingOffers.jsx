import { motion } from "framer-motion";
import { Check, Clock3, Images, Sparkles } from "lucide-react";

import essentialPhoto from "../assets/acceuil/xx.webp";
import completePhoto from "../assets/acceuil/xxx.webp";

const offers = [
  {
    id: "hourly",
    label: "Petite durée",
    title: "4 premières heures",
    price: "100 € / h",
    duration: "4 heures de couverture (400 €)",
    photos: "Jusqu'à 100 photos retouchées par heure",
    details: [],
    image: essentialPhoto,
    imageAlt: "Photographe capturant un couple de mariés à travers un appareil photo",
    featured: false,
  },
  {
    id: "long-duration",
    label: "Longue durée",
    title: "Au-delà de 4 heures",
    price: "70 € / h",
    duration: "Tarif réduit à partir de la 5ᵉ heure",
    photos: "Jusqu'à 100 photos retouchées par heure",
    details: [],
    image: completePhoto,
    imageAlt: "Salle de mariage élégante décorée pour une réception",
    featured: false,
  },
];

const OfferCard = ({ offer, index }) => {
  const baseCardClasses =
    "overflow-hidden rounded-[28px] border transition-all duration-300";
  const featuredCardClasses = offer.featured
    ? "border-[#1687A7]/20 bg-[linear-gradient(135deg,rgba(255,255,255,1),rgba(232,243,247,0.95))] shadow-[0_30px_80px_-28px_rgba(22,135,167,0.28)]"
    : "border-slate-200/80 bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.18)]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: "easeOut" }}
      className={`${baseCardClasses} ${featuredCardClasses} ${
        offer.featured ? "lg:col-span-2" : ""
      }`}
    >
      <div
        className={`grid h-full ${
          offer.featured
            ? "md:grid-cols-[1.1fr_1fr]"
            : "md:grid-cols-[0.95fr_1.05fr]"
        }`}
      >
        <div className="relative min-h-[260px] overflow-hidden md:min-h-full">
          <img
            src={offer.image}
            alt={offer.imageAlt}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,33,38,0.02),rgba(6,33,38,0.3))]" />
          {offer.badge ? (
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1687A7] shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              {offer.badge}
            </div>
          ) : null}
        </div>

        <div className="flex h-full flex-col justify-between p-6 sm:p-8 md:p-9">
          <div>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  {offer.label}
                </p>
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[2rem]">
                  {offer.title}
                </h3>
              </div>
              <div
                className={`shrink-0 rounded-full px-4 py-2 text-lg font-semibold ${
                  offer.featured
                    ? "bg-[#1687A7] text-white shadow-[0_14px_30px_-16px_rgba(22,135,167,0.9)]"
                    : "bg-slate-100 text-slate-900"
                }`}
              >
                {offer.price}
              </div>
            </div>

            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-4">
                <div className="mb-2 flex items-center gap-2 text-[#1687A7]">
                  <Clock3 className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    Durée
                  </span>
                </div>
                <p className="text-sm leading-6 text-slate-700">{offer.duration}</p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-4">
                <div className="mb-2 flex items-center gap-2 text-[#1687A7]">
                  <Images className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    Photos
                  </span>
                </div>
                <p className="text-sm leading-6 text-slate-700">{offer.photos}</p>
              </div>
            </div>

            <ul className="space-y-3">
              {offer.details.map((detail) => (
                <li
                  key={detail}
                  className="flex items-start gap-3 text-sm leading-7 text-slate-700 sm:text-[15px]"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1687A7]/10 text-[#1687A7]">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default function WeddingOffers() {
  const featuredOffer = offers.find((offer) => offer.featured);
  const standardOffers = offers.filter((offer) => !offer.featured);
  let cardIndex = 0;

  return (
    <section id="offres-mariage" className="relative overflow-hidden px-4 py-16 sm:py-20 md:py-24">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(250,250,249,1),rgba(242,247,249,0.92))]" />
      <div className="absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-[#1687A7]/[0.06] blur-3xl" />
      <div className="absolute -right-20 bottom-16 -z-10 h-80 w-80 rounded-full bg-[#D9B878]/[0.10] blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#1687A7]">
            Collection Mariage
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Offres mariage
          </h2>
          <div className="mx-auto mt-4 mb-6 h-[2px] w-12 bg-[#1687A7]" />
          <p className="mx-auto max-w-3xl text-base font-light leading-8 text-slate-600 md:text-lg">
            Des formules pensées pour raconter votre journée avec délicatesse,
            élégance et une vraie attention portée aux détails.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {featuredOffer ? <OfferCard offer={featuredOffer} index={cardIndex++} /> : null}
          {standardOffers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
