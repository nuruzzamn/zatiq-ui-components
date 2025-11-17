import React, { useState, useEffect } from "react";
import { Menu, X, Code, Eye, Copy, Check } from "lucide-react";
import type { Categories, ViewMode } from "../Types/PageTypes";
import { getComponent } from "../components";
import { tokenizeCode, getTokenColor } from "../utils/syntaxHighlight";

const ZatiqComponents: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("AnnouncementBars");
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories: Categories = {
    AnnouncementBars: [
      "AnnouncementBar 1",
      "AnnouncementBar 2",
      "AnnouncementBar 3",
    ],
    Navbar: ["Navbar 1", "Navbar 2", "Navbar 3", "Navbar 4"],
    Hero: ["Hero 1", "Hero 2", "Hero 3", "Hero 4"],
    StaticBanner: [
      "StaticBanner 1",
      "StaticBanner 2",
      "StaticBanner 3",
      "StaticBanner 4",
    ],
    Category: [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
      "Category 5",
      "Category 6",
    ],
    ProductCards: [
      "ProductCards 1",
      "ProductCards 2",
      "ProductCards 3",
      "ProductCards 4",
      "ProductCards 5",
      "ProductCards 6",
      "ProductCards 7",
      "ProductCards 8",
    ],
    SpecialOffersSlider: [
      "SpecialOffersSlider 1",
      "SpecialOffersSlider 2",
      "SpecialOffersSlider 3",
      "SpecialOffersSlider 4",
      "SpecialOffersSlider 5",
    ],
    Badges: ["Badges 1", "Badges 2", "Badges 3"],
    Reviews: ["Reviews 1", "Reviews 2", "Reviews 3"],
    Brands: ["Brands 1", "Brands 2", "Brands 3"],
    Footers: ["Footers 1", "Footers 2"],
    PaymentStatus: ["PaymentStatus 1", "PaymentStatus 2"],
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const copyToClipboard = async (code: string, componentName: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(componentName);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Get actual component source code
  const getComponentSource = async (category: string, componentName: string): Promise<string> => {
    const fileName = componentName.replace(/\s+/g, '');
    const categoryFolder = category === 'AnnouncementBars' ? 'AnnouncementBar' : category;

    try {
      // Try to import the actual module source
      const modules = import.meta.glob('../components/**/*.tsx', {
        query: '?raw',
        import: 'default',
      });

      const path = `../components/${categoryFolder}/${fileName}.tsx`;

      if (modules[path]) {
        const source = await modules[path]() as string;
        return source;
      }
    } catch (error) {
      console.error('Error loading source:', error);
    }

    // Fallback template
    return `// ${componentName}
// File: src/components/${categoryFolder}/${fileName}.tsx

import React from 'react';

const ${fileName}: React.FC = () => {
  return (
    <div>
      {/* Component implementation */}
    </div>
  );
};

export default ${fileName};`;
  };

  // Render all components in the selected category
  const renderAllComponents = () => {
    const componentList = categories[selectedCategory] || [];

    return (
      <div className="space-y-12">
        {componentList.map((componentName) => {
          const Component = getComponent(selectedCategory, componentName);

          return (
            <div key={componentName} className="space-y-4">
              <div className="flex items-center gap-3 pb-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {componentName}
                </h3>
              </div>
              <div className="">
                {Component ? (
                  <Component />
                ) : (
                  <div className="bg-gray-100 p-12 rounded-lg text-center">
                    <p className="text-gray-600">
                      Component preview coming soon...
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render code view for all components in the selected category
  const renderAllComponentsCode = () => {
    const componentList = categories[selectedCategory] || [];

    return (
      <div className="space-y-6 sm:space-y-8">
        {componentList.map((componentName) => {
          return <CodeBlock key={componentName} componentName={componentName} />;
        })}
      </div>
    );
  };

  // Code Block Component with async loading
  const CodeBlock: React.FC<{ componentName: string }> = ({ componentName }) => {
    const [sourceCode, setSourceCode] = useState<string>('// Loading...');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const loadSource = async () => {
        setIsLoading(true);
        const code = await getComponentSource(selectedCategory, componentName);
        setSourceCode(code);
        setIsLoading(false);
      };
      loadSource();
    }, [componentName]);

    const isCopied = copiedCode === componentName;
    const componentFileName = componentName.replace(/\s+/g, '');
    const categoryFolder = selectedCategory === 'AnnouncementBars' ? 'AnnouncementBar' : selectedCategory;

    return (
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-gray-700 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
            <h3 className="text-base sm:text-lg font-semibold text-white">
              {componentName}
            </h3>
            <span className="hidden md:inline text-xs text-gray-500 font-mono break-all">
              src/components/{categoryFolder}/{componentFileName}.tsx
            </span>
          </div>
          <button
            onClick={() => copyToClipboard(sourceCode, componentName)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm self-start sm:self-auto shrink-0"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="hidden xs:inline">Copy Code</span>
                <span className="xs:hidden">Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="bg-gray-950 rounded-lg border border-gray-800 overflow-hidden">
          <div className="bg-gray-900 px-2 sm:px-4 py-2 border-b border-gray-800 flex items-center gap-2">
            <div className="hidden sm:flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-gray-500 sm:ml-2 font-mono truncate">
              {componentFileName}.tsx
            </span>
          </div>
          <div className="p-2 sm:p-4 md:p-6 overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-4 h-4 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
                <span>Loading component source...</span>
              </div>
            ) : (
              <pre className="text-xs sm:text-sm">
                <code className="language-tsx">
                  {sourceCode.split('\n').map((line, i) => {
                    const tokens = tokenizeCode(line);
                    return (
                      <div key={i} className="flex hover:bg-gray-800/50">
                        <span className="text-gray-600 select-none w-8 sm:w-10 md:w-12 text-right pr-2 sm:pr-3 md:pr-4 shrink-0 text-xs">
                          {i + 1}
                        </span>
                        <span className="flex-1 break-all sm:break-normal">
                          {tokens.map((token, j) => (
                            <span key={j} className={getTokenColor(token.type)}>
                              {token.content}
                            </span>
                          ))}
                          {line === '' && <span>&nbsp;</span>}
                        </span>
                      </div>
                    );
                  })}
                </code>
              </pre>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${viewMode === 'code' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Top Hero */}
      <header className={`${viewMode === 'code' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50`}>
        <div className="px-2 sm:px-4 py-3 sm:py-4 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-1.5 sm:p-2 rounded-lg ${viewMode === 'code' ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'}`}
            >
              {sidebarOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </button>
            <h1 className={`text-lg sm:text-xl md:text-2xl font-bold ${viewMode === 'code' ? 'text-white' : 'text-gray-900'}`}>
              <span className="hidden sm:inline">Zatiq Components</span>
              <span className="sm:hidden">Zatiq</span>
            </h1>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={() => setViewMode("preview")}
              className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${viewMode === "preview"
                  ? "bg-purple-600 text-white"
                  : viewMode === 'code'
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden lg:block">Preview</span>
            </button>
            <button
              onClick={() => setViewMode("code")}
              className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${viewMode === "code"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <Code size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Code</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className={`w-56 sm:w-64 border-r min-h-screen p-3 sm:p-4 ${viewMode === 'code' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} fixed lg:static inset-y-0 left-0 z-40 lg:z-auto overflow-y-auto`}>
            <div className="mb-4 sm:mb-6">
              <p className={`text-xs sm:text-sm mb-2 ${viewMode === 'code' ? 'text-gray-400' : 'text-gray-500'}`}>
                Browse beautiful UI components
              </p>
            </div>

            <div className="space-y-1">
              {Object.entries(categories).map(([category, components]) => (
                <button
                  key={category}
                  onClick={() => {
                    selectCategory(category);
                    // Close sidebar on mobile after selection
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-colors text-sm sm:text-base ${selectedCategory === category
                      ? "bg-purple-600 text-white font-medium"
                      : viewMode === 'code'
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <span className="font-medium truncate pr-2">{category}</span>
                  <span
                    className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded shrink-0 ${selectedCategory === category
                        ? "bg-purple-700 text-white"
                        : viewMode === 'code'
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {components.length}
                  </span>
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className={`flex-1 py-2 px-2 sm:px-3 md:px-4 lg:px-8 ${viewMode === 'code' ? 'bg-gray-900 overflow-auto' : ''} min-h-screen`}>
          <div className="mb-4 sm:mb-6">
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${viewMode === 'code' ? 'text-white' : 'text-gray-900'}`}>
              {selectedCategory}
            </h2>
            <p className={`text-sm sm:text-base ${viewMode === 'code' ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedCategory} • {categories[selectedCategory]?.length || 0}{" "}
              components
            </p>
          </div>

          {viewMode === "preview"
            ? renderAllComponents()
            : renderAllComponentsCode()}
        </main>
      </div>
    </div>
  );
};

export default ZatiqComponents;
