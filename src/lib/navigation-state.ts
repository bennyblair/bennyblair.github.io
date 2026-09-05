// Inner article routes retain the existing client-rendering architecture. Carry
// native disclosure state across that render so delayed JS cannot undo a tap.
let disclosureWasOpen = false;
let summaryWasFocused = false;
export function captureNavigationState() {
  disclosureWasOpen = !!document.querySelector(".mobile-menu[open]");
  summaryWasFocused = !!document.activeElement?.matches(".mobile-menu summary");
}
export function takeNavigationState() {
  const open = disclosureWasOpen;
  const focusSummary = summaryWasFocused;
  disclosureWasOpen = false;
  summaryWasFocused = false;
  return { open, focusSummary };
}
