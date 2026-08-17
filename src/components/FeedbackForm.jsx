import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, MessageSquare } from "lucide-react";
import emailjs from "@emailjs/browser";

const FloatingInput = ({
  id,
  label,
  icon: Icon,
  type = "text",
  error,
  registration,
  isTextarea = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const Tag = isTextarea ? "textarea" : "input";

  return (
    <div className="group relative">
      <div
        className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#1687A7] to-[#12b5cb] opacity-0 blur-[1px] transition-opacity duration-300 ${
          isFocused ? "opacity-60" : "group-hover:opacity-25"
        }`}
      />

      <div className="relative">
        <div
          className={`absolute left-4 pointer-events-none transition-colors duration-300 ${
            isFocused ? "text-[#1687A7]" : "text-gray-400"
          } ${isTextarea ? "top-4" : "top-1/2 -translate-y-1/2"}`}
        >
          <Icon size={18} />
        </div>

        <Tag
          id={id}
          type={type}
          {...registration}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
            registration.onBlur(e);
          }}
          onChange={(e) => {
            setHasValue(e.target.value.length > 0);
            registration.onChange(e);
          }}
          placeholder=" "
          className={`
            peer w-full rounded-xl border border-gray-200 bg-white
            pl-11 pr-4 pt-6 pb-3 text-[15px] text-slate-800 outline-none
            transition-all duration-300 hover:border-gray-300
            focus:border-[#1687A7] focus:ring-0
            ${error ? "border-red-400 focus:border-red-400" : ""}
            ${isTextarea ? "min-h-[140px] resize-none" : ""}
          `}
        />

        <label
          htmlFor={id}
          className={`
            absolute left-11 pointer-events-none transition-all duration-300
            ${
              isFocused || hasValue
                ? "top-2 text-[11px] font-medium uppercase tracking-wide"
                : isTextarea
                  ? "top-4 text-[15px]"
                  : "top-1/2 -translate-y-1/2 text-[15px]"
            }
            ${isFocused ? "text-[#1687A7]" : "text-gray-400"}
            ${error && !isFocused ? "text-red-400" : ""}
          `}
        >
          {label}
        </label>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="ml-1 mt-1.5 flex items-center gap-1 text-xs text-red-500"
          >
            <AlertCircle size={12} /> {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FeedbackForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState(null);
  const [errDetail, setErrDetail] = useState("");
  const formRef = useRef(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitState(null);
    setErrDetail("");

    try {
      const result = await emailjs.send(
        "service_2aae9es",
        "template_i3tkzlq",
        {
          to_name: "Houari",
          from_name: `${data.prenom} ${data.nom}`,
          from_email: data.email,
          phone: data.telephone,
          message: data.feedback,
        },
        { publicKey: "en6CyaTB3AS6Vy8W9" },
      );

      if (result.status === 200) {
        setSubmitState("success");
        reset();
      } else {
        setErrDetail(`Status ${result.status}`);
        setSubmitState("error");
      }
    } catch (err) {
      setErrDetail(err?.text || err?.message || String(err));
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitState(null), 5000);
    }
  };

  return (
    <section id="contact" className="relative px-4 py-16 sm:py-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 h-96 w-96 rounded-full bg-[#1687A7]/[0.04] blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 h-80 w-80 rounded-full bg-[#1687A7]/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <motion.div
          className="mb-12 text-center sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl md:text-5xl">
            Contact
          </h2>
          <div className="mx-auto mt-4 mb-6 h-[2px] w-12 bg-[#1687A7]" />
          <p className="mx-auto max-w-lg text-base font-light leading-relaxed text-gray-500 md:text-lg">
            Une question, un projet, ou un simple retour ? Je vous répondrai avec plaisir.
          </p>
        </motion.div>

        <motion.div
          ref={formRef}
          className="relative rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          whileHover={{ boxShadow: "0 12px 50px -12px rgba(22,135,167,0.12)" }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FloatingInput
                id="nom"
                label="Nom"
                icon={User}
                error={errors.nom}
                registration={register("nom", { required: "Le nom est requis" })}
              />
              <FloatingInput
                id="prenom"
                label="Prénom"
                icon={User}
                error={errors.prenom}
                registration={register("prenom", { required: "Le prénom est requis" })}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FloatingInput
                id="email"
                label="Email"
                icon={Mail}
                type="email"
                error={errors.email}
                registration={register("email", {
                  required: "L'email est requis",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Email invalide" },
                })}
              />
              <FloatingInput
                id="telephone"
                label="Téléphone"
                icon={Phone}
                type="tel"
                error={errors.telephone}
                registration={register("telephone", {
                  required: "Le téléphone est requis",
                })}
              />
            </div>

            <FloatingInput
              id="feedback"
              label="Votre message..."
              icon={MessageSquare}
              isTextarea
              error={errors.feedback}
              registration={register("feedback", { required: "Le message est requis" })}
            />

            <AnimatePresence>
              {submitState && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className={`flex items-center gap-3 rounded-xl border px-5 py-3.5 text-sm font-medium ${
                    submitState === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {submitState === "success" ? (
                    <>
                      <CheckCircle size={18} className="shrink-0" />
                      Message envoyé avec succès ! Je reviendrai vers vous rapidement.
                    </>
                  ) : (
                    <>
                      <AlertCircle size={18} className="shrink-0" />
                      <span>{"Échec de l'envoi : "}{errDetail || "Erreur inconnue"}</span>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center pt-2">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="
                  group relative flex items-center justify-center gap-2.5 overflow-hidden
                  rounded-full bg-[#1687A7] px-10 py-3.5 text-[15px] font-medium text-white
                  transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60
                  hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#1687A7]/25
                  active:translate-y-0 active:shadow-md
                "
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  <>
                    Envoyer
                    <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
