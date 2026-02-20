import {Rider} from '../types/rider.types';

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  token: string;
  rider: Rider;
  isNewUser: boolean;
}

export const sendOtp = async (phone: string): Promise<SendOtpResponse> => {
  // Mock — replace with: return apiClient.post(ENDPOINTS.AUTH.SEND_OTP, { phone })
  await new Promise<void>(resolve => setTimeout(resolve, 1000));
  console.log('OTP sent to:', phone);
  return {success: true, message: 'OTP sent successfully'};
};

export const verifyOtp = async (
  phone: string,
  otp: string,
): Promise<VerifyOtpResponse> => {
  // Mock — replace with: return apiClient.post(ENDPOINTS.AUTH.VERIFY_OTP, { phone, otp })
  await new Promise<void>(resolve => setTimeout(resolve, 1200));
  if (otp === '1234') {
    return {
      success: true,
      token: 'mock-jwt-token-ekoridr-2024',
      isNewUser: false,
      rider: {
        id: 'rider_001',
        name: 'Ravi Kumar',
        phone,
        vehicleType: 'bike',
        vehicleNumber: 'TS09AB1234',
        tier: 'silver',
        isOnline: false,
        rating: 4.7,
        totalDeliveries: 342,
        joinedAt: '2024-01-15',
        city: 'Hyderabad',
      },
    };
  }
  throw new Error('Invalid OTP. Please try again.');
};
