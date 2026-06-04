import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { COLORS } from '../data/constants';

const ACCOUNT_TYPES = [
  { icon: '👤', name: 'Personal',      sub: 'Intercambio y venta personal' },
  { icon: '🏪', name: 'Vendedor Pro',  sub: 'Vendo varias gorras seguido' },
  { icon: '🏬', name: 'Negocio',       sub: 'Tengo un negocio de gorras' },
];

const ZONES = ['El Poblado', 'Laureles', 'Envigado', 'Belén', 'Centro', 'Itagüí', 'Bello', 'Otra'];

export default function RegisterScreen({ navigation }: any) {
  const [accType, setAccType]   = useState(0);
  const [name, setName]         = useState('');
  const [phone, setPhone]       = useState('');
  const [zone, setZone]         = useState('El Poblado');
  const [password, setPassword] = useState('');
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
    Alert.alert('🎉 ¡Bienvenido a CapSwap!', `Cuenta ${ACCOUNT_TYPES[accType].name} creada exitosamente.`, [
      { text: 'Empezar', onPress: () => navigation.navigate('HomeTab') },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* Logo */}
        <View style={styles.logoSection}>
          <Text style={styles.logo}>Cap<Text style={{ color: COLORS.gold }}>Swap</Text></Text>
          <Text style={styles.tagline}>La comunidad de gorras de Medellín 🧢</Text>
        </View>

        <View style={styles.form}>

          {/* Account type */}
          <Text style={styles.label}>TIPO DE CUENTA</Text>
          <View style={styles.typeGrid}>
            {ACCOUNT_TYPES.map((t, i) => (
              <TouchableOpacity key={i} onPress={() => setAccType(i)}
                style={[styles.typeCard, accType === i && styles.typeCardActive, i === 2 && styles.typeCardFull]}>
                <Text style={styles.typeIcon}>{t.icon}</Text>
                <Text style={[styles.typeName, accType === i && styles.typeNameActive]}>{t.name}</Text>
                <Text style={styles.typeSub}>{t.sub}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Name */}
          <Text style={styles.label}>NOMBRE COMPLETO</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre"
            placeholderTextColor={COLORS.muted}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          {/* Phone */}
          <Text style={styles.label}>CELULAR (WHATSAPP)</Text>
          <TextInput
            style={styles.input}
            placeholder="+57 300 000 0000"
            placeholderTextColor={COLORS.muted}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          {/* Zone */}
          <Text style={styles.label}>ZONA EN MEDELLÍN</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowZones(p => !p)}>
            <View style={styles.zoneRow}>
              <Text style={{ color: '#fff', fontSize: 14 }}>{zone}</Text>
              <Text style={{ color: COLORS.muted }}>{showZones ? '▲' : '▼'}</Text>
            </View>
          </TouchableOpacity>
          {showZones && (
            <View style={styles.zoneDropdown}>
              {ZONES.map(z => (
                <TouchableOpacity key={z} style={[styles.zoneOption, z === zone && styles.zoneOptionActive]}
                  onPress={() => { setZone(z); setShowZones(false); }}>
                  <Text style={[styles.zoneText, z === zone && styles.zoneTextActive]}>{z}</Text>
                  {z === zone && <Text style={{ color: COLORS.gold }}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Password */}
          <Text style={styles.label}>CONTRASEÑA</Text>
          <View style={styles.passRow}>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor={COLORS.muted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
            />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPass(p => !p)}>
              <Text style={{ fontSize: 18 }}>{showPass ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          {/* CTA */}
          <TouchableOpacity style={styles.registerBtn} onPress={register}>
            <Text style={styles.registerBtnText}>Crear cuenta · Empezar gratis 🚀</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o entra con</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google */}
          <TouchableOpacity style={styles.googleBtn} onPress={() => Alert.alert('Google Auth', 'Próximamente con Supabase')}>
            <Text style={styles.googleLetter}>G</Text>
            <Text style={styles.googleText}>Continuar con Google</Text>
          </TouchableOpacity>

          {/* Apple */}
          <TouchableOpacity style={styles.appleBtn} onPress={() => Alert.alert('Apple Auth', 'Próximamente con Supabase')}>
            <Text style={styles.appleLetter}></Text>
            <Text style={styles.appleText}>Continuar con Apple</Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text style={styles.terms}>
            Al registrarte aceptas los{' '}
            <Text style={styles.termsLink}>Términos de uso</Text>
            {' '}y la{' '}
            <Text style={styles.termsLink}>Política de privacidad</Text>
            {' '}de CapSwap.
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: COLORS.bg },
  scroll:           { paddingBottom: 80 },
  logoSection:      { backgroundColor: '#0D0D1A', padding: 32, alignItems: 'center' },
  logo:             { fontWeight: '900', fontSize: 36, color: '#fff', letterSpacing: 1 },
  tagline:          { color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 6 },
  form:             { padding: 20 },
  label:            { color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8, marginTop: 16 },
  typeGrid:         { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeCard:         { width: '47%', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 14, alignItems: 'center' },
  typeCardActive:   { backgroundColor: 'rgba(255,215,0,0.1)', borderColor: 'rgba(255,215,0,0.4)' },
  typeCardFull:     { width: '100%' },
  typeIcon:         { fontSize: 28, marginBottom: 6 },
  typeName:         { color: 'rgba(255,255,255,0.6)', fontWeight: '800', fontSize: 13, marginBottom: 3 },
  typeNameActive:   { color: COLORS.gold },
  typeSub:          { color: 'rgba(255,255,255,0.3)', fontSize: 11, textAlign: 'center' },
  input:            { backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 14, color: '#fff', fontSize: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 4 },
  zoneRow:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  zoneDropdown:     { backgroundColor: '#111122', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 4, overflow: 'hidden' },
  zoneOption:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.06)' },
  zoneOptionActive: { backgroundColor: 'rgba(255,215,0,0.08)' },
  zoneText:         { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  zoneTextActive:   { color: COLORS.gold, fontWeight: '700' },
  passRow:          { flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 4 },
  eyeBtn:           { backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  registerBtn:      { backgroundColor: COLORS.gold, borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 20 },
  registerBtnText:  { color: '#000', fontWeight: '900', fontSize: 15 },
  dividerRow:       { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 20 },
  dividerLine:      { flex: 1, height: 0.5, backgroundColor: 'rgba(255,255,255,0.1)' },
  dividerText:      { color: COLORS.muted, fontSize: 12 },
  googleBtn:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10 },
  googleLetter:     { fontSize: 18, fontWeight: '900', color: '#4285F4' },
  googleText:       { color: '#111', fontWeight: '700', fontSize: 14 },
  appleBtn:         { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: '#1A1A1A', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 10 },
  appleLetter:      { fontSize: 18, color: '#fff' },
  appleText:        { color: '#fff', fontWeight: '700', fontSize: 14 },
  terms:            { color: 'rgba(255,255,255,0.25)', fontSize: 11, textAlign: 'center', lineHeight: 18, marginTop: 8 },
  termsLink:        { color: COLORS.gold },
});