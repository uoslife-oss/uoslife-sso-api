export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export type GenerateTokenCommand = {
  username: string;
  password: string;
};

export type GenerateTokenResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
};
