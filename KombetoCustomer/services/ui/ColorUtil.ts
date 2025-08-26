

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
}