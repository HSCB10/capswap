import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Svg, { Path, Circle, Line, Polyline } from 'react-native-svg';
import { COLORS, LEVELS } from '../data/constants';
import { INITIAL_CAPS } from '../data/caps';

const C = {
  bg: '#0C0C0C', surface: '#141414', surface2: '#1C1C1C',
  white: '#FFFFFF', muted: '#444', border: 'rgba(255,255,255,0.05)', red: '#FF3030',
};

function getLevel(pts: number) {
  return LEVELS.find(l => pts >= l.min && pts <= l.max) || LEVELS[0];
}

const MY_PTS = 1800;
const COND_DOTS = ['#22CC66', '#4488FF', '#FFAA22', '#FF6644', '#FF4444'];

export default function ProfileScreen({ navigation }: any) {
  const myLv    = getLevel(MY_PTS);
  const myCaps  = INITIAL_CAPS.filter(c => c.owner === 'yo');
  const progress = Math.min(100, ((MY_PTS - myLv.min) / (myLv.max - myLv.min)) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.headerIcon}>
          <Text style={{ fontSize: 20 }}>SC</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#fff" strokeWidth={2} strokeLinecap="round"/>
                <Circle cx="12" cy="7" r="4" stroke="#fff" strokeWidth={2}/>
              </Svg>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.username}>@yo</Text>
              <View style={styles.lvBadge}>
                <Text style={styles.lvBadgeText}>{myLv.icon} {myLv.name}</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.ptsNum}>{MY_PTS}</Text>
              <Text style={styles.ptsLabel}>PUNTOS</Text>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progressWrap}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>{myLv.min} pts</Text>
              <Text style={styles.progressLabel}>Siguiente: {myLv.max + 1} pts</Text>
            </View>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${progress}%` as any }]} />
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[['GORRAS', myCaps.length], ['PUNTOS', MY_PTS], ['NIVEL', myLv.name]].map(([l, v]) => (
              <View key={l as string} style={styles.statItem}>
                <Text style={styles.statVal}>{v}</Text>
                <Text style={styles.statLabel}>{l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Levels */}
        <Text style={styles.sectionLabel}>SISTEMA DE NIVELES</Text>
        <View style={styles.levelsCard}>
          {LEVELS.map((lv, i) => (
            <View key={lv.name} style={[styles.levelRow, i < LEVELS.length - 1 && styles.levelRowBorder, MY_PTS < lv.min && { opacity: 0.35 }]}>
              <Text style={styles.levelIcon}>{lv.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.levelName}>{lv.name}</Text>
                <Text style={styles.levelRange}>{lv.min} — {lv.max} pts</Text>
              </View>
              {MY_PTS >= lv.min && (
                <View style={styles.activeBadge}>
                  <Svg width={10} height={10} viewBox="0 0 24 24" fill="none">
                    <Path d="M20 6L9 17l-5-5" stroke={C.white} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
                  </Svg>
                  <Text style={styles.activeBadgeText}>ACTIVO</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* My caps */}
        {myCaps.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>MIS GORRAS</Text>
            <View style={styles.capsCard}>
              {myCaps.map((c, i) => (
                <View key={c.id} style={[styles.capRow, i < myCaps.length - 1 && styles.capRowBorder]}>
                  <View style={styles.capImg}>
                    <Text style={{ fontSize: 22 }}>🧢</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.capName}>{c.name}</Text>
                    <Text style={styles.capBrand}>{c.brand.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.capPrice}>${c.price.toLocaleString('es-CO')}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Quick links */}
        <Text style={styles.sectionLabel}>MÁS</Text>
        <View style={styles.linksCard}>
          {[
            { label: 'Estados de gorras', screen: 'Conditions', icon: '⭐' },
            { label: 'Tipos de cuenta',   screen: 'Accounts',   icon: '🏪' },
            { label: 'Crear cuenta',      screen: 'Register',   icon: '📝' },
          ].map(({ label, screen, icon }, i) => (
            <TouchableOpacity
              key={screen}
              onPress={() => navigation.navigate(screen)}
              style={[styles.linkRow, i < 2 && styles.linkRowBorder]}
              activeOpacity={0.7}
            >
              <Text style={styles.linkIcon}>{icon}</Text>
              <Text style={styles.linkLabel}>{label}</Text>
              <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                <Path d="M9 18l6-6-6-6" stroke="#444" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: C.bg },
  header:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14 },
  title:          { fontSize: 27, fontWeight: '900', color: C.white, letterSpacing: -1 },
  headerIcon:     { width: 44, height: 44, backgroundColor: C.white, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  scroll:         { padding: 16, paddingBottom: 60, gap: 12 },
  profileCard:    { backgroundColor: C.surface, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: C.border },
  profileTop:     { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
  avatar:         { width: 54, height: 54, backgroundColor: '#1A1A1A', borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  username:       { color: C.white, fontWeight: '900', fontSize: 18, marginBottom: 5, letterSpacing: -0.5 },
  lvBadge:        { backgroundColor: 'rgba(255,48,48,0.1)', borderWidth: 1, borderColor: 'rgba(255,48,48,0.2)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  lvBadgeText:    { color: C.red, fontSize: 11, fontWeight: '800' },
  ptsNum:         { fontSize: 32, fontWeight: '900', color: C.white, letterSpacing: -1 },
  ptsLabel:       { color: C.muted, fontSize: 9, fontWeight: '700', letterSpacing: 1.5 },
  progressWrap:   { marginBottom: 16 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel:  { color: C.muted, fontSize: 10, fontWeight: '700' },
  progressBg:     { height: 3, backgroundColor: '#1A1A1A', borderRadius: 2, overflow: 'hidden' },
  progressFill:   { height: '100%', backgroundColor: C.white, borderRadius: 2 },
  statsRow:       { flexDirection: 'row', backgroundColor: '#111', borderRadius: 14, overflow: 'hidden' },
  statItem:       { flex: 1, padding: 14, alignItems: 'center' },
  statVal:        { color: C.white, fontWeight: '900', fontSize: 20, letterSpacing: -0.5 },
  statLabel:      { color: C.muted, fontSize: 8, fontWeight: '700', letterSpacing: 1.5, marginTop: 2 },
  sectionLabel:   { color: '#333', fontSize: 10, fontWeight: '700', letterSpacing: 2, marginLeft: 4 },
  levelsCard:     { backgroundColor: C.surface, borderRadius: 20, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  levelRow:       { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  levelRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  levelIcon:      { fontSize: 22 },
  levelName:      { color: C.white, fontWeight: '800', fontSize: 14 },
  levelRange:     { color: C.muted, fontSize: 11, marginTop: 2 },
  activeBadge:    { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  activeBadgeText:{ color: C.white, fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  capsCard:       { backgroundColor: C.surface, borderRadius: 20, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  capRow:         { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  capRowBorder:   { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  capImg:         { width: 44, height: 44, backgroundColor: '#1C1C1C', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  capName:        { color: C.white, fontWeight: '800', fontSize: 13 },
  capBrand:       { color: C.muted, fontSize: 10, marginTop: 2, letterSpacing: 0.8 },
  capPrice:       { color: C.white, fontWeight: '900', fontSize: 14 },
  linksCard:      { backgroundColor: C.surface, borderRadius: 20, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  linkRow:        { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  linkRowBorder:  { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  linkIcon:       { fontSize: 18 },
  linkLabel:      { flex: 1, color: C.white, fontWeight: '700', fontSize: 14 },
});