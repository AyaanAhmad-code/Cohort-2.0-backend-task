import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { 
  getRecipesFromStorage, 
  clearRecipesStorage, 
  exportRecipesToJSON, 
  importRecipesFromJSON 
} from '../hooks/useLocalStorage';

const StorageSettings = ({ data, setData }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [importInput, setImportInput] = useState(null);

  const handleClearStorage = () => {
    if (window.confirm('⚠️ This will delete all recipes! Are you sure?')) {
      clearRecipesStorage();
      setData([]);
      toast.success('✓ All recipes cleared from storage!');
      setShowSettings(false);
    }
  };

  const handleExport = () => {
    const success = exportRecipesToJSON(data);
    if (success) {
      toast.success('✓ Recipes exported successfully!');
    } else {
      toast.error('Failed to export recipes');
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const recipes = await importRecipesFromJSON(file);
      setData(recipes);
      toast.success(`✓ ${recipes.length} recipes imported successfully!`);
      setImportInput(null);
    } catch (error) {
      toast.error(`Failed to import: ${error.message}`);
    }
  };

  const getStorageInfo = () => {
    try {
      const stored = localStorage.getItem('recipes');
      const size = stored ? (new Blob([stored]).size / 1024).toFixed(2) : 0;
      return { count: data.length, size };
    } catch {
      return { count: 0, size: 0 };
    }
  };

  const storageInfo = getStorageInfo();

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110 z-40"
        title="Storage Settings"
      >
        💾
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">📊 Storage Info</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Storage Statistics */}
            <div className="bg-gray-700/50 rounded-lg p-4 mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Recipes:</span>
                <span className="text-amber-400 font-bold text-lg">{storageInfo.count}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Storage Used:</span>
                <span className="text-amber-400 font-bold text-lg">{storageInfo.size} KB</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((storageInfo.size / 50) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {/* Export Button */}
              <button
                onClick={handleExport}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                📥 Export as JSON
              </button>

              {/* Import Button */}
              <label className="w-full block">
                <input
                  ref={(input) => setImportInput(input)}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
                <button
                  onClick={() => importInput?.click()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  📤 Import from JSON
                </button>
              </label>

              {/* Clear Button */}
              <button
                onClick={handleClearStorage}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                🗑️ Clear All Storage
              </button>
            </div>

            {/* Info Text */}
            <p className="text-xs text-gray-400 mt-4 text-center">
              Recipes are automatically saved to your browser's local storage whenever you create, update, or delete them.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageSettings;
