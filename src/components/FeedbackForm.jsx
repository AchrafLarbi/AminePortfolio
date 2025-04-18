import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import emailjs from "emailjs-com";

export default function FeedbackForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage("");

    try {
      // Send email using emailjs
      await emailjs.send(
        "service_2aae9es",
        "template_i3tkzlq",
        {
          to_name: "Houari",
          from_name: `${data.prenom} ${data.nom}`,
          from_email: data.email,
          phone: data.telephone,
          message: data.feedback,
        },
        "en6CyaTB3AS6Vy8W9"
      );

      setMessage("Merci pour votre feedback!");
      reset();
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("Une erreur s'est produite lors de l'envoi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen  flex flex-col items-center justify-center p-4"
    >
      <div className="max-w-4xl w-full space-y-20 pb-8 ">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">
            Contact & Retour d’expérience
          </h1>
          <p className="text-[#2B3D4F] text-lg">
            Contactez-moi pour toute demande ou partagez votre avis sur mon
            travail, je vous répondrai avec plaisir.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input
              {...register("nom", { required: "Le nom est requis" })}
              placeholder="Nom"
              className="w-full p-4 rounded-md border border-gray-300 bg-white text-black"
            />
            <input
              {...register("prenom", { required: "Le prénom est requis" })}
              placeholder="Prénom"
              className="w-full p-4 rounded-md border border-gray-300 bg-white text-black"
            />
          </div>
          {(errors.nom || errors.prenom) && (
            <p className="text-red-500 text-sm">
              {errors.nom?.message || errors.prenom?.message}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email invalide",
                },
              })}
              type="email"
              placeholder="Email"
              className="w-full p-4 rounded-md border border-gray-300 bg-white text-black"
            />
            <input
              {...register("telephone", {
                required: "Le numéro de téléphone est requis",
              })}
              type="tel"
              placeholder="Numéro Téléphone"
              className="w-full p-4 rounded-md border border-gray-300 bg-white text-black"
            />
          </div>
          {(errors.email || errors.telephone) && (
            <p className="text-red-500 text-sm">
              {errors.email?.message || errors.telephone?.message}
            </p>
          )}

          <textarea
            {...register("feedback", { required: "Le feedback est requis" })}
            placeholder="Laissez-nous votre feedback ou toute demande..."
            className="w-full p-4 rounded-md border border-gray-300 bg-white text-black min-h-[150px]"
          />
          {errors.feedback && (
            <p className="text-red-500  text-sm">{errors.feedback.message}</p>
          )}

          {message && (
            <p
              className={`text-center ${
                message.includes("erreur") ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#1687A7] hover:bg-teal-600 text-white px-8 py-3 rounded-md disabled:opacity-50 text-lg font-semibold flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Envoi en cours..."
              ) : (
                <>
                  Envoyer
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
