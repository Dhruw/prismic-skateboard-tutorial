import { FC } from 'react';
import { Content } from '@prismicio/client';
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from '@prismicio/react';
import { Bounded } from '@/components/Bounded';
import { Heading } from '@/components/Heading';
import clsx from 'clsx';
import { ButtonLink } from '@/components/ButtonLink';
import ParallaxImage from './ParallaxImage';

/**
 * Props for `TextAndImage`.
 */
export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

declare module 'react' {
  interface CSSProperties {
    '--index'?: number;
  }
}
/**
 * Component for "TextAndImage" Slices.
 */
const TextAndImage: FC<TextAndImageProps> = ({ slice, index }) => {
  let bgcolor = '';
  let buttonColor: 'orange' | 'purple' | 'lime' = 'lime';
  let textColor = 'text-white';

  switch (slice.primary.theme) {
    case 'Blue':
      bgcolor = 'bg-brand-blue';
      break;
    case 'Orange':
      bgcolor = 'bg-brand-orange';
      break;
    case 'Navy':
      bgcolor = 'bg-brand-navy';
      break;
    case 'Lime':
      bgcolor = 'bg-brand-lime';
      buttonColor = 'orange';
      textColor = 'text-slate-800';
      break;
    default:
      bgcolor = 'bg-brand-gray';
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        'sticky top-[calc(var(--index)*2rem)]',
        'bg-texture',
        textColor,
        bgcolor
      )}
      style={{ '--index': index }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center md:gap-24">
        <div
          className={clsx(
            'flex flex-col gap-8 items-center text-center md:items-start md:text-left',
            slice.variation === 'imageOnLeft' && 'md:order-2'
          )}
        >
          <Heading as="h2">
            <PrismicText field={slice.primary.heading} />
          </Heading>
          <div className="max-w-md text-lg leading-relaxed">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <div>
            <ButtonLink field={slice.primary.button} color={buttonColor}>
              {slice.primary.button.text}
            </ButtonLink>
          </div>
        </div>
        <ParallaxImage
          foregorundImage={slice.primary.forground_image}
          backgroundImage={slice.primary.background_image}
          className=""
        />
      </div>
    </Bounded>
  );
};

export default TextAndImage;
