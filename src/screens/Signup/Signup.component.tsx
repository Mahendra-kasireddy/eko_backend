import React from 'react';
import {View, Text, StatusBar, TouchableOpacity, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './Signup.styles';
import {VehicleType} from '../../types/rider.types';
import SignupFormSection from './signup-sections/SignupForm.section';

interface SignupComponentProps {
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
  profilePhoto?: string;
  showImagePicker: () => void;
  loading: boolean;
  isValid: boolean;
  handleRegister: () => void;
  handleBack: () => void;
}

const SignupComponent: React.FC<SignupComponentProps> = ({
  phone,
  profilePhoto,
  showImagePicker,
  handleBack,
  handleRegister,
  ...formProps
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1B4332" />

      {/* Green header — extends behind status bar via paddingTop */}
      <View style={[styles.header, {paddingTop: insets.top + 16}]}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
       
        <Text style={styles.headerTitle}>Create Account</Text>
        <Text style={styles.headerSubtitle}>Set up your rider profile to get started</Text>
        
       {/* Avatar picker */}
        <TouchableOpacity style={styles.avatarWrapper} onPress={showImagePicker} activeOpacity={0.8}>
          {profilePhoto ? (
            <Image source={{uri: profilePhoto}} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={32} color="rgba(255,255,255,0.6)" />
            </View>
          )}
          <View style={styles.avatarCameraBtn}>
            <Ionicons name="camera" size={13} color="#fff" />
          </View>
        </TouchableOpacity>
        {phone.length === 10 && (
          <View style={styles.phoneChip}>
            <Ionicons name="call-outline" size={13} color="#fff" />
            <Text style={styles.phoneChipText}>+91 {phone}</Text>
          </View>
        )}
      </View>

      {/* Form */}
      <SignupFormSection
        phone={phone}
        {...formProps}
        onSubmit={handleRegister}
      />
    </View>
  );
};

export default SignupComponent;
