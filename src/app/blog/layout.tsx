import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/blog">) {
  return (
    <DocsLayout
      tree={source.pageTree}
      sidebar={{
        hidden: true,
      }}
    >
      {children}
    </DocsLayout>
  );
}
