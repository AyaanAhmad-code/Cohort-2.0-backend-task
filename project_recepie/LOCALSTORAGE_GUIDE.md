# localStorage Implementation Guide

## Overview
This application now includes comprehensive localStorage functionality to persist recipes and maintain state across browser sessions.

## Features Implemented

### 1. **Automatic Recipe Persistence**
- ✅ All recipes are automatically saved to browser's localStorage
- ✅ Data persists across page refreshes and browser restarts
- ✅ Updates happen in real-time as you create, edit, or delete recipes

### 2. **Context-based Storage**
- Location: `src/context/RecipeContext.jsx`
- Includes:
  - `getStoredRecipes()` - Retrieves recipes from localStorage
  - `saveRecipesToStorage()` - Saves recipes to localStorage
  - Auto-sync with `useEffect()` hook
  - Lazy initialization on component mount

### 3. **Custom Hooks**
- Location: `src/hooks/useLocalStorage.js`
- Provides:
  - `useLocalStorage(key, initialValue)` - Generic localStorage hook
  - `getRecipesFromStorage()` - Get all recipes
  - `saveRecipesToStorage()` - Save recipes
  - `clearRecipesStorage()` - Clear all recipes
  - `exportRecipesToJSON()` - Export recipes as JSON file
  - `importRecipesFromJSON()` - Import recipes from JSON file

### 4. **Storage Settings Panel**
- Location: `src/components/StorageSettings.jsx`
- Features:
  - 💾 Fixed button in bottom-right corner
  - 📊 Real-time storage statistics (recipe count, KB used)
  - 📥 Export recipes as JSON backup
  - 📤 Import recipes from JSON file
  - 🗑️ Clear all stored recipes
  - Visual storage usage indicator

## How It Works

### Initial Load
```javascript
const [data, setData] = useState(() => {
  const stored = getStoredRecipes();
  return stored && stored.length > 0 ? stored : seeded;
});
```
- On app launch, checks localStorage for existing recipes
- If found, loads them; otherwise, uses 24 seeded sample recipes
- Initial 24 recipes are stored in localStorage for persistence

### Auto-Save
```javascript
useEffect(() => {
  saveRecipesToStorage(data);
}, [data])
```
- Every time `data` state changes, it's automatically saved to localStorage
- Happens when you: create, update, or delete a recipe

### Storage Keys Used
- **Key**: `"recipes"`
- **Format**: JSON array of recipe objects
- **Sample Size**: ~24 recipes = 2-3 KB

## Usage Examples

### Creating a Recipe
1. Click "Create" in navbar
2. Fill out recipe form
3. Click "Create Recipe"
4. ✅ Recipe auto-saved to localStorage
5. Toast notification confirms: "✓ Recipe created and saved to storage!"

### Editing a Recipe
1. Click on any recipe card
2. Modify fields in the edit form
3. Click "✓ Update Recipe"
4. ✅ Changes auto-saved to localStorage
5. Toast notification confirms: "✓ Recipe updated and saved to storage!"

### Deleting a Recipe
1. Click on recipe card
2. Click "🗑️ Delete Recipe"
3. ✅ Recipe removed from localStorage
4. Toast notification confirms: "✓ Recipe deleted and removed from storage!"

### Export Recipes
1. Click 💾 button (bottom-right)
2. Click "📥 Export as JSON"
3. JSON file downloads: `recipes_backup_YYYY-MM-DD.json`
4. Safe backup of all your recipes

### Import Recipes
1. Click 💾 button (bottom-right)
2. Click "📤 Import from JSON"
3. Select previously exported JSON file
4. All recipes loaded and saved
5. Toast shows: "✓ 24 recipes imported successfully!"

### Clear All Storage
1. Click 💾 button (bottom-right)
2. Click "🗑️ Clear All Storage"
3. Confirm warning dialog
4. ✅ All recipes removed from localStorage
5. App resets to empty state (close and reopen to reseed)

## Technical Details

### Storage Limits
- Browser localStorage limit varies by browser (typically 5-10MB)
- Current app uses ~2-3KB for 24 recipes
- Can store 1000+ recipes safely

### Error Handling
```javascript
try {
  const stored = localStorage.getItem('recipes');
  return stored ? JSON.parse(stored) : null;
} catch (error) {
  console.error('Error reading from localStorage:', error);
  return null;
}
```
- All storage operations wrapped in try-catch
- Errors logged to console
- App gracefully falls back to defaults

### Data Structure
```javascript
{
  id: "unique-nanoid",
  image: "https://...",
  title: "Recipe Name",
  chef: "Chef Name",
  description: "...",
  ingredients: "comma,separated,list",
  instructions: "comma,separated,steps",
  category: "breakfast|lunch|dinner|dessert"
}
```

## Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Privacy & Storage
- Data stored **locally in your browser only**
- No data sent to servers
- Data persists until manually cleared or browser storage cleared
- Clearing browser cache/cookies may clear localStorage depending on settings

## Tips & Tricks
1. **Regular Backups**: Export your recipes weekly using the 📥 button
2. **Sync Across Devices**: Export on one device, import on another
3. **Development**: Clear storage during development with 🗑️ button
4. **Multiple Collections**: Export/import different recipe sets as backups

## Troubleshooting

### Recipes Not Saving?
- Check browser console for errors
- Verify localStorage is enabled in browser settings
- Check storage quota not exceeded

### Import Not Working?
- Ensure JSON file format is correct
- Verify file is from export feature
- Check browser console for error details

### Storage Settings Won't Open?
- Verify `StorageSettings.jsx` imported in `App.jsx`
- Check browser console for React errors
- Try clearing cache and reloading

## Future Enhancements
- [ ] Cloud sync with backend
- [ ] Multiple storage profiles
- [ ] Compressed storage format
- [ ] Search, filter persistence
- [ ] Theme preference storage
