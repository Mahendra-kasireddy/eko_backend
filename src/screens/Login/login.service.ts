/**
 * Auth / Login API service — feature-scoped (same pattern as EkoCustomer).
 * All auth API calls for EkoRider go through this service.
 * Rider flow: no account → backend returns 404 or NO_ACCOUNT → show "No account", go to Signup.
 */

import type {AxiosError} from 'axios';
import apiClient from '../../services/api.client';
import {ENDPOINTS} from '../../constants/api.constants';
import type {Rider} from '../../types/rider.types';

/** Thrown when backend says this mobile has no rider account (must sign up first). */
export class NoRiderAccountError extends Error {
  constructor(message = 'No account found. Please sign up.') {
    super(message);
    this.name = 'NoRiderAccountError';
  }
}

// ─── Backend response (same contract as EkoCustomer backend) ───
interface BackendResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

interface VerifyOtpBackendData {
  token: string;
  user?: {
    _id: string;
    name?: string;
    mobile?: string;
    countryCode?: string;
    email?: string;
    role?: string;
    [key: string]: unknown;
  };
  rider?: Rider;
  isFirstLogin?: boolean;
  isNewUser?: boolean;
}

const DEFAULT_COUNTRY_CODE = '+91';

export interface SendOtpResult {
  message?: string;
}

export interface VerifyOtpResult {
  token: string;
  rider: Rider;
  isNewUser: boolean;
}

/** Map backend user to app Rider type (defaults for rider-specific fields); include countryCode. */
function mapToRider(
  phone: string,
  user?: VerifyOtpBackendData['user'],
  rider?: Rider,
  countryCode: string = DEFAULT_COUNTRY_CODE,
): Rider {
  if (rider) {
    return {...rider, countryCode: rider.countryCode ?? countryCode};
  }
  return {
    id: user?._id ?? '',
    name: user?.name ?? '',
    phone: user?.mobile ?? phone,
    countryCode: user?.countryCode ?? countryCode,
    email: user?.email,
    vehicleType: 'bike',
    vehicleNumber: '',
    tier: 'bronze',
    isOnline: false,
    rating: 0,
    totalDeliveries: 0,
    joinedAt: new Date().toISOString(),
    city: '',
  };
}

export const LoginService = {
  /**
   * Send OTP to mobile. Pass 10-digit digits; optional countryCode (default +91). Backend normalizes and validates.
   */
  async sendOtp(phone: string, countryCode: string = DEFAULT_COUNTRY_CODE): Promise<SendOtpResult> {
    const digits = phone.replace(/\D/g, '');
    const code = countryCode.startsWith('+') ? countryCode : `+${countryCode.replace(/\D/g, '') || '91'}`;
    const res = await apiClient.request<BackendResponse<SendOtpResult>>({
      method: 'POST',
      url: ENDPOINTS.AUTH.SEND_OTP,
      data: {mobile: digits, countryCode: code},
    });
    const body = res.data;
    if (!body?.success) {
      throw new Error(body?.message ?? 'Failed to send OTP');
    }
    return body.data ?? {};
  },

  /**
   * Verify OTP. Rider: if no account exists, backend returns 404 or code NO_ACCOUNT → throws NoRiderAccountError.
   * On success returns token and rider; persist both for subsequent requests.
   */
  async verifyOtp(
    phone: string,
    otp: string,
    countryCode: string = DEFAULT_COUNTRY_CODE,
  ): Promise<VerifyOtpResult> {
    const digits = phone.replace(/\D/g, '');
    const code = countryCode.startsWith('+') ? countryCode : `+${countryCode.replace(/\D/g, '') || '91'}`;
    try {
      const res = await apiClient.request<BackendResponse<VerifyOtpBackendData>>({
        method: 'POST',
        url: ENDPOINTS.AUTH.VERIFY_OTP,
        data: {mobile: digits, otp, countryCode: code},
      });
      const body = res.data;
      if (!body?.success || !body.data?.token) {
        throw new Error(body?.message ?? 'Invalid OTP or login failed');
      }
      const d = body.data;
      const rider = mapToRider(digits, d.user, d.rider, code);
      const isNewUser = d.isNewUser ?? d.isFirstLogin ?? false;
      return {token: d.token, rider, isNewUser};
    } catch (err) {
      const ax = err as AxiosError<{code?: string; message?: string}>;
      const status = ax.response?.status;
      const data = ax.response?.data;
      if (status === 404 || data?.code === 'NO_ACCOUNT') {
        throw new NoRiderAccountError(data?.message ?? 'No account found. Please sign up.');
      }
      throw err instanceof Error ? err : new Error('Verification failed');
    }
  },
};
