import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';

import Weight from '../Screens/weight';
import Length from '../Screens/Length';
import Volume from '../Screens/Volume';
import Area from '../Screens/Area.js';
import Bmi from '../Screens/Bmi';

const Tab = createMaterialTopTabNavigator();

function NavigationRoutes() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Weight" component={Weight} />
      <Tab.Screen name="Length" component={Length} />
      <Tab.Screen name="Volume" component={Volume} />
      <Tab.Screen name="Area" component={Area} />
      <Tab.Screen name="Bmi" component={Bmi} />
    </Tab.Navigator>
  );
}

// tabBar function
function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, paddingBottom: '5%', justifyContent: 'center', alignItems: 'center'}}>
            <Animated.Text style={{opacity}}>{label}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default NavigationRoutes;