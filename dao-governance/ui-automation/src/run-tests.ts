// Unified test runner - handles both single governance and all governance types
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { initializeReleaseUrl, getEnvironmentUrl } from '../config/environments';
import { maxConcurrency } from '../config/test-settings';
import { generateTestSummary, generateCombinedSummary, TestResult } from './test-summary';

// Constants
const GOVERNANCE_TYPES = ['erc20', 'erc721', 'multisig'] as const;
const ALL_GOVERNANCE_TYPES = [...GOVERNANCE_TYPES, 'general'] as const;
const RESULTS_DIR = path.join(process.cwd(), 'test-results');
const TS_NODE_BIN = path.join(process.cwd(), 'node_modules', '.bin', process.platform === 'win32' ? 'ts-node.cmd' : 'ts-node');

// Types
type GovernanceType = typeof ALL_GOVERNANCE_TYPES[number];
type TestExecutionMode = 'single-file' | 'all-governance' | 'single-governance';
type ParsedArgs = {
  mode: TestExecutionMode;
  governanceType?: GovernanceType;
  filePath?: string;
  testFiles: string[];
  environment: string;
  baseUrl?: string;
  flags?: string;
  debugMode: boolean;
  isChildProcess: boolean;
};

// Utility Classes
class ArgumentParser {
  private readonly argv: string[];

  constructor() {
    this.argv = this.getAllCliArgs();
  }

  parse(): ParsedArgs {
    const fileArg = this.argv.find(arg => arg.startsWith('--file='));
    const governanceArg = this.argv.find(arg => arg.startsWith('--governance='));
    const testFileArgs = this.argv.filter(arg => arg.endsWith('.test.ts'));
    const debugMode = this.argv.some(arg => arg === '--debug' || arg === 'debug');
    const isChildProcess = this.argv.some(arg => arg.startsWith('--governance='));

    // Determine execution mode
    let mode: TestExecutionMode;
    let governanceType: GovernanceType | undefined;
    let filePath: string | undefined;

    if (fileArg) {
      mode = 'single-file';
      filePath = fileArg.split('=')[1];
    } else if (governanceArg || this.shouldUseSingleGovernanceMode(testFileArgs)) {
      mode = 'single-governance';
      governanceType = this.parseGovernanceType(governanceArg, testFileArgs);
    } else {
      mode = 'all-governance';
    }

    return {
      mode,
      governanceType,
      filePath,
      testFiles: testFileArgs,
      environment: this.parseEnvironment(),
      baseUrl: this.parseBaseUrl(),
      flags: this.parseFlags(),
      debugMode,
      isChildProcess
    };
  }

