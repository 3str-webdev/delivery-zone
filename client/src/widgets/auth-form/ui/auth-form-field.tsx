import { Input, type InputProps } from "@nextui-org/input";
import { Controller, type FieldValues } from "react-hook-form";
import type { FormFieldType } from "../types";

type AuthFormFieldProps<T extends FieldValues> = InputProps & FormFieldType<T>;

export const AuthFormField = <T extends FieldValues>({
	control,
	name,
	...props
}: AuthFormFieldProps<T>) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error },
			}) => (
				<Input
					{...props}
					value={value}
					onValueChange={onChange}
					onBlur={onBlur}
					isInvalid={Boolean(error)}
					errorMessage={error ? "Error" : ""}
				/>
			)}
		/>
	);
};
