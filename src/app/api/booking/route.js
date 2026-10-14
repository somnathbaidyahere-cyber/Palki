import { MAX_GUESTS } from "@/data/site";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { name, phone, date, guests } = body;
  const digits = String(phone || "").replace(/\D/g, "");

  if (!name?.trim() || digits.length < 10 || !date || !(Number(guests) >= 1 && Number(guests) <= MAX_GUESTS)) {
    return Response.json({ ok: false, error: "Please check the form and try again." }, { status: 400 });
  }

  // TODO: send this to your team (email service, Google Sheet, WhatsApp, CRM...).
  console.log("New booking enquiry:", body);

  return Response.json({ ok: true });
}
