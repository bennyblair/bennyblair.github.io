import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";

const CityAuthorNote = () => (
  <div className="max-w-5xl mx-auto mb-8">
    <div className="inline-flex flex-wrap items-center gap-2 rounded-md border border-slate-800 bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
      <UserRound className="h-4 w-4 text-sky-300" />
      <span>
        Written by{" "}
        <Link to="/about/ben" className="font-semibold text-sky-300 hover:text-sky-200">
          Ben
        </Link>
      </span>
      <span className="text-slate-500">|</span>
      <span>Commercial Finance Broker, Emet Capital</span>
    </div>
  </div>
);

export default CityAuthorNote;
