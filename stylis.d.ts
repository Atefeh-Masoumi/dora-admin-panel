declare module "stylis" {
    export function prefixer(style: string): string;
  }
  declare module 'react-dom/client' {
    import { Root } from 'react-dom/client';
    const createRoot: (container: Element | DocumentFragment) => Root;
    export { createRoot };
  }