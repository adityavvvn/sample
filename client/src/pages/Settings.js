import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-4">
        <SettingsIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Account & Preferences</h2>
        <p className="text-gray-600">Settings functionality will be added in a future phase.</p>
      </div>
    </div>
  );
};

export default Settings; 