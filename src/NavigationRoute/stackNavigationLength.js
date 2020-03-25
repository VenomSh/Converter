import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Length from '../Screens/Length';
import UnitDic from '../Screens/UnitDic';

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Stack = createStackNavigator();

function LengthStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Length" component={Length} />
      <Stack.Screen
        name="UnitDic"
        component={UnitDic}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </Stack.Navigator>
  );
}
export default LengthStack;