  private getAllCliArgs(): string[] {
    const args: string[] = [];
    
    // 1. process.argv (direct node/ts-node invocation)
    if (process.argv && process.argv.length > 2) {
      args.push(...process.argv.slice(2));
    }
    
    // 2. npm_config_* environment variables
    Object.keys(process.env).forEach(key => {
      if (key.startsWith('npm_config_') && !this.isExcludedNpmConfig(key)) {
        const flagName = key.replace('npm_config_', '');
        const value = process.env[key];
        
        if (value === 'true') {
          args.push(`--${flagName}`);
        } else if (value === '' && flagName !== 'file') {
          // Handle flags like --no-headless which become npm_config_headless=''
          if (flagName === 'headless') {
            args.push('--no-headless');
          } else {
            args.push(`--${flagName}`);
          }
        } else if (value && value !== 'false') {
          args.push(`--${flagName}=${value}`);
        }
      }
    });
    
    // 3. npm_config_argv (npm run ... -- ...)
    if (process.env.npm_config_argv) {
      try {
        const npmArgv = JSON.parse(process.env.npm_config_argv);
        if (npmArgv && Array.isArray(npmArgv.original)) {
          const orig = npmArgv.original;
          const dashDashIndex = orig.indexOf('--');
          if (dashDashIndex !== -1 && dashDashIndex < orig.length - 1) {
            args.push(...orig.slice(dashDashIndex + 1));
          }
        }
      } catch {}
    }
    
    // 4. npm_lifecycle_script
    if (process.env.npm_lifecycle_script) {
      const scriptLine = process.env.npm_lifecycle_script;
      const match = scriptLine.match(/\s(--?.*)$/);
      if (match && match[1]) {
        const parts = match[1].match(/("[^"]+"|'[^']+'|[^\s]+)/g);
        if (parts) args.push(...parts.map(s => s.replace(/^['"]|['"]$/g, '')));
      }
    }
    
    return [...new Set(args)];
  }

  private isExcludedNpmConfig(key: string): boolean {
    return key.match(/^npm_config_(cache|globalconfig|global_prefix|init_module|local_prefix|node_gyp|noproxy|npm_version|prefix|userconfig|user_agent)$/) !== null;
  }

  private shouldUseSingleGovernanceMode(testFileArgs: string[]): boolean {
    if (testFileArgs.length === 0) return false;
    
    const testFile = testFileArgs[0];
    const isMultisig = testFile.includes('multisig/') || testFile.includes('multisig\\') || 
                     testFile.includes('/multisig/') || testFile.includes('\\multisig\\');
    const isTokenVoting = testFile.includes('token-voting/') || testFile.includes('token-voting\\') || 
                         testFile.includes('/token-voting/') || testFile.includes('\\token-voting\\');
    
    if (isMultisig) {
      this.argv.push('--governance=multisig');
      return true;
    } else if (isTokenVoting) {
      this.argv.push('--governance=erc20');
      return true;
    }
    
    return false;
  }

  private parseGovernanceType(governanceArg?: string, testFileArgs?: string[]): GovernanceType {
    if (governanceArg) {
      const val = governanceArg.split('=')[1].toLowerCase();
      if (ALL_GOVERNANCE_TYPES.includes(val as GovernanceType)) {
        return val as GovernanceType;
      }
    }
    return 'erc20'; // default
  }

  private parseEnvironment(): string {
    const envArg = this.argv.find(arg => arg.startsWith('--env='));
    return envArg ? envArg.split('=')[1] : 'develop';
  }

  private parseBaseUrl(): string | undefined {
    const baseUrlArg = this.argv.find(arg => arg.startsWith('--base-url=') || arg.startsWith('--base_url='));
    return baseUrlArg ? baseUrlArg.split('=')[1] : undefined;
  }

  private parseFlags(): string | undefined {
    const flagsArg = this.argv.find(arg => arg.startsWith('--flags='));
    if (flagsArg) {
      return flagsArg.replace('--flags=', '');
    }
    
    // If not found, but a single non-option arg exists, treat it as flags
    const bareFlags = this.argv.find(arg => !arg.startsWith('--') && !arg.endsWith('.test.ts'));
    return bareFlags || undefined;
  }

  getFilteredArgs(excludePatterns: string[] = []): string[] {
    return this.argv.filter(arg => !excludePatterns.some(pattern => arg.startsWith(pattern)));
  }
}

class EnvironmentManager {
  static async initializeReleaseEnvironment(): Promise<void> {
    if (process.env.TEST_ENV !== 'release') return;

    console.log('Initializing release environment...');
    try {
      await initializeReleaseUrl();
      const releaseUrl = await getEnvironmentUrl('release');
      process.env.RELEASE_URL = releaseUrl;
      console.log(`[run-tests] Release URL stored for child processes: ${releaseUrl}`);
    } catch (error) {
      console.error('Failed to initialize release environment:', error);
      process.exit(1);
    }
  }

  static setupEnvironmentVariables(args: ParsedArgs): void {
    // Set TEST_ENV for backward compatibility
    process.env.TEST_ENV = args.environment;
    
    if (args.baseUrl) {
      process.env.BASE_URL = args.baseUrl;
      if (!args.isChildProcess) {
        console.log(`[run-tests] Custom base URL set: ${args.baseUrl}`);
      }
    }
    
    if (args.flags) {
      process.env.TEST_FLAGS = args.flags;
      if (!args.isChildProcess) {
        console.log(`[run-tests] Feature flags set: ${args.flags}`);
      }
    }
    
    if (args.environment !== 'develop') {
      console.log(`[run-tests] Environment set to: ${args.environment}`);
    }
  }

  static displayBaseUrlInfo(suppressOutput: boolean = false): { env: string; baseUrl: string; source: string } {
    if (!suppressOutput) {
      const { displayBaseUrlInfo } = require('../tests/test-helpers');
      return displayBaseUrlInfo();
    } else {
      const { getEnv, getBaseUrl } = require('../tests/test-helpers');
      const env = getEnv();
      const baseUrl = getBaseUrl();
      const source = process.env.BASE_URL ? 'BASE_URL override' : `${env} environment`;
      return { env, baseUrl, source };
    }
  }
}

class FileSystemManager {
  static ensureDirectoryExists(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  static deleteAllScreenshots(dir: string): void {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.deleteAllScreenshots(filePath);
        if (fs.readdirSync(filePath).length === 0) {
          fs.rmdirSync(filePath);
        }
      } else if (file.endsWith('.png')) {
        fs.unlinkSync(filePath);
      }
    }
  }

  static findTestFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir).sort();
    
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat && stat.isDirectory()) {
        results = results.concat(this.findTestFiles(filePath));
      } else if (file.endsWith('.test.ts')) {
        results.push(filePath);
      }
    });
    
