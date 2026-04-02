export function formatPriceInput(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) return "";

  const number = Number(digits) / 100;

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatPriceDisplay(value?: string | null) {
  if (!value) return "R$ 0,00";

  if (value.includes("R$")) return value;

  const normalized = value.replace(/\./g, "").replace(",", ".").trim();

  const parsed = Number(normalized);

  if (Number.isNaN(parsed)) return value;

  return parsed.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
