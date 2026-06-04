import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { COLORS } from '../data/constants';

const ACCOUNTS = [
  {
    icon: '👤',
    name: 'Personal',
    sub: 'Para coleccionistas y usuarios casuales',
    price: 'Gratis',
    color: '#00E5A0',
    bgColor: 'rgba(0,229,160,0.1)',
    borderColor: 'rgba(0,229,160,0.3)',
    cta: 'Tu cuenta actual',
    ctaColor: '#1A1A1A',
    ctaTextColor: 'rgba(255,255,255,0.4)',
    features: [
      { icon: '🧢', text: 'Hasta 3 gorras activas al mismo tiempo' },
      { icon: '🔄', text: 'Swap y venta habilitados' },
      { icon: '💬', text: 'Chat con compradores y vendedores' },
      { icon: '🔒', text: 'Escrow automático en cada transacción' },
      { icon: '📍', text: 'Acceso a puntos seguros verificados' },
      { icon: '💸', text: '5% comisión total (3% vendedor + 2% comprador)' },
    ],
  },
  {
    icon: '🏪',
    name: 'Vendedor Pro',
    sub: 'Para vendedores frecuentes',
    price: '$25k/mes',
    color: '#9B59B6',
    bgColor: 'rgba(155,89,182,0.1)',
    borderColor: 'rgba(155,89,182,0.3)',
    cta: 'Activar Vendedor Pro',
    ctaColor: '#9B59B6',
    ctaTextColor: '#fff',
    features: [
      { icon: '🧢', text: 'Gorras ilimitadas activas al mismo tiempo' },
      { icon: '📌', text: '3 publicaciones destacadas al mes incluidas' },
      { icon: '📊', text: 'Dashboard: vistas, contactos, conversión' },
      { icon: '💸', text: '8% de comisión por volumen de ventas' },
      { icon: '⭐', text: 'Badge "Vendedor Pro" en perfil y publicaciones' },
      { icon: '🚀', text: 'Prioridad en resultados de búsqueda' },
    ],
  },
  {
    icon: '🏬',
    name: 'Negocio',
    sub: 'Tiendas, marcas y distribuidores',
    price: '$80k/mes',
    color: '#E8A838',
    bgColor: 'rgba(232,168,56,0.1)',
    borderColor: 'rgba(232,168,56,0.3)',
    cta: 'Registrar mi negocio',
    ctaColor: '#E8A838',
    ctaTextColor: '#000',
    features: [
      { icon: '🏬', text: 'Perfil de tienda con logo, banner y descripción' },
      { icon: '🧢', text: 'Catálogo ilimitado con gestión por colecciones' },
      { icon: '📍', text: 'Tu tienda aparece como punto seguro verificado' },
      { icon: '📣', text: '5 publicaciones destacadas + banner en búsqueda' },
      { icon: '💸', text: '10% comisión por volumen y visibilidad extra' },
      { icon: '📊', text: 'Analytics avanzado: tráfico, conversión, reputación' },
    ],
  },
];

export default function AccountsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Tipos de cuenta</Text>
        <Text style={styles.heroSub}>Elige el plan que se adapte a cómo usas CapSwap</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Commission info */}
        <View style={styles.commBox}>
          <Text style={styles.commTitle}>💰 ¿Cómo funcionan las comisiones?</Text>
          <Text style={styles.commText}>CapSwap cobra una comisión dividida entre vendedor y comprador. El dinero se retiene en escrow hasta que ambas partes confirman la transacción.</Text>
          <View style={styles.commRow}>
            {[['Personal', '5%', '#00E5A0'], ['Vendedor Pro', '8%', '#9B59B6'], ['Negocio', '10%', '#E8A838']].map(([name, pct, color]) => (
              <View key={name} style={[styles.commItem, { borderColor: color + '40', backgroundColor: color + '10' }]}>
                <Text style={[styles.commPct, { color }]}>{pct}</Text>
                <Text style={styles.commName}>{name}</Text>
              </View>
            ))}
          </View>
        </View>

        {ACCOUNTS.map((acc, i) => (
          <View key={i} style={[styles.card, { borderColor: acc.borderColor }]}>
            {/* Header */}
            <View style={[styles.cardHead, { backgroundColor: acc.bgColor }]}>
              <View style={[styles.accIcon, { backgroundColor: acc.bgColor, borderColor: acc.borderColor, borderWidth: 1 }]}>
                <Text style={{ fontSize: 24 }}>{acc.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.accName, { color: acc.color }]}>{acc.name}</Text>
                <Text style={styles.accSub}>{acc.sub}</Text>
              </View>
              <View style={[styles.priceBadge, { backgroundColor: acc.bgColor, borderColor: acc.borderColor }]}>
                <Text style={[styles.priceText, { color: acc.color }]}>{acc.price}</Text>
              </View>
            </View>

            {/* Features */}
            <View style={styles.features}>
              {acc.features.map((f, j) => (
                <View key={j} style={[styles.featRow, j < acc.features.length - 1 && styles.featBorder]}>
                  <Text style={styles.featIcon}>{f.icon}</Text>
                  <Text style={styles.featText}>{f.text}</Text>
                </View>
              ))}
            </View>

            {/* CTA */}
            <TouchableOpacity
              style={[styles.cta, { backgroundColor: acc.ctaColor }]}
              onPress={() => {
                if (i === 0) return;
                Alert.alert(`Activar ${acc.name}`, `¿Deseas activar el plan ${acc.name} por ${acc.price}?`, [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Activar', onPress: () => Alert.alert('✅ ¡Listo!', `Plan ${acc.name} activado.`) },
                ]);
              }}
            >
              <Text style={[styles.ctaText, { color: acc.ctaTextColor }]}>{acc.cta}</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: COLORS.bg },
  hero:       { backgroundColor: '#0D0D1A', padding: 20, paddingTop: 10 },
  heroTitle:  { color: '#fff', fontWeight: '900', fontSize: 22, marginBottom: 4 },
  heroSub:    { color: 'rgba(255,255,255,0.4)', fontSize: 13 },
  content:    { padding: 16, paddingBottom: 80 },
  commBox:    { backgroundColor: 'rgba(255,215,0,0.06)', borderWidth: 1, borderColor: 'rgba(255,215,0,0.2)', borderRadius: 16, padding: 16, marginBottom: 16 },
  commTitle:  { color: COLORS.gold, fontWeight: '800', fontSize: 14, marginBottom: 8 },
  commText:   { color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 19, marginBottom: 14 },
  commRow:    { flexDirection: 'row', gap: 8 },
  commItem:   { flex: 1, alignItems: 'center', padding: 10, borderRadius: 10, borderWidth: 1 },
  commPct:    { fontWeight: '900', fontSize: 22 },
  commName:   { color: COLORS.muted, fontSize: 10, fontWeight: '700', marginTop: 2 },
  card:       { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, borderWidth: 1, marginBottom: 12, overflow: 'hidden' },
  cardHead:   { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  accIcon:    { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  accName:    { fontWeight: '900', fontSize: 17 },
  accSub:     { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 },
  priceBadge: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 },
  priceText:  { fontWeight: '800', fontSize: 13 },
  features:   { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 8 },
  featRow:    { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 10 },
  featBorder: { borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.06)' },
  featIcon:   { fontSize: 16, flexShrink: 0, marginTop: 1 },
  featText:   { color: 'rgba(255,255,255,0.6)', fontSize: 13, flex: 1, lineHeight: 19 },
  cta:        { margin: 16, marginTop: 4, padding: 14, borderRadius: 12, alignItems: 'center' },
  ctaText:    { fontWeight: '800', fontSize: 14 },
});