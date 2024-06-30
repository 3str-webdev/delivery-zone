import type { UserType } from "@/entities/user";
import type { Dispatch, SetStateAction } from "react";

export type UserStateType = UserType | null;

export type AuthContextType = {
	user: UserStateType;
	setUser: Dispatch<SetStateAction<UserStateType>>;
};
