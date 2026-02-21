import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput as TextInputType,
} from 'react-native';
import {styles} from '../Signup.styles';
import {VehicleType} from '../../../types/rider.types';
import EkoButton from '../../../components/EkoButton/EkoButton';

const VEHICLES: {type: VehicleType; icon: string; label: string}[] = [
  {type: 'bike', icon: '🏍️', label: 'Bike'},
  {type: 'scooter', icon: '🛵', label: 'Scooter'},
  {type: 'cycle', icon: '🚲', label: 'Cycle'},
];

interface SignupFormProps {
  phone: string;
  setPhone: (v: string) => void;
  phoneReadOnly: boolean;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  vehicleType: VehicleType;
  setVehicleType: (v: VehicleType) => void;
  vehicleNumber: string;
  setVehicleNumber: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  loading: boolean;
  isValid: boolean;
  onSubmit: () => void;
}

const Field: React.FC<{
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}> = ({label, optional, children}) => (
  <View style={styles.fieldGroup}>
    <Text style={styles.label}>
      {label}
      {optional && <Text style={styles.optionalTag}> (optional)</Text>}
    </Text>
    {children}
  </View>
);

const SignupFormSection: React.FC<SignupFormProps> = ({
  phone, setPhone, phoneReadOnly,
  name, setName,
  email, setEmail,
  vehicleType, setVehicleType,
  vehicleNumber, setVehicleNumber,
  city, setCity,
  loading,
  isValid,
  onSubmit,
}) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const nameRef = useRef<TextInputType>(null);
  const emailRef = useRef<TextInputType>(null);
  const vehicleNumRef = useRef<TextInputType>(null);
  const cityRef = useRef<TextInputType>(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* Mobile Number */}
        <Field label="Mobile Number">
          <View style={[
            styles.phoneRow,
            focusedField === 'phone' && !phoneReadOnly && styles.inputFocused,
            phoneReadOnly && styles.inputReadOnly,
          ]}>
            <View style={styles.countryCode}>
              <Text style={styles.flagText}>🇮🇳</Text>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="10-digit mobile number"
              placeholderTextColor="#C4C9D4"
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={v => setPhone(v.replace(/\D/g, '').slice(0, 10))}
              editable={!phoneReadOnly}
              returnKeyType="next"
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              onSubmitEditing={() => nameRef.current?.focus()}
            />
            {phoneReadOnly && (
              <Text style={styles.verifiedTag}>✓ Verified</Text>
            )}
          </View>
        </Field>

        {/* Full Name */}
        <Field label="Full Name">
          <TextInput
            ref={nameRef}
            style={[styles.input, focusedField === 'name' && styles.inputFocused]}
            placeholder="Ravi Kumar"
            placeholderTextColor="#C4C9D4"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            returnKeyType="next"
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            onSubmitEditing={() => emailRef.current?.focus()}
          />
        </Field>

        {/* Email */}
        <Field label="Email" optional>
          <TextInput
            ref={emailRef}
            style={[styles.input, focusedField === 'email' && styles.inputFocused]}
            placeholder="ravi@example.com"
            placeholderTextColor="#C4C9D4"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            onSubmitEditing={() => vehicleNumRef.current?.focus()}
          />
        </Field>

        {/* Vehicle Type */}
        <Field label="Vehicle Type">
          <View style={styles.vehicleRow}>
            {VEHICLES.map(v => (
              <TouchableOpacity
                key={v.type}
                style={[
                  styles.vehicleOption,
                  vehicleType === v.type && styles.vehicleOptionSelected,
                ]}
                onPress={() => setVehicleType(v.type)}
                activeOpacity={0.7}>
                <Text style={styles.vehicleIcon}>{v.icon}</Text>
                <Text
                  style={[
                    styles.vehicleLabel,
                    vehicleType === v.type && styles.vehicleLabelSelected,
                  ]}>
                  {v.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Field>

        {/* Vehicle Number */}
        <Field label="Vehicle Number">
          <TextInput
            ref={vehicleNumRef}
            style={[styles.input, focusedField === 'vehicleNumber' && styles.inputFocused]}
            placeholder="TS09AB1234"
            placeholderTextColor="#C4C9D4"
            value={vehicleNumber}
            onChangeText={t => setVehicleNumber(t.toUpperCase())}
            autoCapitalize="characters"
            returnKeyType="next"
            onFocus={() => setFocusedField('vehicleNumber')}
            onBlur={() => setFocusedField(null)}
            onSubmitEditing={() => cityRef.current?.focus()}
          />
        </Field>

        {/* City */}
        <Field label="City">
          <TextInput
            ref={cityRef}
            style={[styles.input, focusedField === 'city' && styles.inputFocused]}
            placeholder="Hyderabad"
            placeholderTextColor="#C4C9D4"
            value={city}
            onChangeText={setCity}
            autoCapitalize="words"
            returnKeyType="done"
            onFocus={() => setFocusedField('city')}
            onBlur={() => setFocusedField(null)}
            onSubmitEditing={onSubmit}
          />
        </Field>

        <View style={styles.submitBtn}>
          <EkoButton
            label="Create Account"
            onPress={onSubmit}
            loading={loading}
            disabled={!isValid}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupFormSection;
