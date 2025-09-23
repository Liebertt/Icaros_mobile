import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Pressable, Animated, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// --- NOVO: Definindo os tipos para as props ---
interface SettingsDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

// --- Componente da Barra Lateral (Drawer) com tipos aplicados ---
const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ isVisible, onClose, onLogout }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <Pressable style={styles.overlay} onPress={onClose} />
      
      <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
        <TouchableOpacity style={styles.drawerItem} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={24} color="#ECD182" />
          <Text style={styles.drawerItemText}>Deslogar</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#1C1C1C',
    zIndex: 200,
    paddingTop: 60,
    paddingHorizontal: 20,
    borderLeftWidth: 1,
    borderLeftColor: '#2A2A2A',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  drawerItemText: {
    color: '#ECD182',
    fontSize: 18,
    marginLeft: 15,
  },
});

export default SettingsDrawer;

