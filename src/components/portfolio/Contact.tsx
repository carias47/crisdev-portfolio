import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();

  const errors = {
    name: touched.name && !form.name.trim(),
    email: touched.email && (!form.email.trim() || !isValidEmail(form.email)),
    message: touched.message && !form.message.trim(),
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);

    if (!form.name.trim() || !isValidEmail(form.email) || !form.message.trim()) return;

    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
    setTouched({ name: false, email: false, message: false });
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-5 py-3.5 rounded-xl bg-secondary border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none transition-colors ${
      hasError ? "border-destructive focus:border-destructive" : "border-border focus:border-primary/50"
    }`;

  return (
    <section id="contact" className="section-padding max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-10 md:mb-16"
      >
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4">{t.contact.label}</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold">
          {t.contact.titleLine1} <span className="text-gradient">{t.contact.titleHighlight}</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.form
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >
          <div>
            <input
              type="text"
              placeholder={t.contact.namePlaceholder}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onBlur={() => handleBlur("name")}
              className={inputClass(errors.name)}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-destructive">{t.contact.errorRequired}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder={t.contact.emailPlaceholder}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onBlur={() => handleBlur("email")}
              className={inputClass(errors.email)}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-destructive">
                {!form.email.trim() ? t.contact.errorRequired : t.contact.errorEmail}
              </p>
            )}
          </div>
          <div>
            <textarea
              placeholder={t.contact.messagePlaceholder}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onBlur={() => handleBlur("message")}
              className={`${inputClass(errors.message)} resize-none`}
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-destructive">{t.contact.errorRequired}</p>
            )}
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:opacity-90 transition-opacity glow-accent"
          >
            <Send size={14} />
            {sent ? t.contact.sent : t.contact.send}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <p className="text-muted-foreground leading-relaxed mb-8">
            {t.contact.description}
          </p>
          <div className="flex gap-4">
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/cristian-montealegre22", label: "LinkedIn" },
              { icon: Mail, href: "https://mail.google.com/mail/?view=cm&to=cris.dev2001@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-xl bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
