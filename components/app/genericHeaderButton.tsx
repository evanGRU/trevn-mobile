import React from "react";
import {Text, StyleSheet, TouchableOpacity} from "react-native";
import {genericButtonDetails} from "@/utils/types";
import {useTheme} from "@/constants/theme";
import { Icons } from '@/utils/icons'

export default function GenericHeaderButton({buttonDetails}: {buttonDetails: genericButtonDetails}) {
    const { colors, spacing, textSizes, glass } = useTheme();
    const IconComponent = Icons[buttonDetails.content as keyof typeof Icons];

    return (
        <TouchableOpacity
            onPress={buttonDetails.callback}
            style={[
                styles.button,
                { ...glass },
                buttonDetails.variant === "text" && { paddingHorizontal: spacing[16]},
                buttonDetails.variant === "icon" && { width: 44}
            ]}
            activeOpacity={0.6}
        >
            {buttonDetails.variant === "icon" && IconComponent ? (
                <IconComponent width={24} height={24}/>
            ) : (
                <Text style={{ fontSize: textSizes[16], color: colors.text}}>{buttonDetails.content}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
})