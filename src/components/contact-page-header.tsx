import { ResponsivePageHeader } from "@/components/responsive-page-header";

const actionLinks = [
  { label: "View Services", href: "/#services", variant: "outline" },
  { label: "Request Assistance", href: "/contact", variant: "solid" },
] as const;

export function ContactPageHeader() {
  return (
    <ResponsivePageHeader
      actions={actionLinks}
      menuId="contact-page-menu"
      transparentUntilScroll
    />
  );
}
