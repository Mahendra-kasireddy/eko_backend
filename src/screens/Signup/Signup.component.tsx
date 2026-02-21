import React from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './Signup.styles';
import {VehicleType} from '../../types/rider.types';
import SignupFormSection from './signup-sections/SignupForm.section';

interface SignupComponentProps {
  phone: string;
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
  handleRegister: () => void;
  handleBack: () => void;
}

const SignupComponent: React.FC<SignupComponentProps> = ({
  phone,
  handleBack,
  handleRegister,
  ...formProps
}) => (
  <SafeAreaView style={styles.container} edges={['top']}>
    <StatusBar barStyle="light-content" backgroundColor="#1B4332" />

    {/* Green header */}
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Create Account</Text>
      <Text style={styles.headerSubtitle}>Set up your rider profile to get started</Text>

      <View style={styles.phoneChip}>
        <Ionicons name="call-outline" size={13} color="#fff" />
        <Text style={styles.phoneChipText}>+91 {phone}</Text>
      </View>
    </View>

    {/* Form */}
    <SignupFormSection
      {...formProps}
      onSubmit={handleRegister}
    />
  </SafeAreaView>
);

export default SignupComponent;
