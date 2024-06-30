import { GlobalProviders } from "./global-providers";
import { AppRouter } from "./router";

export const App = () => {
	return (
		<GlobalProviders>
			<AppRouter />
		</GlobalProviders>
	);
};
