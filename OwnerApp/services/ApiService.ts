import AuthService from "@/services/AuthService";

export class ApiError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = "Neovlašćen pristup.") {
    super(message);
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export default class ApiService {
  private static readonly HOSTNAME: string = "10.253.242.136";
  public static readonly BASE_URL = `http://${this.HOSTNAME}:5296/`;

  private static buildHeaders(
    headers?: Record<string, string>,
    includeJson = true
  ): HeadersInit {
    const jsonHeaders: Record<string, string> = includeJson
      ? { "Content-Type": "application/json" }
      : {};

    const authHeader = AuthService.AuthHeader();

    return {
      ...jsonHeaders,
      ...(authHeader || {}),
      ...(headers || {}),
    };
  }

  private static async request<T>(
    method: string,
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    const response = await fetch(`${this.BASE_URL}${endpoint}`, {
      method,
      headers: this.buildHeaders(headers, !!body),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
      throw new UnauthorizedError();
    }

    if (!response.ok) {
      let errorData: any;
      try {
        errorData = await response.json();
      } catch {
        errorData = {};
      }
      throw new ApiError(
        errorData.error || "Internet zahtev nije uspeo.",
        errorData.details
      );
    }

    // Handle 204 No Content (DELETE or empty responses)
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  static get<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>("GET", endpoint, undefined, headers);
  }

  static post<T>(endpoint: string, data: any, headers?: Record<string, string>) {
    return this.request<T>("POST", endpoint, data, headers);
  }

  static put<T>(endpoint: string, data: any, headers?: Record<string, string>) {
    return this.request<T>("PUT", endpoint, data, headers);
  }

  static patch<T>(endpoint: string, data: any, headers?: Record<string, string>) {
    return this.request<T>("PATCH", endpoint, data, headers);
  }

  static delete<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>("DELETE", endpoint, undefined, headers);
  }
}
