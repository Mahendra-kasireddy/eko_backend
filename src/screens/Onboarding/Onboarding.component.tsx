import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import {styles} from './Onboarding.styles';
import {ONBOARDING_STRINGS} from './Onboarding.constants';
import OnboardingSlideSection from './onboarding-sections/OnboardingSlide.section';
import EkoButton from '../../components/EkoButton/EkoButton';

const {width} = Dimensions.get('window');

interface OnboardingComponentProps {
  slides: {id: string; title: string; subtitle: string; emoji: string}[];
  currentIndex: number;
  isLast: boolean;
  total: number;
  goNext: () => void;
  skip: () => void;
}

const OnboardingComponent: React.FC<OnboardingComponentProps> = ({slides, skip}) => {
  const scrollRef = useRef<ScrollView>(null);
  const [localIndex, setLocalIndex] = useState(0);
  const isLast = localIndex === slides.length - 1;

  const handleScroll = (e: {nativeEvent: {contentOffset: {x: number}}}) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    setLocalIndex(idx);
  };

  const handleNext = () => {
    if (isLast) {
      skip();
    } else {
      const next = localIndex + 1;
      scrollRef.current?.scrollTo({x: next * width, animated: true});
      setLocalIndex(next);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.logoChip}>
          <Text style={styles.logoChipText}>EKO</Text>
        </View>
        {!isLast && (
          <TouchableOpacity onPress={skip} style={styles.skipBtn}>
            <Text style={styles.skipText}>{ONBOARDING_STRINGS.SKIP}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Swipeable slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}>
        {slides.map((slide, i) => (
          <View key={slide.id} style={[styles.slidePage, {width}]}>
            <OnboardingSlideSection
              emoji={slide.emoji}
              title={slide.title}
              subtitle={slide.subtitle}
              index={i}
            />
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.progressRow}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressSegment,
                {flex: i === localIndex ? 3 : 1},
                i === localIndex ? styles.progressActive : styles.progressInactive,
              ]}
            />
          ))}
        </View>
        <View style={styles.footerContent}>
          <Text style={styles.slideCounter}>
            {localIndex + 1} / {slides.length}
          </Text>
          <View style={styles.nextBtnWrapper}>
            <EkoButton
              label={isLast ? ONBOARDING_STRINGS.GET_STARTED : ONBOARDING_STRINGS.NEXT}
              onPress={handleNext}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnboardingComponent;
