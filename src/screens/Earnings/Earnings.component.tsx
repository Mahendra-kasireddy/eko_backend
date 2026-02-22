import React from 'react';
import {View, ScrollView, StatusBar} from 'react-native';
import {useStatusBarStyle} from '../../hooks/useStatusBarStyle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from './Earnings.styles';
import {Colors} from '../../constants/colors';
import EarningsHeaderSection from './earnings-sections/EarningsHeader.section';
import EarningsBreakdownSection from './earnings-sections/EarningsBreakdown.section';
import EarningsChartSection from './earnings-sections/EarningsChart.section';
import EarningsHistorySection from './earnings-sections/EarningsHistory.section';
import EkoLoader from '../../components/EkoLoader/EkoLoader';
import {MonthlyEarnings} from '../../types/earnings.types';
import {useTranslation} from '../../i18n';

interface EarningsComponentProps {
  monthlyEarnings: MonthlyEarnings | null;
  loading: boolean;
}

const EarningsComponent: React.FC<EarningsComponentProps> = ({monthlyEarnings, loading}) => {
  useStatusBarStyle('light-content', Colors.primary);
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();

  if (loading || !monthlyEarnings) return <EkoLoader fullScreen message={t('earnings.loading')} />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      {/* Green strip fills the status bar inset area — white icons visible */}
      <View style={{height: insets.top, backgroundColor: Colors.primary}} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <EarningsHeaderSection earnings={monthlyEarnings} />
        <EarningsBreakdownSection earnings={monthlyEarnings} />
        <EarningsChartSection weeklyBreakdown={monthlyEarnings.weeklyBreakdown} />
        <EarningsHistorySection payoutHistory={monthlyEarnings.payoutHistory} />
      </ScrollView>
    </View>
  );
};

export default EarningsComponent;
