import { adminRoutes } from "./adminRoutes";
import { teamLeadRoutes } from "./teamLeadRoutes";
import { agentRoutes } from "./agentRoutes";
import { managerRoutes } from "./managerRoutes";
import { cooRoutes } from "./cooRoutes";
import { ceoRoutes } from "./ceoRoutes";

export const privateRoutes = [...adminRoutes, ...teamLeadRoutes, ...agentRoutes, ...managerRoutes,...cooRoutes,...ceoRoutes];
