# react-tabbed-components

![Travis (.com)](https://img.shields.io/travis/com/gavinsykes/react-tabbed-components)
[![codecov](https://codecov.io/gh/gavinsykes/react-tabbed-components/branch/master/graph/badge.svg)](https://codecov.io/gh/gavinsykes/react-tabbed-components)
![GitHub top language](https://img.shields.io/github/languages/top/gavinsykes/react-tabbed-components)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/gavinsykes/react-tabbed-components)

## Display your React components as tabs

### Installation

`npm install --registry https://npm.pkg.github.com @gavinsykes/react-tabbed-components`

### Usage and Interface

```typescript
interface TabbedComponentsProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  onChangeTab?: MouseEventHandler<HTMLLIElement>; // Custom tab change handler, e is exposed for access to the DOM node that is clicked
  defaultActiveTabIndex?: number; // Defaults to 0, also rolls back to 0 if higher than the length of provided tabs
}
```

```tsx
import { TabbedComponents } from '@gavinsykes/react-tabbed-components';

<TabbedComponents>
  <TabbedComponents.TabsList>
    <TabbedComponents.Tab>Tab 1</TabbedComponents.Tab>
  </TabbedComponents.TabsList>
  <TabbedComponents.Display>
    <Children />
    {/*  The number of children **must** match the number of tabs provided above */}
  </TabbedComponents.Display>
</TabbedComponents>

// Result:
<div>
  <ul>
    <li data-active="true" data-index="0">Tab 1</li>
  </ul>
  <div>
    <...Children>
  </div>
</div>
```

The `data-active` property will alternate between true and false based on which tab is currently being shown