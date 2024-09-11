export interface ISaveOtpUseCase {
  execute: (email: string, otp: string) => Promise<void>;
}
