import type { WhatsAppWidgetConfig } from "@/components/shared/whatsapp-widget";
import { siteConfig } from "@/content/site";

/** Site-specific config for `<WhatsAppWidget>` — the component itself stays generic/portable. */
export const whatsappConfig: WhatsAppWidgetConfig = {
  phoneNumber: siteConfig.phone.replace(/\D/g, ""),
  businessName: siteConfig.name,
  statusLine: "Typically replies within an hour",
  position: "bottom-right",
  pulse: true,
  fallbackMessage: "Hi! I'd like to know more about PLH Studio.",
  quickReplies: [
    {
      label: "Website Design",
      message: "Hi! I'd like to know more about your hotel website design service.",
    },
    {
      label: "Smart Booking Portal",
      message: "Hi! I'm interested in the smart booking portal — could you share more details?",
    },
    {
      label: "Pricing & Packages",
      message: "Hi! Could you share your pricing and package details?",
    },
    {
      label: "General Enquiry",
      message: "Hi! I have a question about PLH Studio.",
    },
  ],
};
