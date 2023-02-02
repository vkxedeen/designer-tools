import React, { CSSProperties, LegacyRef } from 'react';

type Props = {
  style: CSSProperties,
  svgRef: LegacyRef<SVGSVGElement>,
}

function NodeIcon({ style, svgRef }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} ref={svgRef}>
      <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#292D32"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <g opacity="0.4">
        <path d="M1 12H23" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 23V1" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export default NodeIcon;
