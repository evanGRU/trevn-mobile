import {Text, Button} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useThemeContext} from "@/context/ThemeContext";
import {useTheme} from '@/constants/theme';
import {supabase} from "@/services/supabase";

export default function UserSettingsScreen() {
    const { theme, toggleTheme } = useThemeContext();
    const { colors } = useTheme();

    const logout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.text }}>Le thème actuel est {theme}</Text>
            <Button title="Changer de thème" onPress={toggleTheme} />

            <Text style={{ color: colors.text, marginTop: 40 }}>Se déconnecter</Text>
            <Button title="Logout" onPress={logout} />
        </SafeAreaView>
    );
}