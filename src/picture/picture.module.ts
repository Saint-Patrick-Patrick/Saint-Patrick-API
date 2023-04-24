import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/user/entities/user.entity';
import Picture from './entities/picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Picture])],
  controllers: [PictureController],
  providers: [PictureService]
})
export class PictureModule {}
