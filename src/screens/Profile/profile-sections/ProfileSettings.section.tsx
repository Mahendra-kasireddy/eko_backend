import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../Profile.styles';
import {APP} from '../../../constants/app.constants';
import {useTranslation} from '../../../i18n';
import LanguagePicker from '../../../components/LanguagePicker/LanguagePicker';
import {i18n, LANGUAGES} from '../../../i18n';

interface ProfileSettingsSectionProps {
  onLogout: () => void;
}

const ProfileSettingsSection: React.FC<ProfileSettingsSectionProps> = ({onLogout}) => {
  const {t} = useTranslation();
  const [langPickerVisible, setLangPickerVisible] = useState(false);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language);

  const SETTINGS = [
    {emoji: '🔔', label: t('profile.notifications'), onPress: undefined},
    {
      emoji: '🌐',
      label: t('profile.language'),
      onPress: () => setLangPickerVisible(true),
      value: currentLang?.nativeName,
    },
    {emoji: '❓', label: t('profile.help'), onPress: undefined},
    {emoji: '🔒', label: t('profile.privacy'), onPress: undefined},
  ];

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.settings')}</Text>
        <View style={styles.sectionCard}>
          {SETTINGS.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <View style={styles.infoDivider} />}
              <TouchableOpacity
                style={styles.settingRow}
                activeOpacity={s.onPress ? 0.6 : 1}
                onPress={s.onPress}>
                <View style={styles.settingLeft}>
                  <Text style={styles.settingEmoji}>{s.emoji}</Text>
                  <Text style={styles.settingText}>{s.label}</Text>
                </View>
                <View style={settingRightStyle}>
                  {s.value ? (
                    <Text style={styles.settingValue}>{s.value}</Text>
                  ) : null}
                  <Text style={styles.settingArrow}>›</Text>
                </View>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>
      </View>

      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutText}>🚪 {t('profile.logout')}</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>
          {t('profile.version')} {APP.VERSION}
        </Text>
      </View>

      <LanguagePicker
        visible={langPickerVisible}
        onClose={() => setLangPickerVisible(false)}
      />
    </>
  );
};

const settingRightStyle = {flexDirection: 'row' as const, alignItems: 'center' as const, gap: 6};

export default ProfileSettingsSection;
