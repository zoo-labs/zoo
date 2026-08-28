import type { Metadata } from 'next'
import { Zen } from '@hanzo/font'
import './globals.css'
import { Providers } from './providers'
import { Navigation } from '@/components/navigation'

const sans = Zen

export const metadata: Metadata = {
  title: 'Zoo Network Explorer',
  description: 'Blockchain explorer for the Zoo Network - Decentralized AI infrastructure',
  keywords: 'zoo, blockchain, explorer, AI, decentralized',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Hanzo Insights — behavioral analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(t,e){var o,n,p,r;e.__SV||(window.hi=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="hi",u.people=u.people||[],u.toString=function(t){var e="hi";return"hi"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture captureException identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId setPersonProperties".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.hi||[]);hi.init('hi_de8303d5bba47a792b7703e2c7061ac8',{api_host:'https://insights.hanzo.ai',person_profiles:'identified_only'});hi.register({app:'zoo-network-explorer',org:'zoo'})`,
          }}
        />
      </head>
      <body className={sans.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}