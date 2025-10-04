
export default class AuthService {
  
  public static AuthHeader = () => {
    return {
      "Authorization": `Bearer ${this.GetToken()}`
    }
  }
  
  private static GetToken = () => {
    //TEMP!! DEV ONLY
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQ3VzdG9tZXIiLCJleHAiOjIwNzEzMTA4NjEsImlzcyI6IktvbWJldG9CYWNrZW5kIiwiYXVkIjoiS29tYmV0b1VzZXIifQ.LWAjgssRvZ9c7FpGt0sjSddhOprddLt0hSwX7pRjSqA";
  }
}