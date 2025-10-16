

export default class StatusService {
  public static mapStatus = (status: number) => {
    if (status === 0) {
      return "Primljena";
    }
    if (status === 1) {
      return "Spremna za isporuku";
    }
    if (status === 2) {
      return "Isporučena";
    }
    return "Nepoznat status";
  }
}