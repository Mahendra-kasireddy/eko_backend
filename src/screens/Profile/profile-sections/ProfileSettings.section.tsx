import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../Profile.styles';
import {PROFILE_STRINGS} from '../Profile.constants';
import {APP} from '../../../constants/app.constants';

const SETTINGS = [
  {emoji: '🔔', label: PROFILE_STRINGS.NOTIFICATIONS},
  {emoji: '🌐', label: PROFILE_STRINGS.LANGUAGE},
  {emoji: '❓', label: PROFILE_STRINGS.HELP},
  {emoji: '🔒', label: PROFILE_STRINGS.PRIVACY},
];

interface ProfileSettingsSectionProps {
  onLogout: () => void;
}

const ProfileSettingsSection: React.FC<ProfileSettingsSectionProps> = ({onLogout}) => (
  <>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{PROFILE_STRINGS.SETTINGS}</Text>
      <View style={styles.sectionCard}>
        {SETTINGS.map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && <View style={styles.infoDivider} />}
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.6}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingEmoji}>{s.emoji}</Text>
                <Text style={styles.settingText}>{s.label}</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </View>
    </View>
    <View style={styles.logoutSection}>
      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>🚪 {PROFILE_STRINGS.LOGOUT}</Text>
      </TouchableOpacity>
      <Text style={styles.versionText}>{PROFILE_STRINGS.VERSION} {APP.VERSION}</Text>
    </View>
  </>
);

export default ProfileSettingsSection;
