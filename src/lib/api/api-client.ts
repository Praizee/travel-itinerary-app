import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiError } from "@/types/api";

// Server-side only API client for RapidAPI
class RapidApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private getHeaders(host: string) {
    const apiKey = process.env.RAPID_API_KEY;

    if (!apiKey) {
      throw new Error("RAPID_API_KEY is not configured");
    }

    return {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": host,
    };
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      const status = error.response.status;

      // Handle rate limiting
      if (status === 429) {
        return {
          code: "RATE_LIMITED",
          message: "Too many requests. Please try again later.",
          status: 429,
        };
      }

      // Handle unauthorized
      if (status === 401 || status === 403) {
        return {
          code: "UNAUTHORIZED",
          message: "API authentication failed.",
          status,
        };
      }

      return {
        code: "API_ERROR",
        message: error.message || "An error occurred while fetching data.",
        status,
      };
    }

    if (error.code === "ECONNABORTED") {
      return {
        code: "TIMEOUT",
        message: "Request timed out. Please try again.",
        status: 408,
      };
    }

    return {
      code: "NETWORK_ERROR",
      message: "Network error. Please check your connection.",
      status: 0,
    };
  }

  async get<T>(
    url: string,
    host: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.get<T>(url, {
      ...config,
      headers: {
        ...this.getHeaders(host),
        ...config?.headers,
      },
    });
    return response.data;
  }

  async post<T>(
    url: string,
    host: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, {
      ...config,
      headers: {
        ...this.getHeaders(host),
        ...config?.headers,
      },
    });
    return response.data;
  }
}

export const rapidApiClient = new RapidApiClient();

