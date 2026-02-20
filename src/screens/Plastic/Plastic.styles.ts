import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {FontSize, FontWeight} from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.primary},

  // Header
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 20,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.inverse,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.text.light,
  },

  scroll: {flex: 1},

  // Section
  section: {padding: 16},
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.text.secondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Summary card
  summaryCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },
  summaryRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20},
  summaryItem: {alignItems: 'center'},
  summaryValue: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.inverse,
  },
  summaryLabel: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 4,
  },

  // Progress
  progressSection: {marginTop: 4},
  progressLabel: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
  progressLabelText: {fontSize: FontSize.xs, color: 'rgba(255,255,255,0.65)'},
  progressLabelValue: {
    fontSize: FontSize.xs,
    color: Colors.cta,
    fontWeight: FontWeight.bold,
  },
  progressTrack: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {height: 8, backgroundColor: Colors.cta, borderRadius: 4},
  tierRow: {flexDirection: 'row', alignItems: 'center', marginTop: 14, gap: 8},
  tierEmoji: {fontSize: 18},
  tierText: {fontSize: FontSize.sm, color: Colors.cta, fontWeight: FontWeight.bold},

  // Incentive card
  incentiveCard: {
    backgroundColor: '#FFF7ED',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FED7AA',
    gap: 14,
  },
  incentiveEmoji: {fontSize: 30},
  incentiveValue: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extraBold,
    color: Colors.warning,
  },
  incentiveLabel: {fontSize: FontSize.xs, color: Colors.text.secondary, marginTop: 3},

  // Collection items
  collectionItem: {
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
  collectionEmoji: {fontSize: 26, marginRight: 14},
  collectionInfo: {flex: 1},
  collectionWeight: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
  },
  collectionMeta: {fontSize: FontSize.xs, color: Colors.text.secondary, marginTop: 3},
  statusBadge: {paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12},
  statusBadgeText: {fontSize: FontSize.xs, fontWeight: FontWeight.bold},

  // FAB
  fab: {
    position: 'absolute',
    bottom: 96,
    right: 20,
    backgroundColor: Colors.primary,
    borderRadius: 28,
    paddingVertical: 15,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  fabText: {
    color: Colors.text.inverse,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.base,
  },

  // Empty
  emptyBox: {alignItems: 'center', padding: 36},
  emptyEmoji: {fontSize: 52, marginBottom: 14},
  emptyTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semiBold,
    color: Colors.text.secondary,
  },
  emptyDesc: {
    fontSize: FontSize.sm,
    color: Colors.text.muted,
    marginTop: 6,
    textAlign: 'center',
  },
});
