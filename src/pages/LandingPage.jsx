import Header from "../components/layout/Header";
import AcceuilPage from "../components/AcceuilPage";
// import Services from "../components/Services";
// import Galerie from "../components/Galerie";
// import FeedbackForm from "../components/FeedbackForm";
// import LocalisationSection from "../components/Localisation";
// import Footer from "../components/layout/Footer";

const LandingPage = () => {
  return (
    <div className="relative w-full h-full bg-[#F6F5F5]">
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <main>
        <AcceuilPage />
        {/* <Services />
        <Galerie />
        {/* <Contact /> */}
        {/* <LocalisationSection />
        <FeedbackForm /> */}
      </main>

      {/* Footer Component */}
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;
