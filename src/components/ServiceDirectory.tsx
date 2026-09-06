import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  services: { title: string; description: string; link: string; loanRange: string; terms: string }[];
}

export default function ServiceDirectory({ categories }: { categories: ServiceCategory[] }) {
  return <section className="services-index" id="service-directory">
    <div className="directory-section-heading"><h2>Our <span className="gradient-text">Service Directory</span></h2><p>Browse our comprehensive range of commercial finance solutions. Click on any service to learn more about specific lending options.</p></div>
    {categories.map((category, index) => <details className="service-category" key={category.id} id={category.id} open>
      <summary className="service-category-heading"><span className="service-category-number" aria-hidden="true">0{index + 1}</span><h3>{category.title}</h3><span className="service-category-count">{category.services.length} Services</span><Plus aria-hidden="true" /></summary>
      <div className="service-category-content"><p className="service-category-description">{category.description}</p><div className="service-options">
        {category.services.map(service => <article className="service-option" key={service.link}>
          <div className="service-option-copy"><h4><Link to={service.link}>{service.title}</Link></h4><p>{service.description}</p></div>
          <dl className="service-option-facts"><div><dt>Range:</dt><dd>{service.loanRange}</dd></div><div><dt>Terms:</dt><dd>{service.terms}</dd></div></dl>
          <div className="service-option-actions"><Link to={service.link} className="text-link">Details <ArrowUpRight aria-hidden="true" /></Link><Link to="/contact" className="service-apply">Apply</Link></div>
        </article>)}
      </div></div>
    </details>)}
  </section>;
}
