import React, { ReactNode, FC, memo } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";

interface TabsProps {
  items: string[];
  children: ReactNode[];
  defaultIndex?: number;
}

const TabsComponent: FC<TabsProps> = ({
  items,
  children,
  defaultIndex = 0,
}) => {
  const defaultValue = items[defaultIndex];

  return (
    <RadixTabs.Root
      defaultValue={defaultValue}
      className="flex w-full flex-col"
    >
      <RadixTabs.List className="flex border-b border-gray-800">
        {items.map(item => (
          <RadixTabs.Trigger
            key={item}
            value={item}
            className="TabsTrigger cursor-pointer border-none bg-none px-4 py-2 text-lg transition-colors"
            aria-label={`Tab for ${item}`}
          >
            {item}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {React.Children.map(children, (child, index) => (
        <RadixTabs.Content key={index} value={items[index]} className="p-4">
          {child}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
};

TabsComponent.displayName = "Tabs";

const Tab: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="rounded">{children}</div>;
};

Tab.displayName = "Tabs.Tab";

const Tabs = memo(TabsComponent) as unknown as FC<TabsProps> & {
  Tab: FC<{ children: ReactNode }>;
};
Tabs.Tab = Tab;

export default Tabs;
