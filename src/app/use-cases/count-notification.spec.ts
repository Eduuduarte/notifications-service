import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notification-repository";
import { CountRecipientNotifications } from "./count-recipient-notification";


describe('Count recipient notification', () => {
    it('should be able to count recipient notifications', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const countRecipientNotifications = new CountRecipientNotifications(notificationRepository);

        await notificationRepository.create(makeNotification({ recipientId: 'recipient-1'}));

        await notificationRepository.create(makeNotification({ recipientId: 'recipient-1'}));

        await notificationRepository.create(makeNotification({ recipientId: 'recipient-2'}));

        const { count } = await countRecipientNotifications.execute({
            recipientId: 'recipient-1'
        });

        expect(count).toEqual(2);
    });
});