import { DocumentBuilder } from "@nestjs/swagger";

export const EXPIRED_TOKEN = '6h';
export const SALT = 10;
export enum Status {
    ACTIVE = 'active',
    BLOCKED = 'blocked',
    CANCELED = 'canceled',
  }
export const cardNumbers:object = {
  4:true,
  5:true,
  34:true,
  37:true,
}
export const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};
export const swaggerConfig = new DocumentBuilder()
  .setTitle('Saint Patrick Api')
  .setDescription('The Saint Patrick Api description')
  .setVersion('1.0')
  .addTag('Saint Patrick Api')
  .build();

