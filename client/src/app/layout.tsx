import { WithChildrenType } from "@/shared/types/with-children";
import { BottomMenu } from "@/widgets/bottom-menu";

export const Layout = ({ children }: WithChildrenType) => {
	return (
		<>
			{children}
			<BottomMenu />
		</>
	);
};
