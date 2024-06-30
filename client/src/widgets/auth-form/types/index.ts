import type { Control, FieldPath, FieldValues } from "react-hook-form";

export type FormFieldType<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
};
