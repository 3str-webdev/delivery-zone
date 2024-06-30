import { AuthPage } from "@/pages/auth-page";
import { HomePage } from "@/pages/home-page";
import { Route, Switch } from "wouter";

export const AppRouter = () => {
	return (
		<Switch>
			<Route path="/" component={HomePage} />
			<Route path="/auth" component={AuthPage} />
		</Switch>
	);
};
