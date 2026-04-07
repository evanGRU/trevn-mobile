import {supabase} from "@/services/supabase";
import {User} from "@/utils/types";

export const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data } = await supabase
        .from("profiles")
        .select(`
            id, 
            username, 
            avatar:avatars!profiles_avatar_id_fkey (
              id,
              name,
              type
            )
        `)
        .eq("id", user.id)
        .single() as { data: User };

    if (!data) throw new Error("Error");

    return ({
        id: data.id,
        username: data.username,
        avatar: data.avatar,
        email: user.email,
        new_email: user.new_email,
    });
};