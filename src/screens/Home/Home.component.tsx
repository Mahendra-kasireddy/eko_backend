import React from 'react';
import {View, Text, ScrollView, StyleSheet, StatusBar} from 'react-native';
import {useStatusBarStyle} from '../../hooks/useStatusBarStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './Home.styles';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import HomeHeaderSection from './home-sections/HomeHeader.section';
import HomeStatsSection from './home-sections/HomeStats.section';
import HomeActiveOrderSection from './home-sections/HomeActiveOrder.section';
import HomeQuickActionsSection from './home-sections/HomeQuickActions.section';
import EkoLoader from '../../components/EkoLoader/EkoLoader';
import {Rider, RiderStats} from '../../types/rider.types';
import {Trip} from '../../types/trip.types';
import {Colors} from '../../constants/colors';
import {FontSize, FontWeight} from '../../constants/fonts';
import {useTranslation} from '../../i18n';

const TIER_COLORS: Record<string, string> = {
  bronze: Colors.bronze,
  silver: Colors.silver,
  gold: Colors.gold,
};
const TIER_EMOJI: Record<string, string> = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
};

interface HomeComponentProps {
  rider: Rider | null;
  stats: RiderStats | null;
  activeTrip: Trip | null;
  loading: boolean;
  error: string;
  isOnline: boolean;
  handleToggleOnline: () => void;
  goToTrips: () => void;
  goToEkoStatus: () => void;
  goToEarnings: () => void;
  goToProfile: () => void;
}

const HomeComponent: React.FC<HomeComponentProps> = props => {
  useStatusBarStyle('dark-content', Colors.card);
  const {t} = useTranslation();

  const getGreeting = (): string => {
    const h = new Date().getHours();
    if (h < 12) return t('home.greeting_morning');
    if (h < 17) return t('home.greeting_afternoon');
    return t('home.greeting_evening');
  };

  if (props.loading) return <EkoLoader fullScreen message={t('common.loading')} />;

  const tier = props.rider?.tier;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.card} />
      {/* ── Fixed header (does not scroll) ── */}
      <ScreenHeader
        leftContent={
          <View>
            <Text style={hStyles.greeting}>{getGreeting()} 👋</Text>
            <Text style={hStyles.name}>{props.rider?.name ?? 'Rider'}</Text>
          </View>
        }
        rightContent={
          tier ? (
            <View
              style={[
                hStyles.tierBadge,
                {backgroundColor: (TIER_COLORS[tier] ?? Colors.bronze) + '22'},
              ]}>
              <Text>{TIER_EMOJI[tier] ?? '🏅'}</Text>
              <Text
                style={[
                  hStyles.tierText,
                  {color: TIER_COLORS[tier] ?? Colors.bronze},
                ]}>
                {tier.toUpperCase()}
              </Text>
            </View>
          ) : null
        }
      />

      {/* ── Scrollable content ── */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <HomeHeaderSection
          stats={props.stats}
          isOnline={props.isOnline}
          onToggle={props.handleToggleOnline}
        />
        <HomeStatsSection stats={props.stats} />
        <HomeActiveOrderSection
          activeTrip={props.activeTrip}
          isOnline={props.isOnline}
          onViewOrder={props.goToEkoStatus}
        />
        <HomeQuickActionsSection
          goToEarnings={props.goToEarnings}
          goToTrips={props.goToTrips}
          goToProfile={props.goToProfile}
        />
      </ScrollView>

    </SafeAreaView>
  );
};

// Styles local to this file for the header content
const hStyles = StyleSheet.create({
  greeting: {
    fontSize: FontSize.xs,
    color: Colors.text.secondary,
    fontWeight: FontWeight.medium,
    marginBottom: 2,
  },
  name: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.primary,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  tierText: {fontSize: FontSize.xs, fontWeight: FontWeight.bold},
});

export default HomeComponent;
