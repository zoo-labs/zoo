export const casdoorConfig = {
  serverUrl: process.env.NEXT_PUBLIC_CASDOOR_SERVER_URL || 'https://iam.hanzo.ai',
  clientId: process.env.NEXT_PUBLIC_CASDOOR_CLIENT_ID || '',
  appName: process.env.NEXT_PUBLIC_CASDOOR_APP_NAME || 'zoo-foundation',
  organizationName: process.env.NEXT_PUBLIC_CASDOOR_ORG_NAME || 'hanzo',
  redirectPath: '/api/auth/callback',
};

export const getCasdoorLoginUrl = () => {
  const { serverUrl, clientId, appName, organizationName, redirectPath } = casdoorConfig;
  const redirectUri = `${window.location.origin}${redirectPath}`;
  
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'read',
    state: appName,
  });

  return `${serverUrl}/login/oauth/authorize?${params.toString()}`;
};
