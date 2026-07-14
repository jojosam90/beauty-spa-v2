import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, Check, XCircle } from "lucide-react";
import { Language } from "../types";
import { testimonialsData } from "../data";
import {
  StoredReview,
  getPendingReviews,
  getApprovedReviews,
  getDeletedStaticNames,
  approvePendingReview,
  rejectPendingReview,
  deleteApprovedReview,
  deleteStaticReview,
} from "../reviewStore";

interface AdminReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 text-heritage-gold">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={14} fill="#C5A059" />
      ))}
    </div>
  );
}

export default function AdminReviewsModal({ isOpen, onClose, language }: AdminReviewsModalProps) {
  const [pending, setPending] = useState<StoredReview[]>([]);
  const [approved, setApproved] = useState<StoredReview[]>([]);
  const [deletedStatic, setDeletedStatic] = useState<string[]>([]);

  const refresh = () => {
    setPending(getPendingReviews());
    setApproved(getApprovedReviews());
    setDeletedStatic(getDeletedStaticNames());
  };

  useEffect(() => {
    if (isOpen) refresh();
  }, [isOpen]);

  if (!isOpen) return null;

  const staticReviews = testimonialsData[language].filter((r) => !deletedStatic.includes(r.name));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1F1110]/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl p-8 z-10 overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors rounded-full"
          >
            <X size={20} />
          </button>

          <h3 className="font-serif text-3xl text-black">Manage Reviews</h3>
          <p className="text-base text-gray-500 mt-1">Approve, reject or delete customer reviews.</p>

          {/* Pending */}
          <div className="mt-8 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">Pending</h4>
            {pending.length === 0 ? (
              <p className="text-center text-gray-400 py-10">No pending reviews ✓</p>
            ) : (
              pending.map((r) => (
                <div key={r.id} className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Stars rating={r.rating} />
                    <span className="font-bold text-black">{r.name}</span>
                    <span className="text-gray-400 text-sm">· {r.date}</span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 bg-gray-200 rounded-full px-2 py-0.5">
                      {r.originalLang === "zh" ? "Original: 中文" : "Original: English"}
                    </span>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{r.quote}"</p>
                  <p className="text-gray-400 text-sm italic leading-relaxed">
                    {r.originalLang === "zh" ? "EN: " : "中文: "}"{r.translatedQuote}"
                  </p>
                  <div className="flex gap-6 pt-1">
                    <button
                      onClick={() => { approvePendingReview(r.id); refresh(); }}
                      className="flex flex-col items-center gap-1 text-green-600"
                    >
                      <span className="w-9 h-9 rounded-full border-2 border-green-500 flex items-center justify-center">
                        <Check size={18} />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest">Approve</span>
                    </button>
                    <button
                      onClick={() => { rejectPendingReview(r.id); refresh(); }}
                      className="flex flex-col items-center gap-1 text-red-500"
                    >
                      <span className="w-9 h-9 rounded-full border-2 border-red-500 flex items-center justify-center">
                        <XCircle size={18} />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest">Reject</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Published */}
          <div className="mt-10 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">Published</h4>

            {approved.map((r) => (
              <div key={r.id} className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Stars rating={r.rating} />
                  <span className="font-bold text-black">{r.name}</span>
                  <span className="text-gray-400 text-sm">· {r.date}</span>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{r.quote}"</p>
                <p className="text-gray-400 text-sm italic leading-relaxed">
                  {r.originalLang === "zh" ? "EN: " : "中文: "}"{r.translatedQuote}"
                </p>
                <button
                  onClick={() => { deleteApprovedReview(r.id); refresh(); }}
                  className="flex flex-col items-center gap-1 text-red-500"
                >
                  <span className="w-9 h-9 rounded-full border-2 border-red-500 flex items-center justify-center">
                    <X size={18} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest">Delete</span>
                </button>
              </div>
            ))}

            {staticReviews.map((r) => (
              <div key={r.name} className="bg-gray-50 border border-gray-100 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Stars rating={r.rating} />
                  <span className="font-bold text-black">{r.name}</span>
                  <span className="text-gray-400 text-sm">· {r.date}</span>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{r.quote}"</p>
                <button
                  onClick={() => { deleteStaticReview(r.name); refresh(); }}
                  className="flex flex-col items-center gap-1 text-red-500"
                >
                  <span className="w-9 h-9 rounded-full border-2 border-red-500 flex items-center justify-center">
                    <X size={18} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest">Delete</span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