    return this.sortTestFiles(results);
  }

  private static sortTestFiles(files: string[]): string[] {
    return files.sort((a, b) => {
      const dirA = path.dirname(a);
      const dirB = path.dirname(b);
      const fileA = path.basename(a);
      const fileB = path.basename(b);
      
      if (dirA !== dirB) {
        return dirA.localeCompare(dirB);
      }
      
      return fileA.localeCompare(fileB);
    });
  }

  static findScreenshotPath(testName: string, screenshotsDir: string): string | undefined {
    const cleanName = testName.replace(/^(token-voting|multisig|erc20|erc721|general)\//, '');
    const screenshotRelPath = cleanName.replace(/\\/g, '/').replace(/\.test\.ts$/, '.png');
    const screenshotPath = path.join(screenshotsDir, screenshotRelPath);
    return fs.existsSync(screenshotPath) ? screenshotPath : undefined;
  }

  static readTempErrorFile(pid?: number): string | undefined {
    if (pid === undefined) return undefined;
    
    const tmpErrorPath = path.join(os.tmpdir(), `selenium-test-error-${pid}.log`);
    if (fs.existsSync(tmpErrorPath)) {
      try {
        const content = fs.readFileSync(tmpErrorPath, 'utf8').trim();
        fs.unlinkSync(tmpErrorPath);
        return content;
      } catch {}
    }
    return undefined;
  }
}

class TestFilter {
  static hasRegressionType(testFile: string, type: string): boolean {
    try {
      const content = fs.readFileSync(testFile, 'utf8');
      const match = content.match(/const regressionType = (\[[^\]]+\])/);
      if (match) {
        // eslint-disable-next-line no-eval
        const arr = eval(match[1]);
        return arr.includes(type);
      }
    } catch {}
    return false;
  }

  static filterTests(allTests: string[], args: ParsedArgs): string[] {
    const regressionTypeFilter = process.env.REGRESSION_TYPE;
    
    let filteredTests: string[];
    
    if (args.testFiles.length > 0) {
      filteredTests = args.testFiles.map(f => this.normalizeTestPath(f));
    } else {
      filteredTests = regressionTypeFilter
        ? allTests.filter(f => this.hasRegressionType(f, regressionTypeFilter))
        : allTests;
    }

    if (args.debugMode) {
      filteredTests = filteredTests.slice(0, 5);
    }

    return filteredTests;
  }

  private static normalizeTestPath(testFile: string): string {
    if (path.isAbsolute(testFile)) {
      return testFile;
    }
    
    if (!testFile.startsWith('tests/') && !testFile.startsWith('tests\\')) {
      testFile = path.join('tests', testFile);
    }
    
    return path.join(process.cwd(), testFile);
  }
}

