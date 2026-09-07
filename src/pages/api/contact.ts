import type { APIRoute } from "astro";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name?: string;
  email?: string;
  brand?: string;
  budget?: string;
  message?: string;
};

export const POST: APIRoute = async ({ request }) => {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
  }

  const { name, email, brand, budget, message } = body;
  if (!name?.trim() || !email?.trim() || !EMAIL_RE.test(email.trim()) || !brand?.trim() || !message?.trim()) {
    return new Response(JSON.stringify({ error: "Please fill in every field with a valid email" }), { status: 400 });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const toAddress = import.meta.env.CONTACT_TO_EMAIL ?? "heyitsbrookeash@gmail.com";

  if (!apiKey) {
    console.warn("Contact form: RESEND_API_KEY not set, logging submission instead of emailing", {
      name,
      email,
      brand,
      budget,
    });
    return new Response(JSON.stringify({ ok: true, note: "Email provider not configured yet" }), { status: 200 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Hey It's Brooke Ash <forms@heyitsbrookeash.com>",
        to: [toAddress],
        reply_to: email.trim(),
        subject: `New partnership inquiry from ${brand.trim()}`,
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nBrand: ${brand.trim()}\nBudget: ${budget ?? "Not specified"}\n\nMessage:\n${message.trim()}`,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Resend contact email failed", res.status, text);
      return new Response(JSON.stringify({ error: "Message failed to send" }), { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("Contact form error", err);
    return new Response(JSON.stringify({ error: "Message failed to send" }), { status: 500 });
  }
};
