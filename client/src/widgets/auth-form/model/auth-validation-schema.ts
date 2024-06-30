import {
	type InferInput,
	email,
	minLength,
	object,
	pipe,
	string,
} from "valibot";

export const AuthSchema = object({
	email: pipe(string(), email()),
	password: pipe(string(), minLength(6)),
});

export type AuthSchemaType = InferInput<typeof AuthSchema>;
