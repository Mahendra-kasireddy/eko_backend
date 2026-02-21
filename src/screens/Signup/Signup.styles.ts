import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {FontSize, FontWeight} from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},

  // ── Green header ─────────────────────────────────────────────
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingBottom: 28,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    shadowColor: Colors.primaryDark,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.inverse,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: FontSize.base,
    color: Colors.text.light,
    lineHeight: 22,
  },
  phoneChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 12,
    gap: 6,
  },
  phoneChipText: {
    color: Colors.text.inverse,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
  },

  // ── Scroll form ───────────────────────────────────────────────
  scroll: {flex: 1},
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 40,
  },

  // ── Field ─────────────────────────────────────────────────────
  fieldGroup: {marginBottom: 20},
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  optionalTag: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
    color: Colors.text.muted,
    textTransform: 'none',
    letterSpacing: 0,
  },
  input: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: FontSize.base,
    color: Colors.text.primary,
    fontWeight: FontWeight.medium,
  },
  inputFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.card,
  },

  // ── Vehicle type selector ─────────────────────────────────────
  vehicleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  vehicleOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    gap: 6,
  },
  vehicleOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  vehicleIcon: {fontSize: 24},
  vehicleLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    color: Colors.text.secondary,
  },
  vehicleLabelSelected: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },

  // ── Submit button ─────────────────────────────────────────────
  submitBtn: {marginTop: 8},
});
