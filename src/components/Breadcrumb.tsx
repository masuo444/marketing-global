"use client";

import Link from "next/link";
import { IconChevronRight } from "./icons";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 text-xs text-text-sub py-3">
      <Link href="/" className="hover:text-text transition-colors">
        FOMs
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <IconChevronRight size={12} className="opacity-50" />
          {item.href ? (
            <Link href={item.href} className="hover:text-text transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-text">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
