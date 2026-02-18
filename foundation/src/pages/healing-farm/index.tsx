import Link from 'next/link';
import { Leaf, Sprout, HeartHandshake, MapPin, Sparkles, CookingPot, Wheat, Utensils, Truck, CircleCheck, Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const galleryImages = [
  '0a80ba4e623eaa8e596dba76de89e4fe.avif',
  '628753905.jpg',
  'a-colorful-display-of-fresh-ingredients-for-healthier-meals-on-a-gray-background-photo.jpeg',
  'Barebones+x+SXSW+-+Field+and+Fire+-+Caroline+Hargraves+Photography+-+Ardor+Wood+Farm+-+March+2019-440-Caroline+Hargraves+Photography.jpg.webp',
  'biodynamic-med-herbfarm.jpg',
  'c7236d65-31_history-fam-table-movement_01-hero.jpg',
  'Cocoa_Pods.JPG',
  'Four_Types_Of_Cinnamon.jpg.webp',
  'img_20190607_100442706_hdr_1.jpg.webp',
  'lemongrass-1.avif',
  'lionsmane.png',
  'massive-turmeric-root-1080x1080.png.webp',
  'medium_c1cea3e5_d68d_4d47_a05d_eec7098bc238_istock_master1305_527631473_0ee839c579.jpg',
  'medium_fe55034e_74b1_4a07_8fbe_ec2debafc133_plantsguru_com_medicinal_plants_acmella_800x800_b8fc25655f.jpg',
  'meraki-meadows-saffron.jpg',
  'photo-3-elba-farm.jpeg',
  'regenerative_herb_farm_row_with_solar_panels_for_water_pumps.webp',
  'Rochelle-Bilow.Photo-by-Anthony-Aquino..jpg.webp',
  'SummerTimes-Lavender-Farms-New-Life_crLauraMcReynolds-06052025.jpg',
  'thai-farm-chiang-mai-cooking-6.jpg',
  'what-does-farm-to-table-mean.jpg.webp',
];

export default function HealingFarm() {
  const imageUrl = (filename: string) => encodeURI(`/images/healing-farm/${filename}`);

  const heroImage = 'healingfarm.jpg';
  const farmImage = 'nourish.jpg.webp';
  const herbImage = galleryImages[14];
  const mushroomImage = galleryImages[10];
  const cookingImage = galleryImages[19];
  const ingredientsImage = galleryImages[2];

  const imageRail = [
    galleryImages[0],
    galleryImages[13],
    galleryImages[16],
    galleryImages[19],
  ];

  return (
    <Layout>
      <Seo
        templateTitle="Regenerative Healing Farm"
        description="Zoo Labs Foundation is launching a regenerative healing farm to grow nutrient-dense and medicinal foods, restore ecosystems, and expand real food access for underserved communities."
      />
      <Navbar />

      <main className="pt-28 pb-28 space-y-24 bg-black text-white">
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundImage: `url(${imageUrl(heroImage)})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_55%)]" />

          <div className="container mx-auto px-6 max-w-6xl relative">
            <div className="min-h-[560px] md:min-h-[640px] flex items-center">
              <div className="max-w-2xl space-y-8 text-white">
                <p className="text-xs tracking-[0.5em] text-white/80">ZOO LABS FOUNDATION</p>
                <h1 className="font-semibold text-4xl md:text-6xl tracking-[0.12em] text-white">
                  REGENERATIVE HEALING FARM
                </h1>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                  Zoo Labs Foundation is launching a regenerative healing farm to grow nutrient-dense and medicinal foods,
                  restore ecosystems, and expand real food access for underserved communities.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:hello@zoo.ngo?subject=Partner%20with%20Zoo%20Labs%20Foundation"
                    className="inline-flex items-center justify-center rounded-full bg-white text-black hover:bg-white/90 px-8 py-3 text-lg font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    Partner with Us
                  </a>
                  <Link
                    href="/donation/farm"
                    className="group relative overflow-hidden inline-flex items-center justify-center rounded-full bg-black/80 text-white hover:text-black px-8 py-3 text-lg font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    <span className="absolute inset-0 -z-10 translate-x-[-110%] bg-gradient-to-r from-amber-200 via-emerald-200 to-sky-200 transition-transform duration-200 group-hover:translate-x-0" />
                    <span className="relative">Donate</span>
                  </Link>
                </div>
                <p className="text-xs text-white/70">
                  100% tax deductible via The Zoolabs Foundation (501(c)(3)). EIN #883538992.
                </p>
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <MapPin className="h-4 w-4" />
                  <span>The Zoolabs Foundation &bull; San Francisco, California</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="p-8 rounded-[28px] border border-gray-800 bg-white/5 space-y-4 my-12">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <h3 className="text-lg tracking-[0.12em]">ACCESS</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Delivering fresh, nourishing meals and making real food affordable and accessible to all people.
              </p>
            </div>
            <div className="p-8 rounded-[28px] border border-gray-800 bg-white/5 space-y-4 my-12">
              <Sprout className="h-8 w-8 text-amber-400" />
              <h3 className="text-lg tracking-[0.12em]">THE FARM</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Land acquisition for a permanent healing farm cultivating medicinal mushrooms, adaptogenic herbs,
                rare spices, and nutrient-dense vegetables.
              </p>
            </div>
            <div className="p-8 rounded-[28px] border border-gray-800 bg-white/5 space-y-4 my-12">
              <HeartHandshake className="h-8 w-8 text-sky-400" />
              <h3 className="text-lg tracking-[0.12em]">COMMUNITY</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Education and outreach that teach holistic diet, gardening, and self-sustaining food practices.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-16 items-center">
            <div className="rounded-[32px] overflow-hidden border border-gray-800 bg-white/5">
              <img
                src={imageUrl(farmImage)}
                alt="Regenerative herb farm rows"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-6">
              <p className="text-xs tracking-[0.4em] text-gray-400">MISSION</p>
              <h2 className="text-3xl md:text-4xl tracking-[0.12em]">NOURISHMENT AS A HUMAN RIGHT</h2>
              <p className="text-gray-400 leading-relaxed">
                Zoo Labs Foundation is building the ZooLabs Sanctuary &amp; Regenerative Healing Farm to produce nutrient-dense and
                medicinal foods, restore ecosystems, and expand food sovereignty for underserved households.
              </p>
              <p className="text-gray-400 leading-relaxed">
                The farm&apos;s crops support longevity, immune resilience, and whole-body wellness while being grown
                using regenerative practices that rebuild soil and protect biodiversity.
              </p>
              <div className="rounded-[24px] border border-gray-800 bg-white/5 p-6 space-y-3 my-12">
                <div className="flex items-center gap-3 text-white">
                  <Sparkles className="h-5 w-5" />
                  <p className="text-xs tracking-[0.25em]">PROJECT FOCUS</p>
                </div>
                <div className="space-y-3 text-sm text-gray-400">
                  <p>Secure and steward land for permanent healing farm operations.</p>
                  <p>Grow medicinal mushrooms, adaptogenic herbs, rare spices, and nutrient-dense vegetables.</p>
                  <p>Distribute food through meal partnerships serving food-insecure households.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Farm-Fresh Medicinal Meals */}
        <section className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
            <div className="space-y-6">
              <p className="text-xs tracking-[0.4em] text-gray-400">FROM FARM TO FORK</p>
              <h2 className="text-3xl md:text-4xl tracking-[0.12em]">FARM&#8209;FRESH MEDICINAL MEALS</h2>
              <p className="text-gray-400 leading-relaxed">
                We&apos;ve teamed up with Zoo Labs Foundation to create a healing farm that brings you
                true farm&#8209;to&#8209;table meals&mdash;cooked with medicinal, nutrient&#8209;dense ingredients grown right here in the Bay Area.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our partner farm grows medicinal herbs, greens, and specialty crops chosen for everyday wellness
                and long&#8209;term health. We build our menus around their harvests so your meals are as fresh and seasonal
                as it gets.
              </p>
            </div>
            <div className="rounded-[32px] overflow-hidden border border-gray-800 bg-white/5">
              <img
                src={imageUrl('harvest.jpg')}
                alt="Farm to table harvest"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-6 text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs tracking-[0.4em] text-gray-400">THE PROCESS</p>
            <h2 className="text-3xl md:text-4xl tracking-[0.12em]">HOW IT WORKS</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-16">
            <div className="p-8 rounded-[28px] border border-gray-800 bg-white/5 space-y-4 my-12">
              <Wheat className="h-8 w-8 text-amber-400" />
              <p className="text-sm tracking-[0.2em] text-gray-400">01</p>
              <h3 className="text-lg tracking-[0.12em]">THE FARM GROWS</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Medicinal and nutrient&#8209;dense crops are grown in hyperlocal vertical and community farms, just miles
                from your door.
              </p>
            </div>
            <div className="p-8 rounded-[28px] border border-gray-800 bg-white/5 space-y-4 my-12">
              <Utensils className="h-8 w-8 text-emerald-400" />
              <p className="text-sm tracking-[0.2em] text-gray-400">02</p>
              <h3 className="text-lg tracking-[0.12em]">WE COOK</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Our chefs design dishes around each week&apos;s harvest, balancing flavor, comfort, and nutrition into
                meals you&apos;ll actually crave.
              </p>
            </div>
            <div className="p-8 rounded-[28px] border border-gray-800 bg-white/5 space-y-4 my-12">
              <Truck className="h-8 w-8 text-sky-400" />
              <p className="text-sm tracking-[0.2em] text-gray-400">03</p>
              <h3 className="text-lg tracking-[0.12em]">YOU ENJOY</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Ready&#8209;to&#8209;heat meals arrive at your door, turning &ldquo;food as medicine&rdquo; into something you can actually
                stick with.
              </p>
            </div>
          </div>
        </section>

        {/* Chef Partnership */}
        <section className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
            <div className="space-y-6">
              <p className="text-xs tracking-[0.4em] text-gray-400">CHEF PARTNERSHIP</p>
              <h2 className="text-3xl md:text-4xl tracking-[0.12em]">HEALING MEALS, SERVING ALL</h2>
              <p className="text-gray-400 leading-relaxed">
                Zoo Labs Foundation donates chef time to prepare healthy, healing, and medicinal meals for community
                distribution, ensuring real food reaches people who need it most.
              </p>
              <div className="grid sm:grid-cols-2 gap-12">
                <div className="rounded-[20px] border border-gray-800 bg-white/5 p-6 space-y-3 my-12">
                  <p className="text-sm tracking-[0.2em]">MEAL ACCESS</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Partnerships with local organizations allow us to serve food-insecure families with consistent,
                    nutrient-dense meals.
                  </p>
                </div>
                <div className="rounded-[20px] border border-gray-800 bg-white/5 p-6 space-y-3 my-12">
                  <p className="text-sm tracking-[0.2em]">HEALING CUISINE</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Menus emphasize medicinal ingredients and restorative cooking techniques inspired by holistic
                    traditions.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-[32px] overflow-hidden border border-gray-800 bg-white/5">
              <img
                src={imageUrl(cookingImage)}
                alt="Cooking and food preparation"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Good for You, Good for the City */}
        <section className="container mx-auto px-6 max-w-6xl">
          <div className="rounded-[36px] border border-gray-800 bg-white/5 p-10 md:p-14 text-center space-y-6">
            <Heart className="h-8 w-8 text-rose-400 mx-auto" />
            <h2 className="text-3xl md:text-4xl tracking-[0.12em]">GOOD FOR YOU, GOOD FOR THE CITY</h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Every farm&#8209;to&#8209;table order helps fund subsidized produce and prepared meals for low&#8209;income and medically
              at&#8209;risk neighbors. When you eat better, someone else can too.
            </p>
          </div>
        </section>

        {/* Education */}
        <section className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-16 items-center">
            <div className="rounded-[32px] overflow-hidden border border-gray-800 bg-white/5">
              <img
                src={imageUrl(herbImage)}
                alt="Herbs and healing crops"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-6">
              <p className="text-xs tracking-[0.4em] text-gray-400">EDUCATION</p>
              <h2 className="text-3xl md:text-4xl tracking-[0.12em]">COMMUNITY-LED LEARNING</h2>
              <p className="text-gray-400 leading-relaxed">
                Practical workshops on nutrient-dense cooking, herbal foods, and longevity-focused diets that are
                culturally grounded and community-led.
              </p>
              <div className="grid sm:grid-cols-2 gap-12">
                <div className="rounded-[20px] border border-gray-800 bg-white/5 p-6 space-y-3 my-12">
                  <div className="flex items-center gap-2 text-white">
                    <CookingPot className="h-4 w-4" />
                    <p className="text-sm tracking-[0.2em]">FOOD LITERACY</p>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Hands-on guidance for families to cook healing meals and integrate medicinal foods.
                  </p>
                </div>
                <div className="rounded-[20px] border border-gray-800 bg-white/5 p-6 space-y-3 my-12">
                  <div className="flex items-center gap-2 text-white">
                    <Sprout className="h-4 w-4" />
                    <p className="text-sm tracking-[0.2em]">SELF-SUSTAINABLE FARMING</p>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Teaching neighbors to plant, steward soil, and grow their own food for long-term resilience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect + CTA */}
        <section className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-xs tracking-[0.4em] text-gray-400">WHAT TO EXPECT</p>
              <h2 className="text-3xl md:text-4xl tracking-[0.12em]">YOUR FARM&#8209;TO&#8209;TABLE BOX</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CircleCheck className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-gray-400 leading-relaxed">Rotating menus based on what&apos;s in season</p>
                </div>
                <div className="flex items-start gap-4">
                  <CircleCheck className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-gray-400 leading-relaxed">Medicinal&#8209;forward ingredients, no fuss</p>
                </div>
                <div className="flex items-start gap-4">
                  <CircleCheck className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-gray-400 leading-relaxed">Clear sourcing from our nonprofit partner farm</p>
                </div>
              </div>
            </div>
            <div className="rounded-[28px] border border-gray-800 bg-white/5 p-8 md:p-10 space-y-6">
              <h3 className="text-2xl tracking-[0.12em]">TRY OUR FARM&#8209;TO&#8209;TABLE MEALS (COMING SOON)</h3>
              <p className="text-gray-400 leading-relaxed">
                Choose the Farm&#8209;to&#8209;Table option at checkout to fill your box with dishes built around the latest harvest.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Make a charitable donation to the Farm Project and you will be eligible for a tax&#8209;deductible donation.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center justify-center rounded-full bg-emerald-600 text-white px-8 py-3 text-lg font-bold uppercase tracking-wider opacity-60 cursor-default">
                  Order Farm Fresh (Coming Soon)
                </span>
                <Link
                  href="/donation/farm"
                  className="inline-flex items-center justify-center rounded-full bg-white text-black hover:bg-white/90 px-8 py-3 text-lg font-bold uppercase tracking-wider transition-all duration-300"
                >
                  Make Donation to the Farm
                </Link>
              </div>
              <p className="text-xs text-gray-400">
                100% tax deductible via The Zoolabs Foundation (501(c)(3)). EIN #883538992.
              </p>
            </div>
          </div>
        </section>

        {/* Crowdfunding */}
        <section className="container mx-auto px-6 max-w-6xl">
          <div className="rounded-[36px] border border-gray-800 bg-white/5 p-10 md:p-14 text-center space-y-6">
            <Sparkles className="h-8 w-8 text-amber-400 mx-auto" />
            <h2 className="text-3xl md:text-4xl tracking-[0.12em]">CROWDFUND THE FARM</h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Support the Regenerative Healing Farm through our decentralized crowdfunding platform.
              Every contribution helps us acquire land, build infrastructure, and grow healing foods for those who need it most.
            </p>
            <a
              href="https://zoo.fund"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-amber-500/20 text-white hover:bg-amber-500/30 border border-amber-500/40 px-8 py-3 text-lg font-bold uppercase tracking-wider transition-all duration-300"
            >
              Visit Zoo Fund
            </a>
          </div>
        </section>

        {/* Gallery */}
        <section className="container mx-auto px-6 max-w-6xl">
          <div className="rounded-[36px] border border-gray-800 bg-white/5 p-10 md:p-12 space-y-10">
            <div className="space-y-3">
              <p className="text-xs tracking-[0.4em] text-gray-400">THE REGENERATIVE VISION</p>
              <h3 className="text-2xl md:text-3xl tracking-[0.12em]">FIELD TO HEALING TABLE</h3>
              <p className="text-gray-400 max-w-3xl leading-relaxed">
                A visual look at the ingredients, farms, and regenerative practices inspiring the Zoo Labs Foundation mission.
                These images reflect the healing foods, medicinal herbs, and community-centered growing practices we
                are building together.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-[24px] overflow-hidden border border-gray-800 bg-white/5 aspect-[4/3]">
                <img
                  src={imageUrl(ingredientsImage)}
                  alt="Fresh ingredients"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-[24px] overflow-hidden border border-gray-800 bg-white/5 aspect-[4/3]">
                <img
                  src={imageUrl(mushroomImage)}
                  alt="Medicinal mushrooms"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {imageRail.map((filename) => (
                <div key={filename} className="rounded-[24px] overflow-hidden border border-gray-800 bg-white/5 aspect-square">
                  <img
                    src={imageUrl(filename)}
                    alt={filename.replace(/\.[^/.]+$/, '').replace(/[-_+]+/g, ' ').replace(/\s+/g, ' ').trim()}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join the Movement */}
        <section className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl tracking-[0.14em]">JOIN THE MOVEMENT</h2>
              <p className="text-gray-400 max-w-2xl leading-relaxed">
                Support land acquisition, chef-led meal distribution, and community education. Together we can make
                fresh food a shared standard and help the next generation thrive.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a
                  href="mailto:hello@zoo.ngo?subject=Volunteer%20opportunities"
                  className="inline-flex items-center justify-center rounded-full bg-amber-500/20 text-white hover:bg-amber-500/30 border border-amber-500/40 px-8 py-3 text-lg font-bold uppercase tracking-wider transition-all duration-300"
                >
                  Volunteer or Collaborate
                </a>
                <Link
                  href="/donation/farm"
                  className="inline-flex items-center justify-center rounded-full border border-gray-600 text-white hover:border-white px-8 py-3 text-lg font-bold uppercase tracking-wider transition-all duration-300"
                >
                  Donate or Sponsor
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </Layout>
  );
}
