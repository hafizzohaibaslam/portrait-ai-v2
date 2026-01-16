# Genie AI API Analysis & Impact on Refactoring Plan

## Executive Summary

After analyzing the [Genie AI Frontend Guide](file://FRONTEND_GUIDE.pdf), significant changes are needed to the refactoring plan. The API uses a **conversation-based flow** with **hints** and **actions**, which fundamentally changes how the frontend should be structured.

**Key Finding**: The original plan assumed a simple send/receive API, but the actual API is more sophisticated with state management, UI hints, and action completion patterns.

---

## API Architecture Overview

### Conversation Flow

```
User Message → /api/genie/start (first) or /api/genie/continue (subsequent)
    ↓
Backend processes with AI
    ↓
Response includes:
- conversation_id (for state persistence)
- message (AI response text)
- hints (UI action signals)
- collected_data (progressive data collection)
- action (when ready to create resource)
```

### Key Concepts

1. **Conversation ID**: Persists conversation state across requests
2. **Hints**: API signals when to show UI elements (e.g., file upload)
3. **Collected Data**: Progressive data accumulation as user chats
4. **Actions**: API signals when to call creation endpoints

---

## Critical Differences from Original Plan

### 1. **API Integration Approach**

#### Original Plan Assumption

- Simple send/receive message API
- Mock data for now, API later
- `useGenieChat` hook with `sendMessage()` function

#### Actual API Reality

- Conversation-based with `/api/genie/start` and `/api/genie/continue`
- Requires `conversation_id` tracking
- Hints system for UI rendering
- Actions system for resource creation
- **Impact**: Need `useGenieConversation` hook instead of simple `useGenieChat`

### 2. **File Upload Flow**

#### Original Plan Assumption

- Files uploaded immediately when selected
- Files sent with message to chat API

#### Actual API Reality

- Files **NOT** sent to Genie API (`/api/genie/start` or `/api/genie/continue`)
- Files stored locally in component state
- Upload UI only shown when `show_upload` hint appears
- Files uploaded **only** when calling creation endpoint (`/api/onboard/create-portrait` or `/api/memories/`)
- **Impact**: Need hint-aware file upload component, delayed upload logic

### 3. **State Management**

#### Original Plan Assumption

- Simple message list state
- Session ID for chat history

#### Actual API Reality

- `conversation_id` must be persisted (localStorage)
- `collected_data` tracks progressive data collection
- `hints` array for UI state
- `action` object when ready to create resource
- **Impact**: More complex state management, need persistence layer

### 4. **UI Rendering Logic**

#### Original Plan Assumption

- Static UI components
- Fixed file upload button

#### Actual API Reality

- **Dynamic UI** based on hints from API
- File upload only shown when `show_upload` hint appears
- Different upload fields (`profile_image` vs `media_file`)
- **Impact**: Need `GenieHintRenderer` component, conditional UI rendering

### 5. **Resource Creation**

#### Original Plan Assumption

- Not included in plan (API integration deferred)

#### Actual API Reality

- API signals when ready via `collected_data.action`
- Frontend must detect action and call creation endpoint
- FormData creation with `action.data` + uploaded files
- **Impact**: Need `GenieActionHandler` component, action execution logic

---

## New Components Required

### 1. GenieHintRenderer

**Why**: API sends hints to control UI rendering
**Purpose**: Show/hide UI elements based on hints (e.g., file upload button)
**Key Logic**:

- Check `response.hints` array
- If `hint.action === "show_upload"`, show upload UI
- Use `hint.field` to determine field type
- Use `hint.label` for display text

### 2. GenieActionHandler

**Why**: API signals when to create resources
**Purpose**: Detect actions and execute resource creation
**Key Logic**:

- Check `collected_data.action`
- If `action.ready === true`, show action button
- Create FormData from `action.data`
- Add uploaded files to FormData
- Call `action.endpoint` with FormData

### 3. GenieProgressIndicator

**Why**: Show user what data has been collected
**Purpose**: Visual feedback on conversation progress
**Key Logic**:

- Display `collected_data` fields
- Show what's been collected vs what's needed

---

## Revised Hooks Required

### 1. useGenieConversation (REPLACES useGenieChat)

**Why**: Need conversation-based API integration
**Responsibilities**:

- Call `/api/genie/start` for first message
- Call `/api/genie/continue` for subsequent messages
- Manage `conversation_id` persistence
- Parse `hints`, `collected_data`, `action` from responses
- Handle errors (404 → new conversation, 403 → unauthorized)

### 2. useGenieHints (NEW)

**Why**: Need to manage hint-based UI state
**Responsibilities**:

- Track active hints
- Provide helper methods (`hasUploadHint`, `getUploadHint`)
- Clear hints when conversation changes

### 3. useGenieActions (NEW)

**Why**: Need to handle action execution
**Responsibilities**:

- Detect when action is ready
- Create FormData from action data
- Execute action with uploaded files
- Handle success/error states

### 4. useGenieFileUpload (REVISED)

**Why**: Need hint-aware file upload
**Changes**:

- Only show upload UI when hint is active
- Store files locally (not upload immediately)
- Organize files by field type (`profile_image` vs `media_file`)

---

## API Integration Pattern

### Following New Codebase Patterns

Based on existing hooks in `portrait-ai-v2/hooks/`, the pattern is:

```typescript
// Use React Query mutations
import { useMutation } from "@tanstack/react-query";
import { API } from "@/lib/api";

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

**Key Points**:

- Uses `@tanstack/react-query` (already in codebase)
- Uses `API` instance from `@/lib/api` (has auth interceptors)
- Firebase token automatically added via interceptor
- Error handling via React Query

---

## State Persistence Strategy

### Conversation ID Persistence

```typescript
// Store conversation_id in localStorage
localStorage.setItem("genie_conversation_id", conversationId);

// Restore on page reload
const savedId = localStorage.getItem("genie_conversation_id");

// Clear on new chat
localStorage.removeItem("genie_conversation_id");
```

**Why**:

- Backend handles conversation state
- Frontend only needs `conversation_id` to resume
- Expires after 7 days (backend handles)

---

## Error Handling Strategy

### API Error Codes

| Code | Meaning                | Frontend Action                                 |
| ---- | ---------------------- | ----------------------------------------------- |
| 404  | Conversation not found | Clear `conversation_id`, start new conversation |
| 403  | Unauthorized           | Clear `conversation_id`, start new conversation |
| 500  | Server error           | Show error message, allow retry                 |

### Implementation

```typescript
// In useGenieConversation hook
onError: (error: any) => {
  if (error.response?.status === 404 || error.response?.status === 403) {
    // Conversation invalid, start fresh
    clearConversationId();
    // Optionally show message to user
  } else {
    // Other errors, show retry option
    setError(error);
  }
};
```

---

## File Upload Flow (Detailed)

### Step-by-Step

1. **User sends message** → API responds with `show_upload` hint
2. **Frontend detects hint** → Shows file upload UI
3. **User selects file** → File stored in component state (NOT uploaded)
4. **User continues chatting** → More messages exchanged
5. **API responds with action** → `collected_data.action` appears
6. **Frontend detects action** → Shows "Create Portrait/Memory" button
7. **User clicks button** → FormData created with `action.data` + uploaded file
8. **Frontend calls creation endpoint** → `/api/onboard/create-portrait` or `/api/memories/`
9. **Success** → Show success message, optionally clear conversation

### Key Points

- Files **never** sent to `/api/genie/start` or `/api/genie/continue`
- Files stored in browser memory (component state)
- Upload happens **only** when calling creation endpoint
- Files are optional (user can skip upload)

---

## Action Execution Flow

### create_portrait Action

```typescript
// When action appears in collected_data
{
  action: "create_portrait",
  endpoint: "/api/onboard/create-portrait",
  method: "POST",
  content_type: "multipart/form-data",
  data: {
    name: "Sarah Johnson",
    relation_type: "mother",
    is_deceased: false
  },
  ready: true
}

// Frontend creates FormData
const formData = new FormData();
formData.append("name", "Sarah Johnson");
formData.append("relation_type", "mother");
formData.append("is_deceased", "false");
if (uploadedFile) {
  formData.append("profile_image", uploadedFile);
}

// Call endpoint
await API.post("/onboard/create-portrait", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
```

### create_memory Action

```typescript
// Similar flow but with different endpoint and field
formData.append("title", "...");
formData.append("portrait_id", "...");
formData.append("description", "...");
if (uploadedFile) {
  formData.append("media_file", uploadedFile); // Note: media_file, not profile_image
}
await API.post("/memories/", formData);
```

---

## Integration with Existing Codebase

### Existing Hooks to Leverage

1. **useCreatePortraitMutation** (`hooks/onboarding/useCreatePortraitMutation.tsx`)

   - Already handles FormData creation
   - Already handles multipart/form-data
   - Can be reused for `create_portrait` action

2. **useCreateMemoryMutation** (`hooks/onboarding/useCreateMemoryMutation.tsx`)
   - Already handles memory creation
   - Already handles file uploads
   - Can be reused for `create_memory` action

### Modification Needed

These hooks may need slight modification to accept the action data structure, or we can create wrapper functions that convert action data to the expected format.

---

## Revised Component Responsibilities

### GenieChatInterface (Updated)

**Original**: Simple orchestrator
**Revised**:

- Integrates `useGenieConversation`
- Coordinates hints rendering
- Coordinates action handling
- Manages file upload state

### GenieChatInput (Updated)

**Original**: Simple input with file upload
**Revised**:

- File upload only shown when hint is active
- Files stored locally (not uploaded)
- Integrates with `useGenieFileUpload` (hint-aware)

### GenieFileUpload (Updated)

**Original**: Always visible upload component
**Revised**:

- Only visible when `show_upload` hint is active
- Stores files by field type
- Files not uploaded until action execution

---

## Testing Considerations

### API Integration Tests

1. **Conversation Flow**

   - Start conversation → Get `conversation_id`
   - Continue conversation → Use saved `conversation_id`
   - Handle conversation expiration (404)

2. **Hints Handling**

   - Show upload UI when hint appears
   - Hide upload UI when hint cleared
   - Handle multiple hints (if applicable)

3. **Actions Handling**

   - Detect action in `collected_data`
   - Create FormData correctly
   - Execute action successfully
   - Handle action errors

4. **File Upload**
   - Store files locally
   - Upload files with action
   - Handle file validation errors

### Edge Cases

1. **User closes modal while message sending** → Cancel request or queue
2. **Network error during conversation** → Show retry option
3. **User uploads file but changes mind** → Remove file, continue conversation
4. **Action appears but user doesn't execute** → Keep action available
5. **Multiple actions in sequence** → Handle one at a time

---

## Migration Path

### Phase 1: API Integration (New)

- Implement API hooks (`useGenieStartMutation`, `useGenieContinueMutation`)
- Implement `useGenieConversation` hook
- Add conversation ID persistence

### Phase 2: Hints System (New)

- Implement `useGenieHints` hook
- Implement `GenieHintRenderer` component
- Integrate with file upload

### Phase 3: Actions System (New)

- Implement `useGenieActions` hook
- Implement `GenieActionHandler` component
- Integrate with existing creation mutations

### Phase 4: UI Updates

- Update `GenieChatInterface` to use new hooks
- Update `GenieChatInput` to be hint-aware
- Update `GenieFileUpload` to be hint-aware
- Add `GenieProgressIndicator`

### Phase 5: Testing & Polish

- Test full conversation flow
- Test hints rendering
- Test action execution
- Test error handling
- Test file upload flow

---

## Key Takeaways

1. **API is conversation-based**, not simple send/receive
2. **Hints control UI rendering** - don't show upload UI unless hint present
3. **Files stored locally** - not uploaded to Genie API
4. **Actions signal readiness** - frontend must detect and execute
5. **State persistence** - `conversation_id` in localStorage
6. **Error handling** - 404/403 → start fresh, 500 → retry

---

## Recommendations

1. **Update original plan** with API integration from start
2. **Add new components** for hints and actions
3. **Revise hooks** to match API structure
4. **Test thoroughly** - conversation flow is complex
5. **Document well** - hints/actions pattern is new to codebase

---

## Questions to Clarify

1. Can multiple hints appear simultaneously?
2. Can multiple actions appear in sequence?
3. What happens if user skips file upload?
4. Should conversation persist across page reloads?
5. Should we show collected_data progress to user?
6. What happens after action execution - clear conversation or continue?

---

## Conclusion

The Genie AI API is more sophisticated than initially assumed. The refactoring plan needs significant updates to properly integrate with the conversation-based flow, hints system, and actions system. The revised plan addresses these requirements while maintaining the original architecture goals.
