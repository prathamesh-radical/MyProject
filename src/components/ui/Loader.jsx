import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { styles } from '../../utils/stylesheet';

const Loader = () => {
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 2,
                duration: 1500,
                useNativeDriver: true,
            })
        ).start();
    }, [rotation]);

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.load_backdrop}>
            <View style={styles.load_Container}>
                <Animated.View style={[styles.load_loader, { transform: [{ rotate: spin }] }]}>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.load_dot,
                                {
                                    transform: [
                                        { rotate: `${index * 30}deg` },
                                        { translateY: -50 },
                                    ],
                                },
                            ]}
                        />
                    ))}
                </Animated.View>
                <Text style={styles.load_Text}>LOADING...</Text>
            </View>
        </View>
    );
};

export default Loader;