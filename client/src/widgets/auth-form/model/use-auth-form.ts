import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { AuthSchema, type AuthSchemaType } from "./auth-validation-schema";

export const useAuthForm = () => {
	const { handleSubmit, reset, control } = useForm<AuthSchemaType>({
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: valibotResolver(AuthSchema),
	});

	const onSubmit = handleSubmit((data) => {
		console.log(data);
		reset();
	});

	return {
		control,
		onSubmit,
	};
};
