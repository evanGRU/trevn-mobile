// Auth
export type AuthModes = "login" | "signup";

export type UserErrorCode =
    | "missingField"
    | "invalidFormat"
    | "emailDoesNotExist"
    | "weakPassword"
    | "maxCharacterLimit"
    | "minCharacterLimit"
    | "notTheSame"
    | "samePassword"
    | "";

export type UserErrorMessages = {
    missingField?: string;
    invalidFormat?: string;
    emailDoesNotExist?: string;
    weakPassword?: string;
    maxCharacterLimit?: string;
    minCharacterLimit?: string;
    notTheSame?: string;
    samePassword?: string;
};

// MainPage
export type Avatar = {
    id: string;
    name: string;
    type: string;
}

export type User = {
    email?: string | undefined;
    id?: string;
    new_email?: string;
    username?: string;
    avatar: Avatar;
} | null;

export type Group = {
    avatar: Avatar;
    id: string;
    name: string;
    games_count: number;
} | null;

// GenericHeader
type IconName = keyof typeof Icons;

export type genericButtonDetails = {
    variant: "text" | "icon" | "validation";
    content: string | IconName;
    redirect?: string;
    disabled?: boolean;
    callback?: () => void;
}