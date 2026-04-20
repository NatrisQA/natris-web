"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLang } from "./LangContext";

const labels = {
  ko: {
    title: "제휴 문의",
    name: "이름",
    company: "회사 / 소속",
    email: "이메일",
    type: "문의 유형",
    types: ["홀덤펍·공간 사업자", "인플루언서·크리에이터", "기업·브랜드 제휴", "해외·투자 파트너", "기타"],
    message: "문의 내용",
    submit: "문의 보내기",
    sending: "전송 중...",
    success: "문의가 전송되었습니다. 빠르게 회신드리겠습니다.",
    successMailto: "메일 앱으로 연결되었습니다. 전송을 완료해주세요.",
    error: "전송에 실패했습니다. 이메일로 직접 문의해주세요.",
    required: "필수",
    close: "닫기",
  },
  en: {
    title: "Partnership Inquiry",
    name: "Name",
    company: "Company / Organization",
    email: "Email",
    type: "Inquiry Type",
    types: ["Holdem Pubs & Venues", "Influencers & Creators", "Corporate & Brand", "Global & Investment", "Other"],
    message: "Message",
    submit: "Send Inquiry",
    sending: "Sending...",
    success: "Your inquiry has been sent. We'll get back to you shortly.",
    successMailto: "Redirected to your mail app. Please complete sending.",
    error: "Failed to send. Please contact us directly via email.",
    required: "Required",
    close: "Close",
  },
};

const CONTACT_EMAIL = "help@pokerlulu.com";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const { lang } = useLang();
  const t = labels[lang];

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    type: t.types[0],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "successMailto" | "error">("idle");

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, to: CONTACT_EMAIL }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
          setForm({ name: "", company: "", email: "", type: t.types[0], message: "" });
        }, 2000);
      } else {
        throw new Error();
      }
    } catch {
      // Fallback: open mailto
      const subject = encodeURIComponent(`[제휴 문의] ${form.type} | ${form.company || form.name}`);
      const body = encodeURIComponent(
        `이름: ${form.name}\n회사/소속: ${form.company}\n이메일: ${form.email}\n문의 유형: ${form.type}\n\n${form.message}`
      );
      window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, "_blank");
      setStatus("successMailto");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setForm({ name: "", company: "", email: "", type: t.types[0], message: "" });
      }, 3000);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    outline: "none",
  };
  const focusClass = "focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-2xl overflow-hidden"
            style={{
              background: "rgba(12,12,18,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-white mb-1">{t.title}</h3>

              {/* Name + Company */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-white/40 mb-1.5 block">
                    {t.name} <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-lg text-sm ${focusClass}`}
                    style={inputStyle}
                    placeholder={t.name}
                  />
                </div>
                <div>
                  <label className="text-[11px] text-white/40 mb-1.5 block">{t.company}</label>
                  <input
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-lg text-sm ${focusClass}`}
                    style={inputStyle}
                    placeholder={t.company}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-[11px] text-white/40 mb-1.5 block">
                  {t.email} <span className="text-indigo-400">*</span>
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-lg text-sm ${focusClass}`}
                  style={inputStyle}
                  placeholder="email@example.com"
                />
              </div>

              {/* Type */}
              <div>
                <label className="text-[11px] text-white/40 mb-1.5 block">{t.type}</label>
                <select
                  value={form.type}
                  onChange={(e) => update("type", e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-lg text-sm ${focusClass} appearance-none`}
                  style={{ ...inputStyle, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
                >
                  {t.types.map((type) => (
                    <option key={type} value={type} style={{ background: "#0c0c12", color: "#fff" }}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-[11px] text-white/40 mb-1.5 block">
                  {t.message} <span className="text-indigo-400">*</span>
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2.5 rounded-lg text-sm resize-none ${focusClass}`}
                  style={inputStyle}
                  placeholder={lang === "ko" ? "문의하실 내용을 입력해주세요." : "Please describe your inquiry."}
                />
              </div>

              {/* Status message */}
              {status === "success" && (
                <div className="text-sm text-emerald-400 text-center py-1">{t.success}</div>
              )}
              {status === "successMailto" && (
                <div className="text-sm text-amber-400 text-center py-1">{t.successMailto}</div>
              )}
              {status === "error" && (
                <div className="text-sm text-red-400 text-center py-1">{t.error}</div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending" || status === "success" || status === "successMailto"}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 0 24px rgba(99,102,241,0.3)",
                }}
              >
                {status === "sending" ? t.sending : status === "success" ? "✓" : t.submit}
              </button>

              <p className="text-[10px] text-white/20 text-center">
                {lang === "ko" ? `또는 ${CONTACT_EMAIL}로 직접 문의` : `Or email us at ${CONTACT_EMAIL}`}
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
