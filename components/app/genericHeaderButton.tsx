import React from "react";
import {Text, StyleSheet, Pressable} from "react-native";
import {genericButtonDetails} from "@/utils/types";
import {useTheme} from "@/constants/theme";

export default function GenericHeaderButton({buttonDetails}: {buttonDetails: genericButtonDetails}) {
    const { colors, spacing, textSizes, glass } = useTheme();

    return (
        <Pressable
            onPress={buttonDetails.callback}
            style={[
                styles.button,
                { ...glass },
                buttonDetails.variant === "text" && { paddingHorizontal: spacing[16]}
            ]}
        >
            <Text style={{ fontSize: textSizes[16], color: colors.text}}>{buttonDetails.content}</Text>
        </Pressable>
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