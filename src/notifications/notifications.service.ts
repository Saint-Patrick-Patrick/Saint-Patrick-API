import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import Notification from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createNotification(userId:String, mensagge:any): Promise<Notification> {
    const users = this.userRepo.find();
    const newNotification = await this.notificationsRepository.create({
      mensagge,
      to: users[0],
      from: users[1]
    });
    await this.notificationsRepository.save(newNotification);
    return newNotification;
  }

  async getNotifications(data:string): Promise<Notification[]> {
    console.log(data);
    
    return await this.notificationsRepository.find();
  }

  async findOne(id: number): Promise<Notification> {
    return await this.notificationsRepository.findOne({where:{id}});
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({where:{id}});
    if (!notification) {
      throw new Error(`Notification with id ${id} not found`);
    }
    Object.assign(notification, updateNotificationDto);
    return await this.notificationsRepository.save(notification);
  }

  async remove(id: number): Promise<void> {
    await this.notificationsRepository.delete(id);
  }
}