import React, {useRef, useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../../constants/colors';
import {FontSize, FontWeight} from '../../constants/fonts';
import {LANGUAGES, AppLanguage, changeLanguage, useTranslation} from '../../i18n';
import {i18n} from '../../i18n';

interface LanguagePickerProps {
  visible: boolean;
  onClose: () => void;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({visible, onClose}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [selected, setSelected] = useState<AppLanguage>(
    (i18n.language as AppLanguage) ?? 'en',
  );

  useEffect(() => {
    if (visible) {
      setSelected((i18n.language as AppLanguage) ?? 'en');
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleSelect = async (lang: AppLanguage) => {
    setSelected(lang);
    await changeLanguage(lang);
    setTimeout(onClose, 180); // brief delay for UX
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}>
      {/* Dim overlay */}
      <Pressable style={s.overlay} onPress={onClose} />

      {/* Bottom sheet */}
      <Animated.View
        style={[
          s.sheet,
          {paddingBottom: insets.bottom + 16},
          {transform: [{translateY: slideAnim}]},
        ]}>
        {/* Handle bar */}
        <View style={s.handle} />

        <Text style={s.title}>{t('language.title')}</Text>
        <Text style={s.subtitle}>{t('language.subtitle')}</Text>

        <View style={s.optionsContainer}>
          {LANGUAGES.map((lang, idx) => {
            const isSelected = selected === lang.code;
            return (
              <React.Fragment key={lang.code}>
                {idx > 0 && <View style={s.divider} />}
                <TouchableOpacity
                  style={[s.option, isSelected && s.optionSelected]}
                  onPress={() => handleSelect(lang.code)}
                  activeOpacity={0.7}>
                  {/* Flag + names */}
                  <View style={s.optionLeft}>
                    <Text style={s.flag}>{lang.flag}</Text>
                    <View>
                      <Text style={[s.langName, isSelected && s.langNameSelected]}>
                        {lang.nativeName}
                      </Text>
                      {lang.nativeName !== lang.name && (
                        <Text style={s.langNameSub}>{lang.name}</Text>
                      )}
                    </View>
                  </View>

                  {/* Check / current badge */}
                  {isSelected ? (
                    <View style={s.checkCircle}>
                      <Text style={s.checkMark}>✓</Text>
                    </View>
                  ) : (
                    <View style={s.radioEmpty} />
                  )}
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </View>
      </Animated.View>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 20,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    marginBottom: 24,
  },
  optionsContainer: {
    backgroundColor: Colors.background,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  optionSelected: {
    backgroundColor: Colors.primary + '08',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  flag: {
    fontSize: 28,
  },
  langName: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
    color: Colors.text.primary,
  },
  langNameSelected: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  langNameSub: {
    fontSize: FontSize.xs,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: FontWeight.extraBold,
  },
  radioEmpty: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.border,
  },
});

export default LanguagePicker;
