import { faker } from "@faker-js/faker";
import { BadRequestException, Injectable } from "@nestjs/common";
import { hash } from "argon2";
import { PrismaService } from "src/prisma.service";
import { AuthDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService,
	) {}

	async register(dto: AuthDto) {
		const { email, password } = dto;

		const oldUser = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (oldUser) {
			throw new BadRequestException(
				"Пользователь с таким email уже существует",
			);
		}

		const user = await this.prisma.user.create({
			data: {
				name: faker.person.firstName(),
				avatarPath: faker.image.avatar(),
				email,
				password: await hash(password),
				phone: faker.phone.number(),
			},
		});

		const tokens = await this.issueTokens(user.id);

		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}

	private async issueTokens(userId: string) {
		const data = {
			id: userId,
		};

		const accessToken = this.jwt.sign(data, {
			expiresIn: "1h", // сколько живёт токен
		});

		const refreshToken = this.jwt.sign(data, {
			expiresIn: "7d", // сколько живёт токен
		});

		return { accessToken, refreshToken };
	}

	private returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email,
		};
	}
}
