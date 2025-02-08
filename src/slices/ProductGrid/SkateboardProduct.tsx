import { ButtonLink } from '@/components/ButtonLink';
import { createClient } from '@/prismicio';
import { Content, isFilled } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { HorizontalLine, VerticalLine } from '@/components/Line';
import clsx from 'clsx';
import { Scribble } from './Scribble';

type Props = {
  id: string;
};

const VERTICAL_LINE_CLASSES =
  'absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400:';

const HORIZONTAL_LINE_CLASSES =
  '-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400:';

async function getDominantColor(url: string) {
  const paletteURL = new URL(url);
  paletteURL.searchParams.set('palette', 'json');
  const res = await fetch(paletteURL);
  const json = await res.json();

  console.log(
    json.dominant_colors.vibrant.hex || json.dominant_colors.vibrant.hex
  );
  return json.dominant_colors.vibrant.hex || json.dominant_colors.vibrant.hex;
}

const SkateboardProduct = async ({ id }: Props) => {
  const client = createClient();
  const product = await client.getByID<Content.SkateboardDocument>(id);

  const price = isFilled.number(product.data.price)
    ? `$${(product.data.price / 100).toFixed(2)}`
    : 'Price not available';

  const dominantColor = isFilled.image(product.data.skateboard_image)
    ? await getDominantColor(product.data.skateboard_image.url)
    : '#f00';
  return (
    <div className="group relative mx-auto w-full max-w-72 px-8 pt-4">
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, 'left-4')} />
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, 'right-4')} />
      <HorizontalLine className={clsx(HORIZONTAL_LINE_CLASSES, '')} />
      <div className="flex items-center justify-between ~text-sm/2xl">
        <span>{price}</span>
        <div className="inline-flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          37
        </div>
      </div>
      <div className="-mb-1 overflow-hidden py-4">
        <Scribble
          className="absolute bottom-0 inset-0 h-full w-full "
          color={dominantColor}
        />
        <PrismicNextImage
          field={product.data.skateboard_image}
          alt=""
          className="mx-auto w-[58%] origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150"
        />
      </div>
      <HorizontalLine className={clsx(HORIZONTAL_LINE_CLASSES, '')} />
      <h3 className="my-2 text-center font-sans leading-tight ~text-lg/xl">
        {product.data.name}
      </h3>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <ButtonLink field={product.data.customizer}>Customize</ButtonLink>
      </div>
    </div>
  );
};

export default SkateboardProduct;
