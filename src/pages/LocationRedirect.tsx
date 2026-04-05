import { Navigate, useParams } from "react-router-dom";

const cityTargets: Record<string, string> = {
  sydney: "/services/bridging-finance/sydney",
  melbourne: "/services/bridging-finance/melbourne",
  brisbane: "/services/bridging-finance/brisbane",
  perth: "/services/bridging-finance/perth",
  adelaide: "/services/bridging-finance/adelaide",
  "gold-coast": "/services/bridging-finance/gold-coast",
};

export default function LocationRedirect() {
  const { city } = useParams();
  return <Navigate to={city ? cityTargets[city] || "/services" : "/services"} replace />;
}
