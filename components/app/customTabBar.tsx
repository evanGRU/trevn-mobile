import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { BlurView } from "expo-blur";
import {getPublicAvatarUrl} from "@/utils/globalFunctions";
import { Icons } from "@/utils/icons";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {User} from "@/utils/types";
import {useTheme} from "@/constants/theme";

type CustomTabBarProps = BottomTabBarProps & {
    user: User;
};

export const CustomTabBar = ({state, descriptors, navigation, user,}: CustomTabBarProps) => {
    const {textSizes} = useTheme();

    return (
        <View style={styles.wrapper}>
            <BlurView intensity={40} tint="dark" style={styles.container}>
                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;

                    const { options } = descriptors[route.key];
                    const label =
                        typeof options.title === "string"
                            ? options.title
                            : route.name;

                    const onPress = () => {
                        navigation.navigate(route.name);
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            style={[
                                {
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 44,
                                    width: 44,
                                    transform: [{ scale: isFocused ? 1.01 : 1 }]
                                },
                                isFocused && {
                                    shadowColor: "#fff",
                                    shadowOpacity: 0.3,
                                    shadowRadius: 10,
                                }
                            ]}
                            activeOpacity={0.7}
                        >
                            {route.name === "index" ? (
                                isFocused ? (
                                    <Icons.GroupsOn width={24} height={24}/>
                                ) : (
                                    <Icons.GroupsOff width={24} height={24} />
                                )
                            ) : (
                                <Image
                                    style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: 50,
                                        borderWidth: 1,
                                        borderColor: isFocused ? "#fff" : "#797979",
                                    }}
                                    source={{
                                        uri: getPublicAvatarUrl(
                                            user?.avatar?.type,
                                            user?.avatar?.name
                                        ),
                                    }}
                                />
                            )}

                            <Text style={{
                                fontSize: textSizes[10],
                                fontWeight: "500",
                                color: isFocused ? "#fff" : "#797979"
                            }}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        bottom: 32,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 30,
        elevation: 10,
    },
    container: {
        flexDirection: "row",
        width: 252,
        height: 78,
        borderRadius: 100,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 20,

        backgroundColor: "rgba(10,10,10,0.5)",
        borderWidth: 1,
        borderColor: "#282828",
    },
});