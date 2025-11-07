import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Brain, Shield, Search } from 'lucide-react';

type Tab = 'optimize' | 'advanced' | 'technical' | 'research';

interface ResultsTabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const tabs = [
  { id: 'optimize', icon: FileText, label: 'Optimized Content' },
  { id: 'advanced', icon: Brain, label: 'Advanced Analysis' },
  { id: 'technical', icon: Shield, label: 'Technical SEO' },
  { id: 'research', icon: Search, label: 'Keyword Research' },
];

const ResultsTabs: React.FC<ResultsTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab(tab.id as Tab)}
          className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
              : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
          }`}
        >
          <tab.icon className="w-5 h-5" />
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
};

export default ResultsTabs;
