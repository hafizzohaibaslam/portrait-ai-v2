# AI Genie Module - Revised Refactoring Plan (With API Integration)

## Overview

This document outlines the **revised** refactoring plan for the AI Genie module, incorporating the actual Genie AI API structure. The plan now includes proper API integration using the conversation-based flow with hints and actions.

## Key API Insights

Based on the [Frontend Guide](file://FRONTEND_GUIDE.pdf), the Genie AI uses:

1. **Conversation-based flow**: `/api/genie/start` and `/api/genie/continue`
2. **Hints system**: API signals when to show UI elements (e.g., `show_upload`)
3. **Actions system**: API signals when to call creation endpoints (`create_portrait`, `create_memory`)
4. **File uploads**: Files stored locally, only uploaded when calling creation endpoints
5. **State persistence**: Backend handles conversation state, frontend only stores `conversation_id`

---

## Revised Architecture

### New Structure (Updated)

```
components/genie/
├── GenieFloatingButton.tsx      # Floating button (CSS animations)
├── GenieModal.tsx                # Main modal wrapper
├── GenieModalHeader.tsx          # Header component
├── GenieChatInterface.tsx        # Chat interface orchestrator
├── GenieWelcomeScreen.tsx        # Welcome/empty state
├── GenieChatInput.tsx            # Input area component
├── GenieMessageList.tsx          # Messages container
├── GenieHintRenderer.tsx         # NEW: Renders UI based on hints
├── GenieActionHandler.tsx        # NEW: Handles action completion
└── GenieProgressIndicator.tsx   # NEW: Shows collected_data progress

components/genie/messages/
├── GenieMessageBubble.tsx        # Individual message bubble
├── GenieMessageContent.tsx       # Message text content
└── GenieMessageAttachments.tsx   # Message attachments display

components/genie/attachments/
├── GenieFileUpload.tsx           # File upload handler (hint-based)
├── GenieDragDropOverlay.tsx      # Drag & drop overlay
└── GenieAttachmentPreview.tsx    # File attachment preview

hooks/genie/
├── useGenieModalState.ts              # Modal state management
├── useGenieConversation.ts       # REVISED: Conversation API integration
├── useGenieMessages.ts           # Messages state hook
├── useGenieFileUpload.ts         # File upload logic (hint-aware)
├── useGenieHints.ts              # NEW: Hints management
└── useGenieActions.ts            # NEW: Actions handling

types/genie.ts                    # Type definitions (REVISED)
utils/genie/
├── constants.ts                  # Constants
└── api-helpers.ts                # NEW: API helper functions
```

---

## Revised Type Definitions

### API Response Types

```typescript
// types/genie.ts

// API Response Structure
type GenieHintAction = "show_upload";

type GenieHint = {
  action: GenieHintAction;
  field?: "profile_image" | "media_file";
  label?: string;
  metadata?: Record<string, any>;
};

type GenieActionType = "create_portrait" | "create_memory";

type GenieAction = {
  action: GenieActionType;
  endpoint: string;
  method: "POST";
  content_type: "multipart/form-data";
  data: Record<string, any>;
  ready: boolean;
};

type GenieApiResponse = {
  conversation_id?: string;
  message: string;
  hints?: GenieHint[];
  conversation_state?: string;
  collected_data?: {
    [key: string]: any;
    action?: GenieAction; // Present when ready
  };
};

// Request Types
type GenieStartRequest = {
  message: string;
};

type GenieContinueRequest = {
  conversation_id: string;
  message: string;
};

// Message Types (for UI)
type GenieMessageRole = "user" | "assistant";

type GenieAttachmentType = "image" | "video" | "audio" | "file";

type GenieAttachment = {
  type: GenieAttachmentType;
  url: string;
  name: string;
  file?: File; // For pending uploads
};

type GenieMessage = {
  id: string;
  role: GenieMessageRole;
  content: string;
  attachments?: GenieAttachment[];
  timestamp: number;
  isLoading?: boolean;
  error?: string;
};

// Conversation State
type GenieConversationState = {
  conversationId: string | null;
  collectedData: Record<string, any>;
  activeHints: GenieHint[];
  pendingAction: GenieAction | null;
  uploadedFiles: {
    profile_image?: File;
    media_file?: File;
  };
};

// File Upload State (hint-based)
type GenieFileUploadState = {
  files: File[];
  hintField?: "profile_image" | "media_file";
  hintLabel?: string;
  isVisible: boolean;
};
```

---

## Revised Hooks Breakdown

### 1. useGenieConversation (REVISED - Most Important)

**Purpose**: Manage conversation flow with API integration

**Returns**:

```typescript
{
  // State
  conversationId: string | null;
  messages: GenieMessage[];
  collectedData: Record<string, any>;
  activeHints: GenieHint[];
  pendingAction: GenieAction | null;
  isLoading: boolean;
  error: Error | null;

  // Actions
  startConversation: (message: string) => Promise<void>;
  continueConversation: (message: string) => Promise<void>;
  clearConversation: () => void;
  retryLastMessage: () => Promise<void>;

  // Helpers
  hasActiveHints: boolean;
  hasPendingAction: boolean;
  isActionReady: boolean;
}
```

**Implementation Notes**:

- Uses `useMutation` from React Query for `/api/genie/start` and `/api/genie/continue`
- Automatically extracts `conversation_id` from first response
- Stores `conversation_id` in localStorage for persistence
- Parses `hints` and `collected_data` from responses
- Detects `action` in `collected_data.action`
- Handles errors (404 → new conversation, 403 → unauthorized)

### 2. useGenieHints (NEW)

**Purpose**: Manage hint-based UI rendering

**Returns**:

```typescript
{
  activeHints: GenieHint[];
  hasUploadHint: boolean;
  uploadHint: GenieHint | null;
  showHint: (hint: GenieHint) => void;
  hideHint: (action: GenieHintAction) => void;
  clearHints: () => void;
}
```

**Implementation Notes**:

- Tracks which hints are currently active
- Provides helper methods to check for specific hints
- Used by `GenieHintRenderer` component

### 3. useGenieActions (NEW)

**Purpose**: Handle action completion (create_portrait, create_memory)

**Returns**:

```typescript
{
  pendingAction: GenieAction | null;
  isActionReady: boolean;
  executeAction: (uploadedFiles?: Record<string, File>) => Promise<void>;
  clearAction: () => void;
}
```

**Implementation Notes**:

- Detects when `collected_data.action` is present
- Creates FormData with `action.data` fields
- Adds uploaded files to FormData
- Calls the endpoint specified in `action.endpoint`
- Uses existing mutation hooks (`useCreatePortraitMutation`, `useCreateMemoryMutation`)
- Shows success/error messages

### 4. useGenieFileUpload (REVISED)

**Purpose**: File upload logic with hint awareness

**Returns**:

```typescript
{
  files: File[];
  hintField?: "profile_image" | "media_file";
  hintLabel?: string;
  isVisible: boolean;
  addFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
  isDragActive: boolean;
  openFileDialog: () => void;
  // NEW: Hint integration
  showForHint: (hint: GenieHint) => void;
  hideUpload: () => void;
}
```

**Implementation Notes**:

- Files stored in component state (NOT uploaded to Genie API)
- Only shows upload UI when `show_upload` hint is active
- Stores files by field type (`profile_image` or `media_file`)
- Files uploaded only when action is executed

### 5. useGenieModal (UNCHANGED)

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

### 6. useGenieMessages (SIMPLIFIED)

**Purpose**: Message-specific logic (simplified, most logic in useGenieConversation)

**Returns**:

```typescript
{
  messages: GenieMessage[];
  addMessage: (message: GenieMessage) => void;
  updateMessage: (id: string, updates: Partial<GenieMessage>) => void;
  scrollToBottom: () => void;
}
```

---

## Revised Component Breakdown

### 1. GenieChatInterface (REVISED)

**Purpose**: Orchestrator for chat functionality with API integration

**Responsibilities**:

- Compose chat components
- Integrate `useGenieConversation` hook
- Handle welcome screen vs chat view
- Coordinate hints and actions
- Manage file uploads based on hints

**Key Changes**:

- Uses `useGenieConversation` instead of mock data
- Integrates `GenieHintRenderer` for hint-based UI
- Integrates `GenieActionHandler` for action completion
- Shows progress based on `collected_data`

**Props**:

```typescript
type GenieChatInterfaceProps = {
  onNewChat?: () => void;
  onActionComplete?: (action: GenieAction) => void;
};
```

### 2. GenieHintRenderer (NEW)

**Purpose**: Render UI elements based on active hints

**Responsibilities**:

- Display file upload UI when `show_upload` hint is active
- Show appropriate labels from hints
- Hide when hints are cleared

**Props**:

```typescript
type GenieHintRendererProps = {
  hints: GenieHint[];
  onFileSelect: (files: File[], field: string) => void;
};
```

**Implementation**:

- Checks for `show_upload` hint
- Shows upload button/input based on `hint.field`
- Uses `hint.label` for display text
- Integrates with `useGenieFileUpload`

### 3. GenieActionHandler (NEW)

**Purpose**: Handle action completion and resource creation

**Responsibilities**:

- Detect when action is ready
- Show confirmation/loading state
- Execute action with FormData
- Handle success/error states
- Optionally clear conversation after success

**Props**:

```typescript
type GenieActionHandlerProps = {
  action: GenieAction | null;
  uploadedFiles: Record<string, File>;
  onComplete: () => void;
  onError: (error: Error) => void;
};
```

**Implementation**:

- Checks `action.ready` flag
- Creates FormData from `action.data`
- Adds uploaded files to FormData
- Calls endpoint using existing mutation hooks
- Shows toast notifications
- Handles errors gracefully

### 4. GenieProgressIndicator (NEW)

**Purpose**: Show progress based on collected_data

**Responsibilities**:

- Display what information has been collected
- Show visual progress indicator
- Help users understand what's needed next

**Props**:

```typescript
type GenieProgressIndicatorProps = {
  collectedData: Record<string, any>;
  actionType?: GenieActionType;
};
```

### 5. GenieChatInput (REVISED)

**Purpose**: Input area with hint-aware file upload

**Key Changes**:

- File upload only shown when hint is active
- Integrates with `useGenieFileUpload` hook
- Files stored locally, not uploaded immediately

**Props**:

```typescript
type GenieChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
  // File upload props (hint-based)
  uploadHint?: GenieHint | null;
  uploadedFiles: File[];
  onFilesChange: (files: File[]) => void;
  // Voice recording
  isRecording: boolean;
  onRecordingToggle: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};
```

### 6. GenieFileUpload (REVISED)

**Purpose**: File upload handler that responds to hints

**Key Changes**:

- Only visible when `show_upload` hint is active
- Stores files by field type
- Files not uploaded until action execution

**Props**:

```typescript
type GenieFileUploadProps = {
  hint: GenieHint | null;
  files: File[];
  onFilesSelect: (files: File[]) => void;
  onRemove: (index: number) => void;
  acceptedTypes?: string[];
  maxSize?: number;
};
```

---

## API Integration Details

### API Hooks Implementation

#### useGenieStartMutation

```typescript
// hooks/genie/useGenieStartMutation.ts
export const useGenieStartMutation = () => {
  return useMutation({
    mutationFn: async (message: string) => {
      const response = await API.post<GenieApiResponse>("/genie/start", {
        message,
      });
      return response.data;
    },
  });
};
```

#### useGenieContinueMutation

```typescript
// hooks/genie/useGenieContinueMutation.ts
export const useGenieContinueMutation = () => {
  return useMutation({
    mutationFn: async ({ conversation_id, message }: GenieContinueRequest) => {
      const response = await API.post<GenieApiResponse>("/genie/continue", {
        conversation_id,
        message,
      });
      return response.data;
    },
  });
};
```

### Conversation ID Persistence

```typescript
// utils/genie/storage.ts
const CONVERSATION_ID_KEY = "genie_conversation_id";

export const saveConversationId = (id: string) => {
  localStorage.setItem(CONVERSATION_ID_KEY, id);
};

export const getConversationId = (): string | null => {
  return localStorage.getItem(CONVERSATION_ID_KEY);
};

export const clearConversationId = () => {
  localStorage.removeItem(CONVERSATION_ID_KEY);
};
```

### Action Execution Helpers

```typescript
// utils/genie/api-helpers.ts

export const createFormDataFromAction = (
  action: GenieAction,
  uploadedFiles: Record<string, File>
): FormData => {
  const formData = new FormData();

  // Add all data fields
  Object.entries(action.data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  // Add uploaded files
  Object.entries(uploadedFiles).forEach(([field, file]) => {
    if (file) {
      formData.append(field, file);
    }
  });

  return formData;
};
```

---

## Revised Implementation Phases

### Phase 1: Foundation (REVISED)

1. ✅ Create types file (`types/genie.ts`) - **ADD API TYPES**
2. ✅ Create constants file (`utils/genie/constants.ts`)
3. ✅ Create API helpers (`utils/genie/api-helpers.ts`) - **NEW**
4. ✅ Create storage helpers (`utils/genie/storage.ts`) - **NEW**
5. ✅ Create base hooks structure
6. ✅ Set up component directory structure

### Phase 2: API Integration (NEW PHASE)

1. ✅ Implement `useGenieStartMutation` hook
2. ✅ Implement `useGenieContinueMutation` hook
3. ✅ Implement `useGenieConversation` hook (main integration)
4. ✅ Implement conversation ID persistence
5. ✅ Add error handling for API errors

### Phase 3: Core Components

1. ✅ Implement `GenieFloatingButton`
2. ✅ Implement `GenieModal` with simplified state
3. ✅ Implement `GenieModalHeader`
4. ✅ Implement `GenieChatInterface` with API integration
5. ✅ Implement `GenieHintRenderer` - **NEW**
6. ✅ Implement `GenieActionHandler` - **NEW**
7. ✅ Implement `GenieProgressIndicator` - **NEW**

### Phase 4: Chat Components

1. ✅ Implement `GenieWelcomeScreen`
2. ✅ Implement `GenieMessageList`
3. ✅ Implement `GenieMessageBubble`
4. ✅ Implement `GenieChatInput` (hint-aware)

### Phase 5: File Handling (REVISED)

1. ✅ Implement `useGenieHints` hook - **NEW**
2. ✅ Implement `useGenieActions` hook - **NEW**
3. ✅ Implement `useGenieFileUpload` (hint-aware)
4. ✅ Implement `GenieFileUpload` component
5. ✅ Implement `GenieDragDropOverlay`
6. ✅ Implement `GenieAttachmentPreview`

### Phase 6: Integration & Polish

1. ✅ Wire everything together
2. ✅ Test API integration
3. ✅ Test hint rendering
4. ✅ Test action execution
5. ✅ Add proper error handling
6. ✅ Add loading states
7. ✅ Test conversation persistence
8. ✅ Test file upload flow
9. ✅ Clean up styles and remove debug code

---

## Key Changes from Original Plan

### 1. **API Integration Now Included**

- Original: "without API integration for now"
- Revised: Full API integration with conversation flow

### 2. **New Hooks**

- `useGenieConversation`: Main API integration hook
- `useGenieHints`: Hint management
- `useGenieActions`: Action execution

### 3. **New Components**

- `GenieHintRenderer`: Renders hint-based UI
- `GenieActionHandler`: Handles action completion
- `GenieProgressIndicator`: Shows collected data progress

### 4. **Revised File Upload Flow**

- Files stored locally (not sent to Genie API)
- Upload UI only shown when hint is active
- Files uploaded when action is executed

### 5. **Conversation State Management**

- `conversation_id` persistence in localStorage
- `collected_data` tracking
- `hints` and `actions` parsing

### 6. **Error Handling**

- 404 → Start new conversation
- 403 → Unauthorized, start new conversation
- 500 → Show error, allow retry

---

## State Flow Diagram

```
User sends message
    ↓
useGenieConversation.startConversation() or continueConversation()
    ↓
API call (/api/genie/start or /api/genie/continue)
    ↓
Response received
    ↓
Extract conversation_id → Save to localStorage
Extract message → Add to messages
Extract hints → Update activeHints
Extract collected_data → Update collectedData
Check for action → Update pendingAction
    ↓
UI Updates:
- GenieMessageList: Shows new message
- GenieHintRenderer: Shows upload UI if hint present
- GenieProgressIndicator: Updates progress
- GenieActionHandler: Shows action button if ready
    ↓
User uploads file (if hint shown)
    ↓
File stored in state (NOT uploaded)
    ↓
User continues conversation...
    ↓
Action appears in collected_data.action
    ↓
GenieActionHandler detects action
    ↓
User clicks "Create Portrait/Memory"
    ↓
FormData created with action.data + uploaded files
    ↓
Call action.endpoint (e.g., /api/onboard/create-portrait)
    ↓
Show success/error message
    ↓
Optionally clear conversation or continue
```

---

## Important Implementation Notes

### 1. **File Upload Timing**

- ❌ **WRONG**: Upload file when user selects it
- ✅ **CORRECT**: Store file in state, upload when action is executed

### 2. **Hints Handling**

- Hints come from API response
- Frontend only renders UI based on hints
- Don't show upload UI unless hint is present

### 3. **Actions Handling**

- Actions appear in `collected_data.action`
- Frontend must detect and execute actions
- Don't auto-execute, let user confirm

### 4. **Conversation Persistence**

- Backend handles conversation state
- Frontend only needs `conversation_id`
- Store in localStorage for resume capability

### 5. **Error Recovery**

- 404/403 → Clear conversation_id, start fresh
- 500 → Show error, allow retry
- Network errors → Show retry option

---

## Migration Notes

### From Old Codebase

- Old API: `useSendGenieMessageApi`, `useGetGenieChatHistoryApi`
- New API: `useGenieStartMutation`, `useGenieContinueMutation`
- Old: Simple send/receive
- New: Conversation-based with hints/actions

### Breaking Changes

- Message structure unchanged (still user/assistant)
- File upload flow changed (hint-based, delayed upload)
- State management changed (conversation_id tracking)
- No chat history API (conversation persists on backend)

---

## Summary

This revised plan incorporates the actual Genie AI API structure:

1. **Conversation-based flow** with `/api/genie/start` and `/api/genie/continue`
2. **Hints system** for UI rendering (`show_upload`)
3. **Actions system** for resource creation (`create_portrait`, `create_memory`)
4. **File upload flow** where files are stored locally and uploaded at action time
5. **State persistence** with `conversation_id` in localStorage

The plan maintains the original architecture goals (separation of concerns, hooks-based state, component composition) while adding proper API integration from the start.
