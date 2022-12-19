import { Content } from "@application/entities/content";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notification-repository";
import { Notification } from "../entities/notification";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";

describe('Cancel notification', () => {
    it('should be able to send a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationRepository);

        const notification = makeNotification();

        notificationRepository.create(notification);

        await cancelNotification.execute({
            noticationId: notification.id
        });

        expect(notificationRepository.notifications[0].cancelAt).toEqual(expect.any(Date));
    });

    it('should not be able to cancel a non existing notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationRepository);

        expect(() => {
            return cancelNotification.execute({
                noticationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFound);
    })
});