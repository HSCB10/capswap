import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { SAFE_SPOTS } from '../data/constants';

const C = {
  bg: '#0C0C0C', surface: '#141414', surface2: '#1C1C1C',
  white: '#FFFFFF', muted: '#444', border: 'rgba(255,255,255,0.05)', red: '#FF3030',
};

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
        <Text style={styles.title}>Spots</Text>
        <View style={styles.headerIcon}>
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={C.bg} strokeWidth={2} strokeLinecap="round"/>
            <Circle cx="12" cy="10" r="3" stroke={C.bg} strokeWidth={2}/>
          </Svg>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Puntos de encuentro verificados en Medellín para transacciones seguras.</Text>

        {/* Spots */}
        <Text style={styles.sectionLabel}>UBICACIONES</Text>
        <View style={styles.spotsCard}>
          {SAFE_SPOTS.map((s, i) => (
            <View key={s.name} style={[styles.spotRow, i < SAFE_SPOTS.length - 1 && styles.spotRowBorder]}>
              <View style={styles.spotIconBox}>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#fff" strokeWidth={2} strokeLinecap="round"/>
                  <Circle cx="12" cy="10" r="3" stroke="#fff" strokeWidth={2}/>
                </Svg>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.spotName}>{s.name}</Text>
                <Text style={styles.spotAddress}>{s.address}</Text>
                <View style={styles.metroRow}>
                  <Text style={styles.metroText}>🚇 {s.metro}</Text>
                </View>
              </View>
              <View style={styles.verifiedBadge}>
                <Svg width={10} height={10} viewBox="0 0 24 24" fill="none">
                  <Path d="M20 6L9 17l-5-5" stroke={C.white} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
              </View>
            </View>
          ))}
        </View>

        {/* Tips */}
        <Text style={styles.sectionLabel}>TIPS DE SEGURIDAD</Text>
        <View style={styles.tipsCard}>
          {TIPS.map((tip, i) => (
            <View key={i} style={[styles.tipRow, i < TIPS.length - 1 && styles.tipRowBorder]}>
              <View style={styles.tipDot} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Escrow reminder */}
        <View style={styles.escrowReminder}>
          <View style={styles.escrowReminderIcon}>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={C.bg} strokeWidth={2} strokeLinecap="round"/>
            </Svg>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.escrowReminderTitle}>Activa el Escrow</Text>
            <Text style={styles.escrowReminderText}>Siempre activa el escrow antes de ir al encuentro. Tu dinero queda protegido hasta confirmar.</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:            { flex: 1, backgroundColor: C.bg },
  header:               { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14 },
  title:                { fontSize: 27, fontWeight: '900', color: C.white, letterSpacing: -1 },
  headerIcon:           { width: 44, height: 44, backgroundColor: C.white, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  scroll:               { padding: 16, paddingBottom: 60, gap: 12 },
  subtitle:             { color: C.muted, fontSize: 13, lineHeight: 20, marginBottom: 4 },
  sectionLabel:         { color: '#333', fontSize: 10, fontWeight: '700', letterSpacing: 2, marginLeft: 4 },
  spotsCard:            { backgroundColor: C.surface, borderRadius: 20, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  spotRow:              { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  spotRowBorder:        { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  spotIconBox:          { width: 40, height: 40, backgroundColor: '#1A1A1A', borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border },
  spotName:             { color: C.white, fontWeight: '800', fontSize: 14, marginBottom: 2 },
  spotAddress:          { color: C.muted, fontSize: 12, marginBottom: 6 },
  metroRow:             { flexDirection: 'row' },
  metroText:            { color: '#555', fontSize: 11, fontWeight: '600' },
  verifiedBadge:        { width: 28, height: 28, backgroundColor: C.red, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  tipsCard:             { backgroundColor: C.surface, borderRadius: 20, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  tipRow:               { flexDirection: 'row', alignItems: 'flex-start', gap: 12, padding: 16 },
  tipRowBorder:         { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  tipDot:               { width: 6, height: 6, borderRadius: 3, backgroundColor: C.red, marginTop: 5, flexShrink: 0 },
  tipText:              { color: '#777', fontSize: 13, flex: 1, lineHeight: 20 },
  escrowReminder:       { backgroundColor: C.red, borderRadius: 20, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14 },
  escrowReminderIcon:   { width: 44, height: 44, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  escrowReminderTitle:  { color: C.white, fontWeight: '900', fontSize: 15, marginBottom: 4 },
  escrowReminderText:   { color: 'rgba(255,255,255,0.7)', fontSize: 12, lineHeight: 18 },
});