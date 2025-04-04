import camera from "../assets/services/camera.png";
import formation from "../assets/services/formation.png";
import people from "../assets/services/people.png";
import things from "../assets/services/things.png";

const Services = () => {
  const services = [
    {
      icon: camera,
      title: "Photographie de Portrait",
      description:
        "Capturez votre personnalité ou celle de vos proches avec des portraits élégants et intemporels.",
    },
    {
      icon: people,
      title: "Photographie d'Événements",
      description:
        "Conservez des souvenirs inoubliables de vos occasions spéciales grâce à des clichés authentiques et vivants.",
    },
    {
      icon: things,
      title: "Photographie commerciale",
      description:
        "Présentez vos produits ou services de manière professionnelle pour renforcer votre image de marque.",
    },
    {
      icon: formation,
      title: "Ateliers et Formations",
      description:
        "Perfectionnez vos compétences en photographie dans un cadre inspirant et pratique.",
    },
  ];

  return (
    <section id="services" className="text-white py-16 px-4 md:px-12 lg:px-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-wide">Nos services</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mx-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col bg-zinc-900/30 items-start space-y-4 px-9 py-7 backdrop-blur-md rounded-lg shadow-lg hover:shadow-yellow-500/50 transition-all"
            style={{
              border: "2px solid rgba(255, 255, 255, 0.3)", // Subtle border
              borderRadius: "20px",
              backdropFilter: "blur(2px)", // Control the blur effect intensity
            }}
          >
            <div className="w-16 h-16 mb-4">
              <img
                src={service.icon}
                alt={service.title}
                className="w-full h-full object-contain"
              />
            </div>
            <h5 className="text-sm font-semibold text-yellow-400">
              {service.title}
            </h5>
            <p className="text-white text-sm font-semibold">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
