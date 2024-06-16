import { Injectable, NotFoundException } from "@nestjs/common";
import slug from "slug";
import { PrismaService } from "src/prisma.service";
import { returnCategoryObject } from "src/shared/return-objects/return-category-object";
import { CategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.category.findMany({
			select: returnCategoryObject,
		});
	}

	async getById(id: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				id: id,
			},
			select: returnCategoryObject,
		});

		if (!category) {
			throw new NotFoundException("Категория не найдена");
		}

		return category;
	}

	async getBySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				slug: slug,
			},
			select: returnCategoryObject,
		});

		if (!category) {
			throw new NotFoundException("Категория не найдена");
		}

		return category;
	}

	async create() {
		return this.prisma.category.create({
			data: {
				name: "",
				slug: "",
				image: "",
			},
		});
	}

	async update(id: string, dto: CategoryDto) {
		return this.prisma.category.update({
			where: {
				id,
			},
			data: {
				name: dto.name,
				slug: slug(dto.name),
				image: dto.image,
			},
		});
	}

	async delete(id: string) {
		return this.prisma.category.delete({
			where: {
				id,
			},
		});
	}
}
