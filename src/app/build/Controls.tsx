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
import { useCustomizerControls } from './context';

type Props = Pick<
  Content.BoardCustomizerDocumentData,
  'wheels' | 'decks' | 'metals'
> & {
  className?: string;
};

export default function Controls({ wheels, decks, metals, className }: Props) {
  const {
    setDeck,
    setWheel,
    setBolt,
    setTruck,
    selectedBolt,
    selectedDeck,
    selectedTruck,
    selectedWheel,
  } = useCustomizerControls();

  return (
    <div className={clsx('flex flex-col gap-6', className)}>
      <Options title="Deck" selectedName={selectedDeck?.uid}>
        {decks.map((item) => (
          <Option
            key={item.uid}
            imageField={item.texture}
            imgixParams={{
              rect: [20, 1550, 1000, 1000],
              width: 150,
              height: 150,
            }}
            selected={item.uid === selectedDeck?.uid}
            onClick={() => setDeck(item)}
          >
            {item.uid?.replace('/-/g', ' ')}
          </Option>
        ))}
      </Options>

      <Options title="Wheels" selectedName={selectedWheel?.uid}>
        {wheels.map((item) => (
          <Option
            key={item.uid}
            imageField={item.texture}
            imgixParams={{
              rect: [20, 10, 850, 850],
              width: 150,
              height: 150,
            }}
            selected={item.uid === selectedWheel?.uid}
            onClick={() => setWheel(item)}
          >
            {item.uid?.replace('/-/g', ' ')}
          </Option>
        ))}
      </Options>

      <Options title="Trucks" selectedName={selectedTruck?.uid}>
        {metals.map((item) => (
          <Option
            key={item.uid}
            colorField={item.color}
            selected={item.uid === selectedTruck?.uid}
            onClick={() => setTruck(item)}
          >
            {item.uid?.replace('/-/g', ' ')}
          </Option>
        ))}
      </Options>

      <Options title="Bolts" selectedName={selectedBolt?.uid}>
        {metals.map((item) => (
          <Option
            key={item.uid}
            colorField={item.color}
            selected={item.uid === selectedBolt?.uid}
            onClick={() => setBolt(item)}
          >
            {item.uid?.replace('/-/g', ' ')}
          </Option>
        ))}
      </Options>
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
  onClick: () => void;
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
  onClick,
}: OptionProps) {
  return (
    <button
      className={clsx(
        'size-10 cursor-pointer rounded-full bg-black outline-2 outline-white',
        selected && 'outline'
      )}
      onClick={onClick}
    >
      {imageField ? (
        <PrismicNextImage
          field={imageField}
          className="pointer-events-none h-full w-full rounded-full"
          alt=""
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
