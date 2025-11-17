# Components Architecture

This folder contains all the reusable UI components organized by category.

## Structure

```
components/
├── Headers/          # Header components (Header1-4)
├── Cards/            # Card components (Card1-5)
├── Navbar/           # Navigation components (Navbar1-3)
├── Buttons/          # Button variants
├── Forms/            # Form components
├── Footers/          # Footer components
├── Modals/           # Modal/Dialog components
├── Tables/           # Table components
├── Alerts/           # Alert/Notification components
├── Badges/           # Badge components
└── index.tsx         # Component registry and exports
```

## Usage

All components are registered in the `index.tsx` file and can be accessed dynamically:

```tsx
import { getComponent } from '../components';

const Component = getComponent('Headers', 'Header 1');
if (Component) {
  return <Component />;
}
```

## Adding New Components

1. Create a new folder for your category (if it doesn't exist)
2. Create individual component files (e.g., `NewComponent.tsx`)
3. Export them from the category's `index.tsx`
4. Register them in the main `components/index.tsx`
5. Update the categories object in `zatiq-components.tsx`

## Component Template

```tsx
import React from 'react';

const ComponentName: React.FC = () => {
  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default ComponentName;
```

## TypeScript Types

All types are defined in `src/Types/PageTypes.ts` for type safety and better IDE support.
