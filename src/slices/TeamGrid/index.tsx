import { Bounded } from '@/components/Bounded';
import { Heading } from '@/components/Heading';
import { createClient } from '@/prismicio';
import { Content } from '@prismicio/client';
import { PrismicText, SliceComponentProps } from '@prismicio/react';
import { FC } from 'react';
import Skater from './Skater';

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid: FC<TeamGridProps> = async ({ slice }) => {
  const client = createClient();

  const skaters: Content.SkaterDocument[] = await client.getAllByType('skater');
  console.log('skaters', skaters);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy"
    >
      <Heading className="mb-8 text-center text-white" as="h2">
        <PrismicText field={slice.primary.heading} />
      </Heading>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {skaters.map((skater, index) => (
          <Skater skater={skater} key={skater.data.first_name} index={index} />
        ))}

        {/* // {skaters.map((skater, index) => {
        //   <div key={skater.data.uid}>
        //     {skater.data.first_name}
        //     {skater.data.last_name}
        //     {skater.data.uid}
        //     <PrismicNextImage field={skater.data.photo_background} />
        //     <PrismicNextImage field={skater.data.photo_foreground} />
        //     <PrismicNextLink field={skater.data.customizer_link} />
        //   </div>;
        // })} */}
      </div>
    </Bounded>
  );
};

export default TeamGrid;
