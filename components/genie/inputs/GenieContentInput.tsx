"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type GenieContentInputProps = {
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onSubmit: () => void;
  className?: string;
};

const GenieContentInput = ({
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  className,
}: GenieContentInputProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    onTitleChange(value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
    onDescriptionChange(value);
  };

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit();
    }
  };

  return (
    <div className={cn("bg-white border border-gray-200 rounded-2xl p-4 mb-4", className)}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter memory title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter memory description (optional)"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GenieContentInput;
