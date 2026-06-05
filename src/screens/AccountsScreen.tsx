import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Svg, { Path, Line, Circle } from 'react-native-svg';

const C = {
  bg: '#0C0C0C', surface: '#141414',
  white: '#FFFFFF', muted: '#444', border: 'rgba(255,255,255,0.05)', red: '#FF3030',
};

const ACCOUNTS = [
  {
    icon: '👤', name: 'Personal', sub: 'Para coleccionistas y usuarios casuales',
    price: 'Gratis', current: true,
    features: [
      'Hasta 3 gorras activas al mismo tiempo',
      'Swap y venta habilitados',
      'Chat con compradores y vendedores',
      'Escrow automático en cada transacción',
      'Acceso a puntos seguros verificados',
      '5% comisión total (3% + 2%)',
    ],
  },
  {
    icon: '🏪', name: 'Vendedor Pro', sub: 'Para vendedores frecuentes',
    price: '$25k/mes', current: false,
    features: [
      'Gorras ilimitadas activas',
      '3 publicaciones destacadas al mes',
      'Dashboard con estadísticas de ventas',
      'Badge "Vendedor Pro" en perfil',
      'Prioridad en resultados de búsqueda',
      '8% comisión por volumen',
    ],
  },
  {
    icon: '🏬', name: 'Negocio', sub: 'Tiendas, marcas y distribuidores',
    price: '$80k/mes', current: false,
    features: [
      'Perfil de tienda con logo y banner',
      'Catálogo ilimitado por colecciones',
      'Tu tienda como punto seguro verificado',
      '5 publicaciones destacadas + banner',
      'Analytics avanzado de tráfico',
      '10% comisión + visibilidad extra',
    ],
  },
];

export default function AccountsScreen({ navigation }: any) {
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Tipos de cuenta</Text>
        <Text style={styles.subtitle}>Elige el plan que se adapte a cómo usas CapSwap.</Text>

        {/* Commission info */}
        <View style={styles.commCard}>
          <View style={styles.commHeader}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#fff" strokeWidth={2} strokeLinecap="round"/>
            </Svg>
            <Text style={styles.commTitle}>Comisiones por plan</Text>
          </View>
          <View style={styles.commRow}>
            {[['Personal', '5%'], ['Vendedor Pro', '8%'], ['Negocio', '10%']].map(([n, p]) => (
              <View key={n} style={styles.commItem}>
                <Text style={styles.commPct}>{p}</Text>
                <Text style={styles.commName}>{n}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Account cards */}
        {ACCOUNTS.map((acc, i) => (
          <View key={i} style={[styles.accCard, acc.current && styles.accCardCurrent]}>
            {/* Header */}
            <View style={styles.accHeader}>
              <Text style={styles.accIcon}>{acc.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.accName}>{acc.name}</Text>
                <Text style={styles.accSub}>{acc.sub}</Text>
              </View>
              <View style={[styles.priceBadge, acc.current && styles.priceBadgeCurrent]}>
                <Text style={[styles.priceText, acc.current && styles.priceTextCurrent]}>{acc.price}</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.accDiv} />

            {/* Features */}
            <View style={styles.features}>
              {acc.features.map((f, j) => (
                <View key={j} style={styles.featRow}>
                  <View style={styles.featCheck}>
                    <Svg width={10} height={10} viewBox="0 0 24 24" fill="none">
                      <Path d="M20 6L9 17l-5-5" stroke={acc.current ? C.bg : C.white} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
                    </Svg>
                  </View>
                  <Text style={styles.featText}>{f}</Text>
                </View>
              ))}
            </View>

            {/* CTA */}
            {acc.current ? (
              <View style={styles.currentBadge}>
                <Text style={styles.currentBadgeText}>Tu plan actual</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.ctaBtn}
                activeOpacity={0.85}
                onPress={() => Alert.alert(`Activar ${acc.name}`, `¿Deseas activar el plan ${acc.name} por ${acc.price}?`, [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Activar', onPress: () => Alert.alert('✅ ¡Listo!', `Plan ${acc.name} activado.`) },
                ])}
              >
                <Text style={styles.ctaBtnText}>Activar {acc.name}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:          { flex: 1, backgroundColor: C.bg },
  header:             { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14 },
  backBtn:            { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.surface, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 9, borderWidth: 1, borderColor: C.border, alignSelf: 'flex-start' },
  backText:           { color: '#fff', fontWeight: '700', fontSize: 13 },
  scroll:             { padding: 16, paddingBottom: 60, gap: 12 },
  title:              { fontSize: 27, fontWeight: '900', color: C.white, letterSpacing: -1, marginBottom: 4 },
  subtitle:           { color: C.muted, fontSize: 13, lineHeight: 20, marginBottom: 4 },
  commCard:           { backgroundColor: C.surface, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: C.border, gap: 14 },
  commHeader:         { flexDirection: 'row', alignItems: 'center', gap: 10 },
  commTitle:          { color: C.white, fontWeight: '800', fontSize: 14 },
  commRow:            { flexDirection: 'row', gap: 8 },
  commItem:           { flex: 1, backgroundColor: '#111', borderRadius: 14, padding: 14, alignItems: 'center', gap: 4 },
  commPct:            { color: C.white, fontWeight: '900', fontSize: 22, letterSpacing: -1 },
  commName:           { color: C.muted, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  accCard:            { backgroundColor: C.surface, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: C.border },
  accCardCurrent:     { backgroundColor: C.white },
  accHeader:          { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  accIcon:            { fontSize: 28 },
  accName:            { fontSize: 17, fontWeight: '900', color: C.white, letterSpacing: -0.5 },
  accSub:             { fontSize: 12, color: C.muted, marginTop: 2 },
  priceBadge:         { backgroundColor: '#111', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  priceBadgeCurrent:  { backgroundColor: C.bg },
  priceText:          { color: C.white, fontWeight: '800', fontSize: 14 },
  priceTextCurrent:   { color: C.white },
  accDiv:             { height: 1, backgroundColor: 'rgba(0,0,0,0.08)', marginBottom: 16 },
  features:           { gap: 10, marginBottom: 18 },
  featRow:            { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  featCheck:          { width: 20, height: 20, backgroundColor: C.bg, borderRadius: 6, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 },
  featText:           { color: '#555', fontSize: 13, flex: 1, lineHeight: 20 },
  currentBadge:       { backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: 14, padding: 14, alignItems: 'center' },
  currentBadgeText:   { color: C.bg, fontWeight: '800', fontSize: 13 },
  ctaBtn:             { backgroundColor: C.white, borderRadius: 14, padding: 15, alignItems: 'center' },
  ctaBtnText:         { color: C.bg, fontWeight: '900', fontSize: 14 },
});