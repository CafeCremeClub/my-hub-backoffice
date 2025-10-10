'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface DropdownItem<T = unknown> {
  key: string;
  label: string;
  value: T;
}

interface CustomTagInputWithDropDownProps<T = unknown> {
  maxItems?: number;
  placeholder?: string;
  isError?: boolean;
  value?: string[];
  onChange?: (tags: string[]) => void;
  onBlur?: () => void;
  items: DropdownItem<T>[];
  numberOfElementsMessage?: string;
}

const CustomTagInputWithDropDown = <T = unknown,>({
  maxItems = 3,
  placeholder = 'Select an item...',
  isError = false,
  value = [],
  onChange,
  onBlur,
  items,
  numberOfElementsMessage,
  ...props
}: CustomTagInputWithDropDownProps<T> &
  Omit<
    React.ComponentProps<'div'>,
    keyof CustomTagInputWithDropDownProps<T>
  >) => {
  const [tags, setTags] = useState<string[]>(value);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync internal state with external value
  useEffect(() => {
    setTags(value);
  }, [value]);

  // Auto focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      // Use setTimeout to ensure the input is rendered before focusing
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const updateTags = (newTags: string[]) => {
    setTags(newTags);
    onChange?.(newTags);
  };

  const handleSelectValue = (selectedKey: string) => {
    if (tags.length < maxItems && !tags.includes(selectedKey)) {
      const newTags = [...tags, selectedKey];
      updateTags(newTags);
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    updateTags(newTags);
  };

  // Filter out already selected items and apply search filter
  const availableItems = items.filter(
    (item) =>
      !tags.includes(item.key) &&
      (item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.key.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full" {...props}>
      <div
        className={cn(
          'flex flex-col min-h-[2.75rem] gap-2 px-3.5 bg-white rounded-[0.5rem] shadow-sm shadow-[#1018280D]',
          tags.length > 0 ? 'py-2' : 'py-0',
          isError
            ? 'border border-[#DF1C41] focus:border-[#DF1C41]'
            : 'border border-[#D0D5DD] focus:border focus:!border-gray-400'
        )}
      >
        {tags.map((tag, index) => {
          const item = items.find((item) => item.key === tag);
          const displayLabel = item?.label || tag;

          return (
            <div
              key={index}
              className="flex items-center bg-white border border-[#D0D5DD] rounded-[0.375rem] px-1 py-0.5 text-sm"
            >
              {displayLabel}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-auto text-[#98A2B3] hover:text-gray-700 cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>
          );
        })}

        {tags.length < maxItems && (
          <Select
            open={isOpen}
            onOpenChange={setIsOpen}
            onValueChange={handleSelectValue}
            value=""
          >
            <SelectTrigger
              className="w-full border-none shadow-none p-0 h-auto min-w-[120px] flex-1 bg-transparent focus:ring-0 !ring-0 focus:ring-offset-0"
              onBlur={onBlur}
            >
              <SelectValue
                placeholder={placeholder}
                className="text-sm text-gray-400"
              />
            </SelectTrigger>
            <SelectContent className="p-0">
              <div className="p-2 border-b">
                <Input
                  ref={searchInputRef}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 text-sm"
                  onKeyDown={(e) => {
                    // Prevent the Select from closing when typing in search
                    e.stopPropagation();
                  }}
                  onFocus={(e) => {
                    // Prevent the Select from handling focus events from search input
                    e.stopPropagation();
                  }}
                  onBlur={(e) => {
                    // Prevent the Select from handling blur events from search input
                    e.stopPropagation();
                  }}
                />
              </div>
              <div className="max-h-60 overflow-y-auto">
                {availableItems.length === 0 ? (
                  <div className="p-2 text-sm text-gray-500 text-center">
                    No items found
                  </div>
                ) : (
                  availableItems.map((item) => (
                    <SelectItem key={item.key} value={item.value as string}>
                      {item.label}
                    </SelectItem>
                  ))
                )}
              </div>
            </SelectContent>
          </Select>
        )}
      </div>
      {numberOfElementsMessage ? (
        <p className="text-sm text-[#475467] mt-1">{numberOfElementsMessage}</p>
      ) : (
        <p className="text-sm text-[#475467] mt-1">
          {maxItems} eléments maximum
        </p>
      )}
    </div>
  );
};

export default CustomTagInputWithDropDown;
