import {Rider, VehicleType} from '../types/rider.types';

export interface RegisterRiderPayload {
  phone: string;
  name: string;
  email?: string;
  vehicleType: VehicleType;
  vehicleNumber: string;
  city: string;
}

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
  // Use OTP '0000' to simulate a new user (signup flow)
  if (otp === '0000') {
    return {
      success: true,
      token: 'mock-jwt-token-new-rider',
      isNewUser: true,
      rider: {
        id: '',
        name: '',
        phone,
        vehicleType: 'bike',
        vehicleNumber: '',
        tier: 'bronze',
        isOnline: false,
        rating: 0,
        totalDeliveries: 0,
        joinedAt: new Date().toISOString(),
        city: '',
      },
    };
  }
  throw new Error('Invalid OTP. Please try again.');
};

export const registerRider = async (
  payload: RegisterRiderPayload,
): Promise<{success: boolean; rider: Rider}> => {
  // Mock — replace with: return apiClient.post(ENDPOINTS.AUTH.REGISTER, payload)
  await new Promise<void>(resolve => setTimeout(resolve, 1200));
  return {
    success: true,
    rider: {
      id: `rider_${Date.now()}`,
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      vehicleType: payload.vehicleType,
      vehicleNumber: payload.vehicleNumber.toUpperCase(),
      tier: 'bronze',
      isOnline: false,
      rating: 5.0,
      totalDeliveries: 0,
      joinedAt: new Date().toISOString(),
      city: payload.city,
    },
  };
};
