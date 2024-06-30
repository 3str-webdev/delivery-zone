import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { returnProductObject } from "src/shared/return-objects/return-product-object";
import { returnUserObject } from "src/shared/return-objects/return-user-object";

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: string, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				...returnUserObject,
				favorites: {
					select: returnProductObject,
				},
				...selectObject,
			},
		});

		if (!user) {
			throw new NotFoundException("Пользователь не найден");
		}

		return user;
	}

	async toggleFavorite(userId: string, productId: string) {
		const user = await this.getById(userId);

		if (!user) {
			throw new NotFoundException("Пользователь не найден");
		}

		const isExists = user.favorites.some(
			(favorite) => favorite.id === productId,
		);

		await this.prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				favorites: {
					[isExists ? "disconnect" : "connect"]: {
						id: productId,
					},
				},
			},
		});

		const status = isExists ? "removed" : "added";

		return { message: "Success", productId, status };
	}
}
