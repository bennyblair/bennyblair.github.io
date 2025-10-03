import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { generateBreadcrumbSchema } from "@/lib/schema-utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  includeSchema?: boolean;
}

const Breadcrumbs = ({ items, includeSchema = true }: BreadcrumbsProps) => {
  return (
    <>
      {includeSchema && (
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema(items))}
        </script>
      )}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
            {item.href && index < items.length - 1 ? (
              <Link
                to={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={index === items.length - 1 ? "text-foreground font-medium" : ""}>
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};

export default Breadcrumbs;