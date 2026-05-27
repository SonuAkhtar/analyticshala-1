export const courseFees: Record<string, { regFee: number; price: number; originalPrice: number }> = {
  "data-analytics-python": { regFee: 500, price: 6999,  originalPrice: 9999  },
  "sql":                   { regFee: 500, price: 5999,  originalPrice: 8999  },
  "excel":                 { regFee: 500, price: 4999,  originalPrice: 7999  },
  "tableau":               { regFee: 500, price: 5999,  originalPrice: 8999  },
  "genai-development":     { regFee: 500, price: 14999, originalPrice: 24999 },
  "applied-ai":            { regFee: 500, price: 9999,  originalPrice: 14999 },
  "agentic-ai":            { regFee: 500, price: 11999, originalPrice: 18999 },
  "advanced-rag":          { regFee: 500, price: 7999,  originalPrice: 12999 },
  "webdev":                { regFee: 10,  price: 10,    originalPrice: 199   },
};

export const workshopFees: Record<number, { price: number; originalPrice: number }> = {
  1001: { price: 999,  originalPrice: 1999 },
  1002: { price: 1499, originalPrice: 2499 },
  1007: { price: 10,   originalPrice: 299  },
};

export const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;
