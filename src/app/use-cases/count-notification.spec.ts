import { Content } from "@application/entities/content";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notification-repository";
import { Notification } from "../entities/notification";
import { CountRecipientNotifications } from "./count-recipient-notification";
import { NotificationNotFound } from "./errors/notification-not-found";

describe('Count recipient notification', () => {
    it('should be able to count recipient notifications', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const countRecipientNotifications = new CountRecipientNotifications(notificationRepository);

        await notificationRepository.create(
            new Notification({
                category: 'social',
                content: new Content('Nova solicitação de amizade!'),
                recipientId: 'recipient-1'
            }),
        );

        await notificationRepository.create(
            new Notification({
                category: 'social',
                content: new Content('Nova solicitação de amizade!'),
                recipientId: 'recipient-1'
            }),
        );

        await notificationRepository.create(
            new Notification({
                category: 'social',
                content: new Content('Nova solicitação de amizade!'),
                recipientId: 'recipient-2'
            }),
        );

        const { count } = await countRecipientNotifications.execute({
            recipientId: 'recipient-1'
        });

        expect(count).toEqual(2);
    });
});