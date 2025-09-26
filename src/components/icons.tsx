import type { SVGProps } from "react";

export function GenextoLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 28"
      width="120"
      height="28"
      {...props}
    >
      <text
        x="0"
        y="20"
        fontFamily="var(--font-space-grotesk), sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="hsl(var(--primary))"
        className="font-headline"
      >
        Genexto
      </text>
    </svg>
  );
}
