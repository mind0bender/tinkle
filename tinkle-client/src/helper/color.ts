export enum Color {
  light,
  primary,
  danger,
  info,
}

export default function getThemeClassName(
  theme: Color,
  dim: boolean = false
): string {
  switch (theme) {
    case Color.light:
      return `text-primary-100 ${
        dim ? "border-stone-800" : "border-primary-100"
      }`;
    case Color.primary:
      return `text-primary-300 ${
        dim ? "border-primary-dim" : "border-primary-300"
      }`;
    case Color.danger:
      return `text-danger ${dim ? "border-danger-dim" : "border-danger"}`;
    case Color.info:
      return `text-info ${dim ? "border-info-dim" : "border-info"}`;
    default:
      return ``;
  }
}
