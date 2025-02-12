import { createClient } from '@/prismicio';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import React from 'react';
import { Logo } from '@/components/Logo';
import { Bounded } from './Bounded';
import { FooterPhysics } from './FooterPhysics';
import { asImageSrc } from '@prismicio/client';


async function Footer() {
  const client = createClient();

  const settings = await client.getSingle('settings');

  const boardTextureUrls = settings.data.footer_skateboards
    .map((item) => asImageSrc(item.skateboard, { h: 600 }))
    .filter((url): url is string => Boolean(url));
  return (
    <footer className="bg-texture bg-zinc-900 text-white overflow-hidden">
      <div className="relative h-[75vh] ~p-10/16 md:aspect-auto">
        <PrismicNextImage
          field={settings.data.footer_image}
          alt=""
          fill
          className="object-cover"
          width={1200}
        />
        <Logo className="pointer-events-none h-20 relative mix-blend-exclusion md:h-28" />
        {/* Physics Boards */}
        <FooterPhysics
          boardTextureURLs={boardTextureUrls}
          className="absolute inset-0 overflow-hidden"
        />
      </div>
      <Bounded as="nav" className="">
        <ul className="flex flex-wrap justify-center gap-8 ~text-lg/xl">
          {settings.data.navigation.map((item) => (
            <li key={item.link.text} className="hover:underline">
              <PrismicNextLink field={item.link} className="~text-lg/xl" />
            </li>
          ))}
        </ul>
      </Bounded>
      {/* List of Links */}
    </footer>
  );
}

export default Footer;
