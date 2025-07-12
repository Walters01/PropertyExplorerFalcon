import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { useTheme } from '../context/ThemeContext'; 

interface DefaultModalProps {
  visible: boolean;
  onClose: (event: GestureResponderEvent) => void;
  onApply?: () => void;
  title?: string;
  children?: React.ReactNode;
}

const DefaultModal: React.FC<DefaultModalProps> = ({ visible, onClose, onApply, title, children }) => {
  const { theme } = useTheme(); 
  const styles = getStyles(theme);

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Feather name="x" size={20} color="#333" />
          </TouchableOpacity>

          {title && <Text style={styles.title}>{title}</Text>}

          <View style={styles.content}>{children}</View>

          <Pressable
            style={styles.applyButton}
            onPress={() => {
              if (onApply) {
                onApply(); 
              } else {
                onClose({} as GestureResponderEvent); 
              }
            }}
          >
            <Text style={styles.applyText}>Apply</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};


const getStyles = (theme: string) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff',
      width: '80%',
      borderRadius: 10,
      padding: 20,
      elevation: 5,
      position: 'relative',
    },
    closeIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 6,
      zIndex: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      textAlign: 'center',
      color: theme === 'dark' ? '#fff' : '#000',
    },
    content: {
      marginBottom: 16,
    },
    applyButton: {
      backgroundColor: '#FACC15',
      paddingVertical: 10,
      borderRadius: 6,
    },
    applyText: {
      color: theme === 'dark' ? '#000' : '#333',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });

export default DefaultModal;
