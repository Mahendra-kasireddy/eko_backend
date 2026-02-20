import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {FontSize, FontWeight} from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},

  // Header
  topBg: {
    backgroundColor: Colors.primary,
    paddingTop: 64,
    paddingBottom: 52,
    paddingHorizontal: 28,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  logoRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 28},
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoText: {
    color: Colors.text.inverse,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.xs,
    letterSpacing: 2,
  },
  appName: {
    color: Colors.text.inverse,
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
    opacity: 0.85,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.inverse,
    marginBottom: 10,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: FontSize.base,
    color: Colors.text.light,
    lineHeight: 22,
  },

  // Body
  body: {padding: 24, flex: 1},
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.text.secondary,
    marginBottom: 10,
    marginTop: 28,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  inputRowFocused: {
    borderColor: Colors.primary,
    shadowOpacity: 0.1,
  },
  countryCode: {
    paddingHorizontal: 16,
    paddingVertical: 17,
    backgroundColor: Colors.inputBg,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  countryCodeText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
  },
  flagText: {fontSize: 18},
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 17,
    fontSize: FontSize.lg,
    color: Colors.text.primary,
    letterSpacing: 2,
    fontWeight: FontWeight.semiBold,
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSize.xs,
    marginTop: 8,
    marginLeft: 2,
    fontWeight: FontWeight.medium,
  },
  continueBtn: {marginTop: 28},
  terms: {
    marginTop: 28,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  termsText: {fontSize: FontSize.xs, color: Colors.text.muted, lineHeight: 18},
  termsLink: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: FontWeight.semiBold,
  },
});
