import React, { ReactNode } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";

interface TabsProps {
  items: string[];
  children: ReactNode[];
  defaultIndex?: number;
}

export const Tabs: React.FC<TabsProps> = ({
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
            key={item} // Ensure a stable key using item (assuming items are unique)
            value={item}
            className="TabsTrigger cursor-pointer border-none bg-none px-4 py-2 text-lg transition-colors"
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
