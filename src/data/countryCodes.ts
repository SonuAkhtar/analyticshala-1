export interface CountryCode {
  dial: string;
  flag: string;
  name: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { dial: "+91", flag: "🇮🇳", name: "India" },
  { dial: "+1", flag: "🇺🇸", name: "USA / Canada" },
  { dial: "+44", flag: "🇬🇧", name: "UK" },
  { dial: "+61", flag: "🇦🇺", name: "Australia" },
  { dial: "+971", flag: "🇦🇪", name: "UAE" },
  { dial: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { dial: "+65", flag: "🇸🇬", name: "Singapore" },
  { dial: "+974", flag: "🇶🇦", name: "Qatar" },
  { dial: "+968", flag: "🇴🇲", name: "Oman" },
  { dial: "+965", flag: "🇰🇼", name: "Kuwait" },
  { dial: "+973", flag: "🇧🇭", name: "Bahrain" },
  { dial: "+49", flag: "🇩🇪", name: "Germany" },
  { dial: "+33", flag: "🇫🇷", name: "France" },
  { dial: "+31", flag: "🇳🇱", name: "Netherlands" },
  { dial: "+353", flag: "🇮🇪", name: "Ireland" },
  { dial: "+64", flag: "🇳🇿", name: "New Zealand" },
  { dial: "+60", flag: "🇲🇾", name: "Malaysia" },
  { dial: "+81", flag: "🇯🇵", name: "Japan" },
  { dial: "+27", flag: "🇿🇦", name: "South Africa" },
  { dial: "+977", flag: "🇳🇵", name: "Nepal" },
  { dial: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { dial: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { dial: "+92", flag: "🇵🇰", name: "Pakistan" },
];

export const DEFAULT_COUNTRY_DIAL = "+91";

export const isValidPhone = (dial: string, local: string): boolean => {
  if (!/^\d+$/.test(local)) return false;
  if (dial === "+91") return local.length === 10;
  return local.length >= 6 && local.length <= 15;
};
