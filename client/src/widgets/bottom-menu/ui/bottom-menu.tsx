import { cn } from "@nextui-org/theme";
import { ITEMS } from "../constants";
import { BottomMenuItem } from "./bottom-menu-item";

export const BottomMenu = () => {
	return (
		<nav className={cn("fixed", "bottom-0 left-0 w-full")}>
			<ul
				className={cn(
					"flex",
					"justify-between",
					"w-full",
					"px-4 py-1",
					"border-t",
				)}
			>
				{ITEMS.map((item) => {
					return (
						<li key={item.path}>
							<BottomMenuItem item={item} />
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
