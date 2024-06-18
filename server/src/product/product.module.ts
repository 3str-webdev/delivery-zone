import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { CategoryService } from "src/category/category.service";

@Module({
	controllers: [ProductController],
	providers: [ProductService, PrismaService, CategoryService],
})
export class ProductModule {}
