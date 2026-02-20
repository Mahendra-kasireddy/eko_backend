import React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {useStatusBarStyle} from '../../hooks/useStatusBarStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './Earnings.styles';
import EarningsHeaderSection from './earnings-sections/EarningsHeader.section';
import EarningsBreakdownSection from './earnings-sections/EarningsBreakdown.section';
import EarningsChartSection from './earnings-sections/EarningsChart.section';
import EarningsHistorySection from './earnings-sections/EarningsHistory.section';
import EkoLoader from '../../components/EkoLoader/EkoLoader';
import {MonthlyEarnings} from '../../types/earnings.types';

interface EarningsComponentProps {
  monthlyEarnings: MonthlyEarnings | null;
  loading: boolean;
}

const EarningsComponent: React.FC<EarningsComponentProps> = ({monthlyEarnings, loading}) => {
  useStatusBarStyle('light-content', '#1B4332');
  if (loading || !monthlyEarnings) return <EkoLoader fullScreen message="Loading earnings..." />;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#1B4332" />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <EarningsHeaderSection earnings={monthlyEarnings} />
        <EarningsBreakdownSection earnings={monthlyEarnings} />
        <EarningsChartSection weeklyBreakdown={monthlyEarnings.weeklyBreakdown} />
        <EarningsHistorySection payoutHistory={monthlyEarnings.payoutHistory} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EarningsComponent;
