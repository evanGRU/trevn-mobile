import {supabase} from "@/services/supabase";

export const getGroupsForUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data, error } = await supabase
        .from('groups')
        .select(`
      id,
      name,
      avatar:avatars!avatar_id (
        id,
        name,
        type
      ),
      groups_members!inner (
        user_id
      ),
      games_count:groups_games_with_likes(count)
    `)
        .eq('groups_members.user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) throw error;

    return (data ?? []).map((group) => ({
        ...group,
        avatar: Array.isArray(group?.avatar) ? group?.avatar[0] ?? null : group?.avatar,
        games_count: group?.games_count?.[0]?.count ?? 0,
    }));
};