import { useSearchParams } from "@/shared/hooks/use-search-params";
import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "wouter";
import { useAuthForm } from "../model/use-auth-form";
import { AuthFormField } from "./auth-form-field";

export const AuthForm = () => {
	const searchParams = useSearchParams();
	const { onSubmit, control } = useAuthForm();
	const [passwordIsVisible, setPasswordIsVisible] = useState(false);

	const isRegFormSate = searchParams.get("state") === "reg";
	const formTitle = isRegFormSate ? "Sign Up" : "Login";
	const helperText = isRegFormSate
		? "Already have an account?"
		: "Don't have an account?";
	const helperTextLink = isRegFormSate ? "Login" : "Sign Up";
	const helperLinkSrc = isRegFormSate ? "/auth" : "/auth?state=reg";

	const passwordInputType = passwordIsVisible ? "text" : "password";
	const getPasswordInputIcon = () => {
		if (passwordIsVisible) {
			return <FiEyeOff onClick={handleEyeClick} />;
		}
		return <FiEye onClick={handleEyeClick} />;
	};

	const handleEyeClick = () => {
		setPasswordIsVisible((prev) => !prev);
	};

	return (
		<article className={cn("w-full max-w-md")}>
			<h1 className={cn("text-xl font-bold")}>{formTitle}</h1>
			<form className={cn("mt-4", "grid gap-4")} onSubmit={onSubmit}>
				<AuthFormField
					label="Email"
					size="sm"
					required
					isRequired
					control={control}
					name="email"
				/>

				<AuthFormField
					type={passwordInputType}
					label="Password"
					size="sm"
					required
					isRequired
					control={control}
					name="password"
					endContent={getPasswordInputIcon()}
				/>

				<Button type="submit" variant="solid" color="primary">
					{formTitle}
				</Button>
			</form>

			<p className={cn("text-center text-sm", "mt-2")}>
				{helperText}{" "}
				<Link
					to={helperLinkSrc}
					className={cn("underline underline-offset-2", "text-primary-400")}
				>
					{helperTextLink}
				</Link>
			</p>
		</article>
	);
};
