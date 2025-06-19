import { Section } from '@/app/components/sections/section';
import Image from 'next/image';

export function ProjectsSection() {
  return (
    <Section className="flex flex-col items-center justify-center" id="projects">
      <div className="w-full flex items-start justify-start">
        <h1 className="font-grand-slang text-[80px] md:text-[200px] pb-0 md:pb-5">Projects</h1>
      </div>
      <section className="h-[calc(100vh-64px)] w-full">
        <div className="w-full grid grid-cols-1 gap-x-5 lg:grid-cols-3">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-3xl md:text-5xl pb-0 md:pb-5 font-grand-slang">
              Find a good quote here
            </h2>
            <br />
            <p
              style={{ lineHeight: '1.9rem', letterSpacing: '.5px', opacity: 0.85 }}
              className="font-montserrat tracking-[0.5px] max-w-max md:max-w-4/5 font-light"
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam culpa quod consequatur
              accusantium eum necessitatibus placeat odio esse voluptates non velit assumenda
              blanditiis voluptate repudiandae, perferendis autem? Commodi, odit eius.
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dignissimos quaerat
              recusandae exercitationem, facilis sapiente officia provident numquam officiis dolore
              molestias eum, consequatur suscipit modi. Amet ad atque velit placeat! Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Itaque non culpa voluptatem ducimus
              dolores atque earum sit officia minus ratione aliquid velit possimus minima, eveniet
              voluptates, natus id rem similique!
              <br />
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, accusantium recusandae
              excepturi ducimus soluta, officia quae neque iste autem esse eaque optio sapiente
              nesciunt nulla debitis veniam distinctio necessitatibus possimus!
            </p>
          </div>
          <div className="col-span-1">
            <Image
              src="/images/placeholder-500x500.png"
              alt="Lukas Schwab"
              width={500}
              height={500}
            />
          </div>
        </div>
      </section>
    </Section>
  );
}
