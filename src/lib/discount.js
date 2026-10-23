export function generateDiscountCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  const randomPart = Array.from(
    { length: 6 },
    () => chars[crypto.getRandomValues(new Uint8Array(1))[0] % chars.length]
  ).join("");

  return `PALKI-${randomPart}`;
}