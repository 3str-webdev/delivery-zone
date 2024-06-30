import {
	type InferInput,
	email,
	minLength,
	object,
	pipe,
	string,
} from "valibot";

export const AuthSchema = object({
	email: pipe(string(), email("Incorrect email")),
	password: pipe(
		string(),
		minLength(6, "Password must be at least 6 characters"),
	),
});

export type AuthSchemaType = InferInput<typeof AuthSchema>;
