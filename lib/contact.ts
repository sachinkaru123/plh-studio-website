import { siteConfig } from "@/content/site";

export interface ContactPayload {
  hotelName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

/**
 * Single swappable submit path.
 *
 * The site is built with `output: "export"`, so there is no server and Server
 * Actions are unavailable. Submissions POST to a third-party form endpoint
 * (Web3Forms / Formspree / Getform) set via NEXT_PUBLIC_CONTACT_ENDPOINT.
 *
 * With no endpoint configured the form degrades to a prefilled mailto: link, so
 * it is never a dead end in development.
 *
 * To move to a real backend later, change only this function.
 */
export type ContactResult =
  | { status: "sent" }
  | { status: "mailto"; href: string }
  | { status: "error"; message: string };

const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

export function buildMailto(payload: ContactPayload) {
  const subject = `Consultation request — ${payload.hotelName || "New enquiry"}`;
  const body = [
    `Hotel: ${payload.hotelName}`,
    `Contact: ${payload.contactPerson}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Country: ${payload.country}`,
    "",
    payload.message,
  ].join("\n");

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export async function submitContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  if (!endpoint) {
    return { status: "mailto", href: buildMailto(payload) };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        status: "error",
        message: `The form service returned ${response.status}.`,
      };
    }

    return { status: "sent" };
  } catch {
    return {
      status: "error",
      message: "We couldn't reach the form service. Please email us directly.",
    };
  }
}
