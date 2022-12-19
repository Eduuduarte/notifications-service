import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { Body, Controller, Param, Patch, Post, Get } from '@nestjs/common';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,

  ) {}

  @Patch(':id/cancel')
  async cancel(
    @Param('id') id: string ) {
      await this.cancelNotification.execute({
        noticationId: id,
      })
    }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
     const { count } = await this.countRecipientNotifications.execute({
      recipientId,
     });

     return {
      count,
     }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
     const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
     });

     return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
     }
  }

  @Patch(':id/read')
  async read(
    @Param('id') id: string ) {
      await this.readNotification.execute({
        noticationId: id,
      })
    }

    @Patch(':id/unread')
    async unread(
      @Param('id') id: string ) {
        await this.unreadNotification.execute({
          noticationId: id,
        })
      }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    });

    return { notification: NotificationViewModel.toHTTP(notification) }
  }
}
