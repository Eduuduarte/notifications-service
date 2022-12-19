import { Injectable } from "@nestjs/common";
import { Notification } from "../../../../app/entities/notification";
import { NotificationsRepository } from "../../../../app/repositories/notifications-repository";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(private prismaService: PrismaService) {
    }
    
    async findById(noticationId: string): Promise<Notification | null> {
        const notification = await this.prismaService.notification.findUnique({
            where: {
                id: noticationId
            }
        });

        if(!notification) {
            return null;
        }

        return PrismaNotificationMapper.toDomain(notification);
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = await this.prismaService.notification.findMany({
            where: {
                recipientId
            }
        });

        return notifications.map(PrismaNotificationMapper.toDomain)
    }

    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);
        await this.prismaService.notification.create({
            data: raw,
        })
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);

        await this.prismaService.notification.update({
            where: {
                id: raw.id,
            },
            data: raw
        })
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.prismaService.notification.count({
            where: {
                recipientId,
            },
        });

        return count;
    }

}