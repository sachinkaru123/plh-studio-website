"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContact, type ContactPayload } from "@/lib/contact";

const empty: ContactPayload = {
  hotelName: "",
  contactPerson: "",
  email: "",
  phone: "",
  country: "",
  message: "",
};

type Errors = Partial<Record<keyof ContactPayload, string>>;

function validate(values: ContactPayload): Errors {
  const errors: Errors = {};
  if (!values.hotelName.trim()) errors.hotelName = "Please enter your hotel name.";
  if (!values.contactPerson.trim())
    errors.contactPerson = "Please enter a contact name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (!values.message.trim()) errors.message = "Please tell us a little about your property.";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");

  function update<K extends keyof ContactPayload>(key: K, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    // Clear the field's error as soon as the user starts correcting it.
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Honeypot: bots fill hidden fields, humans don't.
    const honeypot = new FormData(event.currentTarget).get("company");
    if (honeypot) return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("Please correct the highlighted fields.");
      return;
    }

    setPending(true);
    setStatus("Sending your request…");

    const result = await submitContact(values);
    setPending(false);

    if (result.status === "sent") {
      toast.success("Request received", {
        description: "We'll be in touch within one business day.",
      });
      setStatus("Your request has been sent.");
      setValues(empty);
      return;
    }

    if (result.status === "mailto") {
      window.location.href = result.href;
      setStatus("Opening your email client.");
      toast.info("Opening your email client", {
        description: "Your message has been prefilled — just hit send.",
      });
      return;
    }

    toast.error("Something went wrong", { description: result.message });
    setStatus(result.message);
  }

  const fields = [
    { key: "hotelName", label: "Hotel Name", type: "text", autoComplete: "organization", required: true },
    { key: "contactPerson", label: "Contact Person", type: "text", autoComplete: "name", required: true },
    { key: "email", label: "Email", type: "email", autoComplete: "email", required: true },
    { key: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: false },
    { key: "country", label: "Country", type: "text", autoComplete: "country-name", required: false },
  ] as const;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot — visually and programmatically hidden */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.key}
            className={field.key === "hotelName" ? "sm:col-span-2" : undefined}
          >
            <Label htmlFor={field.key}>
              {field.label}
              {field.required ? (
                <span className="text-gold" aria-hidden="true">
                  *
                </span>
              ) : null}
            </Label>
            <Input
              id={field.key}
              name={field.key}
              type={field.type}
              autoComplete={field.autoComplete}
              value={values[field.key]}
              onChange={(event) => update(field.key, event.target.value)}
              aria-invalid={Boolean(errors[field.key])}
              aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
              className="mt-2"
            />
            {errors[field.key] ? (
              <p
                id={`${field.key}-error`}
                className="mt-1.5 text-xs text-destructive"
              >
                {errors[field.key]}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <div>
        <Label htmlFor="message">
          Message
          <span className="text-gold" aria-hidden="true">
            *
          </span>
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Tell us about your property and what you're hoping to improve."
          className="mt-2"
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-xs text-destructive">
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        Request Consultation
      </Button>

      {/* Announces validation and submission outcomes to screen readers */}
      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>
    </form>
  );
}
