export interface ApiClientOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
}

export interface ApiClientProtocol {
  get<T>(path: string, init?: RequestInit): Promise<T>;
}

export class ApiClient implements ApiClientProtocol {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? "";
    this.defaultHeaders = options.headers ?? { "Content-Type": "application/json" };
  }

  async get<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await fetch(this.composeUrl(path), {
      method: "GET",
      headers: { ...this.defaultHeaders, ...(init.headers ?? {}) },
      ...init,
    });
    if (!response.ok) {
      const message = await safeReadText(response);
      throw new Error(`GET ${path} failed (${response.status}): ${message}`);
    }
    return (await response.json()) as T;
  }

  private composeUrl(path: string): string {
    if (!this.baseUrl) return path;
    return `${this.baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  }
}

async function safeReadText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

export const DEFAULT_API = new ApiClient();
