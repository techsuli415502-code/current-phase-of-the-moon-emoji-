"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { Mail, Clock, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/**
 * Contact form. Pure client-side demo — on submit we just show a success
 * toast and reset the form. A real deployment would POST to an API route.
 */
export function ContactSection() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    // Simulate a network call
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast({
      title: "Message sent",
      description:
        "Thanks for reaching out — we'll get back to you within 48 hours.",
    });

    (e.target as HTMLFormElement).reset();
    setSubmitting(false);
  }

  return (
    <section id="contact" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Get in touch"
          title="Contact us"
          subtitle="Have a question about the moon phase, a feature request, or a correction to suggest? We read every message and reply personally — usually within 48 hours."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Jane Doe"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What is this about?"
                  required
                />
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here…"
                  required
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  By submitting, you agree to our{" "}
                  <a href="#privacy" className="underline hover:text-primary">
                    privacy policy
                  </a>
                  .
                </p>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Sending…" : "Send message"}
                </Button>
              </div>
            </form>
          </div>

          {/* Contact info */}
          <aside className="space-y-4 lg:col-span-2">
            <ContactCard
              icon={Mail}
              title="Email"
              lines={["hello@moonphaseemoji.com", "We reply within 48 hours."]}
            />
            <ContactCard
              icon={Clock}
              title="Hours"
              lines={["24/7 — site is always live", "Replies Mon–Fri, 9–5 UTC"]}
            />
            <ContactCard
              icon={MessageSquare}
              title="Feedback"
              lines={[
                "Found a bug or have a feature idea?",
                "Mention it in your message — we read every one.",
              ]}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: React.ElementType;
  title: string;
  lines: string[];
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="inline-flex rounded-lg bg-primary/10 p-2.5">
          <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
        </div>
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
      </div>
      <div className="mt-3 space-y-1">
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              i === 0 ? "text-sm text-foreground" : "text-xs text-muted-foreground"
            }
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
