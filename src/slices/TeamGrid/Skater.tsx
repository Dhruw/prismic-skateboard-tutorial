import { ButtonLink } from '@/components/ButtonLink';
import { PrismicNextImage } from '@prismicio/next';
import { Content } from '@prismicio/client';
import { SkaterScribble } from './SkaterScribble';
import clsx from 'clsx';

type Props = {
  skater: Content.SkaterDocument;
  index: number;
};

function Skater({ skater, index }: Props) {
  const colors = [
    'text-brand-blue ',
    'text-brand-pink ',
    'text-brand-purple ',
    'text-brand-lime ',
    'text-brand-navy',
  ];
  return (
    <div className="group grid grid-cols-1 gap-4">
      <div className="skater stack-layout overflow-hidden">
        <PrismicNextImage
          alt=""
          field={skater.data.photo_background}
          width={500}
          imgixParams={{ q: 20 }}
          className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 brightness-75 group-hover:saturate-[0.8]"
        />
        <SkaterScribble className={clsx('relative', colors[index])} />
        <PrismicNextImage
          alt=""
          field={skater.data.photo_foreground}
          width={500}
          className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
        />
        <div className="relative h-48 w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <h3 className="relative grid place-self-end justify-self-start p-2 font-sans text-brand-gray ~text-2xl/3xl">
          <span className="mb-[0.3em]">{skater.data.first_name}</span>
          <span className="block">{skater.data.last_name}</span>
        </h3>
      </div>
      {/* <div className="col-start-1 row-start-1">
        <PrismicNextImage
          alt=""
          field={skater.data.photo_background}
          width={500}
          imgixParams={{ q: 20 }}
          className=""
        />
      </div> */}
      {/* <div className="col-start-1 row-start-1 relative">
        <PrismicNextImage
          alt=""
          field={skater.data.photo_foreground}
          width={500}
        />
        <div className="absolute bottom-1 left-1 right-1 text-white">
          <Heading as="h3" size="sm">
            {skater.data.first_name}
          </Heading>
          <Heading as="h3" size="sm">
            {skater.data.last_name}
          </Heading>
        </div>
      </div> */}
      <div className="flex justify-center">
        <ButtonLink field={skater.data.customizer_link} size="sm">
          {skater.data.customizer_link.text}
        </ButtonLink>
      </div>
    </div>
  );
}

export default Skater;
