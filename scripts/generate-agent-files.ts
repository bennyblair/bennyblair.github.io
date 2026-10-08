import { DOMAIN, getIndexableStaticRoutes } from "../src/config/site-route-manifest";
import { generateAgentContent } from "./lib/agent-assets.mjs";

const content = generateAgentContent(process.cwd(), getIndexableStaticRoutes(), DOMAIN);
console.log(`Generated agent Markdown and ${content.services.length} public service records from prerendered pages.`);
