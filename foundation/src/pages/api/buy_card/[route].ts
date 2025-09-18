import { NextApiRequest, NextApiResponse } from 'next';

// This endpoint has been disabled as part of site updates to remove collectible card functionality
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(404).json({ 
    error: 'This endpoint has been deprecated.' 
  });
};

export default handler;
