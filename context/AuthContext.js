import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 1. Import eklendi

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Yükleme durumu kontrolü

  // 2. Uygulama ilk açıldığında çalışır
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Yükleme hatası:", e);
      } finally {
        setLoading(false); // Kontrol bitti, uygulamayı göster
      }
    };
    loadUser();
  }, []);

  // 3. User değiştiğinde (Login veya Logout olduğunda) çalışır
  useEffect(() => {
    if (loading) return; // İlk yükleme bitmeden kaydetmeye çalışma

    const saveUser = async () => {
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem('user');
      }
    };
    saveUser();
  }, [user, loading]);

  const login = (username) => setUser({ username });
  const logout = () => setUser(null);

  // Yükleme sürüyorsa bembeyaz ekran göster (Login ekranı yanıp sönmesin diye)
  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}