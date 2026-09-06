/** A decorative diagram; the adjacent HTML contains the complete lending process. */
export default function ProcessCylinder() {
  const levels = [110, 250, 390, 530];
  return (
    <div className="process-visual" aria-hidden="true">
      <svg className="process-cylinder" viewBox="0 0 500 660" preserveAspectRatio="xMidYMid slice" fill="none" focusable="false" aria-hidden="true">
        <defs>
          <linearGradient id="cylinder-glass" x1="140" y1="0" x2="360" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d8e8d8" stopOpacity=".1" /><stop offset=".3" stopColor="#d8e8d8" stopOpacity=".015" /><stop offset=".8" stopColor="#d8e8d8" stopOpacity=".04" /><stop offset="1" stopColor="#d8e8d8" stopOpacity=".13" />
          </linearGradient>
          <radialGradient id="cylinder-sphere" cx=".33" cy=".25" r=".8">
            <stop stopColor="#fff" /><stop offset=".48" stopColor="#f3f4e9" /><stop offset=".84" stopColor="#b8c6b8" /><stop offset="1" stopColor="#768c7f" />
          </radialGradient>
          <radialGradient id="cylinder-ground"><stop stopColor="#b5c8b1" stopOpacity=".2" /><stop offset="1" stopColor="#b5c8b1" stopOpacity="0" /></radialGradient>
        </defs>
        <ellipse cx="250" cy="604" rx="178" ry="35" fill="url(#cylinder-ground)" />
        <path d="M140 110a110 36 0 0 1 220 0v420a110 36 0 0 1-220 0Z" fill="url(#cylinder-glass)" />
        <g className="cylinder-construction">
          <path d="M250 42v551" strokeDasharray="2 8" />
          <path d="M124 42h16m-8-8v16M360 42h16m-8-8v16M124 604h16m-8-8v16M360 604h16m-8-8v16" />
          {levels.map(y => <path key={y} d={`M360 ${y}H464m-4-4 4 4-4 4`} />)}
        </g>
        <g className="cylinder-wire cylinder-rear">
          {levels.map(y => <path key={y} d={`M140 ${y}a110 36 0 0 1 220 0`} />)}
        </g>
        <g className="process-ball"><ellipse cx="250" cy="165" rx="48" ry="12" fill="url(#cylinder-ground)" /><circle cx="250" cy="110" r="48" fill="url(#cylinder-sphere)" /><ellipse cx="234" cy="90" rx="19" ry="10" fill="#fff" opacity=".18" transform="rotate(-32 234 90)" /></g>
        <g className="cylinder-wire cylinder-front">
          <path d="M140 110v420M360 110v420" />
          {levels.map(y => <path key={y} d={`M140 ${y}a110 36 0 0 0 220 0`} />)}
        </g>
        {levels.map(y => <g className="process-ring-glow" key={y}><ellipse cx="250" cy={y} rx="110" ry="36" strokeWidth="12" opacity=".055" /><ellipse cx="250" cy={y} rx="110" ry="36" /><path d={`M360 ${y}H464`} strokeWidth=".8" /><circle cx="360" cy={y} r="3" fill="currentColor" stroke="none" /></g>)}
      </svg>
    </div>
  );
}
