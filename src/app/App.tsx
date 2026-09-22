import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import { AppProviders } from "./providers";
import { AppRoutes } from "./routes";
import { ScrollToHash } from "./ScrollToHash";

const App = () => (
  <ErrorBoundary>
    <AppProviders>
      <BrowserRouter>
        <ScrollToHash />
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  </ErrorBoundary>
);

export default App;
