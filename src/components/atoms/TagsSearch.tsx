"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TagsSearchProps {
  tags: string[];
}

export function TagsSearch({ tags }: TagsSearchProps) {
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTags = searchParams.get("tags");

  useEffect(() => {
    if (searchTags) {
      setSelectedTags(searchTags.split(","));
    }
  }, [searchTags]);

  const updateURL = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    } else {
      params.delete("tags");
    }
    router.push(`?${params.toString()}`);
  }, [selectedTags, router, searchParams]);

  useEffect(() => {
    updateURL();
  }, [selectedTags, updateURL]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
    setOpen(false);
  };

  // Separate tags into selected and unselected
  const selected = tags.filter(tag => selectedTags.includes(tag));
  const unselected = tags.filter(tag => !selectedTags.includes(tag));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className="flex w-[170px] cursor-pointer justify-between"
          aria-haspopup="true"
          aria-expanded={open}
        >
          Choose tag <Plus className="ml-1 size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Search tags..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="z-0">
              {[...selected, ...unselected].map(tag => (
                <CommandItem
                  key={tag}
                  value={tag}
                  onSelect={() => handleTagSelect(tag)}
                  className={cn(
                    "flex cursor-pointer justify-between data-[selected=true]:!opacity-100",
                    selectedTags.includes(tag) && "!opacity-100"
                  )}
                  aria-selected={selectedTags.includes(tag)}
                >
                  {tag} {selectedTags.includes(tag) && <Check />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