class ProcessManager {
  static createTestProcess(testFile: string, governanceType: GovernanceType, testFlags: string): ChildProcess {
    const isWin = process.platform === 'win32';
    
    if (isWin) {
      const cmd = `"${TS_NODE_BIN}" "${testFile}" --governance=${governanceType}`;
      return spawn(cmd, [], {
        stdio: ['ignore', 'pipe', 'pipe'],
        shell: true,
        env: { ...process.env, TEST_FLAGS: testFlags },
      });
    } else {
      return spawn(TS_NODE_BIN, [testFile, `--governance=${governanceType}`], {
        stdio: ['ignore', 'pipe', 'pipe'],
        shell: false,
        env: { ...process.env, TEST_FLAGS: testFlags },
      });
    }
  }

  static detectCrash(output: string, error: string): boolean {
    const crashPatterns = [
      /Fatal error/i,
      /unreachable code/i,
      /Segmentation fault/i,
      /out of memory/i,
      /SIGKILL/i,
      /SIGTERM/i
    ];
    
    const combinedOutput = (output + '\n' + error).toLowerCase();
    
    if (crashPatterns.some(pattern => pattern.test(combinedOutput))) {
      return true;
    }
    
    const meaningfulOutput = output.trim() + error.trim();
    if (meaningfulOutput.length < 100 && 
        !meaningfulOutput.includes('PASS') && 
        !meaningfulOutput.includes('FAIL') && 
        !meaningfulOutput.includes('test')) {
      return true;
    }
    
    return false;
  }
}

class HtmlResultParser {
  static parseTestResultsFromHtml(htmlContent: string): Array<{
    testName: string;
    result: string;
    runTime: string;
    screenshot: string;
  }> {
    const results: Array<{ testName: string; result: string; runTime: string; screenshot: string }> = [];
    const tableRowRegex = /<tr class='data-row'><td>(.*?)<\/td><td class='[^']*'>([^<]+)<\/td><td>([^<]*)<\/td><td>.*?<\/td><\/tr>/g;
    
    let match;
    while ((match = tableRowRegex.exec(htmlContent)) !== null) {
      const testName = match[1].replace(/<span.*?<\/span>/g, '').trim();
      const result = match[2] === 'PASS' ? '✅' : 
                    match[2] === 'SKIPPED' ? '⚠️' : 
                    match[2] === 'NO RUN' ? '⚪' : '❌';
      const runTime = match[3];
      const screenshot = 'Available';
      
      results.push({ testName, result, runTime, screenshot });
    }
    
