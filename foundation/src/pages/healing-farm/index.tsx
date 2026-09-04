import {
  CircleCheck,
  CookingPot,
  HeartHandshake,
  Leaf,
  MapPin,
  Sparkles,
  Sprout,
  Truck,
  Utensils,
  Wheat,
} from 'lucide-react';
import Link from 'next/link';

import Footer from '@/components/Footer';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/Navbar';
import PhotoFrame from '@/components/Photo';
import Section, { Band } from '@/components/Section';
import Seo from '@/components/Seo';

/**
 * Photographs are named, not indexed.
 *
 * This page used to pick its pictures out of a 21-entry array by position —
 * `galleryImages[10]`, `galleryImages[14]` — and two of those entries
 * (`lionsmane.png`, `photo-3-elba-farm.jpeg`) name files that are not in the
 * repository, so the page rendered a broken-image glyph and no reader of the
 * source could tell which picture a number was supposed to be. Every file below
 * exists under `public/images/healing-farm/`.
 */
const PHOTO = {
  hero: 'biodynamic-med-herbfarm.jpg',
  mission: 'nourish.jpg.webp',
  harvest: 'harvest.jpg',
  cooking: 'thai-farm-chiang-mai-cooking-6.jpg',
  herbs: 'meraki-meadows-saffron.jpg',
  ingredients:
    'a-colorful-display-of-fresh-ingredients-for-healthier-meals-on-a-gray-background-photo.jpeg',
  turmeric: 'massive-turmeric-root-1080x1080.png.webp',
} as const;

const RAIL = [
  '0a80ba4e623eaa8e596dba76de89e4fe.avif',
  'medium_fe55034e_74b1_4a07_8fbe_ec2debafc133_plantsguru_com_medicinal_plants_acmella_800x800_b8fc25655f.jpg',
  'regenerative_herb_farm_row_with_solar_panels_for_water_pumps.webp',
  'thai-farm-chiang-mai-cooking-6.jpg',
];

const src = (file: string) => encodeURI(`/images/healing-farm/${file}`);

const caption = (file: string) =>
  file
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_+]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const PILLARS = [
  {
    icon: Leaf,
    title: 'Access',
    body: 'Delivering fresh, nourishing meals and making real food affordable and accessible to all people.',
  },
  {
    icon: Sprout,
    title: 'The farm',
    body: 'Land acquisition for a permanent healing farm cultivating medicinal mushrooms, adaptogenic herbs, rare spices and nutrient-dense vegetables.',
  },
  {
    icon: HeartHandshake,
    title: 'Community',
    body: 'Education and outreach that teach holistic diet, gardening and self-sustaining food practices.',
  },
];

const STEPS = [
  {
    icon: Wheat,
    step: '01',
    title: 'The farm grows',
    body: 'Medicinal and nutrient-dense crops are grown in hyperlocal vertical and community farms, just miles from your door.',
  },
  {
    icon: Utensils,
    step: '02',
    title: 'We cook',
    body: 'Our chefs design dishes around each week’s harvest, balancing flavour, comfort and nutrition into meals you’ll actually crave.',
  },
  {
    icon: Truck,
    step: '03',
    title: 'You enjoy',
    body: 'Ready-to-heat meals arrive at your door, turning “food as medicine” into something you can actually stick with.',
  },
];

const EXPECT = [
  'Rotating menus based on what’s in season',
  'Medicinal-forward ingredients, no fuss',
  'Clear sourcing from our nonprofit partner farm',
];

const TAX = '100% tax deductible via The Zoolabs Foundation (501(c)(3)). EIN #883538992.';

function Photo({
  file,
  alt,
  ratio,
  className,
}: {
  file: string;
  alt: string;
  ratio?: string;
  className?: string;
}) {
  return <PhotoFrame src={src(file)} alt={alt} ratio={ratio} className={className} />;
}

function Quiet({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-sm leading-relaxed' style={{ color: 'var(--muted-foreground)' }}>
      {children}
    </p>
  );
}

