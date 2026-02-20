import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
import {styles} from '../Trips.styles';
import {Trip, Coordinates} from '../../../types/trip.types';
import {GOOGLE_MAPS_API_KEY} from '../../../constants/api.constants';

const {width} = Dimensions.get('window');

interface TripMapSectionProps {
  trip: Trip;
}

const STATUS_STEPS: {key: Trip['status']; label: string}[] = [
  {key: 'assigned', label: 'Assigned'},
  {key: 'picked_up', label: 'Picked Up'},
  {key: 'in_transit', label: 'In Transit'},
  {key: 'delivered', label: 'Delivered'},
];

const STATUS_ORDER: Trip['status'][] = [
  'assigned',
  'picked_up',
  'in_transit',
  'delivered',
  'completed',
];

/** Returns destination coords + label based on trip status */
const getDestination = (
  trip: Trip,
): {coords: Coordinates; label: string; emoji: string} => {
  if (trip.status === 'assigned') {
    return {
      coords: trip.store.coordinates,
      label: trip.store.name,
      emoji: '🏪',
    };
  }
  return {
    coords: trip.customer.coordinates,
    label: trip.customer.name,
    emoji: '🏠',
  };
};

/** Builds Google Static Maps URL showing route from store → customer */
const buildStaticMapUrl = (trip: Trip): string => {
  const {store, customer} = trip;
  const origin = `${store.coordinates.latitude},${store.coordinates.longitude}`;
  const dest = `${customer.coordinates.latitude},${customer.coordinates.longitude}`;
  const mapPx = Math.round(width * 2); // retina resolution
  const params = [
    `size=${mapPx}x480`,
    `markers=color:green%7Clabel:P%7C${origin}`,
    `markers=color:red%7Clabel:D%7C${dest}`,
    `path=color:0x1B4332CC%7Cweight:5%7C${origin}%7C${dest}`,
    `maptype=roadmap`,
    `style=feature:poi%7Cvisibility:off`,
    `key=${GOOGLE_MAPS_API_KEY}`,
  ].join('&');
  return `https://maps.googleapis.com/maps/api/staticmap?${params}`;
};

/** Opens Apple Maps (iOS) or Google Maps (Android) for navigation */
const openNavigation = (coords: Coordinates) => {
  const {latitude, longitude} = coords;
  if (Platform.OS === 'ios') {
    // Apple Maps — always available on iOS + Simulator, no Info.plist needed
    Linking.openURL(
      `maps://?daddr=${latitude},${longitude}&dirflg=d`,
    ).catch(() =>
      // Fallback: Google Maps web
      Linking.openURL(
        `https://maps.google.com/?daddr=${latitude},${longitude}`,
      ),
    );
  } else {
    Linking.openURL(
      `google.navigation:q=${latitude},${longitude}&mode=d`,
    ).catch(() =>
      Linking.openURL(
        `https://maps.google.com/?daddr=${latitude},${longitude}`,
      ),
    );
  }
};

const TripMapSection: React.FC<TripMapSectionProps> = ({trip}) => {
  const [mapError, setMapError] = useState(false);
  const currentIdx = STATUS_ORDER.indexOf(trip.status);
  const destination = getDestination(trip);
  const mapUrl = buildStaticMapUrl(trip);

  return (
    <View>
      {/* ── Map Area ── */}
      <View style={styles.mapContainer}>
        {!mapError ? (
          <Image
            source={{uri: mapUrl}}
            style={styles.staticMapImage}
            resizeMode="cover"
            onError={() => setMapError(true)}
          />
        ) : (
          <View style={styles.routeCard}>
            {/* Store → Customer route timeline */}
            <View style={styles.routeRow}>
              <View style={styles.routeDots}>
                <View style={styles.routeDotGreen} />
                <View style={styles.routeLine} />
                <View style={styles.routeDotRed} />
              </View>
              <View style={styles.routeLabels}>
                <View style={styles.routeStop}>
                  <Text style={styles.routeStopLabel}>PICKUP</Text>
                  <Text style={styles.routeStopName} numberOfLines={1}>
                    {trip.store.name}
                  </Text>
                  <Text style={styles.routeStopAddr} numberOfLines={1}>
                    {trip.store.address.split(',')[0]}
                  </Text>
                </View>
                <View style={styles.routeDistancePill}>
                  <Text style={styles.routeDistanceText}>
                    📍 {trip.distance} km · ~{trip.estimatedDuration} min
                  </Text>
                </View>
                <View style={styles.routeStop}>
                  <Text style={styles.routeStopLabel}>DELIVERY</Text>
                  <Text style={styles.routeStopName} numberOfLines={1}>
                    {trip.customer.name}
                  </Text>
                  <Text style={styles.routeStopAddr} numberOfLines={1}>
                    {trip.customer.address.split(',')[0]}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Destination chip (top-left) */}
        <View style={styles.destinationChip}>
          <Text>{destination.emoji}</Text>
          <Text style={styles.destinationChipText} numberOfLines={1}>
            {destination.label}
          </Text>
        </View>

        {/* Navigate button (bottom-right) */}
        <TouchableOpacity
          style={styles.navigateBtn}
          onPress={() => openNavigation(destination.coords)}
          activeOpacity={0.85}>
          <Text style={styles.navigateBtnIcon}>🧭</Text>
          <Text style={styles.navigateBtnText}>Navigate</Text>
        </TouchableOpacity>
      </View>

      {/* ── Status Steps with connecting dashes ── */}
      <View style={styles.statusBar}>
        {/* Dots + lines row */}
        <View style={styles.statusDotsRow}>
          {STATUS_STEPS.map((step, i) => {
            const stepIdx = STATUS_ORDER.indexOf(step.key);
            const isDone = currentIdx >= stepIdx;
            const nextStep = STATUS_STEPS[i + 1];
            const nextDone = nextStep
              ? currentIdx >= STATUS_ORDER.indexOf(nextStep.key)
              : false;
            return (
              <Fragment key={step.key}>
                <View
                  style={[
                    styles.statusStepDot,
                    {backgroundColor: isDone ? '#22C55E' : '#E5E7EB'},
                  ]}
                />
                {i < STATUS_STEPS.length - 1 && (
                  <View
                    style={[
                      styles.statusConnector,
                      {backgroundColor: isDone && nextDone ? '#22C55E' : '#E5E7EB'},
                    ]}
                  />
                )}
              </Fragment>
            );
          })}
        </View>
        {/* Labels row */}
        <View style={styles.statusLabelsRow}>
          {STATUS_STEPS.map(step => {
            const stepIdx = STATUS_ORDER.indexOf(step.key);
            const isDone = currentIdx >= stepIdx;
            return (
              <Text
                key={step.key}
                style={[
                  styles.statusStepLabel,
                  isDone && styles.statusStepActive,
                ]}>
                {step.label}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default TripMapSection;
