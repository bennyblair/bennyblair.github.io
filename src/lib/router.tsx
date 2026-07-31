import {
  forwardRef,
  useEffect,
  type AnchorHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  Link as WouterLink,
  Route as WouterRoute,
  Switch,
  useLocation as useWouterLocation,
  useParams as useWouterParams,
} from "wouter";

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, children, ...props }, ref) => {
  if (/^(?:https?:|mailto:|tel:)/.test(to)) {
    return (
      <a ref={ref} href={to} {...props}>
        {children}
      </a>
    );
  }

  return (
    <WouterLink ref={ref} href={to} {...props}>
      {children}
    </WouterLink>
  );
});
Link.displayName = "Link";

export const BrowserRouter = ({ children }: { children: ReactNode }) => <>{children}</>;

export const Routes = ({ children }: { children: ReactNode }) => <Switch>{children}</Switch>;

export const Route = ({ path, element }: { path: string; element: ReactElement }) =>
  path === "*" ? <WouterRoute>{element}</WouterRoute> : <WouterRoute path={path}>{element}</WouterRoute>;

export const Navigate = ({ to, replace = false }: { to: string; replace?: boolean }) => {
  const [, navigate] = useWouterLocation();
  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, replace, to]);
  return null;
};

export function useLocation() {
  const [pathname] = useWouterLocation();
  return {
    pathname,
    search: typeof window === "undefined" ? "" : window.location.search,
    hash: typeof window === "undefined" ? "" : window.location.hash,
  };
}

export function useParams<T extends Record<string, string | undefined> = Record<string, string>>() {
  return useWouterParams() as T;
}
