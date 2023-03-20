import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Server, Socket } from 'socket.io';
import Notification from './entities/notification.entity';
import { Injectable } from '@nestjs/common';

@WebSocketGateway()
@Injectable()
export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server:Server 
  
  constructor(private readonly notificationsService: NotificationsService) {}
  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    console.log(`Cliente conectado: ${userId}`);
    client.join(userId);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  afterInit(server: any) {
    console.log('Server initialized');
  }

  @SubscribeMessage('join')
  handleJoinRoom(client: Socket, payload: any): void {
    const userId = payload.userId;
    console.log(`Client ${client.id} joined room ${userId}`);
    client.join(userId);
  }

  @SubscribeMessage('getNotifications')
  async handleGetNotifications(@MessageBody() data: { userId: string }): Promise<Notification[]> {
    const notifications = await this.notificationsService.getNotifications(data.userId);
    return notifications;
  }
  @SubscribeMessage('createNotification')
  async createNotification(userId: string, message: string): Promise<Notification> {
    console.log('asd');
    
    const notification = await this.notificationsService.createNotification(userId, message);
    this.server.emit(`notification:${userId}`, notification);
    return notification;
  }
  @SubscribeMessage('findOne')
  handleFindOne(@MessageBody() id: number) {
    return this.notificationsService.findOne(id);
  }

  @SubscribeMessage('update')
  handleUpdate(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(
      updateNotificationDto.id,
      updateNotificationDto,
    );
  }

  @SubscribeMessage('remove')
  handleRemove(@MessageBody() id: number) {
    return this.notificationsService.remove(id);
  }
}