    return results;
  }

  static parseTotalsFromHtml(htmlContent: string): {
    timestamp?: string;
    duration: number;
    passed: number;
    total: number;
    failed: number;
    crashed: number;
    skipped: number;
  } {
    const timestampMatch = htmlContent.match(/<b>Timestamp:<\/b> ([^<]+)<\/p>/);
    const timestamp = timestampMatch ? timestampMatch[1] : undefined;
    
    let duration = 0;
    const durationMatch = htmlContent.match(/<b>Total run time:<\/b> ([^<]+)<\/p>/);
    if (durationMatch) {
      const val = durationMatch[1];
      if (val.includes('min')) {
        duration = parseFloat(val) * 60;
      } else if (val.includes('s')) {
        duration = parseFloat(val);
      }
    }
    
    let passed = 0, total = 0;
    const passMatch = htmlContent.match(/<b>(\d+)[/](\d+) tests passed<\/b>/);
    if (passMatch) {
      passed = parseInt(passMatch[1]);
      total = parseInt(passMatch[2]);
    }
    
    let failed = 0;
    const failMatch = htmlContent.match(/title='Failed: (\d+)'/);
    if (failMatch) failed = parseInt(failMatch[1]);
    
    let crashed = 0;
    const crashMatch = htmlContent.match(/title='No Run: (\d+)'/);
    if (crashMatch) crashed = parseInt(crashMatch[1]);
    
    let skipped = 0;
    const skipMatch = htmlContent.match(/title='Skipped: (\d+)'/);
    if (skipMatch) skipped = parseInt(skipMatch[1]);
    
    return { timestamp, duration, passed, total, failed, crashed, skipped };
  }

  static updateScreenshotPaths(html: string, governanceType: GovernanceType): string {
    if (governanceType === 'general') {
      const generalScreenshotRegex = new RegExp(`href='screenshots/(?!general/)`, 'g');
      return html.replace(generalScreenshotRegex, `href='screenshots/general/`);
    } else {
      const governanceTypeRegex = new RegExp(`href='screenshots/(?!${governanceType}/)`, 'g');
      return html.replace(governanceTypeRegex, `href='screenshots/${governanceType}/`)
                .replace(/id='error-link-(\d+)'/g, `id='${governanceType}-error-link-$1'`)
                .replace(/id='error-details-(\d+)'/g, `id='${governanceType}-error-details-$1'`)
                .replace(/onclick='toggleError\((\d+)\)'/g, `onclick="toggleError('${governanceType}', $1)"`);
    }
  }
}

// Main Runner Classes
class SingleFileRunner {
  constructor(private args: ParsedArgs, private argParser: ArgumentParser) {}

  async run(): Promise<void> {
    const { displayBaseUrlInfo } = require('../tests/test-helpers');
    displayBaseUrlInfo();
    
    console.log(`\n===== Running single test file: ${this.args.filePath} =====`);
    
    const testArgs = this.argParser.getFilteredArgs(['--file=']);
    
    const proc = spawn('npx', ['ts-node', this.args.filePath!, ...testArgs], {
      stdio: 'inherit',
      shell: true
    });
    
    proc.on('close', (code: number | null) => {
      process.exit(code || 0);
    });
  }
}

