import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Svg, { Path, Line, Circle } from 'react-native-svg';

const C = {
  bg: '#0C0C0C', surface: '#141414',
  white: '#FFFFFF', muted: '#444', border: 'rgba(255,255,255,0.05)', red: '#FF3030',
};

const ACCOUNT_TYPES = [
  { icon: '👤', name: 'Personal',     sub: 'Intercambio y venta personal'  },
  { icon: '🏪', name: 'Vendedor Pro', sub: 'Vendo varias gorras seguido'    },
  { icon: '🏬', name: 'Negocio',      sub: 'Tengo un negocio de gorras'     },
];

const ZONES = ['El Poblado', 'Laureles', 'Envigado', 'Belén', 'Centro', 'Itagüí', 'Bello', 'Otra'];

export default function RegisterScreen({ navigation }: any) {
  const [accType, setAccType]     = useState(0);
  const [name, setName]           = useState('');
  const [phone, setPhone]         = useState('');
  const [zone, setZone]           = useState('El Poblado');
  const [password, setPassword]   = useState('');
  const [showZones, setShowZones] = useState(false);
  const [showPass, setShowPass]   = useState(false);

  function register() {
    if (!name.trim() || !phone.trim() || !password.trim()) {
      Alert.alert('Faltan datos', 'Por favor completa todos los campos');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Contraseña muy corta', 'Mínimo 6 caracteres');
      return;
    }
    Alert.alert('¡Bienvenido a CapSwap!', `Cuenta ${ACCOUNT_TYPES[accType].name} creada.`, [
      { text: 'Empezar', onPress: () => navigation.navigate('HomeTab') },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path d="M19 12H5M12 5l-7 7 7 7" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoSection}>
          <Text style={styles.logo}>Cap<Text style={{ color: C.red }}>Swap</Text></Text>
          <Text style={styles.logoSub}>La comunidad de gorras de Medellín 🧢</Text>
        </View>

        {/* Account type */}
        <Text style={styles.label}>TIPO DE CUENTA</Text>
        <View style={styles.typeGrid}>
          {ACCOUNT_TYPES.map((t, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setAccType(i)}
              style={[styles.typeCard, accType === i && styles.typeCardOn, i === 2 && styles.typeCardFull]}
              activeOpacity={0.8}
            >
              <Text style={styles.typeIcon}>{t.icon}</Text>
              <Text style={[styles.typeName, accType === i && styles.typeNameOn]}>{t.name}</Text>
              <Text style={styles.typeSub}>{t.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Name */}
        <Text style={styles.label}>NOMBRE COMPLETO</Text>
        <TextInput
          style={styles.input}
          placeholder="Tu nombre"
          placeholderTextColor="#333"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        {/* Phone */}
        <Text style={styles.label}>CELULAR (WHATSAPP)</Text>
        <TextInput
          style={styles.input}
          placeholder="+57 300 000 0000"
          placeholderTextColor="#333"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* Zone */}
        <Text style={styles.label}>ZONA EN MEDELLÍN</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowZones(p => !p)} activeOpacity={0.8}>
          <View style={styles.zoneRow}>
            <Text style={styles.zoneValue}>{zone}</Text>
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <Path d={showZones ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} stroke="#555" strokeWidth={2} strokeLinecap="round"/>
            </Svg>
          </View>
        </TouchableOpacity>
        {showZones && (
          <View style={styles.zoneDropdown}>
            {ZONES.map(z => (
              <TouchableOpacity
                key={z}
                style={[styles.zoneOption, z === zone && styles.zoneOptionOn]}
                onPress={() => { setZone(z); setShowZones(false); }}
                activeOpacity={0.8}
              >
                <Text style={[styles.zoneText, z === zone && styles.zoneTextOn]}>{z}</Text>
                {z === zone && (
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <Path d="M20 6L9 17l-5-5" stroke={C.white} strokeWidth={2.5} strokeLinecap="round"/>
                  </Svg>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Password */}
        <Text style={styles.label}>CONTRASEÑA</Text>
        <View style={styles.passRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor="#333"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
          />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPass(p => !p)} activeOpacity={0.8}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              {showPass
                ? <Path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke="#555" strokeWidth={2} strokeLinecap="round"/>
                : <>
                    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#555" strokeWidth={2}/>
                    <Circle cx="12" cy="12" r="3" stroke="#555" strokeWidth={2}/>
                  </>
              }
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Register button */}
        <TouchableOpacity style={styles.registerBtn} onPress={register} activeOpacity={0.85}>
          <Text style={styles.registerBtnText}>Crear cuenta · Empezar gratis</Text>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path d="M5 12h14M12 5l7 7-7 7" stroke={C.bg} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>o entra con</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google */}
        <TouchableOpacity
          style={styles.googleBtn}
          activeOpacity={0.85}
          onPress={() => Alert.alert('Google Auth', 'Próximamente con Supabase')}
        >
          <Text style={styles.googleG}>G</Text>
          <Text style={styles.googleText}>Continuar con Google</Text>
        </TouchableOpacity>

        {/* Apple */}
        <TouchableOpacity
          style={styles.appleBtn}
          activeOpacity={0.85}
          onPress={() => Alert.alert('Apple Auth', 'Próximamente con Supabase')}
        >
          <Text style={styles.appleIcon}></Text>
          <Text style={styles.appleText}>Continuar con Apple</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          Al registrarte aceptas los <Text style={styles.termsLink}>Términos de uso</Text> y la <Text style={styles.termsLink}>Política de privacidad</Text> de CapSwap.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: C.bg },
  header:         { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14 },
  backBtn:        { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.surface, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 9, borderWidth: 1, borderColor: C.border, alignSelf: 'flex-start' },
  backText:       { color: '#fff', fontWeight: '700', fontSize: 13 },
  scroll:         { padding: 20, paddingBottom: 60, gap: 10 },
  logoSection:    { alignItems: 'center', paddingVertical: 20 },
  logo:           { fontSize: 36, fontWeight: '900', color: C.white, letterSpacing: -1 },
  logoSub:        { color: C.muted, fontSize: 13, marginTop: 6 },
  label:          { color: '#333', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginTop: 6 },
  input:          { backgroundColor: C.surface, borderRadius: 16, padding: 15, color: C.white, fontSize: 14, borderWidth: 1, borderColor: C.border },
  typeGrid:       { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeCard:       { width: '47.5%', backgroundColor: C.surface, borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: C.border },
  typeCardOn:     { backgroundColor: C.white },
  typeCardFull:   { width: '100%' },
  typeIcon:       { fontSize: 28, marginBottom: 8 },
  typeName:       { color: '#666', fontWeight: '800', fontSize: 14, marginBottom: 3 },
  typeNameOn:     { color: C.bg },
  typeSub:        { color: '#444', fontSize: 11, textAlign: 'center' },
  zoneRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  zoneValue:      { color: C.white, fontSize: 14 },
  zoneDropdown:   { backgroundColor: C.surface, borderRadius: 16, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  zoneOption:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  zoneOptionOn:   { backgroundColor: '#1A1A1A' },
  zoneText:       { color: '#666', fontSize: 14 },
  zoneTextOn:     { color: C.white, fontWeight: '700' },
  passRow:        { flexDirection: 'row', gap: 10, alignItems: 'center' },
  eyeBtn:         { backgroundColor: C.surface, borderRadius: 16, padding: 15, borderWidth: 1, borderColor: C.border },
  registerBtn:    { backgroundColor: C.white, borderRadius: 16, padding: 17, alignItems: 'center', justifyContent: 'center', marginTop: 10, flexDirection: 'row', gap: 10 },
  registerBtnText:{ color: C.bg, fontWeight: '900', fontSize: 15 },
  dividerRow:     { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dividerLine:    { flex: 1, height: 1, backgroundColor: '#1A1A1A' },
  dividerText:    { color: C.muted, fontSize: 12 },
  googleBtn:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: C.white, borderRadius: 16, padding: 15 },
  googleG:        { fontSize: 18, fontWeight: '900', color: '#4285F4' },
  googleText:     { color: C.bg, fontWeight: '700', fontSize: 14 },
  appleBtn:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: C.surface, borderRadius: 16, padding: 15, borderWidth: 1, borderColor: C.border },
  appleIcon:      { fontSize: 18, color: C.white },
  appleText:      { color: C.white, fontWeight: '700', fontSize: 14 },
  terms:          { color: '#333', fontSize: 11, textAlign: 'center', lineHeight: 18 },
  termsLink:      { color: C.red },
});