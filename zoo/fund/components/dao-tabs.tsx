'use client'

import { useState, ReactNode } from 'react'

export interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface DAOTabsProps {
  tabs: Tab[]
  defaultTab?: string
}

export function DAOTabs({ tabs, defaultTab }: DAOTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-white/10 mb-8">
        <div className="container">
          <div className="flex gap-8 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 text-lg font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-[#667eea]'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container">{activeTabContent}</div>
    </div>
  )
}
