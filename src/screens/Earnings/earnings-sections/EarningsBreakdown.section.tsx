import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Earnings.styles';
import {EARNINGS_STRINGS} from '../Earnings.constants';
import {MonthlyEarnings} from '../../../types/earnings.types';
import {formatCurrency} from '../../../utils/formatters';

interface EarningsBreakdownSectionProps {
  earnings: MonthlyEarnings;
}

const EarningsBreakdownSection: React.FC<EarningsBreakdownSectionProps> = ({earnings}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Breakdown</Text>
    <View style={styles.breakdownCard}>
      <View style={styles.earningsRow}>
        <View style={styles.earningsLabel}>
          <Text style={styles.earningsEmoji}>💼</Text>
          <Text style={styles.earningsLabelText}>{EARNINGS_STRINGS.BASE_SALARY}</Text>
        </View>
        <Text style={styles.earningsValue}>{formatCurrency(earnings.baseSalary)}</Text>
      </View>
      <View style={styles.earningsDivider} />
      <View style={styles.earningsRow}>
        <View style={styles.earningsLabel}>
          <Text style={styles.earningsEmoji}>♻️</Text>
          <Text style={styles.earningsLabelText}>{EARNINGS_STRINGS.PLASTIC_BONUS}</Text>
        </View>
        <Text style={styles.earningsValue}>{formatCurrency(earnings.plasticBonus)}</Text>
      </View>
      <View style={styles.earningsDivider} />
      <View style={styles.earningsRow}>
        <View style={styles.earningsLabel}>
          <Text style={styles.earningsEmoji}>🛵</Text>
          <Text style={styles.earningsLabelText}>{EARNINGS_STRINGS.RIDE_EARNINGS}</Text>
        </View>
        <Text style={styles.earningsValue}>{formatCurrency(earnings.rideEarnings)}</Text>
      </View>
      <View style={styles.earningsDivider} />
      <View style={styles.earningsTotalRow}>
        <Text style={styles.earningsTotalLabel}>{EARNINGS_STRINGS.TOTAL}</Text>
        <Text style={styles.earningsTotalValue}>{formatCurrency(earnings.total)}</Text>
      </View>
    </View>
  </View>
);

export default EarningsBreakdownSection;
