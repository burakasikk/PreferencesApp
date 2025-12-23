import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme'; // Hook'u import ettik

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme(); // Hook'u kullanıyoruz

  // Tema renklerini basitçe belirliyoruz
  const backgroundColor = theme === 'light' ? '#ffffff' : '#333333';
  const textColor = theme === 'light' ? '#000000' : '#ffffff';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>
        Current Theme: {theme.toUpperCase()}
      </Text>
      
      <View style={{ marginTop: 20 }}>
        <Button 
          title="Toggle Theme" 
          onPress={toggleTheme} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});