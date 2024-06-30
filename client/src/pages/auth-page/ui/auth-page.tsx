import { AuthForm } from "@/widgets/auth-form";
import { cn } from "@nextui-org/theme";

export const AuthPage = () => {
	return (
		<main className={cn("main", "grid place-items-center", "p-4")}>
			<AuthForm />
		</main>
	);
};
