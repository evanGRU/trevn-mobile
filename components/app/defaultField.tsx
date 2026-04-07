import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

interface DefaultFieldProps {
    type: "username" | "email" | "password";
    placeholder: string;
    value: string;
    onChange: (key: string, value: string) => void;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

export default function DefaultField({ type, placeholder, value, onChange, autoCapitalize }: DefaultFieldProps) {

    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={(text) => onChange(type, text)}
            keyboardType={type === "email" ? "email-address" : "default"}
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            secureTextEntry={type === "password"}
            placeholderTextColor="rgba(255,255,255,0.5)"
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 52,
        paddingHorizontal: 20,
        borderRadius: 20,
        color: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.7)',
        fontSize: 16,
    },
});