export interface IOtpRepository {
  saveOtp(email: string, otp: string): Promise<void>;
  verify(email: string, otp: string): Promise<boolean>;
}
