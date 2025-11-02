/**
 * Apps Fixture
 * Manages Zoo ecosystem dApp server lifecycle for E2E testing
 */

import { spawn, ChildProcess } from 'child_process';
import fetch from 'node-fetch';
import path from 'path';

export interface AppInstance {
  name: string;
  url: string;
  port: number;
  process: ChildProcess;
  ready: boolean;
}

export interface AppsFixture {
  app: AppInstance;          // Zoo AI (3000)
  foundation: AppInstance;    // Zoo Foundation (3002)
  network: AppInstance;       // Zoo Network (3003)
  vote: AppInstance;          // Zoo Vote (3004)
  fund: AppInstance;          // Zoo Fund (3005)
  computer: AppInstance;      // Zoo Computer (3007)
  all: AppInstance[];
}

const APP_CONFIGS = [
  { name: 'app', port: 3000, dir: 'app', command: 'dev' },
  { name: 'foundation', port: 3002, dir: 'foundation', command: 'dev' },
  { name: 'network', port: 3003, dir: 'network', command: 'dev' },
  { name: 'vote', port: 3004, dir: 'dao-governance/app', command: 'dev' },
  { name: 'fund', port: 3005, dir: 'fund', command: 'dev' },
  { name: 'computer', port: 3007, dir: 'computer', command: 'dev' }
];

/**
 * Start all Zoo ecosystem dApps
 */
export async function startApps(
  config: {
    parallel?: boolean;
    timeout?: number;
  } = {}
): Promise<AppsFixture> {
  const {
    parallel = true,
    timeout = 60000 // 60s timeout per app
  } = config;

  console.log('🚀 Starting Zoo ecosystem apps...');

  const zooPath = path.join(__dirname, '../..');
  const apps: AppInstance[] = [];

  if (parallel) {
    // Start all apps in parallel
    const startPromises = APP_CONFIGS.map(config =>
      startApp(zooPath, config, timeout)
    );

    apps.push(...(await Promise.all(startPromises)));
  } else {
    // Start apps sequentially
    for (const config of APP_CONFIGS) {
      const app = await startApp(zooPath, config, timeout);
      apps.push(app);
    }
  }

  console.log('   ✅ All apps started');

  return {
    app: apps[0],
    foundation: apps[1],
    network: apps[2],
    vote: apps[3],
    fund: apps[4],
    computer: apps[5],
    all: apps
  };
}

/**
 * Start a single app
 */
async function startApp(
  zooPath: string,
  config: { name: string; port: number; dir: string; command: string },
  timeout: number
): Promise<AppInstance> {
  const appPath = path.join(zooPath, config.dir);
  const url = `http://localhost:${config.port}`;

  console.log(`   Starting ${config.name} on port ${config.port}...`);

  // Start app process
  const appProcess = spawn(
    'npm',
    ['run', config.command],
    {
      cwd: appPath,
      stdio: 'pipe',
      shell: true,
      env: {
        ...process.env,
        PORT: config.port.toString()
      }
    }
  );

  // Capture output
  let output = '';
  appProcess.stdout?.on('data', (data: Buffer) => {
    output += data.toString();
  });

  appProcess.stderr?.on('data', (data: Buffer) => {
    const message = data.toString();
    // Only log errors, not webpack warnings
    if (message.includes('ERROR') || message.includes('Error')) {
      console.error(`   ⚠️  ${config.name} stderr: ${message}`);
    }
  });

  appProcess.on('error', (error: Error) => {
    console.error(`   ❌ ${config.name} process error: ${error.message}`);
  });

  appProcess.on('exit', (code: number | null, signal: string | null) => {
    if (code !== null && code !== 0) {
      console.error(`   ❌ ${config.name} exited with code ${code}`);
    }
    if (signal) {
      console.log(`   ⚠️  ${config.name} killed with signal ${signal}`);
    }
  });

  // Wait for app to be ready
  const ready = await waitForApp(url, timeout);

  if (!ready) {
    throw new Error(`${config.name} failed to start within ${timeout}ms`);
  }

  console.log(`   ✅ ${config.name} ready at ${url}`);

  return {
    name: config.name,
    url,
    port: config.port,
    process: appProcess,
    ready: true
  };
}

/**
 * Wait for app to be ready (health check)
 */
async function waitForApp(url: string, timeout: number): Promise<boolean> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok || response.status === 404) {
        // App is responding (404 is okay, means server is up but route doesn't exist)
        return true;
      }
    } catch (error) {
      // Not ready yet, wait 1s and retry
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return false;
}

/**
 * Stop all dApps
 */
export async function stopApps(fixture: AppsFixture): Promise<void> {
  console.log('🛑 Stopping Zoo ecosystem apps...');

  const stopPromises = fixture.all.map(app => stopApp(app));
  await Promise.all(stopPromises);

  console.log('   ✅ All apps stopped');
}

/**
 * Stop a single app
 */
async function stopApp(app: AppInstance): Promise<void> {
  console.log(`   Stopping ${app.name}...`);

  if (app.process && !app.process.killed) {
    app.process.kill('SIGTERM');

    // Wait for graceful shutdown
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Force kill if still running
    if (!app.process.killed) {
      console.log(`   ⚠️  Force killing ${app.name}`);
      app.process.kill('SIGKILL');
    }
  }

  console.log(`   ✅ ${app.name} stopped`);
}

/**
 * Restart an app
 */
export async function restartApp(
  fixture: AppsFixture,
  appName: keyof Omit<AppsFixture, 'all'>
): Promise<void> {
  console.log(`🔄 Restarting ${appName}...`);

  const app = fixture[appName];

  // Stop app
  await stopApp(app);

  // Find app config
  const config = APP_CONFIGS.find(c => c.name === appName);
  if (!config) {
    throw new Error(`Unknown app: ${appName}`);
  }

  // Start app
  const zooPath = path.join(__dirname, '../..');
  const newApp = await startApp(zooPath, config, 60000);

  // Update fixture
  fixture[appName] = newApp;

  console.log(`   ✅ ${appName} restarted`);
}

/**
 * Check if app is healthy
 */
export async function checkAppHealth(app: AppInstance): Promise<boolean> {
  try {
    const response = await fetch(app.url, { method: 'HEAD' });
    return response.ok || response.status === 404;
  } catch (error) {
    return false;
  }
}

/**
 * Get app status
 */
export async function getAppStatus(
  fixture: AppsFixture
): Promise<Record<string, boolean>> {
  const statusPromises = fixture.all.map(async app => ({
    name: app.name,
    healthy: await checkAppHealth(app)
  }));

  const statuses = await Promise.all(statusPromises);

  const result: Record<string, boolean> = {};
  for (const status of statuses) {
    result[status.name] = status.healthy;
  }

  return result;
}

/**
 * Print app status summary
 */
export async function printAppStatus(fixture: AppsFixture): Promise<void> {
  console.log('\n📊 App Status:');
  console.log('─'.repeat(50));

  const statuses = await getAppStatus(fixture);

  for (const app of fixture.all) {
    const status = statuses[app.name] ? '✅ Running' : '❌ Down';
    console.log(`${app.name.padEnd(15)} ${app.url.padEnd(25)} ${status}`);
  }

  console.log('─'.repeat(50) + '\n');
}
