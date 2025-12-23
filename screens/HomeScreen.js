import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Hook'u import ettik

export default function HomeScreen({ navigation }) {
  // route.params yerine Context'ten user ve logout'u alıyoruz
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      {/* user varsa adını yaz, yoksa Guest yaz (Hata önlemek için) */}
      <Text style={styles.text}>Welcome, {user?.username}</Text>
      
      <View style={{ marginTop: 20 }}>
        <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
      
      <View style={{ marginTop: 20 }}>
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
});