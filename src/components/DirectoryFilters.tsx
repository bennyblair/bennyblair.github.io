interface DirectoryFiltersProps {
  id: string;
  label: string;
  value: string;
  options: { label: string; count: number }[];
  count: number;
  noun: string;
  onChange: (value: string) => void;
}

export default function DirectoryFilters({ id, label, value, options, count, noun, onChange }: DirectoryFiltersProps) {
  return <div className="directory-toolbar">
    <div className="directory-filter">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={event => onChange(event.target.value)}>
        {options.map(option => <option key={option.label} value={option.label}>{option.label} ({option.count})</option>)}
      </select>
    </div>
    <p className="directory-count" role="status" aria-live="polite">{count} {noun}{value !== "All" && <button type="button" onClick={() => onChange("All")}>View all</button>}</p>
  </div>;
}
