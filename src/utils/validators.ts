export const isValidPhone = (phone: string): boolean =>
  /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));

export const isValidOtp = (otp: string): boolean => /^\d{4}$/.test(otp);

export const isValidWeight = (value: string): boolean => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0 && num <= 50;
};
