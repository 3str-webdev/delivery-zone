import type { WithChildrenType } from "@/shared/types/with-children";
import { createContext, useState } from "react";
import type { AuthContextType, UserStateType } from "../types";

export const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
});

export const AuthProvider = ({ children }: WithChildrenType) => {
	const [user, setUser] = useState<UserStateType>(null);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};
