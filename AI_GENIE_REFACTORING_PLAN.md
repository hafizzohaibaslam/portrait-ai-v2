# AI Genie Module - Refactoring Plan

## Overview

This document outlines the refactoring plan for the AI Genie (AI Modal) module from the old codebase to the new codebase. The goal is to simplify complex logic, improve maintainability, and follow best practices while maintaining the same functionality (without API integration for now).

## Current Architecture Analysis

### Old Codebase Structure

```
ai-modal/
├── floating-button.tsx          # Draggable floating button with framer-motion
├── popup-trigger.tsx            # Entry point wrapper
├── popup-dialog.tsx             # Main dialog with complex state management
├── modal-header.tsx             # Header with controls
├── popup-new-chat.tsx           # Simple wrapper for chat interface
└── popup-render-content-node.tsx # Step-based content renderer

ai-chat/
├── chat-interface.tsx           # Complex component with multiple responsibilities
├── message-bubble.tsx           # Message display component
├── suggestion-chips.tsx         # Welcome screen suggestions
├── drag-drop-overlay.tsx        # File upload overlay
└── [other media components]
```

### Issues Identified

1. **Complex State Management**

   - `popup-dialog.tsx` uses nested `handles` object with multiple state setters
   - Mixed concerns: UI state, chat state, and step management in one component
   - Unclear state flow and dependencies

2. **Tight Coupling**

   - `popup-dialog.tsx` tightly coupled to specific step rendering logic
   - `chat-interface.tsx` mixes UI, state management, and API calls
   - Hard to test individual components

3. **Mixed Responsibilities**

   - `chat-interface.tsx` handles:
     - Message state
     - File uploads (drag & drop)
     - Voice recording
     - Text input
     - API calls
     - UI rendering
   - Should be split into smaller, focused components

4. **Dependencies**

   - Uses `framer-motion` for animations (not available in new codebase)
   - Needs alternative animation approach

5. **Hardcoded Values**
   - Magic numbers for dimensions, thresholds
   - Inline styles mixed with Tailwind classes
   - Debug styles (`border-red-500!`) left in code

## Refactored Architecture

### New Structure

```
components/genie/
├── GenieFloatingButton.tsx      # Floating button (CSS animations instead of framer-motion)
├── GenieModal.tsx                # Main modal wrapper (simplified state)
├── GenieModalHeader.tsx          # Header component
├── GenieChatInterface.tsx        # Chat interface orchestrator
├── GenieWelcomeScreen.tsx        # Welcome/empty state
├── GenieChatInput.tsx            # Input area component
├── GenieMessageList.tsx          # Messages container
└── GenieAttachmentPreview.tsx    # File attachment preview

components/genie/messages/
├── GenieMessageBubble.tsx        # Individual message bubble
├── GenieMessageContent.tsx       # Message text content
└── GenieMessageAttachments.tsx   # Message attachments display

components/genie/attachments/
├── GenieFileUpload.tsx           # File upload handler
├── GenieDragDropOverlay.tsx      # Drag & drop overlay
└── GenieAttachmentItem.tsx       # Individual attachment preview

hooks/genie/
├── useGenieModal.ts              # Modal state management hook
├── useGenieChat.ts               # Chat state management hook
├── useGenieMessages.ts           # Messages state hook
└── useGenieFileUpload.ts         # File upload logic hook

types/genie.ts                    # Type definitions
utils/genie/
└── constants.ts                  # Constants (suggestions, limits, etc.)
```

## Component Breakdown

### 1. GenieFloatingButton

**Purpose**: Draggable floating button that triggers the modal

**Responsibilities**:

- Display genie avatar and hover text
- Handle drag functionality (CSS-based, no framer-motion)
- Snap to edges on drag end
- Trigger modal open

**Key Changes**:

- Replace framer-motion with CSS transitions and JavaScript drag handlers
- Simplify drag logic
- Extract magic numbers to constants

**Props**:

```typescript
type GenieFloatingButtonProps = {
  onClick: () => void;
  containerRef?: React.RefObject<HTMLDivElement>;
  className?: string;
};
```

### 2. GenieModal

**Purpose**: Main modal container with simplified state management

**Responsibilities**:

- Manage modal open/close state
- Manage fullscreen toggle
- Render header and content
- Handle new chat creation

**Key Changes**:

- Extract state management to `useGenieModal` hook
- Remove nested `handles` object pattern
- Simplify step management (currently only one step: "new_chat")
- Clean up className concatenation

