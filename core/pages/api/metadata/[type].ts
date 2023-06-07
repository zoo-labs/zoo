import { withSentry } from '@sentry/nextjs'

const metadata = {
  description: 'Nfts made Fun',
  // external_url: 'https://openseacreatures.io/3',
  // image: 'https://lux.town/nfts/validator.jpg',
  name: 'ZOO',
}

const handler = async (req, res) => {
  // const type = req.query.type.replace('.json')
  // switch (type) {
  //   case 'validator': {
  //   }
  // }

  res.json(metadata)
}

export default withSentry(handler)
