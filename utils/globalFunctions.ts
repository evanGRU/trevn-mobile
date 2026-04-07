import {supabase} from "@/services/supabase";

export const getPublicAvatarUrl = (type: string | undefined, path: string | undefined) => {
    const { data } = supabase.storage
        .from(`avatars/${type ?? ""}`)
        .getPublicUrl(path ?? "default00.jpg");

    return data.publicUrl;
};