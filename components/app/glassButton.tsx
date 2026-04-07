import React from 'react';
import {Text, Pressable} from 'react-native';
import {useTheme} from "@/constants/theme";

interface DefaultButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    isAuthButton?: boolean;
}

export default function GlassButton({ children, onPress, isAuthButton }: DefaultButtonProps) {
    const {glass, spacing, colors, textSizes} = useTheme();

    return (
        <Pressable
            onPress={onPress}
            style={[
                {
                    ...glass,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: 52,
                    marginTop: spacing[16]
                },
                isAuthButton && {
                    borderColor:  'rgba(255,255,255,0.4)',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                }
            ]}
        >
            <Text
                style={[
                    {
                        fontSize: textSizes[16],
                        color: colors.text,
                        textTransform: "uppercase",
                        fontWeight: "700",
                    },
                    isAuthButton && {
                        color: '#f5f5f5',
                    }
                ]}
            >{children}</Text>
        </Pressable>
    );
}
