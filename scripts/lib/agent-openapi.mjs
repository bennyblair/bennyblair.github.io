export function createOpenApi(domain) {
  const schemaRef = (name) => ({ $ref: `#/components/schemas/${name}` });
  const response = (description, schema) => ({ description, content: { "application/json": { schema } } });
  const errors = {
    "404": response("Unknown API route or service. Consult /docs or list services for a valid slug.", schemaRef("ApiError")),
    "405": { ...response("Unsupported method. This API is read-only.", schemaRef("ApiError")), headers: { Allow: { description: "Supported methods", schema: { type: "string", enum: ["GET, HEAD"] } } } },
    "406": response("Unsupported response format. Send Accept: application/json.", schemaRef("ApiError")),
    "500": response("Temporary internal failure. Retry later or use the website.", schemaRef("ApiError")),
  };
  return {
    openapi: "3.1.0",
    info: { title: "Emet Capital Public Service Directory", version: "1.0.0", description: "Read-only access to published Australian commercial finance service information. No authentication required. No enquiries, quotes, eligibility assessments, approvals or customer data. General information only." },
    servers: [{ url: domain }],
    security: [],
    externalDocs: { description: "API and agent documentation", url: `${domain}/docs` },
    paths: {
      "/api/services": { get: {
        operationId: "listServices", summary: "List published commercial finance services", description: "Find public service titles, descriptions and canonical website URLs. Use the returned slug to retrieve one service. No authentication is required.",
        responses: { "200": response("Published canonical service directory.", schemaRef("ServiceDirectory")), ...errors },
      } },
      "/api/services/{slug}": { get: {
        operationId: "getService", summary: "Read a published commercial finance service", description: "Retrieve public information for a service slug returned by listServices. Read the canonical website page for context; this endpoint cannot assess or approve finance.",
        parameters: [{ name: "slug", in: "path", required: true, description: "Canonical service slug from GET /api/services.", schema: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" }, example: "commercial-property-finance" }],
        responses: { "200": response("Published service information.", schemaRef("Service")), ...errors },
      } },
    },
    components: { schemas: {
      Service: { type: "object", additionalProperties: false, required: ["slug", "title", "description", "url"], properties: {
        slug: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$", description: "Canonical service identifier." },
        title: { type: "string", minLength: 1, description: "Published page heading." },
        description: { type: "string", minLength: 1, description: "Published page meta description." },
        url: { type: "string", format: "uri", description: "Canonical public service page URL." },
      } },
      ServiceDirectory: { type: "object", additionalProperties: false, required: ["services"], properties: { services: { type: "array", minItems: 1, description: "Published service records, sorted by slug.", items: schemaRef("Service") } } },
      ApiError: { type: "object", additionalProperties: false, required: ["error"], properties: { error: { type: "object", additionalProperties: false, required: ["code", "message", "hint"], properties: {
        code: { type: "string", enum: ["NOT_FOUND", "SERVICE_NOT_FOUND", "METHOD_NOT_ALLOWED", "NOT_ACCEPTABLE", "INTERNAL_ERROR"], description: "Machine-readable error code." },
        message: { type: "string", minLength: 1, description: "Human-readable explanation." },
        hint: { type: "string", minLength: 1, description: "Suggested resolution or documentation link." },
      } } }, example: { error: { code: "SERVICE_NOT_FOUND", message: "The requested service was not found.", hint: "Use GET /api/services to find a valid slug. See /docs." } } },
    } },
  };
}
