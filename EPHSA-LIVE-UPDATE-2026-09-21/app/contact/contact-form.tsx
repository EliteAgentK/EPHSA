"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Paperclip, X } from "lucide-react";
import { services } from "../data";

export function ContactForm() {
  const [focused, setFocused] = useState(false);
  const [sent, setSent] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const openEmailDraft = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const serviceSlug = String(values.get("service") ?? "");
    const service = services.find((item) => item.slug === serviceSlug)?.title ?? "Not sure yet";
    const timingLabels: Record<string, string> = { urgent: "Urgent", "30-days": "Within 30 days", "1-3-months": "1–3 months", planning: "Planning stage" };
    const timing = timingLabels[String(values.get("timing") ?? "planning")] ?? String(values.get("timing") ?? "");
    const name = String(values.get("name") ?? "");
    const organisation = String(values.get("organisation") ?? "");
    const body = [
      "EPHSA project enquiry",
      "",
      `Full name: ${name}`,
      `Organisation: ${organisation}`,
      `Work email: ${String(values.get("email") ?? "")}`,
      `Phone number: ${String(values.get("phone") ?? "Not provided")}`,
      `Service required: ${service}`,
      `Project timing: ${timing}`,
      `Site or project location: ${String(values.get("location") ?? "Not provided")}`,
      "",
      "Project details:",
      String(values.get("details") ?? ""),
      ...(file ? ["", `Selected attachment: ${file}`, "Please attach this file before sending."] : []),
    ].join("\n");
    const subject = `EPHSA project enquiry — ${organisation || name}`;
    setSent(true);
    window.location.href = `mailto:Support@ephsa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return <motion.form
    className="enquiry-composer"
    onSubmit={openEmailDraft}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: .2 }}
    transition={{ duration: .6, ease: "easeOut" }}
  >
    <div className="composer-heading"><div><p>Project enquiry</p><h2>How can EPHSA support your site?</h2></div><span>Secure enquiry</span></div>

    <motion.div className="message-field" animate={{ boxShadow: focused ? "0 0 0 1px rgba(86,198,157,.8), 0 18px 55px rgba(0,0,0,.22)" : "0 0 0 1px rgba(255,255,255,.12)" }}>
      <label htmlFor="project-details">Describe the obligation, risk or project</label>
      <textarea id="project-details" required name="details" rows={4} placeholder="Tell us about the site, what needs attention and the intended timing…" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      <div className="message-tools">
        <input ref={fileRef} className="visually-hidden" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={(event) => setFile(event.target.files?.[0]?.name ?? null)} />
        <button type="button" className="attach-button" onClick={() => fileRef.current?.click()}><Paperclip size={18} /><span>Attach brief</span></button>
        <span>PDF, DOC or image</span>
      </div>
    </motion.div>

    <AnimatePresence>{file && <motion.div className="attachment-chip" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }}><span>{file}</span><button type="button" onClick={() => setFile(null)} aria-label={`Remove ${file}`}><X size={16} /></button></motion.div>}</AnimatePresence>

    <div className="composer-fields">
      <label>Full name<input required name="name" autoComplete="name" /></label>
      <label>Organisation<input required name="organisation" autoComplete="organization" /></label>
      <label>Work email<input required type="email" name="email" autoComplete="email" inputMode="email" /></label>
      <label>Phone number<input name="phone" autoComplete="tel" inputMode="tel" /></label>
      <label>Service required<select name="service" defaultValue=""><option value="">Not sure yet</option>{services.map(service => <option key={service.slug} value={service.slug}>{service.title}</option>)}</select></label>
      <label>Project timing<select name="timing" defaultValue="planning"><option value="urgent">Urgent</option><option value="30-days">Within 30 days</option><option value="1-3-months">1–3 months</option><option value="planning">Planning stage</option></select></label>
      <label className="location-field">Site or project location<input name="location" autoComplete="address-level2" /></label>
    </div>

    <div className="composer-footer">
      <label className="consent"><input required type="checkbox" name="consent" /><span>EPHSA may use these details to respond to this enquiry.</span></label>
      <button className="composer-send" type="submit"><span>Send project enquiry</span><ArrowUpRight size={19} /></button>
    </div>
    <AnimatePresence>{sent && <motion.p className="success" role="status" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>Your email app is opening with the enquiry prepared. Review it, attach any selected file and press Send.</motion.p>}</AnimatePresence>
  </motion.form>;
}
