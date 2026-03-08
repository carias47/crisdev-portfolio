import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {t.footer.copyright.replace("{year}", String(new Date().getFullYear()))}
        </p>
        <div className="flex gap-4">
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/cristian-montealegre22", label: "LinkedIn" },
            { icon: Mail, href: "https://mail.google.com/mail/?view=cm&to=cris.dev2001@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
