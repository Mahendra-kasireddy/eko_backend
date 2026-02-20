import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {FontSize, FontWeight} from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.card},
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 8,
  },
  logoChip: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  logoChipText: {
    color: Colors.text.inverse,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.sm,
    letterSpacing: 2,
  },
  skipBtn: {paddingHorizontal: 4, paddingVertical: 8},
  skipText: {
    color: Colors.text.secondary,
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
  },
  scrollView: {flex: 1},
  slidePage: {flex: 1},
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 44,
    paddingTop: 16,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 20,
  },
  progressSegment: {
    height: 4,
    borderRadius: 2,
  },
  progressActive: {
    backgroundColor: Colors.primary,
  },
  progressInactive: {
    backgroundColor: Colors.border,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  slideCounter: {
    fontSize: FontSize.base,
    color: Colors.text.muted,
    fontWeight: FontWeight.semiBold,
    minWidth: 36,
  },
  nextBtnWrapper: {flex: 1},
  // Legacy (unused but kept for compat)
  slideArea: {flex: 1},
  dotsRow: {marginBottom: 32},
  nextBtn: {},
});