**Props**:

```typescript
type GenieModalProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};
```

### 3. GenieModalHeader

**Purpose**: Modal header with controls

**Responsibilities**:

- Display genie avatar and title
- New chat button
- Fullscreen toggle
- Close button

**Key Changes**:

- Use existing ThemedButton component
- Simplify button styling
- Remove hardcoded styles

**Props**:

```typescript
type GenieModalHeaderProps = {
  onClose: () => void;
  onNewChat: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
};
```

### 4. GenieChatInterface

**Purpose**: Orchestrator for chat functionality

**Responsibilities**:

- Compose chat components
- Manage overall chat state
- Handle welcome screen vs chat view

**Key Changes**:

- Split from monolithic `chat-interface.tsx`
- Use composition pattern
- Delegate specific responsibilities to child components

**Props**:

```typescript
type GenieChatInterfaceProps = {
  sessionId?: string;
  onNewChat?: () => void;
};
```

### 5. GenieWelcomeScreen

**Purpose**: Welcome/empty state display

**Responsibilities**:

- Display genie avatar and welcome message
- Show suggestion chips
- Handle suggestion selection

**Key Changes**:

- Extract from `chat-interface.tsx`
- Simplify suggestion handling
- Use existing components where possible

**Props**:

```typescript
type GenieWelcomeScreenProps = {
  suggestions: string[];
  onSuggestionSelect: (suggestion: string) => void;
};
```

### 6. GenieChatInput

**Purpose**: Input area for messages

**Responsibilities**:

- Text input with auto-resize
- File attachment button
- Voice recording toggle
- Send button
- Attachment previews

**Key Changes**:

- Extract from `chat-interface.tsx`
- Use existing FormTextarea or create custom
- Integrate VoiceRecorder component
- Simplify file handling

**Props**:

```typescript
type GenieChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string, attachments?: File[]) => void;
  attachments: File[];
  onAttachmentsChange: (files: File[]) => void;
  isRecording: boolean;
  onRecordingToggle: () => void;
  disabled?: boolean;
};
```

### 7. GenieMessageList

**Purpose**: Container for messages

**Responsibilities**:

- Display list of messages
- Auto-scroll to bottom
- Show loading state
- Handle empty state

**Key Changes**:

- Extract from `chat-interface.tsx`
- Simplify scroll logic
- Use existing loading components

**Props**:

```typescript
type GenieMessageListProps = {
  messages: GenieMessage[];
  isLoading?: boolean;
  onScrollToBottom?: () => void;
};
```

### 8. GenieMessageBubble

**Purpose**: Individual message display

**Responsibilities**:

- Display message content
- Show attachments
- Handle user vs assistant styling
- Typewriter animation (if needed)

**Key Changes**:

- Extract from `message-bubble.tsx`
- Simplify attachment rendering
- Use existing media components
- Remove complex type detection logic (simplify)

**Props**:

```typescript
type GenieMessageBubbleProps = {
  message: GenieMessage;
  isLatest?: boolean;
};
```

### 9. GenieFileUpload

**Purpose**: File upload handling

**Responsibilities**:

- Drag & drop handling
- File selection
- File validation
- Preview generation

**Key Changes**:

- Extract from `chat-interface.tsx`
- Use existing MediaUploader or create simpler version
- Simplify validation logic

**Props**:

```typescript
type GenieFileUploadProps = {
  onFilesSelect: (files: File[]) => void;
  acceptedTypes?: string[];
  maxSize?: number;
  multiple?: boolean;
};
```

## Hooks Breakdown

### 1. useGenieModal

**Purpose**: Manage modal state

**Returns**:

```typescript
{
  isOpen: boolean;
  isFullscreen: boolean;
  open: () => void;
  close: () => void;
  toggleFullscreen: () => void;
  startNewChat: () => void;
}
```

### 2. useGenieChat

**Purpose**: Manage chat state and messages

**Returns**:

```typescript
{
  messages: GenieMessage[];
  isLoading: boolean;
  sendMessage: (content: string, attachments?: File[]) => void;
  clearMessages: () => void;
}
```

**Note**: For now, this will use mock/local state. API integration will be added later.

### 3. useGenieMessages

**Purpose**: Message-specific logic

**Returns**:

