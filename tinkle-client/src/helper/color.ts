export enum Color {
  light,
  primary,
  danger,
  info,
}

export default function getThemeClassName(theme: Color): string {
  switch (theme) {
    case Color.light:
      return `text-primary-100`;
    case Color.primary:
      return `text-primary-300`;
    case Color.danger:
      return `text-danger`;
    case Color.info:
      return `text-info`;
    default:
      return ``;
  }
}
