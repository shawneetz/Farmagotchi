import { colors } from 'lib/colors';
import { useModal } from 'lib/stores';
import { AnimatedPressable } from 'lib/utils';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const PlusButton = () => {
  const [pressed, setPressed] = useState(false);
  const openModal = useModal(state => state.open);
  return (
    <AnimatedPressable
      style={[
        {
          backgroundColor: pressed ? colors['primary-400'] : colors['primary-500'],
          transition: ['backgroundColor'],
          transitionDuration: '.075s',
        },
        styles.addButton,
      ]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => {setPressed(false); openModal()}}
      >
      <Svg width="32" height="32" viewBox="0 0 31 31" fill="none">
        <Path
          d="M6.3161 15.1586H24.0011M15.1586 6.31604V24.0011"
          stroke="#1D1E20"
          strokeWidth="2.52643"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-11px, -12px) scale(1.2)',
    padding: 8,
    borderRadius: 24,
  },
});
