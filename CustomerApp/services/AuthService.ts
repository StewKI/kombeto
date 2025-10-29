
export default class AuthService {

  private static Token: string = "";
  
  public static AuthHeader = () => {
    return {
      "Authorization": `Bearer ${this.Token}`
    }
  }
  
  public static SetToken(token: string) {
    this.Token = token;
  }
}