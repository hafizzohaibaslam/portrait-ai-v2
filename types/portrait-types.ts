import { RelationType } from "./global-types";

export type Portrait = {
  portrait_id: string;
  name: string;
  email: string | null;
  user_id: string | null;
  creator_user_id: string;
  image_url: string;
  description: string | null;
  date_of_birth: string | null; // YYYY-MM-DD
  date_of_death: string | null; // YYYY-MM-DD
  is_deceased: boolean;
  is_collaborative: boolean;
  family_ids: string[];
  contributor_user_ids: string[];
};

// Base response type for portrait creation
export type CreatePortraitResponse = {
  message: string;
  portrait: Portrait;
  family_id: string;
  profile_picture_updated?: boolean;
};

// Response when creating "your-own" portrait
export type CreateYourOwnPortraitResponse = CreatePortraitResponse;

// Response when creating a relative's portrait
export type CreateRelativePortraitResponse = CreatePortraitResponse & {
  relationship_id: string;
  user_portrait: Portrait;
  user_portrait_created?: boolean;
};

// Union type for all portrait creation responses
export type PortraitCreationResponse =
  | CreateYourOwnPortraitResponse
  | CreateRelativePortraitResponse;

// Base payload type for creating portraits
export type CreatePortraitPayloadBase = {
  name: string;
  relation_type: RelationType;
  is_deceased: boolean;
  description?: string | null;
  date_of_birth?: string | null; // YYYY-MM-DD
  date_of_death?: string | null; // YYYY-MM-DD
  subject_email?: string | null;
  family_id?: string | null;
};

// Payload for creating "your-own" portrait
export type CreateYourOwnPortraitPayload = CreatePortraitPayloadBase & {
  relation_type: "your-own";
  portrait_image?: null; // Ignored for "your-own"
  profile_image?: File | null;
};

// Payload for creating a relative's portrait
export type CreateRelativePortraitPayload = CreatePortraitPayloadBase & {
  relation_type: Exclude<RelationType, "your-own">;
  portrait_image?: File | null;
  profile_image?: File | null;
};

// Union type for all portrait creation payloads
export type CreatePortraitPayload =
  | CreateYourOwnPortraitPayload
  | CreateRelativePortraitPayload;

// Simplified payload for POST /api/portraits/create (after onboarding)
// Used for creating portraits for relatives after onboarding, adding new family members,
// and creating portraits from the main portrait creation screen
export type CreatePortraitAfterOnboardingPayload = Omit<
  CreatePortraitPayloadBase,
  "family_id"
> & {
  relation_type: RelationType;
  profile_image?: File | null;
};

// Response type for POST /api/portraits/create
// Always returns CreateRelativePortraitResponse since it's only for relatives
export type CreatePortraitAfterOnboardingResponse =
  CreateRelativePortraitResponse;
