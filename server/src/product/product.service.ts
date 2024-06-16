import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { generateSlug } from "src/shared/lib/generate-slug";
import { returnProductObject } from "src/shared/return-objects/return-product-object";
import { ProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.product.findMany({
			select: returnProductObject,
		});
	}

	async getById(id: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				id: id,
			},
			select: returnProductObject,
		});

		if (!product) {
			throw new NotFoundException("Продукт не найден");
		}

		return product;
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
		return this.prisma.product.update({
			where: {
				id,
			},
			data: {
				name: dto.name,
				description: dto.description,
				slug: generateSlug(dto.name),
				image: dto.image,
				price: dto.price,
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
