import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './Plastic.styles';
import {PLASTIC_STRINGS} from './Plastic.constants';
import PlasticSummarySection from './plastic-sections/PlasticSummary.section';
import PlasticListSection from './plastic-sections/PlasticList.section';
import EkoLoader from '../../components/EkoLoader/EkoLoader';
import {PlasticCollection, MonthlyPlasticSummary} from '../../types/plastic.types';

interface PlasticComponentProps {
  monthlySummary: MonthlyPlasticSummary | null;
  collections: PlasticCollection[];
  loading: boolean;
}

const PlasticComponent: React.FC<PlasticComponentProps> = ({
  monthlySummary,
  collections,
  loading,
}) => {
  if (loading) return <EkoLoader fullScreen message="Loading plastic data..." />;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#1B4332" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>♻️ {PLASTIC_STRINGS.TITLE}</Text>
        <Text style={styles.headerSubtitle}>Collect · Submit · Earn</Text>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {monthlySummary && <PlasticSummarySection summary={monthlySummary} />}
        <PlasticListSection collections={collections} />
        <View style={{height: 120}} />
      </ScrollView>
      <TouchableOpacity style={styles.fab}>
        <Text style={{fontSize: 18, color: '#fff'}}>♻</Text>
        <Text style={styles.fabText}>{PLASTIC_STRINGS.LOG_NEW}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PlasticComponent;
