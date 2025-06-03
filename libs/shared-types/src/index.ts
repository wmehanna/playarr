export interface RegisterDto {
  username: string;
  password: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface AuthResponseDto {
  accessToken: string;
}

export interface ForgotPasswordDto {
  username: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface GameResultDto {
  title: string;
  magnet: string;
  size: string;
  seeds: number;
  peers: number;
  coverUrl?: string;
}

export interface EmailSettingsDto {
  provider: string;
  apiKey?: string;
  fromAddress: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  smtpSecure?: boolean;
}
