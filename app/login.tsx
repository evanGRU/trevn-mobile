import { supabase } from '@/services/supabase';
import { useState, useRef } from 'react';
import {
    View,
    Text,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Animated
} from 'react-native';
import {ImageBackground} from "expo-image/src";

import authPageBg from '@/assets/authPageBackground.jpg';
import {BlurView} from "expo-blur";
import DefaultField from "@/components/app/defaultField";
import GlassButton from "@/components/app/glassButton";
import {router} from "expo-router";
import { Icons } from '@/utils/icons'
import {SafeAreaView} from "react-native-safe-area-context";
import {useTheme} from "@/constants/theme";

export default function AuthScreen() {
    const [formValues, setFormValues] = useState({ email: '', password: '', username: '' });
    const [isLogin, setIsLogin] = useState(true);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const [error, setError] = useState<string | null>(null);

    const toggleAuthMode = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 20,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsLogin(!isLogin);

            // reset animation
            fadeAnim.setValue(0);
            translateY.setValue(20);

            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        });
    };

    const handleChange = (key: string, value: string) => {
        setFormValues({ ...formValues, [key]: value });
    };

    const handleSubmit = async () => {
        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formValues.email,
                    password: formValues.password,
                });

                if (error) {
                    switch (error.code) {
                        case 'invalid_credentials':
                            setError("Email ou mot de passe incorrect");
                            break;
                        case 'email_not_confirmed':
                            setError("Email non confirmé");
                            break;
                        default:
                            setError("Erreur inconnue");
                    }
                    return;
                }
            } else {
                // signup...
                if (formValues.password.length < 6) {
                    setError("Le mot de passe doit contenir au moins 6 caractères");
                    return;
                }

                const { data: defaultAvatar, error: defaultAvatarError } = await supabase
                    .from("avatars")
                    .select("id")
                    .ilike("name", "default00.jpg")
                    .maybeSingle();

                if (defaultAvatarError) {
                    setError("Erreur avatar");
                    return;
                }
                if (!defaultAvatar) {
                    setError("Avatar par défaut introuvable");
                    return;
                }

                const { error } = await supabase.auth.signUp({
                    email: formValues.email,
                    password: formValues.password,
                    options: {
                        data: {
                            username: formValues.username,
                            defaultAvatarId: defaultAvatar.id,
                        },
                    },
                });

                if (error) {
                    switch (error.code) {
                        case "email_address_invalid":
                            setError("Email invalide");
                            break;
                        default:
                            setError("Erreur inconnue");
                    }
                    return;
                }

                setError(null);
                // succès → naviguer ou afficher message
            }
        } catch (err) {
            console.error(err);
            setError("Erreur inconnue");
        }
    };

    const {radius, spacing, textSizes} = useTheme();

    return (
        <ImageBackground source={authPageBg} style={{ flex: 1 }} contentFit={"cover"} contentPosition={"center"}>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    {/* Header */}
                    <View
                        style={{
                            position: 'absolute',
                            top: spacing[24],
                            left: 0,
                            right: 0,
                            alignItems: 'center',
                            zIndex: -1,
                        }}
                    >
                        <Icons.Logo style={{ width: 150, height: 50 }} />
                    </View>

                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'flex-end',
                        }}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Form container */}
                        <Animated.View
                            style={{
                                opacity: fadeAnim,
                                transform: [{ translateY }],
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <BlurView
                                intensity={30}
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    borderWidth: 1,
                                    borderRadius: radius[40],
                                    paddingHorizontal: spacing[36],
                                    paddingVertical: spacing[48],
                                    width: '100%',
                                    alignItems: 'center',
                                    overflow: "hidden",
                                }}
                            >
                                {/* Header Texts */}
                                <View style={{marginBottom: spacing[32], alignItems: 'center'}}>
                                    <Text style={{fontSize: textSizes[32], color: '#f5f5f5', textAlign: 'center', fontFamily: "QuinnFont"}}>
                                        {isLogin ? 'Content de te revoir' : 'Bienvenue parmi nous'}
                                    </Text>
                                    <Text style={{fontSize: textSizes[14], color: '#B3B3B3', textAlign: 'center', fontWeight: 300}}>
                                        {isLogin ? 'Connecte-toi pour accéder à tes groupes.'
                                            : 'Commence par créer ton compte.'}
                                    </Text>
                                </View>

                                {/* Form Fields */}
                                <View style={{width: '100%', gap: spacing[16]}}>
                                    {!isLogin && (
                                        <DefaultField
                                            type={"username"}
                                            placeholder={"Nom d'utilisateur"}
                                            value={formValues.username}
                                            onChange={handleChange}
                                        />
                                    )}
                                    <DefaultField
                                        type={"email"}
                                        placeholder={"Email"}
                                        value={formValues.email}
                                        onChange={handleChange}
                                        autoCapitalize={"none"}
                                    />
                                    <DefaultField
                                        type={"password"}
                                        placeholder={"Mot de passe"}
                                        value={formValues.password}
                                        onChange={handleChange}
                                    />
                                </View>

                                {/* Login Utils */}
                                {isLogin && (
                                    <View
                                        style={{
                                            marginVertical: spacing[8],
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            width: '100%',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Pressable onPress={() => router.push('/(modals)/forgot-password')} style={{paddingVertical: spacing[4]}}>
                                            <Text style={{color: "#f5f5f5", textDecorationLine: 'underline', fontSize: textSizes[12]}}>Mot de passe oublié</Text>
                                        </Pressable>
                                    </View>
                                )}

                                {/* Submit Button */}
                                <GlassButton onPress={() => handleSubmit()} isAuthButton={true}>
                                    {isLogin ? 'Se connecter' : "S'inscrire"}
                                </GlassButton>

                                {/* Footer */}
                                <View style={{flexDirection: 'row', gap: spacing[4], marginTop: spacing[48], alignItems: "center"}}>
                                    <Text style={{fontSize: textSizes[14], color: "#d7d7d7"}}>{isLogin ? "Pas encore de compte ?" : "Tu as déjà un compte ?"}</Text>
                                    <Pressable onPress={toggleAuthMode}>
                                        <Text style={{paddingVertical: 2, color: '#f5f5f5', textDecorationLine: 'underline'}}>{isLogin ? 'Inscris-toi' : 'Connecte-toi'}</Text>
                                    </Pressable>
                                </View>
                            </BlurView>
                        </Animated.View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}