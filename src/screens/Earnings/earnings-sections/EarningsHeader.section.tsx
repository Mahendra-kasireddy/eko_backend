import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Earnings.styles';
import {EARNINGS_STRINGS} from '../Earnings.constants';
import {MonthlyEarnings} from '../../../types/earnings.types';
import {formatCurrency} from '../../../utils/formatters';
import {Colors} from '../../../constants/colors';

interface EarningsHeaderSectionProps {
  earnings: MonthlyEarnings;
}

const TIER_COLORS = {bronze: Colors.bronze, silver: Colors.silver, gold: Colors.gold};
const TIER_EMOJIS = {bronze: '🥉', silver: '🥈', gold: '🥇'};

const EarningsHeaderSection: React.FC<EarningsHeaderSectionProps> = ({earnings}) => (
  <View style={styles.headerCard}>
    <Text style={styles.headerTitle}>{EARNINGS_STRINGS.TITLE}</Text>
    <Text style={styles.headerMonth}>{earnings.month} {earnings.year}</Text>
    <View style={styles.totalRow}>
      <Text style={styles.totalAmount}>{formatCurrency(earnings.total)}</Text>
      <View style={[styles.tierBadge, {backgroundColor: TIER_COLORS[earnings.tier] + '30'}]}>
        <Text style={styles.tierEmoji}>{TIER_EMOJIS[earnings.tier]}</Text>
        <Text style={[styles.tierName, {color: TIER_COLORS[earnings.tier]}]}>
          {earnings.tier.toUpperCase()}
        </Text>
      </View>
    </View>
  </View>
);

export default EarningsHeaderSection;
