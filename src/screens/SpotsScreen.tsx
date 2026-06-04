import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, SAFE_SPOTS } from '../data/constants';

const TIPS = [
  'Siempre elige lugares públicos y concurridos',
  'Verifica el nivel del usuario antes de encontrarte',
  'Activa el Escrow antes del encuentro',
  'No lleves más dinero del necesario',
  'Comparte tu ubicación con alguien de confianza',
];

export default function SpotsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📍 Spots Seguros</Text>
        <Text style={styles.subtitle}>Puntos de encuentro verificados — Medellín</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {SAFE_SPOTS.map((s, i) => (
          <View key={i} style={styles.spotCard}>
            <View style={styles.spotAccent} />
            <View style={styles.spotInfo}>
              <Text style={styles.spotName}>{s.name}</Text>
              <Text style={styles.spotAddress}>{s.address}</Text>
              <View style={styles.badgeRow}>
                <View style={styles.metroBadge}>
                  <Text style={styles.metroText}>🚇 {s.metro}</Text>
                </View>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓ Verificado</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Tips de Seguridad</Text>
          {TIPS.map((t, i) => (
            <View key={i} style={styles.tipRow}>
              <Text style={styles.tipArrow}>→</Text>
              <Text style={styles.tipText}>{t}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: COLORS.bg },
  header:       { padding: 20, paddingTop: 10 },
  title:        { color: '#fff', fontWeight: '900', fontSize: 24 },
  subtitle:     { color: COLORS.muted, fontSize: 13, marginTop: 4 },
  content:      { padding: 16, paddingBottom: 60 },
  spotCard:     { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, marginBottom: 10, flexDirection: 'row', overflow: 'hidden' },
  spotAccent:   { width: 3, backgroundColor: COLORS.gold },
  spotInfo:     { flex: 1, padding: 16 },
  spotName:     { color: '#fff', fontWeight: '800', fontSize: 16, marginBottom: 4 },
  spotAddress:  { color: COLORS.muted, fontSize: 13, marginBottom: 12 },
  badgeRow:     { flexDirection: 'row', gap: 8 },
  metroBadge:   { backgroundColor: 'rgba(255,215,0,0.1)', borderWidth: 1, borderColor: 'rgba(255,215,0,0.25)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  metroText:    { color: COLORS.gold, fontSize: 11, fontWeight: '700' },
  verifiedBadge:{ backgroundColor: 'rgba(0,229,160,0.1)', borderWidth: 1, borderColor: 'rgba(0,229,160,0.25)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  verifiedText: { color: '#00E5A0', fontSize: 11, fontWeight: '700' },
  tipsCard:     { backgroundColor: 'rgba(0,229,160,0.05)', borderWidth: 1, borderColor: 'rgba(0,229,160,0.2)', borderRadius: 16, padding: 20, marginTop: 8 },
  tipsTitle:    { color: '#00E5A0', fontWeight: '800', fontSize: 14, marginBottom: 14, letterSpacing: 0.5 },
  tipRow:       { flexDirection: 'row', gap: 10, marginBottom: 10 },
  tipArrow:     { color: '#00E5A0', fontWeight: '800', fontSize: 12, marginTop: 2 },
  tipText:      { color: 'rgba(255,255,255,0.55)', fontSize: 13, flex: 1, lineHeight: 20 },
});