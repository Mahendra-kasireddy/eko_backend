import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Earnings.styles';
import {EARNINGS_STRINGS} from '../Earnings.constants';
import {WeeklyEarning} from '../../../types/earnings.types';
import {formatCurrency} from '../../../utils/formatters';

interface EarningsChartSectionProps {
  weeklyBreakdown: WeeklyEarning[];
}

const EarningsChartSection: React.FC<EarningsChartSectionProps> = ({weeklyBreakdown}) => {
  const maxAmount = Math.max(...weeklyBreakdown.map(w => w.amount));
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{EARNINGS_STRINGS.WEEKLY_CHART}</Text>
      <View style={styles.chartCard}>
        <View style={styles.chartRow}>
          {weeklyBreakdown.map(week => {
            const heightPct = (week.amount / maxAmount) * 100;
            return (
              <View key={week.week} style={styles.chartBarWrapper}>
                <View style={[styles.chartBar, {height: `${heightPct}%`}]} />
              </View>
            );
          })}
        </View>
        <View style={styles.chartRow}>
          {weeklyBreakdown.map(week => (
            <View key={week.week} style={styles.chartBarWrapper}>
              <Text style={styles.chartLabel}>{week.week}</Text>
              <Text style={styles.chartValue}>{formatCurrency(week.amount)}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default EarningsChartSection;
