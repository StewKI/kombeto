

export default class ColorUtil {
  
  private static lightText = "#fff";
  private static darkText = "#000";

  private static getTextColorType(bgColor: string): "light" | "dark" {
    const hex = bgColor.replace(/^#/, "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return brightness > 0.5 ? "dark" : "light";
  }

  public static getTextColor(bgColor: string): string {
    const textColor = this.getTextColorType(bgColor);
    return textColor === "dark" ? this.darkText : this.lightText;
  }

  public static lightenIfDark(hex: string, amount: number = 0.3): string {
    // Remove # if present
    hex = hex.replace(/^#/, "");

    // Parse RGB values
    const num = parseInt(hex, 16);
    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;

    // Calculate relative luminance (per WCAG standard)
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    // If dark, lighten
    if (luminance < 0.5) {
      r = Math.min(255, r + 255 * amount);
      g = Math.min(255, g + 255 * amount);
      b = Math.min(255, b + 255 * amount);
    }

    // Return new hex
    return (
      "#" +
      [r, g, b]
        .map((x) => Math.round(x).toString(16).padStart(2, "0"))
        .join("")
    );
  }

}