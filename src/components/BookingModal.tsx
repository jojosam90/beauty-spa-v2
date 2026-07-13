import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar as CalendarIcon, Clock, User, CheckCircle, ArrowLeft, ArrowRight, ShieldAlert, Check } from "lucide-react";
import { Language } from "../types";
import { translations, treatmentsData } from "../data";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialTreatmentId?: string;
}

export default function BookingModal({ isOpen, onClose, language, initialTreatmentId }: BookingModalProps) {
  const t = translations[language];
  const treatments = treatmentsData[language];

  const [step, setStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState(initialTreatmentId || "signature");
  
  // Date selection
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  // User Form Details
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    notes: ""
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});

  const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM", "7:00 PM", "8:30 PM"];

  // Generate calendar dates for the next 14 days
  const getNext14Days = () => {
    const dates = [];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekdaysZh = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    
    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = language === "zh" ? weekdaysZh[d.getDay()] : weekdays[d.getDay()];
      const dayNum = d.getDate();
      const monthName = d.toLocaleString(language === "zh" ? "zh-CN" : "en-US", { month: "short" });
      dates.push({ dateStr, dayName, dayNum, monthName });
    }
    return dates;
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedTime) return;
      setStep(3);
    } else if (step === 3) {
      const errors: { [key: string]: boolean } = {};
      if (!formData.fullName.trim()) errors.fullName = true;
      if (!formData.phone.trim()) errors.phone = true;
      if (!formData.email.trim() || !formData.email.includes("@")) errors.email = true;
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors({});
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const lines = [
      language === "zh" ? "您好，我想确认以下预约：" : "Hi, I'd like to confirm the following booking:",
      "",
      `${language === "zh" ? "理疗项目" : "Treatment"}: ${currentTreatmentObj?.title ?? ""}`,
      `${language === "zh" ? "价格" : "Price"}: ${currentTreatmentObj?.price ?? ""}`,
      `${language === "zh" ? "日期与时段" : "Date & Time"}: ${selectedDate} @ ${selectedTime}`,
      `${language === "zh" ? "姓名" : "Name"}: ${formData.fullName}`,
      `${language === "zh" ? "电话" : "Phone"}: +65 ${formData.phone}`,
      `${language === "zh" ? "邮箱" : "Email"}: ${formData.email}`,
      ...(formData.notes ? [`${language === "zh" ? "备注" : "Notes"}: ${formData.notes}`] : []),
    ];
    const draftUrl = `https://wa.me/6589410482?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(draftUrl, "_blank", "noopener,noreferrer");
    setStep(5);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedDate("");
    setSelectedTime("");
    setFormData({ fullName: "", phone: "", email: "", notes: "" });
    onClose();
  };

  const currentTreatmentObj = treatments.find(t => t.id === selectedTreatment);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1F1110]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#f8f9fa] border border-[#C5A059]/20 shadow-2xl rounded-lg overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
        >
          {/* Top Close Button */}
          <button
            id="close-booking-modal"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors rounded-full"
          >
            <X size={20} />
          </button>

          {/* Left Panel: Summary/Hero sidebar */}
          <div className="w-full md:w-80 bg-gradient-to-b from-[#1F1110] to-[#2d1b1a] text-white p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#C5A059]/10">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[12px] tracking-[0.3em] font-medium text-heritage-gold uppercase">
                  EB Centre
                </span>
                <h3 className="font-serif text-4xl tracking-wide">
                  {t.bookingTitle}
                </h3>
              </div>
              <p className="text-base text-gray-400 leading-relaxed font-light">
                {t.bookingSubtitle}
              </p>

              {/* Dynamic reservation summary */}
              {step > 1 && currentTreatmentObj && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 pt-6 border-t border-white/10"
                >
                  <div className="space-y-1">
                    <span className="text-[12px] uppercase tracking-widest text-heritage-gold font-semibold block">
                      {language === "zh" ? "理疗项目" : "Treatment"}
                    </span>
                    <p className="text-lg font-medium text-white">{currentTreatmentObj.title}</p>
                    <p className="text-base text-gray-400">{currentTreatmentObj.duration} • {currentTreatmentObj.price}</p>
                  </div>

                  {selectedDate && (
                    <div className="space-y-1">
                      <span className="text-[12px] uppercase tracking-widest text-heritage-gold font-semibold block">
                        {language === "zh" ? "预约日期" : "Date & Time"}
                      </span>
                      <p className="text-lg text-white">
                        {selectedDate} {selectedTime && `@ ${selectedTime}`}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            <div className="hidden md:block pt-6 border-t border-white/5">
              <p className={`text-gray-500 uppercase tracking-widest ${language === "zh" ? "text-[20px]" : "text-[16px]"}`}>
                {language === "zh" ? "精准理疗，尊享奢华。" : "Clinical Precision. Luxury Defined."}
              </p>
            </div>
          </div>

          {/* Right Panel: Content steps */}
          <div className="flex-1 p-8 overflow-y-auto flex flex-col justify-between bg-white">
            {/* Steps Progress Header */}
            {step < 5 && (
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <span className="text-base text-gray-400 uppercase tracking-wider font-medium">
                  {language === "zh" ? `步骤 ${step} / 4` : `Step ${step} of 4`}
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 w-8 transition-all duration-300 ${
                        i <= step ? "bg-heritage-gold" : "bg-gray-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step Contents */}
            <div className="flex-1 flex flex-col justify-center">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <h4 className="font-serif text-3xl text-black mb-3">{t.bookingStep1}</h4>
                  <div className="space-y-3">
                    {treatments.map((treatment) => (
                      <div
                        key={treatment.id}
                        onClick={() => setSelectedTreatment(treatment.id)}
                        className={`p-4 border rounded-md cursor-pointer transition-all duration-300 flex items-start gap-3 ${
                          selectedTreatment === treatment.id
                            ? "border-heritage-gold bg-heritage-gold/5"
                            : "border-gray-200 hover:border-gray-400 bg-white"
                        }`}
                      >
                        <div className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          selectedTreatment === treatment.id
                            ? "border-heritage-gold"
                            : "border-gray-300"
                        }`}>
                          {selectedTreatment === treatment.id && (
                            <div className="w-2 h-2 rounded-full bg-heritage-gold" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="font-semibold text-lg text-black flex items-center gap-2">
                              {treatment.title}
                              {treatment.tag && (
                                <span className="bg-[#1F1110] text-heritage-gold text-[8px] font-bold tracking-widest px-1.5 py-0.5 uppercase">
                                  {treatment.tag}
                                </span>
                              )}
                            </h5>
                            <span className="text-lg font-semibold text-heritage-gold text-right shrink-0">
                              {treatment.price}
                            </span>
                          </div>
                          <p className="text-base text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                            {treatment.description}
                          </p>
                          <p className="text-[10px] text-clinical-teal mt-2 font-semibold">
                            {treatment.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <h4 className="font-serif text-3xl text-black mb-3">{t.bookingStep2}</h4>
                  
                  {/* Calendar Dates Grid */}
                  <div className="space-y-2">
                    <span className="text-base font-semibold text-gray-700 tracking-wider uppercase block">
                      {language === "zh" ? "选择理疗日期" : "Select Date"}
                    </span>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {getNext14Days().map((item) => (
                        <div
                          key={item.dateStr}
                          onClick={() => setSelectedDate(item.dateStr)}
                          className={`p-2 rounded border text-center cursor-pointer transition-all duration-300 ${
                            selectedDate === item.dateStr
                              ? "bg-heritage-gold text-white border-heritage-gold"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          <p className="text-[10px] tracking-tight text-gray-400 group-hover:text-white uppercase">
                            {item.monthName}
                          </p>
                          <p className="text-xl font-bold my-0.5">{item.dayNum}</p>
                          <p className="text-[9px] font-medium opacity-80 uppercase">{item.dayName}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots Grid */}
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <span className="text-base font-semibold text-gray-700 tracking-wider uppercase block">
                      {language === "zh" ? "选择理疗时间" : "Select Time"}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((slot) => (
                        <div
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`p-2.5 rounded border text-center text-base font-medium cursor-pointer transition-all duration-300 ${
                            selectedTime === slot
                              ? "bg-clinical-teal text-white border-clinical-teal"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {slot}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <h4 className="font-serif text-3xl text-black mb-1">{t.bookingStep3}</h4>

                  {/* Form Details */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-base text-gray-700 font-semibold uppercase tracking-wider block mb-1">
                          {t.bookingFullName} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`w-full text-base px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                            formErrors.fullName ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-heritage-gold"
                          }`}
                          placeholder={language === "zh" ? "例如：张丽" : "e.g. John Doe"}
                        />
                      </div>
                      <div>
                        <label className="text-base text-gray-700 font-semibold uppercase tracking-wider block mb-1">
                          {t.bookingPhone} *
                        </label>
                        <div className={`flex items-stretch rounded-md border focus-within:ring-1 ${
                          formErrors.phone ? "border-red-500 focus-within:ring-red-500" : "border-gray-200 focus-within:ring-heritage-gold"
                        }`}>
                          <span className="flex items-center px-3 py-2 text-base text-gray-500 bg-gray-50 border-r border-gray-200 rounded-l-md">
                            +65
                          </span>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => {
                              const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
                              const formatted = digits.length > 4 ? `${digits.slice(0, 4)} ${digits.slice(4)}` : digits;
                              setFormData({ ...formData, phone: formatted });
                            }}
                            className="w-full text-base px-3 py-2 rounded-r-md focus:outline-none"
                            placeholder="8888 8888"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-base text-gray-700 font-semibold uppercase tracking-wider block mb-1">
                        {t.bookingEmail} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full text-base px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                          formErrors.email ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-heritage-gold"
                        }`}
                        placeholder="john.doe@example.com"
                      />
                    </div>

                    <div>
                      <label className="text-base text-gray-700 font-semibold uppercase tracking-wider block mb-1">
                        {t.bookingNotes}
                      </label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full text-base px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-heritage-gold"
                        placeholder={language === "zh" ? "填写您关注的头发/头皮问题或偏好..." : "Any hair concerns, allergies, or therapist preferences..."}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5 text-gray-700"
                >
                  <h4 className="font-serif text-3xl text-black mb-1">{t.bookingStep4}</h4>
                  
                  <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 space-y-4">
                    <div className="grid grid-cols-2 gap-4 border-b border-gray-200/60 pb-3 text-base">
                      <div>
                        <span className="text-gray-400 block uppercase tracking-wider text-[10px]">{language === "zh" ? "理疗项目" : "TREATMENT"}</span>
                        <span className="font-semibold text-black">{currentTreatmentObj?.title}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block uppercase tracking-wider text-[10px]">{language === "zh" ? "理疗价格" : "INVESTMENT"}</span>
                        <span className="font-semibold text-heritage-gold">{currentTreatmentObj?.price}</span>
                      </div>
                    </div>

                    <div className="border-b border-gray-200/60 pb-3 text-base">
                      <span className="text-gray-400 block uppercase tracking-wider text-[10px]">{language === "zh" ? "日期与时段" : "DATE & TIME"}</span>
                      <span className="font-semibold text-black">{selectedDate} @ {selectedTime}</span>
                    </div>

                    <div className="text-base space-y-2">
                      <span className="text-gray-400 block uppercase tracking-wider text-[10px]">{language === "zh" ? "预约人资料" : "CLIENT DETAILS"}</span>
                      <p className="font-medium text-black">
                        {formData.fullName} (+65 {formData.phone})
                      </p>
                      <p className="text-gray-500">{formData.email}</p>
                      {formData.notes && (
                        <p className="text-base italic text-gray-500 bg-white p-2 rounded border border-gray-100 mt-2">
                          "{formData.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3.5 bg-clinical-teal/5 border border-clinical-teal/10 rounded-md">
                    <ShieldAlert size={16} className="text-clinical-teal shrink-0 mt-0.5" />
                    <p className="text-[18px] text-clinical-teal leading-relaxed">
                      {language === "zh" 
                        ? "温馨提示：因周末时段紧凑，线上预约提交后客服将为您极速保留名额。请您注意查收确认短信。" 
                        : "Note: To guarantee the clinical-spa atmosphere, slot durations are strict. No immediate prepayment is required, and cancellation is free up to 24h prior."}
                    </p>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-5"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100 text-green-500">
                    <CheckCircle size={36} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-4xl text-black">
                      {t.bookingSuccess}
                    </h3>
                    <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed">
                      {t.bookingSuccessMsg}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 border border-gray-200/50 rounded-md max-w-sm mx-auto text-base text-gray-700 text-left space-y-2 font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-400">REF:</span>
                      <span className="font-bold text-black">LMN-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{language === "zh" ? "项目：" : "SERVICE:"}</span>
                      <span className="font-semibold text-black">{currentTreatmentObj?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{language === "zh" ? "时间：" : "WHEN:"}</span>
                      <span className="font-semibold text-black">{selectedDate} @ {selectedTime}</span>
                    </div>
                  </div>

                  <p className="text-base text-clinical-teal italic">
                    {t.bookingSuccessCall}
                  </p>

                  <button
                    onClick={handleReset}
                    className="mt-6 bg-black text-white px-8 py-3.5 text-base uppercase tracking-widest font-semibold hover:opacity-90 rounded-md transition-opacity"
                  >
                    {t.bookingBtnClose}
                  </button>
                </motion.div>
              )}
            </div>

            {/* Step Controls */}
            {step < 5 && (
              <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-6">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-base font-semibold text-gray-600 hover:text-black uppercase tracking-wider py-2"
                  >
                    <ArrowLeft size={14} />
                    {t.bookingBack}
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    disabled={step === 2 && (!selectedDate || !selectedTime)}
                    className={`flex items-center gap-2 bg-[#1F1110] text-white px-6 py-3.5 text-base font-semibold uppercase tracking-widest rounded-md hover:bg-clinical-teal transition-all ${
                      step === 2 && (!selectedDate || !selectedTime) ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {t.bookingNext}
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="bg-[#C5A059] text-white px-8 py-3.5 text-base font-semibold uppercase tracking-widest rounded-md hover:bg-[#1F1110] transition-colors flex items-center gap-2"
                  >
                    <Check size={14} />
                    {t.bookingConfirm}
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
