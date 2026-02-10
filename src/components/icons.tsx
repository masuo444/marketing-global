import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const defaultProps = (size: number = 24): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

// === Category Icons ===

export function IconFood({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M3 2l1 7a4 4 0 0 0 4 3h0a4 4 0 0 0 4-3l1-7" />
      <path d="M8 2v3" />
      <path d="M8 12v10" />
      <path d="M18 2v4a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2V2" />
      <path d="M17 8v14" />
    </svg>
  );
}

export function IconBeauty({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M12 2a5 5 0 0 1 5 5c0 3-2 5.5-5 8-3-2.5-5-5-5-8a5 5 0 0 1 5-5z" />
      <path d="M12 15v7" />
      <path d="M9 18h6" />
    </svg>
  );
}

export function IconCrafts({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10l-1 9a4 4 0 0 1-4 4h0a4 4 0 0 1-4-4L7 4z" />
      <path d="M5 4h14" />
    </svg>
  );
}

export function IconFashion({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M4 2l4 4v14l-4-2V2z" />
      <path d="M20 2l-4 4v14l4-2V2z" />
      <path d="M8 6h8" />
      <path d="M12 2v4" />
    </svg>
  );
}

export function IconTech({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 8h2" />
      <path d="M15 8h2" />
      <path d="M7 12h10" />
    </svg>
  );
}

export function IconLifestyle({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function IconSake({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M8 2h8l-1 6a5 5 0 0 1-3 4h0a5 5 0 0 1-3-4L8 2z" />
      <path d="M12 12v6" />
      <path d="M8 22h8" />
      <path d="M12 18h0" />
      <path d="M10 2l1.5 3L10 8" />
    </svg>
  );
}

export function IconHealth({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M12 21c-4-3.5-8-6.5-8-10a5 5 0 0 1 8-4h0a5 5 0 0 1 8 4c0 3.5-4 6.5-8 10z" />
      <path d="M12 7v6" />
      <path d="M9 10h6" />
    </svg>
  );
}

// === Content Type Icons ===

export function IconDocument({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export function IconSocial({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

export function IconEmail({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22 6 12 13 2 6" />
    </svg>
  );
}

export function IconPress({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6z" />
    </svg>
  );
}

export function IconExhibition({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M2 7l10-5 10 5-10 5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

export function IconPitch({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </svg>
  );
}

// === Inquiry Category Icons ===

export function IconQuestion({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function IconShipping({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

export function IconPayment({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

export function IconReturn({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}

export function IconEdit({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

// === UI Action Icons ===

export function IconGlobe({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function IconMessageCircle({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function IconCopy({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function IconRefresh({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}

export function IconCheck({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function IconAlertTriangle({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function IconStar({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function IconSparkles({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
    </svg>
  );
}

export function IconArrowRight({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function IconChevronRight({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function IconHistory({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function IconClose({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function IconInfo({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export function IconZap({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export function IconTarget({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function IconLayers({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

export function IconUsers({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function IconTrendingUp({ size, ...props }: IconProps) {
  return (
    <svg {...defaultProps(size)} {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

// === Icon map for category/contentType lookups ===

export const CATEGORY_ICONS: Record<string, React.ComponentType<IconProps>> = {
  food: IconFood,
  beauty: IconBeauty,
  crafts: IconCrafts,
  fashion: IconFashion,
  tech: IconTech,
  lifestyle: IconLifestyle,
  sake: IconSake,
  health: IconHealth,
};

export const CONTENT_TYPE_ICONS: Record<string, React.ComponentType<IconProps>> = {
  "product-page": IconDocument,
  "sns-post": IconSocial,
  email: IconEmail,
  "press-release": IconPress,
  exhibition: IconExhibition,
  pitch: IconPitch,
};

export const INQUIRY_ICONS: Record<string, React.ComponentType<IconProps>> = {
  "product-question": IconQuestion,
  shipping: IconShipping,
  order: IconPayment,
  return: IconReturn,
  custom: IconEdit,
};
