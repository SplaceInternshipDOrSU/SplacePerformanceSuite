import { adminRoutes } from "./adminRoutes";
import { rankandfileRoutes } from "./rankandfileRoutes";
import { managerRoutes } from "./managerRoutes";

import { cooRoutes } from "./cooRoutes";
import { ceoRoutes } from "./ceoRoutes";

export const privateRoutes = [...adminRoutes,...rankandfileRoutes,...cooRoutes,...ceoRoutes, ...managerRoutes];
