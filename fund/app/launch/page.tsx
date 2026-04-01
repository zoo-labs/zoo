import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { DAOOnboardingPage } from '@/components/dao-onboarding'

export const metadata = {
  title: 'Launch Your DAO | Zoo Fund',
  description: 'Start your own conservation DAO on Zoo Fund. Self-service onboarding for decentralized conservation funding.',
}

export default function LaunchPage() {
  return (
    <>
      <Header />
      <main>
        <DAOOnboardingPage />
      </main>
      <Footer />
    </>
  )
}
