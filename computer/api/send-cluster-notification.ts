import { sendEmail, sendAdminNotification, ClusterData } from '../src/lib/email';

export default async function handler(req: Request): Promise<Response> {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  try {
    const body = await req.json();
    const { clusterData } = body;

    if (!clusterData) {
      return new Response(JSON.stringify({ error: 'Missing required field: clusterData' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Validate cluster data
    const requiredFields: (keyof ClusterData)[] = [
      'requestId',
      'customerName',
      'customerEmail',
      'clusterSize',
      'gpuModel',
      'requirements',
      'submittedAt'
    ];

    for (const field of requiredFields) {
      if (!clusterData[field]) {
        return new Response(JSON.stringify({ error: `Missing required field in clusterData: ${field}` }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // Send both customer confirmation and admin notification
    const promises = [
      sendEmail(clusterData.customerEmail, 'cluster', clusterData),
      sendAdminNotification(clusterData)
    ];

    await Promise.all(promises);

    return new Response(JSON.stringify({
      success: true,
      message: 'Cluster request confirmation sent to customer and admin notification sent'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error in send-cluster-notification API:', error);
    return new Response(JSON.stringify({
      error: 'Failed to send cluster notification',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}