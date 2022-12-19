import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface UnreadNotificationRequest {
    noticationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {

    constructor(
        private notificationRepository: NotificationsRepository
    ) {}

    async execute(request: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
        const { noticationId } = request;

        const notification = await this.notificationRepository.findById(noticationId);

        if(!notification) {
            throw new NotificationNotFound;
        }

        notification.unread();

        await this.notificationRepository.save(notification);
    }
}