import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, Check } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data";
import { addPendingReview } from "../reviewStore";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export default function ReviewModal({ isOpen, onClose, language }: ReviewModalProps) {
  const t = translations[language];

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setRating(0);
      setHoverRating(0);
      setName("");
      setReview("");
      setSubmitted(false);
    }, 300);
  };

  const handleSubmit = () => {
    if (!name.trim() || !review.trim()) return;
    addPendingReview(name.trim(), review.trim(), rating || 5);
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#1F1110]/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 z-10"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors rounded-full"
          >
            <X size={20} />
          </button>

          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100 text-green-500">
                <Check size={28} />
              </div>
              <h3 className="font-serif text-2xl text-black">{t.reviewThanks}</h3>
              <p className="text-base text-gray-500">{t.reviewThanksMsg}</p>
            </div>
          ) : (
            <div className="space-y-5">
              <h3 className="font-serif text-3xl text-black">{t.reviewModalTitle}</h3>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i)}
                    onMouseEnter={() => setHoverRating(i)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-0.5"
                  >
                    <Star
                      size={28}
                      className={i <= (hoverRating || rating) ? "text-heritage-gold" : "text-gray-200"}
                      fill={i <= (hoverRating || rating) ? "#C5A059" : "none"}
                    />
                  </button>
                ))}
              </div>

              <div>
                <label className="text-base text-gray-700 font-semibold block mb-1">
                  {t.reviewNameLabel} *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-base px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-heritage-gold"
                  placeholder={t.reviewNamePlaceholder}
                />
              </div>

              <div>
                <label className="text-base text-gray-700 font-semibold block mb-1">
                  {t.reviewTextLabel} *
                </label>
                <textarea
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full text-base px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-heritage-gold"
                  placeholder={t.reviewTextPlaceholder}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-heritage-gold text-white py-3.5 rounded-full text-base font-semibold uppercase tracking-widest hover:bg-[#b08c48] transition-colors"
              >
                {t.reviewSubmitBtn}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
