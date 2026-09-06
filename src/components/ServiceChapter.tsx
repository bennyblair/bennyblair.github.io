import { Children, HTMLAttributes, isValidElement } from "react";

/** Keeps the original heading, content and anchors in a shared editorial layout. */
export default function ServiceChapter({ children, className = "", ...props }: HTMLAttributes<HTMLElement>) {
  const content = Children.toArray(children);
  const headingIndex = content.findIndex(child => isValidElement(child) && child.type === "h2");
  if (headingIndex !== 0) return <section className={className} {...props}>{children}</section>;

  return <section className={`service-chapter ${className}`} {...props}>
    <div className="service-chapter-heading">{content[0]}</div>
    <div className="service-chapter-content">{content.slice(1)}</div>
  </section>;
}
