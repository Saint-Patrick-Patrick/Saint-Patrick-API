import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('FACEBOOK_APP_ID'),
      clientSecret: configService.get('FACEBOOK_APP_SECRET'),
      callbackURL: `${configService.get('URL_BACK')}/auth/facebook/callback`,
      scope: ['email', 'public_profile'],
      profileFields: ['id', 'displayName', 'name', 'emails', 'picture.type(large)']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: any) {
    const { email, first_name, last_name, picture } = profile._json;

    const user = {
      firstName: first_name,
      lastName: last_name,
      email,
      pictureUrl: picture?.data?.url,
      accessToken,
    };

    return done(null, user);
  }
}
