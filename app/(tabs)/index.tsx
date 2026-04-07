import {ScrollView, View} from 'react-native';
import {useEffect, useState} from "react";
import {getGroupsForUser} from "@/api/groups";
import GroupsListCard from "@/components/app/groupsListCard";
import {SafeAreaView} from "react-native-safe-area-context";
import {genericButtonDetails, Group} from "@/utils/types";
import GenericHeader from "@/components/app/genericHeader";
import {router} from "expo-router";
import {useTheme} from "@/constants/theme";

export default function Home() {
    const [groupsList, setGroupsList] = useState<Group[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { colors, spacing, radius } = useTheme();

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const groups = await getGroupsForUser();
                setGroupsList(groups);
            } catch (err) {
                // @ts-ignore
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);


    const genericHeaderButtonsArray: genericButtonDetails[] = [
        {variant: "text", content: "Nouveau", callback: () => router.push('/(modals)/new-group')},
        // {variant: "icon", content: "Bell"}
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing[16]}}>
            <GenericHeader genericButtonArray={genericHeaderButtonsArray}></GenericHeader>

            <View style={{
                flex: 1,
                borderRadius: radius[30],
                backgroundColor: colors.backgroundDark,
                marginBottom: spacing[36],
                paddingBottom: spacing[48],
                paddingTop: 2,
                paddingHorizontal: 2,
            }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {groupsList.map((group: Group, index: number) => (
                        <GroupsListCard key={`groupe-${group?.id}`} group={group} isLastGroup={index === groupsList.length - 1}></GroupsListCard>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}