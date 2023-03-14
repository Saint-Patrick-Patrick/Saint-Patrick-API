import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from 'http-status';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly configService: ConfigService){}
  async use(req:Request & { user?: any }, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
    try {
      const decoded = await jwt.verify(
        token,
        this.configService.get<string>('JWT_SECRET'),
      );
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(UNAUTHORIZED).json({ message: 'Invalid token' });
    }
  }
}
