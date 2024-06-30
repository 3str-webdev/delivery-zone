import { useSearchParams } from "@/shared/hooks/use-search-params";
import { useSearch } from "wouter";

export const AuthForm = () => {
	const searchParams = useSearchParams();
  
	const isRegFormSate = searchParams.get("state") === "reg";

	return <>{}</>;
};
