import { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

type jsxType = JSX.IntrinsicElements[keyof JSX.IntrinsicElements];

type BoundedProps = {
  as?: jsxType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function Bounded({
  as: Comp = 'section',
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Comp
      className={clsx(
        'px-6 ~py-10/16 [.header+&]:pt-44 [.header+&]:md:pt-32',
        className
      )}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  );
}
