import { createContext, useContext, useState } from 'react';

// 1. Context'i oluşturuyoruz
const AuthContext = createContext(undefined);

// 2. Provider bileşeni (Veriyi sağlayan kapsayıcı)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => setUser({ username });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Kolay kullanım için özel hook (Custom Hook)
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}