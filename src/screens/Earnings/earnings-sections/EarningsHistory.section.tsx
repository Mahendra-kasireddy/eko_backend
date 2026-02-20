import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Earnings.styles';
import {EARNINGS_STRINGS} from '../Earnings.constants';
import {PayoutRecord} from '../../../types/earnings.types';
import {formatCurrency, formatDate} from '../../../utils/formatters';
import {Colors} from '../../../constants/colors';

interface EarningsHistorySectionProps {
  payoutHistory: PayoutRecord[];
}

const STATUS_COLORS: Record<PayoutRecord['status'], string> = {
  paid: '#DCFCE7',
  pending: '#FEF3C7',
  processing: '#DBEAFE',
};
const STATUS_TEXT_COLORS: Record<PayoutRecord['status'], string> = {
  paid: Colors.accent,
  pending: Colors.warning,
  processing: '#3B82F6',
};
const STATUS_LABELS: Record<PayoutRecord['status'], string> = {
  paid: EARNINGS_STRINGS.STATUS_PAID,
  pending: EARNINGS_STRINGS.STATUS_PENDING,
  processing: EARNINGS_STRINGS.STATUS_PROCESSING,
};

const EarningsHistorySection: React.FC<EarningsHistorySectionProps> = ({payoutHistory}) => (
  <View style={[styles.section, {paddingBottom: 100}]}>
    <Text style={styles.sectionTitle}>{EARNINGS_STRINGS.PAYOUT_HISTORY}</Text>
    {payoutHistory.map(payout => (
      <View key={payout.id} style={styles.payoutItem}>
        <Text style={styles.payoutEmoji}>💳</Text>
        <View style={styles.payoutInfo}>
          <Text style={styles.payoutMonth}>{payout.month}</Text>
          <Text style={styles.payoutDate}>{formatDate(payout.paidAt)}</Text>
        </View>
        <View style={styles.payoutRight}>
          <Text style={styles.payoutAmount}>{formatCurrency(payout.amount)}</Text>
          <View style={[styles.payoutStatus, {backgroundColor: STATUS_COLORS[payout.status]}]}>
            <Text style={[styles.payoutStatusText, {color: STATUS_TEXT_COLORS[payout.status]}]}>
              {STATUS_LABELS[payout.status]}
            </Text>
          </View>
        </View>
      </View>
    ))}
  </View>
);

export default EarningsHistorySection;
