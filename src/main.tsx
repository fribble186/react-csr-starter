import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/design/theme.css";
import "./index.css";
import { RouterProvider } from "react-router/dom";

import "./i18n/config";
import router from "./routes";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
