export const formattedCost = (value: number, locale: string, currency: string) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

export const decimalLimitter = (value: number, limit: number) => +value.toFixed(limit);