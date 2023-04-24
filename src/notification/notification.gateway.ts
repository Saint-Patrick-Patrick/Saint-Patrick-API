import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Server, Socket } from 'socket.io';
import Notification from './entities/notification.entity';
import { Injectable, UseGuards } from '@nestjs/common';

@WebSocketGateway(81,{
  cors:{
    origin:'*',
  }
})
@Injectable()
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server:Server 
  
  constructor(private readonly notificationService: NotificationService) {}
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

  @SubscribeMessage('getNotification')
  async handleGetNotification(@MessageBody() data: { userId: string }): Promise<Notification[]> {
    //aca
    const notification = await this.notificationService.getNotifications(data.userId);
    return notification;
  }
  @SubscribeMessage('createNotification')
  async createNotification(userId: string, message: string): Promise<Notification> {
    console.log('asd');
    
    const notification = await this.notificationService.createNotification(userId, message);
    this.server.emit(`notification:${userId}`, notification);
    return notification;
  }
  @SubscribeMessage('findOne')
  handleFindOne(@MessageBody() id: number) {
    return this.notificationService.findOne(id);
  }

  @SubscribeMessage('update')
  handleUpdate(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(
      updateNotificationDto.id,
      updateNotificationDto,
    );
  }

  @SubscribeMessage('remove')
  handleRemove(@MessageBody() id: number) {
    return this.notificationService.remove(id);
  }
}
