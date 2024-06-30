import {
	FiHeart,
	FiHome,
	FiSearch,
	FiShoppingBag,
	FiUser,
} from "react-icons/fi";
import type { BottomMenuItemType } from "../types";

export const ITEMS: BottomMenuItemType[] = [
	{
		icon: <FiHome />,
		path: "/",
	},
	{
		icon: <FiHeart />,
		path: "/favorites",
	},
	{
		icon: <FiSearch />,
		path: "/search",
	},
	{
		icon: <FiShoppingBag />,
		path: "/cart",
	},
	{
		icon: <FiUser />,
		path: "/profile",
	},
];
