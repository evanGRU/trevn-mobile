import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {router} from "expo-router";
import {Group} from "@/utils/types";
import {getPublicAvatarUrl} from "@/utils/globalFunctions";
import { Icons } from '@/utils/icons';
import {useTheme} from "@/constants/theme";

interface GroupsListCardProps {
    group: Group;
    isLastGroup: boolean;
}

export default function GroupsListCard({ group, isLastGroup }: GroupsListCardProps) {
    const {colors, spacing, radius, textSizes} = useTheme();

    return (
        <TouchableOpacity
            onPress={() => router.push('/')}
            style={[
                {
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 72,
                    marginHorizontal: spacing[16],
                },
                !isLastGroup && {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.backgroundBorder
                },
            ]}
            activeOpacity={0.7}
        >
            <View style={{flexDirection: "row", gap: spacing[12], alignItems: 'center'}}>
                <Image
                    style={{
                        height: 36,
                        width: 36,
                        aspectRatio: '1/1',
                        resizeMode: "contain",
                        borderRadius: radius[8],
                        borderColor: "rgba(255,255,255,0.4)",
                        borderWidth: 1
                    }}
                    source={{uri: getPublicAvatarUrl(group?.avatar.type, group?.avatar.name)}}
                />
                <Text style={{fontSize: textSizes[16], color: colors.text, fontWeight: "500",}}>{group?.name}</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: 'center'}}>
                <Text style={{fontSize: textSizes[12], color: colors.textGray, fontWeight: "300",}}>{group?.games_count}</Text>
                <Icons.ArrowRight width={24} height={24} fill="#fff" />
            </View>
        </TouchableOpacity>
    );
}