class SingleGovernanceRunner {
  private colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    gray: '\x1b[90m',
    reset: '\x1b[0m',
  };

  constructor(private args: ParsedArgs) {}

  async run(): Promise<void> {
    await EnvironmentManager.initializeReleaseEnvironment();
    
    const { env, baseUrl } = EnvironmentManager.displayBaseUrlInfo(this.args.isChildProcess);
    
    const screenshotsDir = process.env.SCREENSHOTS_DIR || path.join(RESULTS_DIR, 'screenshots');
    FileSystemManager.deleteAllScreenshots(screenshotsDir);
    
    const tests = this.discoverTests();
    const filteredTests = TestFilter.filterTests(tests, this.args);
    
    const wallClockStart = Date.now();
    const testResults = await this.executeTests(filteredTests, screenshotsDir);
    
    this.generateSummary(testResults, baseUrl, wallClockStart);
    
    const allPassed = testResults.every(result => result.passed);
    process.exit(allPassed ? 0 : 1);
  }

  private discoverTests(): string[] {
    const testRoot = this.getTestRoot();
    return FileSystemManager.findTestFiles(testRoot);
  }

  private getTestRoot(): string {
    const governanceType = this.args.governanceType!;
    
    if (governanceType === 'multisig') {
      return path.join(process.cwd(), 'tests', 'multisig');
    } else if (governanceType === 'general') {
      return path.join(process.cwd(), 'tests', 'general');
    } else {
      return path.join(process.cwd(), 'tests', 'token-voting');
    }
  }

  private async executeTests(filteredTests: string[], screenshotsDir: string): Promise<TestResult[]> {
    const testResults: TestResult[] = [];
    const queue = [...filteredTests];
    let running = 0;
    
    const runNext = async (): Promise<void> => {
      if (queue.length === 0) return;
      const testFile = queue.shift()!;
      running++;
      
      const result = await this.executeTest(testFile, screenshotsDir, Date.now());
      testResults.push(result);
      
      running--;
      await runNext();
    };
    
    const workers: Promise<void>[] = [];
    for (let i = 0; i < Math.min(maxConcurrency, filteredTests.length); i++) {
      workers.push(runNext());
    }
    
    await Promise.all(workers);
    
    return this.sortTestResults(testResults);
  }

  private async executeTest(testFile: string, screenshotsDir: string, startTime: number): Promise<TestResult> {
    return new Promise((resolve) => {
      const proc = ProcessManager.createTestProcess(testFile, this.args.governanceType!, this.args.flags || '');
      
      let output = '';
      let error = '';
      
      if (proc.stdout) {
        proc.stdout.on('data', (data) => {
          const str = data.toString();
          output += str;
          if (!this.args.debugMode) process.stdout.write(str);
        });
      }
      
      if (proc.stderr) {
        proc.stderr.on('data', (data) => {
          const str = data.toString();
          error += str;
          if (!this.args.debugMode) process.stderr.write(str);
        });
      }
      
      proc.on('close', (code) => {
        const testName = this.getTestName(testFile);
        const passed = code === 0;
        const crashed = !passed && ProcessManager.detectCrash(output, error);
        const durationMs = Date.now() - startTime;
        const screenshotPath = FileSystemManager.findScreenshotPath(testName, screenshotsDir);
        
        this.logTestResult(testName, passed, crashed);
        
        if (this.args.debugMode) {
          this.logDebugOutput(testName, output, error);
        }
        
        const result: TestResult = {
          name: testName,
          passed,
          crashed,
          screenshotPath,
          durationMs
        };
        
        if (!passed) {
          result.errorMsg = this.buildErrorMessage(output, error, proc.pid, crashed);
        }
        
        resolve(result);
      });
    });
  }

  private getTestName(testFile: string): string {
    let testName = path.relative(path.join(__dirname, '..', 'tests'), testFile).replace(/\\/g, '/');
    return testName.replace(/^(token-voting|multisig|erc20|erc721|general)\//, '');
  }

  private logTestResult(testName: string, passed: boolean, crashed: boolean): void {
    if (passed) {
      console.log(`${testName}: ${this.colors.green}pass${this.colors.reset}`);
    } else if (crashed) {
      console.log(`${testName}: ${this.colors.gray}NO RUN${this.colors.reset}`);
    } else {
      console.log(`${testName}: ${this.colors.red}fail${this.colors.reset}`);
    }
  }

  private logDebugOutput(testName: string, output: string, error: string): void {
    if (output.trim()) {
      process.stdout.write(`\n[${testName}]\n` + output);
    }
    if (error.trim()) {
      process.stderr.write(`\n[${testName} ERROR]\n` + error);
    }
  }

  private buildErrorMessage(output: string, error: string, pid?: number, crashed?: boolean): string {
    const msgParts: string[] = [];
    if (output.trim()) msgParts.push('[Console Output]\n' + output.trim());
    if (error.trim()) msgParts.push('[Error Output]\n' + error.trim());
    
    let errorMsg = msgParts.join('\n');
    
    const timeoutMatch = /TimeoutError[\s\S]*?(?=\n\s*at|$)/.exec(output + '\n' + error);
    if (timeoutMatch && !errorMsg.startsWith(timeoutMatch[0].trim())) {
      errorMsg = timeoutMatch[0].trim() + '\n' + errorMsg;
    }
    
    const tempError = FileSystemManager.readTempErrorFile(pid);
    if (tempError && !errorMsg.includes(tempError)) {
      errorMsg += (errorMsg ? '\n' : '') + tempError;
    }
    
    if (!errorMsg) {
      errorMsg = crashed ? 'Test process crashed (no test execution)' : 'Test failed (no error output)';
    }
    
    return errorMsg;
  }

  private sortTestResults(testResults: TestResult[]): TestResult[] {
    return testResults.sort((a, b) => {
      const dirA = path.dirname(a.name);
      const dirB = path.dirname(b.name);
      const fileA = path.basename(a.name);
      const fileB = path.basename(b.name);
      
      if (dirA !== dirB) {
        return dirA.localeCompare(dirB);
      }
      
      return fileA.localeCompare(fileB);
    });
  }

  private generateSummary(testResults: TestResult[], baseUrl: string, wallClockStart: number): void {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const timestamp = `${pad(now.getMonth()+1)}/${pad(now.getDate())}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    
    const wallClockEnd = Date.now();
    const wallClockDuration = wallClockEnd - wallClockStart;
    const wallClockSeconds = wallClockDuration / 1000;
    const totalRunTimeStr = wallClockSeconds >= 60 ? 
      (wallClockSeconds / 60).toFixed(1) + ' min' : 
      wallClockSeconds.toFixed(2) + 's';

    generateTestSummary(testResults, {
      resultsDir: RESULTS_DIR,
      governanceType: this.args.governanceType!,
      timestamp,
      totalRunTimeStr,
      wallClockDuration,
      baseUrl,
      openSummary: !process.env.SCREENSHOTS_DIR,
      skipMarkdown: !!process.env.SKIP_MARKDOWN
    });
  }
}

class AllGovernanceRunner {
  constructor(private args: ParsedArgs) {}

  async run(): Promise<void> {
    await EnvironmentManager.initializeReleaseEnvironment();
    
    const { baseUrl } = EnvironmentManager.displayBaseUrlInfo(this.args.isChildProcess);
    
    FileSystemManager.ensureDirectoryExists(RESULTS_DIR);
    
    const wallClockStart = Date.now();
    const stats = this.initializeStats();
    const resultsByGov: Record<string, Record<string, { result: string, runTime: string, screenshot: string }>> = {};
    const allTestNames = new Set<string>();
    const allSummaries: string[] = [];
    
    // Run general tests
    await this.runGovernanceType('general', resultsByGov, allTestNames, allSummaries, stats);
    
    // Run governance-specific tests
    for (const governanceType of GOVERNANCE_TYPES) {
      await this.runGovernanceType(governanceType, resultsByGov, allTestNames, allSummaries, stats);
    }
    
    await this.generateCombinedSummary(resultsByGov, allTestNames, wallClockStart, stats, allSummaries, baseUrl);
    
    process.exit(stats.allPassed ? 0 : 1);
  }

  private initializeStats() {
    return {
      allPassed: true,
      firstTimestamp: '',
      totalDuration: 0,
      totalPassed: 0,
      totalFailed: 0,
      totalCrashed: 0,
      totalSkipped: 0,
      totalCount: 0
    };
  }

  private async runGovernanceType(
    governanceType: GovernanceType,
    resultsByGov: Record<string, Record<string, { result: string, runTime: string, screenshot: string }>>,
    allTestNames: Set<string>,
    allSummaries: string[],
    stats: any
  ): Promise<void> {
    console.log(`\n===== Running tests for governance: ${governanceType} =====`);
    
    const screenshotsDir = path.join(RESULTS_DIR, 'screenshots', governanceType);
    FileSystemManager.ensureDirectoryExists(screenshotsDir);
    FileSystemManager.deleteAllScreenshots(screenshotsDir);
    
    resultsByGov[governanceType] = {};
    
    await this.executeGovernanceTests(governanceType, screenshotsDir, resultsByGov, allTestNames, allSummaries, stats);
  }

  private async executeGovernanceTests(
    governanceType: GovernanceType,
    screenshotsDir: string,
    resultsByGov: Record<string, Record<string, { result: string, runTime: string, screenshot: string }>>,
    allTestNames: Set<string>,
    allSummaries: string[],
    stats: any
  ): Promise<void> {
    return new Promise((resolve) => {
      const args = ['src/run-tests.ts', `--governance=${governanceType}`];
      if (this.args.debugMode) args.push('--debug');
      
      const proc = spawn('npx', ['ts-node', ...args], {
        stdio: 'inherit',
        shell: true,
        env: { 
          ...process.env, 
          SCREENSHOTS_DIR: screenshotsDir,
          SKIP_MARKDOWN: 'true'
        },
      });
      
      proc.on('close', (code) => {
        this.parseAndStoreResults(governanceType, resultsByGov, allTestNames, allSummaries, stats);
        
        if (code !== 0) stats.allPassed = false;
        resolve(undefined);
      });
    });
  }

  private parseAndStoreResults(
    governanceType: GovernanceType,
    resultsByGov: Record<string, Record<string, { result: string, runTime: string, screenshot: string }>>,
    allTestNames: Set<string>,
    allSummaries: string[],
    stats: any
  ): void {
    const htmlPath = path.join(RESULTS_DIR, 'test-results-summary.html');
    if (!fs.existsSync(htmlPath)) return;
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Parse individual test results
    const testResults = HtmlResultParser.parseTestResultsFromHtml(htmlContent);
    testResults.forEach(({ testName, result, runTime, screenshot }) => {
      allTestNames.add(testName);
      resultsByGov[governanceType][testName] = { result, runTime, screenshot };
    });
    
    // Parse totals
    const totals = HtmlResultParser.parseTotalsFromHtml(htmlContent);
    if (!stats.firstTimestamp && totals.timestamp) {
      stats.firstTimestamp = totals.timestamp;
    }
    
    stats.totalDuration += totals.duration;
    stats.totalPassed += totals.passed;
    stats.totalCount += totals.total;
    stats.totalFailed += totals.failed;
    stats.totalCrashed += totals.crashed;
    stats.totalSkipped += totals.skipped;
    
    // Store HTML for combined summary
    const updatedHtml = HtmlResultParser.updateScreenshotPaths(htmlContent, governanceType);
    allSummaries.push(`<h2>Results for governance: ${governanceType}</h2>\n` + updatedHtml);
  }

  private async generateCombinedSummary(
    resultsByGov: Record<string, Record<string, { result: string, runTime: string, screenshot: string }>>,
    allTestNames: Set<string>,
    wallClockStart: number,
    stats: any,
    allSummaries: string[],
    baseUrl: string
  ): Promise<void> {
    await generateCombinedSummary(
      resultsByGov,
      allTestNames,
      wallClockStart,
      stats.firstTimestamp,
      stats.totalPassed,
      stats.totalCount,
      stats.totalFailed,
      stats.totalCrashed,
      stats.totalSkipped,
      stats.totalDuration,
      RESULTS_DIR,
      allSummaries,
      baseUrl
    );
  }
}

// Main execution
async function main(): Promise<void> {
  const argParser = new ArgumentParser();
  const args = argParser.parse();
  
  EnvironmentManager.setupEnvironmentVariables(args);
  
  switch (args.mode) {
    case 'single-file':
      const singleFileRunner = new SingleFileRunner(args, argParser);
      await singleFileRunner.run();
      break;
      
    case 'all-governance':
      const allGovernanceRunner = new AllGovernanceRunner(args);
      await allGovernanceRunner.run();
      break;
      
    case 'single-governance':
      const singleGovernanceRunner = new SingleGovernanceRunner(args);
      await singleGovernanceRunner.run();
      break;
  }
}

// Execute main function
main().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