```typescript
{
  messages: GenieMessage[];
  addMessage: (message: GenieMessage) => void;
  updateMessage: (id: string, updates: Partial<GenieMessage>) => void;
  scrollToBottom: () => void;
}
```

### 4. useGenieFileUpload

**Purpose**: File upload logic

**Returns**:

```typescript
{
  files: File[];
  addFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
  isDragActive: boolean;
  openFileDialog: () => void;
}
```

## Types

### GenieMessage

```typescript
type GenieMessageRole = "user" | "assistant";

type GenieAttachmentType = "image" | "video" | "audio" | "file";

type GenieAttachment = {
  type: GenieAttachmentType;
  url: string;
  name: string;
  file?: File; // For new uploads
};

type GenieMessage = {
  id: string;
  role: GenieMessageRole;
  content: string;
  attachments?: GenieAttachment[];
  timestamp: number;
  isLoading?: boolean;
};
```

### GenieModalState

```typescript
type GenieModalState = {
  isOpen: boolean;
  isFullscreen: boolean;
  sessionId?: string;
};
```

## Constants

```typescript
// utils/genie/constants.ts
export const GENIE_SUGGESTIONS = [
  "Help me get started with my first portrait",
  "Suggest different ways to create a rich portrait",
  "Show me an example portrait highlight",
];

export const GENIE_FILE_LIMITS = {
  maxSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
  acceptedTypes: ["image/*", "video/*", "audio/*"],
};

export const GENIE_DRAG_THRESHOLD = 100; // pixels
export const GENIE_EDGE_OFFSET = 24; // pixels
```

## Implementation Steps

### Phase 1: Foundation

1. ✅ Create types file (`types/genie.ts`)
2. ✅ Create constants file (`utils/genie/constants.ts`)
3. ✅ Create base hooks structure
4. ✅ Set up component directory structure

### Phase 2: Core Components

1. ✅ Implement `GenieFloatingButton` (without drag for now, or simple CSS drag)
2. ✅ Implement `GenieModal` with simplified state
3. ✅ Implement `GenieModalHeader`
4. ✅ Implement `GenieChatInterface` orchestrator

### Phase 3: Chat Components

1. ✅ Implement `GenieWelcomeScreen`
2. ✅ Implement `GenieMessageList`
3. ✅ Implement `GenieMessageBubble`
4. ✅ Implement `GenieChatInput`

### Phase 4: File Handling

1. ✅ Implement `GenieFileUpload`
2. ✅ Implement `GenieDragDropOverlay`
3. ✅ Implement `GenieAttachmentPreview`

### Phase 5: Hooks Implementation

1. ✅ Implement `useGenieModal`
2. ✅ Implement `useGenieChat` (with mock data)
3. ✅ Implement `useGenieMessages`
4. ✅ Implement `useGenieFileUpload`

### Phase 6: Integration & Polish

1. ✅ Wire everything together
2. ✅ Add proper error handling
3. ✅ Add loading states
4. ✅ Test all interactions
5. ✅ Clean up styles and remove debug code

## Key Simplifications

1. **Remove framer-motion**: Use CSS transitions and simple JavaScript for drag
2. **Simplify state**: Use React hooks instead of nested handlers object
3. **Split responsibilities**: Each component has a single, clear purpose
4. **Remove API calls**: Use mock data and local state for now
5. **Clean up styles**: Remove debug styles, use consistent Tailwind classes
6. **Extract constants**: Move magic numbers to constants file
7. **Type safety**: Proper TypeScript types throughout

## Design Decisions

1. **No framer-motion**: Will use CSS animations and native drag API or a simpler library
2. **Composition over configuration**: Smaller, composable components
3. **Hooks for logic**: Extract business logic to custom hooks
4. **Mock data first**: Implement UI with mock data, add API later
5. **Default exports**: Follow project convention
6. **No index files**: Direct imports as per project convention

## Testing Considerations

- Each component should be testable in isolation
- Hooks should be testable with React Testing Library
- File upload logic should be testable separately
- Modal state management should be testable

## Future Enhancements (Post-Refactoring)

1. Add API integration hooks
2. Add message persistence
3. Add typing indicators
4. Add message reactions
5. Add chat history sidebar
6. Add export chat functionality
7. Add voice message playback
8. Add image/video preview in modal

## Notes

- All components will use default exports
- No index.tsx files will be created
- Follow existing design system and component patterns
- Use existing UI components (Dialog, ThemedButton, etc.)
- Maintain accessibility standards
- Ensure responsive design
