import { NextUIProvider } from "@nextui-org/react";
import type { ReactNode } from "react";

export const GlobalProviders = ({ children }: { children: ReactNode }) => {
	return <NextUIProvider className="contents">{children}</NextUIProvider>;
};
