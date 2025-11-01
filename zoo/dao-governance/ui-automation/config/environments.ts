// Static environments
export const environments: Record<string, string> = {
  develop: 'https://develop.interface.pages.dev/',
  production: 'https://app.luxdao.org/',
};

// Cache for release URL
let releaseUrl: string | null = null;

/**
 * Fetches the latest release tag from GitHub and constructs the release URL
 */
async function getLatestReleaseUrl(): Promise<string> {
  const response = await fetch('https://api.github.com/repos/luxdao/app/releases/latest');
  
  if (!response.ok) {
    throw new Error(`GitHub API returned status ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  const tagName = data.tag_name;
  
  if (!tagName) {
    throw new Error('No tag_name found in GitHub API response');
  }
  
  // Convert periods to dashes: "v0.16.0" -> "v0-16-0"
  const urlVersion = tagName.replace(/\./g, '-');
  const releaseUrl = `https://release-${urlVersion}.interface.pages.dev/`;
  
  console.log(`[environments] Using latest release: ${tagName} -> ${releaseUrl}`);
  return releaseUrl;
}

/**
 * Initialize release URL if needed for synchronous access
 */
export async function initializeReleaseUrl(): Promise<void> {
  if (!releaseUrl) {
    try {
      releaseUrl = await getLatestReleaseUrl();
      // Add to environments object for synchronous access
      environments.release = releaseUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('[environments] Failed to fetch latest release:', error);
      throw new Error(`Cannot determine latest release URL. Please check your internet connection or use a different environment. Original error: ${errorMessage}`);
    }
  }
}

/**
 * Gets an environment URL, fetching latest release URL if needed
 */
export async function getEnvironmentUrl(env: string): Promise<string> {
  if (env === 'release') {
    await initializeReleaseUrl();
    return releaseUrl!;
  }
  
  return environments[env] || environments.develop;
}
