import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Plastic.styles';
import {PLASTIC_STRINGS} from '../Plastic.constants';
import {MonthlyPlasticSummary} from '../../../types/plastic.types';
import {formatCurrency, formatWeight} from '../../../utils/formatters';
import {TIER_THRESHOLDS} from '../../../constants/app.constants';

interface PlasticSummarySectionProps {
  summary: MonthlyPlasticSummary;
}

const TIER_EMOJIS = {bronze: '🥉', silver: '🥈', gold: '🥇'};
const TIER_TARGETS = {bronze: TIER_THRESHOLDS.BRONZE_MAX, silver: TIER_THRESHOLDS.SILVER_MAX, gold: 999};

const PlasticSummarySection: React.FC<PlasticSummarySectionProps> = ({summary}) => {
  const target = TIER_TARGETS[summary.tier];
  const progress = Math.min(summary.totalKg / target, 1);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{PLASTIC_STRINGS.MONTHLY_SUMMARY}</Text>
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{formatWeight(summary.totalKg)}</Text>
            <Text style={styles.summaryLabel}>{PLASTIC_STRINGS.TOTAL_COLLECTED}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{summary.totalBags}</Text>
            <Text style={styles.summaryLabel}>{PLASTIC_STRINGS.BAGS}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{formatWeight(summary.submittedKg)}</Text>
            <Text style={styles.summaryLabel}>{PLASTIC_STRINGS.SUBMITTED}</Text>
          </View>
        </View>
        <View style={styles.progressSection}>
          <View style={styles.progressLabel}>
            <Text style={styles.progressLabelText}>{PLASTIC_STRINGS.TIER_PROGRESS}</Text>
            <Text style={styles.progressLabelValue}>{formatWeight(summary.totalKg)} / {target} kg</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, {width: `${progress * 100}%`}]} />
          </View>
          <View style={styles.tierRow}>
            <Text style={styles.tierEmoji}>{TIER_EMOJIS[summary.tier]}</Text>
            <Text style={styles.tierText}>{summary.tier.charAt(0).toUpperCase() + summary.tier.slice(1)} Tier</Text>
          </View>
        </View>
      </View>
      <View style={styles.incentiveCard}>
        <Text style={styles.incentiveEmoji}>💵</Text>
        <View>
          <Text style={styles.incentiveValue}>{formatCurrency(summary.incentiveEarned)}</Text>
          <Text style={styles.incentiveLabel}>{PLASTIC_STRINGS.INCENTIVE} this month</Text>
        </View>
      </View>
    </View>
  );
};

export default PlasticSummarySection;
