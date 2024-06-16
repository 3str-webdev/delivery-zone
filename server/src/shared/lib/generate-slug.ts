import slugify from "slugify";

export const generateSlug = (str: string) => {
	if (!str) return "";

	return slugify(str);
};
