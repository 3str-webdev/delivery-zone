import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { generateSlug } from "src/shared/lib/generate-slug";
import { returnProductObject } from "src/shared/return-objects/return-product-object";
import { ProductDto } from "./dto/product.dto";
import { CategoryService } from "src/category/category.service";

@Injectable()
export class ProductService {
	constructor(
		private readonly prisma: PrismaService,
		private categoryService: CategoryService,
	) {}

	async getAll(searchQuery?: string) {
		if (searchQuery) {
			return this.search(searchQuery);
		}

		return this.prisma.product.findMany({
			select: returnProductObject,
			orderBy: {
				createdAt: "desc", // Сначала самые новые продукты
			},
		});
	}

	async search(searchQuery: string) {
		return this.prisma.product.findMany({
			where: {
				OR: [
					{
						name: {
							contains: searchQuery,
							mode: "insensitive",
						},
					},
				],
			},
			select: returnProductObject,
		});
	}

	async getBySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				slug: slug,
			},
			select: returnProductObject,
		});

		if (!product) {
			throw new NotFoundException("Продукт не найден");
		}

		return product;
	}

	async getByCategory(categorySlug: string) {
		const products = await this.prisma.product.findMany({
			where: {
				category: {
					slug: categorySlug,
				},
			},
			select: returnProductObject,
		});

		if (!products.length) {
			throw new NotFoundException("Продукты по данной категории не найден");
		}

		return products;
	}

	async create() {
		return this.prisma.product.create({
			data: {
				name: "",
				description: "",
				slug: "",
				image: "",
				price: 0,
			},
		});
	}

	async update(id: string, dto: ProductDto) {
		const { name, description, price, image, categoryId } = dto;

		// Метод уже содержит обработку исключения если категория не найдена
		await this.categoryService.getById(categoryId);

		return this.prisma.product.update({
			where: {
				id,
			},
			data: {
				name,
				description,
				slug: generateSlug(name),
				image,
				price,
				category: {
					connect: {
						id: categoryId,
					},
				},
			},
		});
	}

	async delete(id: string) {
		return this.prisma.product.delete({
			where: {
				id,
			},
		});
	}
}
