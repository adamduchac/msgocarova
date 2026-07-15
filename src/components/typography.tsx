import { fixPrepositions } from "@/lib/typography";

type TextProps = {
  children: React.ReactNode;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>;

export function Text({ children, as: Component = "span", ...props }: TextProps) {
  if (typeof children === "string") {
    return <Component {...props}>{fixPrepositions(children)}</Component>;
  }
  return <Component {...props}>{children}</Component>;
}
