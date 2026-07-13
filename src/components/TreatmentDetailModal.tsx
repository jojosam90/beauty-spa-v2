import { motion, AnimatePresence } from "motion/react";
import { X, Clock, DollarSign, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react";
import { Language } from "../types";
import { translations, treatmentsData } from "../data";

interface TreatmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  treatmentId: string;
  onBookTreatment: (id: string) => void;
}

export default function TreatmentDetailModal({ isOpen, onClose, language, treatmentId, onBookTreatment }: TreatmentDetailModalProps) {
  const t = translations[language];
  const treatments = treatmentsData[language];
  const treatment = treatments.find((item) => item.id === treatmentId);

  if (!isOpen || !treatment) return null;

  return (
    <AnimatePresence>
      <div id="treatment-detail-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1F1110]/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#f8f9fa] border border-[#C5A059]/20 shadow-2xl rounded-lg overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
        >
          {/* Close button */}
          <button
            id="close-treatment-detail-modal"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-white md:text-gray-500 bg-black/40 md:bg-transparent rounded-full hover:bg-black/60 md:hover:bg-gray-100 transition-all"
          >
            <X size={18} />
          </button>

          {/* Left Visual Column */}
          <div className="w-full md:w-80 relative shrink-0 overflow-hidden h-48 md:h-auto bg-black">
            <img
              src={treatment.image}
              alt={treatment.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/40" />
            
            {/* Visual Text Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[20px] uppercase tracking-widest text-heritage-gold font-bold bg-[#1F1110]/80 px-2 py-0.5 rounded inline-block">
                {treatment.tag || "WELLNESS"}
              </span>
              <h3 className="font-serif text-3xl tracking-wide leading-tight mt-1">{treatment.title}</h3>
              <p className="text-base text-gray-300 font-light">{treatment.subtitle}</p>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-white space-y-6 flex flex-col justify-between">
            <div>
              {/* Header Details */}
              <div className="flex flex-wrap items-center gap-4 text-base font-semibold text-gray-500 uppercase tracking-wider pb-4 border-b border-gray-100 mb-6">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-clinical-teal" />
                  <span>{t.detailModalDuration}: <strong className="text-black">{treatment.duration}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-clinical-teal font-serif text-lg font-bold">$</span>
                  <span>{t.detailModalPrice}: <strong className="text-heritage-gold">{treatment.price}</strong></span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-serif text-xl text-black font-semibold uppercase tracking-wider">
                  {language === "zh" ? "疗程概述" : "Ritual Overview"}
                </h4>
                <p className="text-base text-gray-600 leading-relaxed font-light">
                  {treatment.description}
                </p>
              </div>

              {/* Section 1: Clinical Benefits */}
              <div className="mt-6 space-y-3">
                <h4 className="font-serif text-xl text-black font-semibold uppercase tracking-wider">
                  {language === "zh" ? "理疗功效与收益" : "Clinical Benefits"}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {treatment.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-base text-gray-600">
                      <CheckCircle2 size={14} className="text-clinical-teal shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-light">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-100 mt-8">
              <button
                onClick={() => onBookTreatment(treatment.id)}
                className="w-full sm:w-auto bg-[#1F1110] text-white px-8 py-3.5 text-base font-semibold uppercase tracking-widest hover:bg-clinical-teal rounded-md transition-all text-center flex items-center justify-center gap-2"
              >
                <span>{language === "zh" ? "预约此疗程" : "Book This Ritual"}</span>
                <ChevronRight size={14} />
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto border border-gray-300 text-gray-600 px-6 py-3.5 text-base font-semibold uppercase tracking-widest hover:border-black hover:text-black rounded-md transition-colors text-center"
              >
                {t.detailModalClose}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
