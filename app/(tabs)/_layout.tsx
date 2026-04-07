import {Tabs} from 'expo-router';
import React, {useEffect, useState} from "react";
import {getUser} from "@/api/user";
import {User} from "@/utils/types";
import {CustomTabBar} from "@/components/app/customTabBar";

export default function TabsLayout() {
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const user = await getUser();
                setUser(user);
            } catch (err) {
                // @ts-ignore
                throw(err.message);
            }
        };
        load();
    }, []);

    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTabBar {...props} user={user} />}
        >
            <Tabs.Screen name="index" options={{ title: "Groupes" }} />
            <Tabs.Screen name="userSettingsScreen" options={{ title: "Toi" }} />
        </Tabs>
    );
}