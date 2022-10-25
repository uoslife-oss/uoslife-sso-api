export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export type GenerateTokenCommand = {
  username: string;
  password: string;
};

export type GenerateTokenResult = {
  accessToken: string;
  refreshToken: string;
  userId: string;
};

export type RefreshTokenCommand = {
  refreshToken: string;
};

export type RefreshTokenResult = {
  accessToken: string;
  userId: string;
};
