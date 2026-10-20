// Hanzo IAM client config for zoo.ngo (community login, ZIPs voting, etc.)
// See ~/work/hanzo/iam/docs/CONVENTION.md — app slug = <org>-<app> = "zoo-ngo".

export const iamConfig = {
  url: process.env.NEXT_PUBLIC_IAM_URL || 'https://iam.hanzo.ai',
  clientId: process.env.NEXT_PUBLIC_IAM_CLIENT_ID || '',
  appName: process.env.NEXT_PUBLIC_IAM_APP_NAME || 'zoo-ngo',
  org: process.env.NEXT_PUBLIC_IAM_ORG || 'zoo',
  redirectPath: process.env.NEXT_PUBLIC_IAM_REDIRECT_PATH || '/api/auth/callback',
};

export const getIamLoginUrl = () => {
  const { url, clientId, appName, redirectPath } = iamConfig;
  const redirectUri = `${window.location.origin}${redirectPath}`;

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'read',
    state: appName,
  });

  return `${url}/v1/iam/oauth/authorize?${params.toString()}`;
};
