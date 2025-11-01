
import React from 'react';

const Logo: React.FC = () => (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 67 67" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white">
          <path d="M22.21 67V44.6369H0V67H22.21Z" fill="currentColor"></path>
          <path d="M0 44.6369L22.21 46.8285V44.6369H0Z" fill="currentColor" opacity="0.7"></path>
          <path d="M66.7038 22.3184H22.2534L0.0878906 44.6367H44.4634L66.7038 22.3184Z" fill="currentColor"></path>
          <path d="M22.21 0H0V22.3184H22.21V0Z" fill="currentColor"></path>
          <path d="M66.7198 0H44.5098V22.3184H66.7198V0Z" fill="currentColor"></path>
          <path d="M66.6753 22.3185L44.5098 20.0822V22.3185H66.6753Z" fill="currentColor" opacity="0.7"></path>
          <path d="M66.7198 67V44.6369H44.5098V67H66.7198Z" fill="currentColor"></path>
      </svg>
      <div className="text-xl font-bold tracking-wider">
          <span className="text-white">Zoo</span>
      </div>
    </div>
  );

const SocialIcon: React.FC<{ href: string, children: React.ReactNode, 'aria-label': string }> = ({ href, children, 'aria-label': ariaLabel }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300" aria-label={ariaLabel}>
        {children}
    </a>
);

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark-bg border-t border-dark-border">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <Logo />
                        <p className="mt-4 text-gray-400 max-w-xs">
                            Zoo Computer - Enterprise AI supercomputing hardware sales and long-term GPU leasing.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:col-span-2">
                        <div>
                            <h4 className="text-white font-bold tracking-wider mb-4">Products</h4>
                            <ul className="space-y-3">
                                <li><a href="/#hardware" className="text-gray-400 hover:text-white">Hardware</a></li>
                                <li><a href="/#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                                <li><a href="/#features" className="text-gray-400 hover:text-white">Features</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold tracking-wider mb-4">Zoo Ecosystem</h4>
                            <ul className="space-y-3">
                                <li><a href="http://localhost:3000" className="text-gray-400 hover:text-white">Zoo AI</a></li>
                                <li><a href="http://localhost:3002" className="text-gray-400 hover:text-white">Zoo Foundation</a></li>
                                <li><a href="http://localhost:3003" className="text-gray-400 hover:text-white">Zoo Network</a></li>
                                <li><a href="http://localhost:3004" className="text-gray-400 hover:text-white">Zoo Vote</a></li>
                                <li><a href="http://localhost:3005" className="text-gray-400 hover:text-white">Zoo Fund</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold tracking-wider mb-4">Legal</h4>
                            <ul className="space-y-3">
                                <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                                <li><a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-dark-border pt-8 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">&copy; {currentYear} Zoo Labs Foundation. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 sm:mt-0">
                        <SocialIcon href="https://x.com/zoo" aria-label="Zoo on X">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        </SocialIcon>
                         <SocialIcon href="https://github.com/zoo-labs" aria-label="Zoo on GitHub">
                           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12.019c0 4.438 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.019C22 6.477 17.523 2 12 2z" clipRule="evenodd" /></svg>
                        </SocialIcon>
                         <SocialIcon href="https://www.linkedin.com/company/zoo-labs" aria-label="Zoo on LinkedIn">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"/></svg>
                        </SocialIcon>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
