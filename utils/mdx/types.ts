import { ComponentType, PropsWithChildren } from 'react';

export interface MDXComponents {
  h1: ComponentType<PropsWithChildren<HTMLHeadingProps>>;
  h2: ComponentType<PropsWithChildren<HTMLHeadingProps>>;
  p: ComponentType<PropsWithChildren<HTMLParaProps>>;
  ul: ComponentType<PropsWithChildren<HTMLListProps>>;
  ol: ComponentType<PropsWithChildren<HTMLListProps>>;
  li: ComponentType<PropsWithChildren<HTMLListItemProps>>;
  code: ComponentType<PropsWithChildren<HTMLCodeProps>>;
  pre: ComponentType<PropsWithChildren<HTMLPreProps>>;
}

interface HTMLHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {}
interface HTMLParaProps extends React.HTMLAttributes<HTMLParagraphElement> {}
interface HTMLListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {}
interface HTMLListItemProps extends React.HTMLAttributes<HTMLLIElement> {}
interface HTMLCodeProps extends React.HTMLAttributes<HTMLElement> {}
interface HTMLPreProps extends React.HTMLAttributes<HTMLPreElement> {}

export interface CompiledMDX {
  default: ComponentType;
}