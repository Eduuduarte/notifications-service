import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface GetRecipientNotificationsRequest {
    recipientId: string;
}

interface GetRecipientNotificationsResponse { notifications: Notification[] }

@Injectable()
export class GetRecipientNotifications {

    constructor(
        private notificationRepository: NotificationsRepository
    ) {}

    async execute(request: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
        const { recipientId } = request;

        const notifications = await this.notificationRepository.findManyByRecipientId(
            recipientId
        )

        return { notifications }
    }
}