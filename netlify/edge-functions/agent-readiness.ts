import { createAgentHandler } from "../lib/agent-protocol.ts";
import content from "../generated/agent-content.ts";
import type { Context } from "@netlify/edge-functions";

const handle = createAgentHandler(content);
export default (request: Request, context: Context) => handle(request, context);
