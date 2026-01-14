import type { Portrait } from "./portrait-types";

export type CreatePortraitStep =
  | "choose_process"
  | "manual_creation"
  | "manual_add_memories"
  | "share_portrait";

export type CreatePortraitFlowState = {
  step: CreatePortraitStep;
  portrait: Portrait | null;
  memoryId: string | null;
  remainingFiles: File[];
};
