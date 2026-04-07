import { ResponsivePageHeader } from "@/components/responsive-page-header";

const actionLinks = [
  { label: "Back To Services", href: "/#services", variant: "outline" },
  { label: "Contact The Desk", href: "/contact", variant: "solid" },
] as const;

export function ServicePageHeader() {
  return (
    <ResponsivePageHeader
      actions={actionLinks}
      menuId="service-page-menu"
      transparentUntilScroll
    />
  );
}
