import { faker } from "@faker-js/faker";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { hash, verify } from "argon2";
import { PrismaService } from "src/prisma.service";
import { AuthDto } from "./dto/auth.dto";

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

		return this.returnUserData(user);
	}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto);

		console.log(dto);

		return this.returnUserData(user);
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken);

		if (!result) {
			throw new UnauthorizedException("Пользователь не авторизован");
		}

		const user = await this.prisma.user.findUnique({
			where: {
				id: result.id,
			},
		});

		return this.returnUserData(user);
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

	private async returnUserData(user: User) {
		const tokens = await this.issueTokens(user.id);

		return {
			user: {
				id: user.id,
				email: user.email,
			},
			...tokens,
		};
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email,
			},
		});

		if (!user) {
			throw new NotFoundException("Пользователь не найден");
		}

		const isValid = await verify(user.password, dto.password);

		if (!isValid) {
			throw new UnauthorizedException("Неверный пароль");
		}

		return user;
	}
}
