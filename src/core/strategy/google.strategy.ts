import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('FACEBOOK_APP_ID'),
      clientSecret: configService.get('FACEBOOK_APP_SECRET'),
      callbackURL: `${process.env.URL_BACK}/auth/google/callback`,
      scope: ['profile', 'email'],
      profileFields: [
        'id',
        'displayName',
        'name',
        'emails',
        'picture.type(large)',
      ],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const { given_name, family_name, email, picture } = profile._json;

    const user = {
      firstname: given_name,
      lastname: family_name,
      email,
      pictureUrl: picture,
      accessToken,
    };
    return done(null, user);
  }
}
