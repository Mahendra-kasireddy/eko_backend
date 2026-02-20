import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import {FontSize, FontWeight} from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  scroll: {flex: 1},

  // Header
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 20,
    paddingBottom: 36,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  avatarEmoji: {fontSize: 44},
  riderName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.inverse,
    marginBottom: 4,
  },
  riderPhone: {
    fontSize: FontSize.sm,
    color: Colors.text.light,
    marginBottom: 12,
  },
  tierRow: {flexDirection: 'row', alignItems: 'center'},
  tierBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  tierText: {fontSize: FontSize.xs, fontWeight: FontWeight.bold},

  // Sections
  section: {padding: 16},
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.text.secondary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },

  // Stats row
  statsRow: {flexDirection: 'row'},
  statItem: {flex: 1, alignItems: 'center', paddingVertical: 18},
  statDivider: {width: 1, backgroundColor: Colors.border},
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extraBold,
    color: Colors.primary,
    marginBottom: 3,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.text.secondary,
    textAlign: 'center',
  },

  // Info rows
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  infoDivider: {height: 1, backgroundColor: Colors.borderLight, marginHorizontal: 18},
  infoLabel: {flexDirection: 'row', alignItems: 'center', gap: 10},
  infoEmoji: {fontSize: 18},
  infoLabelText: {fontSize: FontSize.base, color: Colors.text.primary},
  infoValue: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.text.secondary,
  },

  // Settings
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  settingLeft: {flexDirection: 'row', alignItems: 'center', gap: 12},
  settingEmoji: {fontSize: 18},
  settingText: {fontSize: FontSize.base, color: Colors.text.primary},
  settingArrow: {fontSize: 16, color: Colors.text.muted},

  // Logout
  logoutSection: {padding: 16, paddingBottom: 110},
  logoutBtn: {
    backgroundColor: Colors.errorBg,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutText: {
    color: Colors.error,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.base,
    letterSpacing: 0.3,
  },
  versionText: {
    textAlign: 'center',
    color: Colors.text.muted,
    fontSize: FontSize.xs,
    marginTop: 16,
  },
});
