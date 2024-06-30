import { useSearch } from "wouter";

export const useSearchParams = () => {
	const paramsString = useSearch();

	const paramsMap = new Map<string, string>();

	for (const paramPair of paramsString.split("&")) {
		const [key, value] = paramPair.split("=");
		paramsMap.set(key, value);
	}

	return paramsMap;
};
