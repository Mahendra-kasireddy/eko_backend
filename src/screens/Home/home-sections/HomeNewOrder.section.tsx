import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import {Colors} from '../../../constants/colors';
import {FontSize, FontWeight} from '../../../constants/fonts';
import {Trip} from '../../../types/trip.types';
import {useTranslation} from '../../../i18n';

interface HomeNewOrderProps {
  trip: Trip;
  onAccept: (trip: Trip) => void;
  onDecline: () => void;
}

const COUNTDOWN = 15;

const HomeNewOrderSection: React.FC<HomeNewOrderProps> = ({trip, onAccept, onDecline}) => {
  const {t} = useTranslation();
  const [seconds, setSeconds] = useState(COUNTDOWN);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Countdown timer — auto-decline when it hits 0
  useEffect(() => {
    if (seconds <= 0) {
      onDecline();
      return;
    }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, onDecline]);

  // Pulse animation on the ring
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim]);

  const progress = seconds / COUNTDOWN; // 1 → 0

  return (
    <Modal transparent animationType="slide" statusBarTranslucent>
      <View style={s.overlay}>
        <View style={s.sheet}>
          {/* Header */}
          <View style={s.headerRow}>
            <Text style={s.newTag}>{t('order.new_order')}</Text>
            <Animated.View
              style={[s.countdownRing, {transform: [{scale: pulseAnim}]}]}>
              <Text style={s.countdownNum}>{seconds}</Text>
            </Animated.View>
          </View>

          <Text style={s.title}>{t('order.new_delivery')}</Text>
          <Text style={s.subtitle}>{t('order.accept_within', {seconds})}</Text>

          {/* Progress bar */}
          <View style={s.progressBg}>
            <View style={[s.progressFill, {flex: progress}]} />
            <View style={{flex: 1 - progress}} />
          </View>

          {/* Route info */}
          <View style={s.routeCard}>
            <View style={s.routeRow}>
              <View style={s.routeDots}>
                <View style={s.dotGreen} />
                <View style={s.routeLine} />
                <View style={s.dotRed} />
              </View>
              <View style={s.routeLabels}>
                <View>
                  <Text style={s.stopLabel}>{t('order.pickup')}</Text>
                  <Text style={s.stopName} numberOfLines={1}>
                    {trip.store.name}
                  </Text>
                  <Text style={s.stopAddr} numberOfLines={1}>
                    {trip.store.address.split(',')[0]}
                  </Text>
                </View>
                <View style={s.distPill}>
                  <Text style={s.distText}>
                    📍 {trip.distance} km · ~{trip.estimatedDuration} min
                  </Text>
                </View>
                <View>
                  <Text style={s.stopLabel}>{t('order.delivery')}</Text>
                  <Text style={s.stopName} numberOfLines={1}>
                    {trip.customer.name}
                  </Text>
                  <Text style={s.stopAddr} numberOfLines={1}>
                    {trip.customer.address.split(',')[0]}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Earnings row */}
          <View style={s.earningsRow}>
            <View>
              <Text style={s.earningsLabel}>{t('order.delivery_fee')}</Text>
              <Text style={s.earningsValue}>₹{trip.deliveryFee}</Text>
            </View>
            <View style={s.separator} />
            <View>
              <Text style={s.earningsLabel}>{t('order.order_value')}</Text>
              <Text style={s.earningsValue}>₹{trip.totalAmount}</Text>
            </View>
            <View style={s.separator} />
            <View>
              <Text style={s.earningsLabel}>{t('order.items')}</Text>
              <Text style={s.earningsValue}>{trip.items.length}</Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={s.btnRow}>
            <TouchableOpacity
              style={s.declineBtn}
              onPress={onDecline}
              activeOpacity={0.8}>
              <Text style={s.declineBtnText}>{t('order.decline')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.acceptBtn}
              onPress={() => onAccept(trip)}
              activeOpacity={0.85}>
              <Text style={s.acceptBtnText}>{t('order.accept')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  newTag: {
    backgroundColor: Colors.primary,
    color: Colors.text.inverse,
    fontSize: 10,
    fontWeight: FontWeight.extraBold,
    letterSpacing: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  countdownRing: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 3,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownNum: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.extraBold,
    color: Colors.primary,
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
    marginBottom: 14,
  },
  progressBg: {
    height: 4,
    backgroundColor: Colors.borderLight,
    borderRadius: 2,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 18,
  },
  progressFill: {
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  routeCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  routeRow: {flexDirection: 'row', alignItems: 'stretch', gap: 12},
  routeDots: {alignItems: 'center', paddingTop: 2},
  dotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent,
    borderWidth: 2,
    borderColor: Colors.card,
  },
  routeLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.accent + '50',
    marginVertical: 4,
    minHeight: 28,
  },
  dotRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: Colors.card,
  },
  routeLabels: {flex: 1, justifyContent: 'space-between', gap: 4},
  stopLabel: {
    fontSize: 8,
    fontWeight: FontWeight.bold,
    color: Colors.text.muted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  stopName: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.text.primary,
  },
  stopAddr: {fontSize: FontSize.xs, color: Colors.text.secondary},
  distPill: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary + '12',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  distText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    color: Colors.primary,
  },
  earningsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.primary + '10',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  separator: {width: 1, height: 30, backgroundColor: Colors.primary + '25'},
  earningsLabel: {
    fontSize: FontSize.xs,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  earningsValue: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.extraBold,
    color: Colors.primary,
    textAlign: 'center',
  },
  btnRow: {flexDirection: 'row', gap: 12},
  declineBtn: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  declineBtnText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: Colors.text.secondary,
  },
  acceptBtn: {
    flex: 2,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  acceptBtnText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.extraBold,
    color: Colors.text.inverse,
    letterSpacing: 0.3,
  },
});

export default HomeNewOrderSection;
