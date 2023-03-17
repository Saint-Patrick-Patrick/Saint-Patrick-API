import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import Notification from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const newNotification = this.notificationsRepository.create(createNotificationDto);
    return await this.notificationsRepository.save(newNotification);
  }

  async findAll(id:number): Promise<Notification[]> {
    return await this.notificationsRepository.find({where:{id}});
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