

export default class ValidationService {
  
  
  public static isValidSerbianPhoneNumber(phone: string): boolean {
    // Normalize: remove spaces, dashes, and parentheses
    const normalized = phone.replace(/[\s\-()]/g, "");

    // Regex explanation:
    // ^(?:0|\+381)6 — starts with 0 or +381 followed by 6
    // \d{7,8}$ — then 7 or 8 digits (Serbian mobile numbers have total 8 or 9 digits including the 6)
    const regex = /^(?:0|\+381)6\d{7,8}$/;

    return regex.test(normalized);
  }
}