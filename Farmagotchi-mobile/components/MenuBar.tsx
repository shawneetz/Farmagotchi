import { colors } from 'lib/colors';
import { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MenuItem } from './MenuItem';
import Svg, { Path } from 'react-native-svg';
import { AnimatedPressable } from 'lib/utils';
import { PlusButton } from './PlusButton';

export const MenuBar: FC = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={StyleSheet.compose(styles.menubar, { bottom: bottom + 8 })}>
      <MenuItem href="/">
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M15 21V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1053 14.2652 12 14 12H10C9.73478 12 9.48043 12.1053 9.29289 12.2929C9.10536 12.4804 9 12.7348 9 13V21M3 9.99999C2.99993 9.70906 3.06333 9.42161 3.18579 9.15771C3.30824 8.8938 3.4868 8.65979 3.709 8.47199L10.709 2.47199C11.07 2.1669 11.5274 1.99951 12 1.99951C12.4726 1.99951 12.93 2.1669 13.291 2.47199L20.291 8.47199C20.5132 8.65979 20.6918 8.8938 20.8142 9.15771C20.9367 9.42161 21.0001 9.70906 21 9.99999V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9.99999Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </MenuItem>
      <MenuItem href="/plots">
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M14 9.536V7C14 5.93913 14.4214 4.92172 15.1716 4.17157C15.9217 3.42143 16.9391 3 18 3H19.5C19.6326 3 19.7598 3.05268 19.8536 3.14645C19.9473 3.24021 20 3.36739 20 3.5V5C20 6.06087 19.5786 7.07828 18.8284 7.82843C18.0783 8.57857 17.0609 9 16 9C14.9391 9 13.9217 9.42143 13.1716 10.1716C12.4214 10.9217 12 11.9391 12 13M12 13C12 15 13 16 13 18C13 19.0819 12.6491 20.1345 12 21M12 13C12 12.0714 11.7414 11.1612 11.2533 10.3713C10.7651 9.58146 10.0666 8.94313 9.23607 8.52786C8.40554 8.1126 7.47578 7.93681 6.55097 8.0202C5.62616 8.10359 4.74285 8.44286 4 9C4 9.92856 4.25857 10.8388 4.74675 11.6287C5.23492 12.4185 5.9334 13.0569 6.76393 13.4721C7.59446 13.8874 8.52422 14.0632 9.44903 13.9798C10.3738 13.8964 11.2572 13.5571 12 13ZM5 21H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </MenuItem>
      <View style={{width: 60}}>

      </View>
      <PlusButton />
      <MenuItem href="/finance">
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M16.103 8.95609C15.5084 6.2608 12.7452 5.83501 9.21025 6.09975V8.95609M16.103 8.95609C16.1812 9.3106 16.2218 9.70436 16.2218 10.141C16.2218 10.6711 16.1823 11.1413 16.1001 11.5572M16.103 8.95609H9.21025M16.103 8.95609H17.8447M9.21025 8.95609V11.5572M9.21025 8.95609H6.97438M9.21025 11.5572V14.401M9.21025 11.5572H6.97437M9.21025 11.5572H16.1001M9.21025 14.401V17.9679M9.21025 14.401C13.5257 14.6086 15.6004 14.088 16.1001 11.5572M16.1001 11.5572H17.8447M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </MenuItem>
      <MenuItem href="/scan">
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M13.997 4C14.3578 3.99999 14.7119 4.09759 15.0217 4.28244C15.3316 4.46729 15.5856 4.73251 15.757 5.05L16.243 5.95C16.4144 6.26749 16.6684 6.53271 16.9783 6.71756C17.2881 6.90241 17.6422 7.00001 18.003 7H20C20.5304 7 21.0391 7.21071 21.4142 7.58579C21.7893 7.96086 22 8.46957 22 9V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V9C2 8.46957 2.21071 7.96086 2.58579 7.58579C2.96086 7.21071 3.46957 7 4 7H5.997C6.35742 7.00002 6.71115 6.90264 7.02078 6.71817C7.33041 6.53369 7.58444 6.26897 7.756 5.952L8.245 5.048C8.41656 4.73103 8.67059 4.46631 8.98022 4.28183C9.28985 4.09736 9.64358 3.99998 10.004 4H13.997Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </MenuItem>
    </View>
  );
};

const styles = StyleSheet.create({
  menubar: {
    position: 'absolute',
    backgroundColor: colors['neutral-100'],
    padding: 12,
    boxShadow: `0 3px 14.9px 0 ${colors['neutral-300']}`,
    borderRadius: 32,
    flexDirection: 'row',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    gap: 12,
  },
});


