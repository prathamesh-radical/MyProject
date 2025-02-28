import { useNavigation, useNavigationState } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Appbar, Icon } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../../utils/stylesheet';

const BOTTOM_APPBAR_HEIGHT = 80;
export default function BottomBar({style, homepath, settingpath}) {
    const navigation = useNavigation();
    const { bottom } = useSafeAreaInsets();
    const activeRoute = useNavigationState((state) =>
        state?.routes?.[state.index]?.name || ''
    );

    return (
        <Appbar
            style={[
                styles.b_bottom,
                { height: BOTTOM_APPBAR_HEIGHT + bottom, ...style},
            ]}
            safeAreaInsets={{ bottom }}
        >
            <View style={styles.bottom_container}>
                <Pressable style={styles.bottom_tab} onPress={() => navigation.navigate(homepath)}>
                    {activeRoute === homepath ? (
                        <View style={[styles.bottom_activetab]}>
                            <Icon
                                source="home"
                                color={activeRoute === homepath ? '#2563EB' : "#fff"}
                                size={24}
                            />
                            <Text style={{color: activeRoute === homepath ? '#2563EB' : "#fff"}}>Home</Text>
                        </View>
                    ) : (
                        <>
                            <Icon source="home" color='#fff' size={24} />
                            <Text style={styles.b_tab_name}>Home</Text>
                        </>
                    )}
                </Pressable>
                <Pressable style={styles.bottom_tab} onPress={() => navigation.navigate(settingpath)}>
                    {activeRoute === settingpath ? (
                        <View style={[styles.bottom_activetab]}>
                            <Icon
                                source="cog"
                                color={activeRoute === settingpath ? '#2563EB' : "#fff"}
                                size={24}
                            />
                            <Text style={{color: activeRoute === settingpath ? '#2563EB' : "#fff"}}>
                                Settings
                            </Text>
                        </View>
                    ) : (
                        <>
                            <Icon source="cog" color='#fff' size={24} />
                            <Text style={styles.b_tab_name}>Settings</Text>
                        </>
                    )}
                </Pressable>
            </View>
        </Appbar>
    );
};