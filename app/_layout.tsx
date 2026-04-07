import { Stack, Redirect, useSegments } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import {AuthProvider, useAuth} from "@/context/AuthContext";
import {useFonts} from "expo-font";
import {Fonts} from "@/utils/fonts";
import {StatusBar} from "expo-status-bar";
import {ThemeProvider} from "@/context/ThemeContext";

function RootLayout() {
    const { session, loading } = useAuth();
    const segments = useSegments();

    /* Loading Fonts*/
    const [fontsLoaded] = useFonts({
        'QuinnFont': Fonts.Custom.Quinn,
        Poppins_100Thin: Fonts.Poppins.Thin,
        Poppins_200ExtraLight: Fonts.Poppins.ExtraLight,
        Poppins_300Light: Fonts.Poppins.Light,
        Poppins_400Regular: Fonts.Poppins.Regular,
        Poppins_500Regular: Fonts.Poppins.Medium,
        Poppins_600Regular: Fonts.Poppins.SemiBold,
        Poppins_700Bold: Fonts.Poppins.Bold,
        Poppins_800ExtraBold: Fonts.Poppins.ExtraBold,
    });
    if (!fontsLoaded) return null;

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    /* Secure Routes */
    const inAuthGroup = segments[0] === '(tabs)';
    if (!session && inAuthGroup) return <Redirect href="/login" />
    if (session && !inAuthGroup) return <Redirect href="/" />;

    return (
        <>
            <StatusBar style="light" />

            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" />

                <Stack.Screen
                    name="(modals)/forgot-password"
                    options={{ presentation: 'modal' }}
                />
            </Stack>
        </>
    );
}

export default function Layout() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <RootLayout />
            </ThemeProvider>
        </AuthProvider>
    );
}