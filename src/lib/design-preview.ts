// Explicit build mode only. Production defaults preserve the existing contracts.
export const isDesignPreview = import.meta.env?.VITE_DESIGN_PREVIEW === "true";
