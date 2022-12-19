import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface CancelNotificationRequest {
    noticationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {

    constructor(
        private notificationRepository: NotificationsRepository
    ) {}

    async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
        const { noticationId } = request;

        const notification = await this.notificationRepository.findById(noticationId);

        if(!notification) {
            throw new NotificationNotFound;
        }

        notification.cancel();

        await this.notificationRepository.save(notification);
    }
}