import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {FontSize, FontWeight} from '../../constants/fonts';

interface ScreenHeaderProps {
  /** Simple title shown on the left */
  title?: string;
  /** Smaller text below title */
  subtitle?: string;
  /** Custom left node — overrides title/subtitle */
  leftContent?: React.ReactNode;
  /** Custom right node (badge, icon, button) */
  rightContent?: React.ReactNode;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  leftContent,
  rightContent,
}) => (
  <>
    <View style={s.header}>
      <View style={s.left}>
        {leftContent ?? (
          <>
            {title ? <Text style={s.title}>{title}</Text> : null}
            {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}
          </>
        )}
      </View>
      {rightContent ? <View style={s.right}>{rightContent}</View> : null}
    </View>
  </>
);

const s = StyleSheet.create({
  header: {
    backgroundColor: Colors.card,
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  left: {flex: 1},
  right: {marginLeft: 12},
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: FontSize.xs,
    color: Colors.text.secondary,
    marginTop: 2,
  },
});

export default ScreenHeader;
