import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { SocialIcon } from "@/components/shared/social-icon";
import { footerNav, siteConfig, socialLinks } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-surface/40">
      <div className="container-luxe py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col items-start gap-5">
            <Logo className="h-14 w-auto sm:h-16" />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <ul className="flex gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    <SocialIcon name={social.icon} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition-colors hover:text-gold"
            >
              {siteConfig.email}
            </a>
            <span>{siteConfig.address}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
