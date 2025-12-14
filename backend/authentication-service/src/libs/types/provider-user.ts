import { OAuthProfile } from './oauth-profile';

export type ProviderUser = {
  profile: OAuthProfile;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  providerId: string;
};
