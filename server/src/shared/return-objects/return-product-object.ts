import { Prisma } from "@prisma/client";
import { returnCategoryObject } from "./return-category-object";

export const returnProductObject: Prisma.ProductSelect = {
	id: true,
	name: true,
	price: true,
	description: true,
	image: true,
  slug: true,

	category: {
		select: returnCategoryObject,
	},

	createdAt: true,
};
