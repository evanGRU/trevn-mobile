import React from "react";
import {genericButtonDetails} from "@/utils/types";
import {View} from "react-native";
import { Icons } from '@/utils/icons'
import GenericHeaderButton from "@/components/app/genericHeaderButton";
import {useTheme} from "@/constants/theme";

interface GenericHeaderProps {
    genericButtonArray: genericButtonDetails[];
}

export default function GenericHeader({genericButtonArray} : GenericHeaderProps) {
    const {spacing} = useTheme()

    return (
        <View style={{
            width: "100%",
            height: 72,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: spacing[12]
        }}>
            <Icons.Logo height={32} width={54}/>

            <View style={{flexDirection: "row"}}>
                {genericButtonArray.map(buttonDetails => (
                    <GenericHeaderButton buttonDetails={buttonDetails} key={`${buttonDetails.content}-button`}/>
                ))}
            </View>
        </View>
    );
}