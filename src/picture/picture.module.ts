import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [PictureController],
  providers: [PictureService]
})
export class PictureModule {}
