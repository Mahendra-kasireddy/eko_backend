import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {FontSize, FontWeight} from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.primary},
  scroll: {flex: 1},

  // Header
  headerCard: {
    backgroundColor: Colors.primary,
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.inverse,
    marginBottom: 4,
  },
  headerMonth: {
    fontSize: FontSize.sm,
    color: Colors.text.light,
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  totalAmount: {
    fontSize: FontSize.display,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.inverse,
  },
  tierBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    gap: 3,
  },
  tierEmoji: {fontSize: 22},
  tierName: {fontSize: FontSize.xs, fontWeight: FontWeight.bold},

  // Sections
  section: {padding: 16},
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.text.secondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Breakdown
  breakdownCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 18,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
  },
  earningsDivider: {height: 1, backgroundColor: Colors.borderLight},
  earningsLabel: {flexDirection: 'row', alignItems: 'center', gap: 10},
  earningsEmoji: {
    fontSize: 20,
    width: 36,
    height: 36,
    textAlign: 'center',
    lineHeight: 36,
  },
  earningsLabelText: {fontSize: FontSize.base, color: Colors.text.primary},
  earningsValue: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
  },
  earningsTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  earningsTotalLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
  },
  earningsTotalValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extraBold,
    color: Colors.primary,
  },

  // Chart
  chartCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 18,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 90,
    gap: 8,
    marginBottom: 8,
  },
  chartBarWrapper: {flex: 1, alignItems: 'center', justifyContent: 'flex-end'},
  chartBar: {width: '75%', backgroundColor: Colors.accent, borderRadius: 8},
  chartLabel: {
    fontSize: FontSize.xs,
    color: Colors.text.secondary,
    marginTop: 7,
  },
  chartValue: {fontSize: 9, color: Colors.text.muted, marginTop: 2},

  // Payout history
  payoutItem: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  payoutEmoji: {fontSize: 22, marginRight: 14},
  payoutInfo: {flex: 1},
  payoutMonth: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
    color: Colors.text.primary,
  },
  payoutDate: {fontSize: FontSize.xs, color: Colors.text.secondary, marginTop: 3},
  payoutRight: {alignItems: 'flex-end'},
  payoutAmount: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
  },
  payoutStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 5,
  },
  payoutStatusText: {fontSize: FontSize.xs, fontWeight: FontWeight.bold},
});
