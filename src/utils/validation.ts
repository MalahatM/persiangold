export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidName(name: string): boolean {
  const n = name.trim();
  if (n.length < 2) return false;

 
  const hasLetter = /\p{L}/u.test(n);
  if (!hasLetter) return false;


  return /^[\p{L}\s'.-]+$/u.test(n);
}

export function isValidPhone(phone: string): boolean {
  const p = phone.trim();
  if (p.length < 8) return false;


  if (!/^[0-9+\-\s()]+$/.test(p)) return false;

  const digits = p.replace(/\D/g, "");
  return digits.length >= 7;
}
