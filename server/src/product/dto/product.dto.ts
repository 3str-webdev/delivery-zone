import { IsNumber, IsPositive, IsString } from "class-validator";

export class ProductDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsString()
	image: string;

	@IsString()
	categoryId: string;

	@IsNumber()
	@IsPositive({
		message: "Цена должна быть больше нуля",
	})
	price: number;
}
