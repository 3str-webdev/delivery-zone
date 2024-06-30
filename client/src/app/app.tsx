import { GlobalProviders } from "./global-providers";
import { Layout } from "./layout";
import { AppRouter } from "./router";

export const App = () => {
	return (
		<GlobalProviders>
			<Layout>
				<AppRouter />
			</Layout>
		</GlobalProviders>
	);
};
