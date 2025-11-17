// Utility to get component source code for code preview
// This uses dynamic imports to fetch the actual source files

export const getComponentSourcePath = (
  category: string,
  componentName: string
): string => {
  // Remove spaces and get the component file name
  const fileName = componentName.replace(/\s+/g, '');
  
  // Map category names to folder names
  const categoryMap: Record<string, string> = {
    'AnnouncementBars': 'AnnouncementBar',
    'Navbar': 'Navbar',
    'Hero': 'Hero',
    'StaticBanner': 'StaticBanner',
    'Category': 'Category',
    'ProductCards': 'ProductCards',
    'SpecialOffersSlider': 'SpecialOffersSlider',
    'Badges': 'Badges',
    'Reviews': 'Reviews',
    'Brands': 'Brands',
    'Footers': 'Footers',
  };

  const folderName = categoryMap[category] || category;
  return `src/components/${folderName}/${fileName}.tsx`;
};

// Fetch component source code from GitHub or local files
export const fetchComponentSource = async (
  category: string,
  componentName: string
): Promise<string> => {
  const filePath = getComponentSourcePath(category, componentName);
  
  try {
    // Try to fetch from the raw component files
    // In production, you might fetch from GitHub raw content
    const response = await fetch(`/${filePath}`);
    
    if (response.ok) {
      return await response.text();
    }
    
    // Fallback to a template
    const fileName = componentName.replace(/\s+/g, '');
    return generateComponentTemplate(category, componentName, fileName);
  } catch (error) {
    // Return template as fallback
    const fileName = componentName.replace(/\s+/g, '');
    return generateComponentTemplate(category, componentName, fileName);
  }
};

const generateComponentTemplate = (
  category: string,
  componentName: string,
  fileName: string
): string => {
  return `// ${componentName} Code
// File: ${getComponentSourcePath(category, componentName)}

import React from 'react';

const ${fileName}: React.FC = () => {
  return (
    <div>
      {/* ${componentName} component implementation */}
      {/* This is a placeholder. Run in dev mode to see actual source */}
    </div>
  );
};

export default ${fileName};`;
};
