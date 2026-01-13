export type User = {
  user_id?: string | null;
  name?: string | null;
  email?: string | null;
  profile_image_url?: string | null;
  phone_number?: string | null;
};

// Portrait Types
export type RelationType =
  | "your-own"
  | "mother"
  | "father"
  | "sister"
  | "brother"
  | "grandmother"
  | "grandfather"
  | "aunt"
  | "uncle"
  | "cousin"
  | "spouse"
  | "child"
  | "friend"
  | "family_member"
  | "other";
