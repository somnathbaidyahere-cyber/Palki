
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export function isValidWhatsAppNumber() {
  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");
  return /^91[6-9]\d{9}$/.test(phone);
}

export function buildWhatsAppFallback(values) {
  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");

  if (!/^91[6-9]\d{9}$/.test(phone)) {
    return "#";
  }

  const message = [
    "Hello Palki Garden! I'd like to enquire about booking.",
    "",
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
    `Email: ${values.email.trim() || "Not provided"}`,
    `Event type: ${values.type}`,
    `Preferred date: ${values.date}`,
    `Expected guests: ${values.guests}`,
    // `Message: ${values.message.trim() || "Not provided"}`,
  ].join("\n");

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
