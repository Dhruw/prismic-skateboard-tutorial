'use client';

import {
  ColorField,
  Content,
  ImageField,
  KeyTextField,
} from '@prismicio/client';
import clsx from 'clsx';
import React, { ComponentProps, ReactNode } from 'react';
import { Heading } from '@/components/Heading';
import { PrismicNextImage, PrismicNextImageProps } from '@prismicio/next';

type Props = Pick<
  Content.BoardCustomizerDocumentData,
  'wheels' | 'decks' | 'metals'
> & {
  className?: string;
};

export default function Controls({ wheels, decks, metals, className }: Props) {
  return (
    <div className={clsx('flex flex-col gap-6', className)}>
      <Options title="Deck"> </Options>
      <Options title="Wheels"> </Options>
      <Options title="Trucks"> </Options>
      <Options title="Bolts"> </Options>
    </div>
  );
}

type OptionsProps = {
  title?: ReactNode;
  selectedName?: KeyTextField;
  children?: ReactNode;
};

function Options({ title, selectedName, children }: OptionsProps) {
  const formattedName = selectedName?.replace(/-/g, ' ');

  return (
    <div>
      <div className="flex">
        <Heading as="h4" size="xs" className="mb-2">
          {title}
        </Heading>
        <p className="ml-3 text-zinc-300">
          <span className="select-none text-zinc-500"> | </span>
          {formattedName}
        </p>
      </div>
      <div>
        <ul className="mb-1 flex flex-wrap gap-2">{children}</ul>
      </div>
    </div>
  );
}

type OptionProps = Omit<ComponentProps<'button'>, 'children'> & {
  selected: boolean;
  children: ReactNode;
} & (
    | {
        imageField: ImageField;
        imgixParams?: PrismicNextImageProps['imgixParams'];
        colorField?: never;
      }
    | {
        colorField: ColorField;
        imageField?: never;
        imgixParams?: never;
      }
  );

function Option({
  children,
  selected,
  imageField,
  imgixParams,
  colorField,
  ...restProps
}: OptionProps) {
  return (
    <button
      className={clsx(
        'size-10 cursor-pointer rounded-full bg-black outline-2 outline-white',
        selected && 'outline'
      )}
    >
      {imageField ? (
        <PrismicNextImage
          field={imageField}
          className="pointer-events-none h-full w-full rounded-full"
        />
      ) : (
        <div
          className="h-full w-full rounded-full"
          style={{ backgroundColor: colorField ?? undefined }}
        />
      )}

      <span className="sr-only">{children}</span>
    </button>
  );
}
