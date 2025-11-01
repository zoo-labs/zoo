import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: string;
  action: () => void;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const searchItems: SearchItem[] = [
    {
      id: 'dgx-spark',
      title: 'DGX Spark',
      description: '$4,000 - Dedicated DGX Instance with 100 Hours Compute',
      category: 'Product',
      action: () => {
        navigate('/#pricing');
        setTimeout(() => {
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        onClose();
      },
    },
    {
      id: 'gpu-on-demand',
      title: 'GPU On-Demand',
      description: 'Usage-Based - H100 & H200 GPUs',
      category: 'Product',
      action: () => {
        navigate('/#pricing');
        setTimeout(() => {
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        onClose();
      },
    },
    {
      id: 'enterprise',
      title: 'Enterprise & Resale',
      description: 'Custom SuperPODs and Hardware Procurement',
      category: 'Product',
      action: () => {
        navigate('/#pricing');
        setTimeout(() => {
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        onClose();
      },
    },
    {
      id: 'dgx-h100',
      title: 'NVIDIA DGX H100',
      description: 'The Universal AI System - 8x H100 GPUs, 32 PFLOPS',
      category: 'Hardware',
      action: () => {
        navigate('/#hardware');
        setTimeout(() => {
          document.getElementById('hardware')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        onClose();
      },
    },
    {
      id: 'h200-gpu',
      title: 'NVIDIA H200 GPU',
      description: 'The Generative AI Engine - 141GB HBM3e Memory',
      category: 'Hardware',
      action: () => {
        navigate('/#hardware');
        setTimeout(() => {
          document.getElementById('hardware')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        onClose();
      },
    },
    {
      id: 'h100-gpu',
      title: 'NVIDIA H100 GPU',
      description: 'The AI Workhorse - 80GB HBM3 Memory',
      category: 'Hardware',
      action: () => {
        navigate('/#hardware');
        setTimeout(() => {
          document.getElementById('hardware')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        onClose();
      },
    },
    {
      id: 'features',
      title: 'Features',
      description: 'Elite NVIDIA Hardware, Scalability, Optimized AI Stack',
      category: 'Section',
      action: () => {
        navigate('/#features');
        setTimeout(() => {
          document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        onClose();
      },
    },
    {
      id: 'pricing',
      title: 'Pricing',
      description: 'No Subscriptions. Just Compute.',
      category: 'Section',
      action: () => {
        navigate('/#pricing');
        setTimeout(() => {
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        onClose();
      },
    },
    {
      id: 'cart',
      title: 'Shopping Cart',
      description: 'View your cart and checkout',
      category: 'Page',
      action: () => {
        navigate('/cart');
        onClose();
      },
    },
    {
      id: 'account',
      title: 'My Account',
      description: 'View orders and account details',
      category: 'Page',
      action: () => {
        navigate('/account');
        onClose();
      },
    },
  ];

  const filteredItems = query
    ? searchItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchItems;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-dark-card border border-dark-border rounded-xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-dark-border">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products, hardware, sections..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
          />
          <kbd className="hidden sm:inline-block px-2 py-1 text-xs text-gray-400 bg-dark-bg border border-dark-border rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-400">
              No results found for "{query}"
            </div>
          ) : (
            <div className="py-2">
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`w-full px-4 py-3 flex items-center gap-4 transition-colors ${
                    index === selectedIndex
                      ? 'bg-primary/10 border-l-2 border-primary'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">{item.title}</span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-dark-bg border-t border-dark-border flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-dark-card border border-dark-border rounded">↑</kbd>
              <kbd className="px-2 py-1 bg-dark-card border border-dark-border rounded">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-dark-card border border-dark-border rounded">↵</kbd>
              to select
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
