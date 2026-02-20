import {useCallback} from 'react';
import {StatusBar, StatusBarStyle, Platform} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

/**
 * Sets the status bar style whenever this screen comes into focus.
 * Fixes the bottom-tab issue where previously-visited screens
 * leave the wrong bar style active.
 */
export const useStatusBarStyle = (
  style: StatusBarStyle,
  androidBgColor?: string,
) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style, true);
      if (Platform.OS === 'android' && androidBgColor) {
        StatusBar.setBackgroundColor(androidBgColor, true);
      }
    }, [style, androidBgColor]),
  );
};
