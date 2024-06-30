import { Redirect, Route, type RouteProps } from "wouter";
import { useAuth } from "../model/use-auth";

export const ProtectedRoute = ({ ...props }: RouteProps) => {
	const { user } = useAuth();
	return user ? <Route {...props} /> : <Redirect to="/auth" replace />;
};
