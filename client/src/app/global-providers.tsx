import { AuthProvider } from "@/features/auth";
import type { WithChildrenType } from "@/shared/types/with-children";
import { NextUIProvider } from "@nextui-org/react";

export const GlobalProviders = ({ children }: WithChildrenType) => {
	return (
		<NextUIProvider className="contents">
			<AuthProvider>{children}</AuthProvider>
		</NextUIProvider>
	);
};
