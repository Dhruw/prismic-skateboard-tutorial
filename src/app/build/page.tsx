import { ButtonLink } from '@/components/ButtonLink';
import { Heading } from '@/components/Heading';
import { Logo } from '@/components/Logo';
import Link from 'next/link';
import React from 'react';
import { CustomizerControlProvider } from './context';
import { createClient } from '@/prismicio';
import Preview from './Preview';
import { asImageSrc } from '@prismicio/client';
import Controls from './Controls';

type Props = {};

async function Page({}: Props) {
  const client = createClient();
  const customiserSettings = await client.getSingle('board_customizer');
  const { wheels, decks, metals } = customiserSettings.data;

  const defaultWheel = wheels[0];
  const defaultDeck = decks[0];
  const defaultBolt = metals[0];
  const defaultTruck = metals[0];

  const wheelTextureUrls = wheels
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));

  const deckTextureUrls = decks
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));

  return (
    <CustomizerControlProvider
      defaultWheel={defaultWheel}
      defaultDeck={defaultDeck}
      defaultBolt={defaultBolt}
      defaultTruck={defaultTruck}
    >
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
          <Preview
            wheelTextureUrls={wheelTextureUrls}
            deckTextureUrls={deckTextureUrls}
          />
          <Link href="/" className="absolute left-6 top-6">
            <Logo className="h-12 text-white" />
          </Link>
        </div>
        <div className="grow bg-texture bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
          <Heading as="h3" size="sm" className="mb-6 mt-0">
            Build your board
          </Heading>

          <Controls
            wheels={wheels}
            decks={decks}
            metals={metals}
            className="mb-6"
          />

          <ButtonLink href="/" color="lime" icon="plus">
            Add to Cart
          </ButtonLink>
        </div>
      </div>
    </CustomizerControlProvider>
  );
}

export default Page;
