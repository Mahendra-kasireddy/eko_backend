import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../EkoStatus.styles';
import {useTranslation} from '../../../i18n';

interface EkoOfflineSectionProps {
  onGoOnline: () => void;
}

const EkoOfflineSection: React.FC<EkoOfflineSectionProps> = ({onGoOnline}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.offlineContainer}>
      <View style={styles.offlineIconBg}>
        <Ionicons name="power-outline" size={58} color="#9AA4AE" />
      </View>
      <Text style={styles.offlineTitle}>{t('eko_status.you_are_offline')}</Text>
      <Text style={styles.offlineSubtitle}>{t('eko_status.offline_subtitle')}</Text>
      <TouchableOpacity
        style={styles.goOnlineBtn}
        onPress={onGoOnline}
        activeOpacity={0.85}>
        <Ionicons name="power" size={20} color="#fff" />
        <Text style={styles.goOnlineBtnText}>{t('eko_status.go_online_btn')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EkoOfflineSection;
