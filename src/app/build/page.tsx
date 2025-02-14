import { ButtonLink } from '@/components/ButtonLink';
import { Heading } from '@/components/Heading';
import { Logo } from '@/components/Logo';
import Link from 'next/link';
import React from 'react';

type Props = {};

async function Page({}: Props) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
        <Link href="/" className="absolute left-6 top-6">
          <Logo className="h-12 text-white" />
        </Link>
      </div>
      <div className="grow bg-texture bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
        <Heading as="h3" size="sm" className="mb-6 mt-0">
          Build your board
        </Heading>

        <Heading as="h4" size="xs">
          Deck |
        </Heading>

        <Heading as="h4" size="xs">
          Wheels |
        </Heading>

        <Heading as="h4" size="xs">
          Trucks |
        </Heading>

        <Heading as="h4" size="xs">
          Bolts |
        </Heading>

        <ButtonLink href="/" color="lime" icon="plus">
          Add to Cart
        </ButtonLink>
      </div>
    </div>
  );
}

export default Page;
