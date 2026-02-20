import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../constants/colors';
import {FontSize, FontWeight} from '../../constants/fonts';

const {height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},

  // ── Section 1: Green header ──────────────────────────────
  headerSection: {
    backgroundColor: Colors.primary,
    paddingBottom: 52,
    paddingHorizontal: 28,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    // Shadow so the header floats above the bg
    shadowColor: Colors.primaryDark,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  logoRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 32},
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 13,
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
    lineHeight: 42,
  },
  subtitle: {
    fontSize: FontSize.base,
    color: Colors.text.light,
    lineHeight: 22,
  },

  // ── Section 2: Form (centered in lower half) ──────────────
  formSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    // Start at 44% of screen height so form sits in center of lower area
    top: height * 0.44,
    paddingHorizontal: 24,
  },

  // ── Form card ─────────────────────────────────────────────
  body: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 24,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.text.secondary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  inputRowFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.card,
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
  continueBtn: {marginTop: 20},
  terms: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  termsText: {fontSize: FontSize.xs, color: Colors.text.muted, lineHeight: 18},
  termsLink: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: FontWeight.semiBold,
  },
});
