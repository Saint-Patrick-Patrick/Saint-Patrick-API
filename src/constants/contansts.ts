import { DocumentBuilder } from "@nestjs/swagger";

export const EXPIRED_TOKEN = '6h';
export const SALT = 10;
export enum Status {
    ACTIVE = 'active',
    BLOCKED = 'blocked',
    CANCELED = 'canceled',
  }

  export const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  }
  export const swaggerConfig = new DocumentBuilder()
  .setTitle("Rocket Banck API")
    .setDescription("Endpoints")
    .setVersion("1.0")
    .build();