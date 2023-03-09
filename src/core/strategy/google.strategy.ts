import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: ` ${process.env.URL_BACK}/auth/google/callback`,
      scope: ['email', 'public_profile'],
      profileFields: ['id', 'displayName', 'name', 'emails', 'picture.type(large)']
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
      firstName: given_name,
      lastName: family_name,
      email,
      pictureUrl: picture,
      accessToken,
    };
    console.log(user);

    return done(null, user);
  }
}
