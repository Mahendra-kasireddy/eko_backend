import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Plastic.styles';
import {PLASTIC_STRINGS} from '../Plastic.constants';
import {PlasticCollection} from '../../../types/plastic.types';
import {formatWeight, formatDate, formatTime} from '../../../utils/formatters';
import {Colors} from '../../../constants/colors';

interface PlasticListSectionProps {
  collections: PlasticCollection[];
}

const PlasticListSection: React.FC<PlasticListSectionProps> = ({collections}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{PLASTIC_STRINGS.COLLECTIONS}</Text>
    {collections.length === 0 ? (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyEmoji}>♻️</Text>
        <Text style={styles.emptyTitle}>{PLASTIC_STRINGS.EMPTY_TITLE}</Text>
        <Text style={styles.emptyDesc}>{PLASTIC_STRINGS.EMPTY_DESC}</Text>
      </View>
    ) : (
      collections.map(item => (
        <View key={item.id} style={styles.collectionItem}>
          <Text style={styles.collectionEmoji}>♻️</Text>
          <View style={styles.collectionInfo}>
            <Text style={styles.collectionWeight}>{formatWeight(item.weightKg)} — {item.bagCount} bags</Text>
            <Text style={styles.collectionMeta}>
              {formatDate(item.collectedAt)} · {formatTime(item.collectedAt)}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              {backgroundColor: item.status === 'submitted' ? '#DCFCE7' : '#FEF3C7'},
            ]}>
            <Text
              style={[
                styles.statusBadgeText,
                {color: item.status === 'submitted' ? Colors.accent : Colors.warning},
              ]}>
              {item.status === 'submitted' ? PLASTIC_STRINGS.STATUS_SUBMITTED : PLASTIC_STRINGS.STATUS_COLLECTED}
            </Text>
          </View>
        </View>
      ))
    )}
  </View>
);

export default PlasticListSection;
