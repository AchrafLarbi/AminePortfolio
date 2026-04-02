import Header from "../components/layout/Header";
import AcceuilPage from "../components/AcceuilPage";
import Services from "../components/Services";
import Galerie from "../components/Galerie";
import FeedbackForm from "../components/FeedbackForm";
import QuoteSection from "../components/Quote";
import Footer from "../components/layout/Footer";
import ParticleBackground from "../components/shared/ParticleBackground";

const LandingPage = () => {
  return (
    <div className="relative w-full h-full">
      {/* Particle background — fixed behind everything */}
      <ParticleBackground />

      {/* Header Component */}
      <div className="relative z-50">
        <Header />
      </div>

      {/* Main Content */}
      <main className="relative z-[1]">
        <AcceuilPage />
        <Services />
        <Galerie />

        <FeedbackForm />
        <QuoteSection />
      </main>

      {/* Footer Component */}
      <div className="relative z-[1]">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
