import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { Role } from "@prisma/client";
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ProductDto } from "./dto/product.dto";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get()
	getAll(@Query("search") searchQuery?: string) {
		return this.productService.getAll(searchQuery);
	}

  @Get("by-category/:categorySlug")
  async getByCategory(@Param("categorySlug") categorySlug: string) {
    return this.productService.getByCategory(categorySlug)
  }

  @Get("by-slug/:slug")
  async getBySlug(@Param("slug") slug: string) {
    return this.productService.getBySlug(slug)
  }

  @HttpCode(200)
  // @Auth(Role.Admin)
  @Post()
  async create() {
    return this.productService.create()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: ProductDto) {
    return this.productService.update(id, dto)
  }

  @HttpCode(200)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.productService.delete(id)
  }
}