export default function HealingFarm() {
  return (
    <Layout>
      <Seo
        templateTitle='Regenerative Healing Farm'
        description='Zoo Labs Foundation is launching a regenerative healing farm to grow nutrient-dense and medicinal foods, restore ecosystems, and expand real food access for underserved communities.'
      />
      <Navbar />

      {/* Hero — the same anatomy the homepage uses: eyebrow, claim, one
        * sentence, the actions, and the photograph on a plate beside them. */}
      <section
        style={{
          borderBottom: '1px solid var(--border)',
          paddingBlock: 'clamp(3rem, 8vw, 6rem)',
        }}
      >
        <Band>
          <div className='grid items-center gap-12 lg:grid-cols-12'>
            <div className='flex flex-col items-start lg:col-span-7'>
              <p className='eyebrow mb-5'>Zoo Labs Foundation · 501(c)(3)</p>
              <h1 className='display mb-6'>Regenerative healing farm</h1>
              <p className='lede mb-8' style={{ maxWidth: '38rem' }}>
                Zoo Labs Foundation is launching a regenerative healing farm to grow
                nutrient-dense and medicinal foods, restore ecosystems, and expand real
                food access for underserved communities.
              </p>
              <div className='flex flex-wrap items-center gap-3'>
                <a
                  href='mailto:hello@zoo.ngo?subject=Partner%20with%20Zoo%20Labs%20Foundation'
                  className='action'
                  data-fill=''
                >
                  Partner with us
                </a>
                <Link href='/donation/farm' className='action'>
                  Donate
                </Link>
              </div>
              <p className='mt-8 text-[13px]' style={{ color: 'var(--muted-foreground)' }}>
                {TAX}
              </p>
              <p
                className='mt-2 flex items-center gap-2 text-[13px]'
                style={{ color: 'var(--muted-foreground)' }}
              >
                <MapPin className='h-4 w-4' aria-hidden />
                The Zoolabs Foundation · San Francisco, California
              </p>
            </div>

            <div className='lg:col-span-5'>
              <Photo
                file={PHOTO.hero}
                alt='Rows of medicinal herbs growing on a biodynamic farm'
                ratio='1 / 1'
                className='mx-auto max-w-md lg:max-w-none'
              />
            </div>
          </div>
        </Band>
      </section>

      {/* Pillars */}
      <Section tone='card' edge='block'>
        <div className='grid gap-6 md:grid-cols-3'>
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <div key={title} className='card space-y-4 p-6'>
              <Icon className='h-6 w-6' style={{ color: 'var(--brand)' }} aria-hidden />
              <h3 className='text-lg font-semibold'>{title}</h3>
              <Quiet>{body}</Quiet>
            </div>
          ))}
        </div>
      </Section>

      {/* Mission */}
      <Section>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <Photo file={PHOTO.mission} alt='Regenerative herb farm rows' />
          <div className='space-y-6'>
            <p className='eyebrow'>Mission</p>
            <h2 className='title'>Nourishment as a human right</h2>
            <p className='lede'>
              Zoo Labs Foundation is building the ZooLabs Sanctuary &amp; Regenerative
              Healing Farm to produce nutrient-dense and medicinal foods, restore
              ecosystems, and expand food sovereignty for underserved households.
            </p>
            <Quiet>
              The farm’s crops support longevity, immune resilience and whole-body wellness
              while being grown using regenerative practices that rebuild soil and protect
              biodiversity.
            </Quiet>
            <div className='card space-y-3 p-6'>
              <p className='flex items-center gap-2 text-sm font-semibold'>
                <Sparkles className='h-4 w-4' aria-hidden />
                Project focus
              </p>
              <Quiet>Secure and steward land for permanent healing farm operations.</Quiet>
              <Quiet>
                Grow medicinal mushrooms, adaptogenic herbs, rare spices and nutrient-dense
                vegetables.
              </Quiet>
              <Quiet>
                Distribute food through meal partnerships serving food-insecure households.
              </Quiet>
            </div>
          </div>
        </div>
      </Section>

      {/* Farm to fork */}
      <Section tone='card' edge='block'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <div className='space-y-6'>
            <p className='eyebrow'>From farm to fork</p>
            <h2 className='title'>Farm-fresh medicinal meals</h2>
            <p className='lede'>
              We’ve teamed up with Zoo Labs Foundation to create a healing farm that brings
              you true farm-to-table meals — cooked with medicinal, nutrient-dense
              ingredients grown right here in the Bay Area.
            </p>
            <Quiet>
              Our partner farm grows medicinal herbs, greens and specialty crops chosen for
              everyday wellness and long-term health. We build our menus around their
              harvests, so your meals are as fresh and seasonal as it gets.
            </Quiet>
          </div>
          <Photo file={PHOTO.harvest} alt='A farm-to-table harvest' />
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <div className='mx-auto mb-12 max-w-2xl space-y-3 text-center'>
          <p className='eyebrow'>The process</p>
          <h2 className='title'>How it works</h2>
        </div>
        <div className='grid gap-6 md:grid-cols-3'>
          {STEPS.map(({ icon: Icon, step, title, body }) => (
            <div key={step} className='card space-y-4 p-6'>
              <Icon className='h-6 w-6' style={{ color: 'var(--brand)' }} aria-hidden />
              <p className='text-sm font-medium' style={{ color: 'var(--muted-foreground)' }}>
                {step}
              </p>
              <h3 className='text-lg font-semibold'>{title}</h3>
              <Quiet>{body}</Quiet>
            </div>
          ))}
        </div>
      </Section>

      {/* Chef partnership */}
      <Section tone='card' edge='block'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <div className='space-y-6'>
            <p className='eyebrow'>Chef partnership</p>
            <h2 className='title'>Healing meals, serving all</h2>
            <p className='lede'>
              Zoo Labs Foundation donates chef time to prepare healthy, healing and
              medicinal meals for community distribution, ensuring real food reaches the
              people who need it most.
            </p>
            <div className='grid gap-6 sm:grid-cols-2'>
              <div className='card space-y-3 p-6'>
                <p className='text-sm font-semibold'>Meal access</p>
                <Quiet>
                  Partnerships with local organisations let us serve food-insecure families
                  with consistent, nutrient-dense meals.
                </Quiet>
              </div>
              <div className='card space-y-3 p-6'>
                <p className='text-sm font-semibold'>Healing cuisine</p>
                <Quiet>
                  Menus emphasise medicinal ingredients and restorative cooking techniques
                  inspired by holistic traditions.
                </Quiet>
              </div>
            </div>
          </div>
          <Photo file={PHOTO.cooking} alt='Cooking and food preparation on the farm' />
        </div>
      </Section>

      {/* Good for you, good for the city */}
      <Section>
        <div className='card mx-auto max-w-3xl space-y-4 p-10 text-center md:p-14'>
          <h2 className='title'>Good for you, good for the city</h2>
          <p className='lede'>
            Every farm-to-table order helps fund subsidised produce and prepared meals for
            low-income and medically at-risk neighbours. When you eat better, someone else
            can too.
          </p>
        </div>
      </Section>

      {/* Education */}
      <Section tone='card' edge='block'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <Photo file={PHOTO.herbs} alt='Herbs and healing crops' />
          <div className='space-y-6'>
            <p className='eyebrow'>Education</p>
            <h2 className='title'>Community-led learning</h2>
            <p className='lede'>
              Practical workshops on nutrient-dense cooking, herbal foods and
              longevity-focused diets that are culturally grounded and community-led.
            </p>
            <div className='grid gap-6 sm:grid-cols-2'>
              <div className='card space-y-3 p-6'>
                <p className='flex items-center gap-2 text-sm font-semibold'>
                  <CookingPot className='h-4 w-4' aria-hidden />
                  Food literacy
                </p>
                <Quiet>
                  Hands-on guidance for families to cook healing meals and integrate
                  medicinal foods.
                </Quiet>
              </div>
              <div className='card space-y-3 p-6'>
                <p className='flex items-center gap-2 text-sm font-semibold'>
                  <Sprout className='h-4 w-4' aria-hidden />
                  Self-sustaining farming
                </p>
                <Quiet>
                  Teaching neighbours to plant, steward soil and grow their own food for
                  long-term resilience.
                </Quiet>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* What to expect + the order card */}
      <Section>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          <div className='space-y-6'>
            <p className='eyebrow'>What to expect</p>
            <h2 className='title'>Your farm-to-table box</h2>
            <div className='space-y-4'>
              {EXPECT.map((line) => (
                <div key={line} className='flex items-start gap-3'>
                  <CircleCheck
                    className='mt-0.5 h-5 w-5 shrink-0'
                    style={{ color: 'var(--brand)' }}
                    aria-hidden
                  />
                  <p style={{ color: 'var(--muted-foreground)' }}>{line}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='card space-y-6 p-8 md:p-10'>
            <h3 className='text-2xl font-semibold tracking-tight'>
              Try our farm-to-table meals
            </h3>
            <p className='lede'>
              Choose the farm-to-table option at checkout to fill your box with dishes built
              around the latest harvest.
            </p>
            <Quiet>
              Make a charitable donation to the farm project and you will be eligible for a
              tax-deductible donation.
            </Quiet>
            <div className='flex flex-wrap items-center gap-3'>
              <span className='action' aria-disabled='true' style={{ opacity: 0.55 }}>
                Order farm fresh — coming soon
              </span>
              <Link href='/donation/farm' className='action' data-fill=''>
                Donate to the farm
              </Link>
            </div>
            <p className='text-[13px]' style={{ color: 'var(--muted-foreground)' }}>
              {TAX}
            </p>
          </div>
        </div>
      </Section>

      {/* Crowdfund */}
      <Section tone='card' edge='block'>
        <div className='card mx-auto max-w-3xl space-y-5 p-10 text-center md:p-14'>
          <h2 className='title'>Crowdfund the farm</h2>
          <p className='lede'>
            Support the regenerative healing farm through our decentralised crowdfunding
            platform. Every contribution helps us acquire land, build infrastructure and
            grow healing foods for those who need it most.
          </p>
          <div className='flex justify-center'>
            <a
              href='https://zoo.fund'
              target='_blank'
              rel='noopener noreferrer'
              className='action'
            >
              Visit Zoo Fund <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section>
        <div className='mb-10 max-w-3xl space-y-3'>
          <p className='eyebrow'>The regenerative vision</p>
          <h2 className='title'>Field to healing table</h2>
          <p className='lede'>
            A visual look at the ingredients, farms and regenerative practices behind the
            Zoo Labs Foundation mission — the healing foods, medicinal herbs and
            community-centred growing practices we are building together.
          </p>
        </div>
        <div className='grid gap-6 sm:grid-cols-2'>
          <Photo file={PHOTO.ingredients} alt='Fresh ingredients laid out for a meal' />
          <Photo file={PHOTO.turmeric} alt='Freshly harvested turmeric root' />
        </div>
        <div className='mt-6 grid grid-cols-2 gap-6 md:grid-cols-4'>
          {RAIL.map((file) => (
            <Photo key={file} file={file} alt={caption(file)} ratio='1 / 1' />
          ))}
        </div>
      </Section>

      {/* Join the movement */}
      <Section tone='card' edge='top'>
        <div className='max-w-2xl space-y-6'>
          <h2 className='title'>Join the movement</h2>
          <p className='lede'>
            Support land acquisition, chef-led meal distribution and community education.
            Together we can make fresh food a shared standard and help the next generation
            thrive.
          </p>
          <div className='flex flex-wrap items-center gap-3'>
            <a
              href='mailto:hello@zoo.ngo?subject=Volunteer%20opportunities'
              className='action'
              data-fill=''
            >
              Volunteer or collaborate
            </a>
            <Link href='/donation/farm' className='action'>
              Donate or sponsor
            </Link>
          </div>
        </div>
      </Section>

      <Footer />
    </Layout>
  );
}
