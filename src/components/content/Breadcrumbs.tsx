import Link from "next/link";
import JsonLd from "./JsonLd";
import { absoluteUrl } from "@/lib/seo";

export type Crumb = { name: string; href: string };

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. The last crumb is the current page. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
    return (
        <>
            <nav
                aria-label="Breadcrumb"
                className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[var(--text-secondary)]"
            >
                {items.map((item, index) => {
                    const last = index === items.length - 1;

                    return (
                        <span key={item.href} className="flex items-center gap-2">
                            {index > 0 && <span>/</span>}
                            {last ? (
                                <span aria-current="page" className="text-[var(--text-primary)]">
                                    {item.name}
                                </span>
                            ) : (
                                <Link href={item.href} className="hover:text-[var(--text-primary)]">
                                    {item.name}
                                </Link>
                            )}
                        </span>
                    );
                })}
            </nav>
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: items.map((item, index) => ({
                        "@type": "ListItem",
                        position: index + 1,
                        name: item.name,
                        item: absoluteUrl(item.href)
                    }))
                }}
            />
        </>
    );
}
