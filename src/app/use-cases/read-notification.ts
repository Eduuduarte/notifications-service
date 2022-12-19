import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface ReadNotificationRequest {
    noticationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {

    constructor(
        private notificationRepository: NotificationsRepository
    ) {}

    async execute(request: ReadNotificationRequest): Promise<ReadNotificationResponse> {
        const { noticationId } = request;

        const notification = await this.notificationRepository.findById(noticationId);

        if(!notification) {
            throw new NotificationNotFound;
        }

        notification.read();

        await this.notificationRepository.save(notification);
    }
}