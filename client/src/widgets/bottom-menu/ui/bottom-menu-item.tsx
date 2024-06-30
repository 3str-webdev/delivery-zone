import { Button, type ButtonProps } from "@nextui-org/button";
import { Link, useRoute } from "wouter";
import type { BottomMenuItemType } from "../types";

type BottomMenuItemProps = ButtonProps & {
	item: BottomMenuItemType;
};

export const BottomMenuItem = ({ item, ...props }: BottomMenuItemProps) => {
	const [fullMatch] = useRoute(`${item.path}$`);
	const [baseMatch] = useRoute(`${item.path}/*`);

	const isActive = fullMatch || baseMatch;
	const itemVariant: ButtonProps["variant"] = isActive ? "solid" : "light";
	const itemColor: ButtonProps["color"] = isActive ? "primary" : "default";

	return (
		<Button
			{...props}
			as={Link}
			isIconOnly
			to={item.path}
			variant={itemVariant}
			color={itemColor}
		>
			{item.icon}
		</Button>
	);
};
