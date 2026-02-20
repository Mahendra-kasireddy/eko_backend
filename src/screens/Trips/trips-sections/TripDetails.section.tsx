import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../Trips.styles';
import {TRIPS_STRINGS} from '../Trips.constants';
import {Trip} from '../../../types/trip.types';
import {formatCurrency} from '../../../utils/formatters';

interface TripDetailsSectionProps {
  trip: Trip;
}

const TripDetailsSection: React.FC<TripDetailsSectionProps> = ({trip}) => (
  <View style={styles.detailSection}>
    {/* Customer */}
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionEmoji}>👤</Text>
        <Text style={styles.sectionTitle}>{TRIPS_STRINGS.CUSTOMER}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Name</Text>
        <Text style={styles.infoValue}>{trip.customer.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Phone</Text>
        <Text style={styles.infoValue}>{trip.customer.phone}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Address</Text>
        <Text style={styles.infoValue}>{trip.customer.address}</Text>
      </View>
    </View>
    {/* Store */}
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionEmoji}>🏪</Text>
        <Text style={styles.sectionTitle}>{TRIPS_STRINGS.STORE}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Name</Text>
        <Text style={styles.infoValue}>{trip.store.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Address</Text>
        <Text style={styles.infoValue}>{trip.store.address}</Text>
      </View>
    </View>
    {/* Items */}
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionEmoji}>📦</Text>
        <Text style={styles.sectionTitle}>{TRIPS_STRINGS.ITEMS}</Text>
      </View>
      {trip.items.map(item => (
        <View key={item.id} style={styles.itemRow}>
          <View style={styles.itemDot} />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemQty}>{item.quantity} {item.unit}</Text>
          <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
        </View>
      ))}
      <View style={styles.divider} />
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{TRIPS_STRINGS.AMOUNT}</Text>
        <Text style={[styles.infoValue, {color: '#1B4332'}]}>{formatCurrency(trip.totalAmount)}</Text>
      </View>
    </View>
  </View>
);

export default TripDetailsSection;
