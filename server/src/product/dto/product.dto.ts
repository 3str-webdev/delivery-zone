import { IsNumber, IsPositive, IsString } from "class-validator";

export class ProductDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsString()
	slug: string;

	@IsString()
	image: string;

	@IsNumber()
	@IsPositive({
		message: "Цена должна быть больше нуля",
	})
	price: number;
}
