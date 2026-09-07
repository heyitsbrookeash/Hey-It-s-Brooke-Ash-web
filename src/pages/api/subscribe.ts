import type { APIRoute } from "astro";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
  }

  const email = body.email?.trim();
  if (!email || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: "A valid email is required" }), { status: 400 });
  }

  const apiKey = import.meta.env.CONVERTKIT_API_KEY;
  const formId = import.meta.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    console.warn(
      "Newsletter subscribe: CONVERTKIT_API_KEY / CONVERTKIT_FORM_ID not set, skipping ESP call for",
      email
    );
    return new Response(JSON.stringify({ ok: true, note: "ESP not configured yet" }), { status: 200 });
  }

  try {
    const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, email }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("ConvertKit subscribe failed", res.status, text);
      return new Response(JSON.stringify({ error: "Subscription failed" }), { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("Newsletter subscribe error", err);
    return new Response(JSON.stringify({ error: "Subscription failed" }), { status: 500 });
  }
};
