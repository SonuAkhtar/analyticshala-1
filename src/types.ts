export interface FormValues {
  name: string;
  email: string;
  phone: string;
  age: string;
  mode: "online" | "offline" | "";
  about: "student" | "working" | "";
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  age?: string;
  mode?: string;
  about?: string;
}
