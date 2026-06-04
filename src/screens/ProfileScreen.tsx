import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, LEVELS } from '../data/constants';
import { INITIAL_CAPS } from '../data/caps';

function getLevel(pts: number) {
  return LEVELS.find(l => pts >= l.min && pts <= l.max) || LEVELS[0];
}

const MY_PTS = 1800;

export default function ProfileScreen() {
  const myLv = getLevel(MY_PTS);
  const myCaps = INITIAL_CAPS.filter(c => c.owner === 'yo');
  const progress = Math.min(100, ((MY_PTS - myLv.min) / (myLv.max - myLv.min)) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Perfil</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* Profile card */}
        <View style={[styles.profileCard, { borderTopColor: myLv.color }]}>
          <View style={styles.avatarRow}>
            <View style={[styles.avatar, { backgroundColor: myLv.color + '20', borderColor: myLv.color + '50' }]}>
              <Text style={styles.avatarEmoji}>{myLv.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.username}>@yo</Text>
              <View style={[styles.lvBadge, { backgroundColor: myLv.color + '20', borderColor: myLv.color + '40' }]}>
                <Text style={[styles.lvText, { color: myLv.color }]}>{myLv.icon} {myLv.name}</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.ptsNum, { color: myLv.color }]}>{MY_PTS}</Text>
              <Text style={styles.ptsLabel}>PUNTOS</Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>{myLv.min} pts</Text>
              <Text style={styles.progressLabel}>Siguiente: {myLv.max + 1} pts</Text>
            </View>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${progress}%` as any, backgroundColor: myLv.color }]} />
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[['GORRAS', myCaps.length], ['PUNTOS', MY_PTS], ['NIVEL', myLv.name]].map(([l, v]) => (
              <View key={l} style={styles.statItem}>
                <Text style={[styles.statVal, { color: myLv.color }]}>{v}</Text>
                <Text style={styles.statLabel}>{l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Levels */}
        <Text style={styles.sectionLabel}>SISTEMA DE NIVELES</Text>
        {LEVELS.map(lv => (
          <View key={lv.name} style={[styles.levelRow, { borderColor: MY_PTS >= lv.min ? lv.color + '40' : 'rgba(255,255,255,0.06)', opacity: MY_PTS >= lv.min ? 1 : 0.4 }]}>
            <Text style={styles.levelIcon}>{lv.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.levelName, { color: lv.color }]}>{lv.name}</Text>
              <Text style={styles.levelRange}>{lv.min} — {lv.max} pts</Text>
            </View>
            {MY_PTS >= lv.min && <Text style={[styles.activeTag, { color: lv.color }]}>✓ ACTIVO</Text>}
          </View>
        ))}

        {/* My caps */}
        {myCaps.length > 0 && <>
          <Text style={styles.sectionLabel}>MIS GORRAS</Text>
          {myCaps.map(c => (
            <View key={c.id} style={[styles.capRow, { borderLeftColor: c.color }]}>
              <Text style={styles.capEmoji}>🧢</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.capName}>{c.name}</Text>
                <Text style={styles.capBrand}>{c.brand}</Text>
              </View>
              <Text style={styles.capPrice}>${c.price.toLocaleString('es-CO')}</Text>
            </View>
          ))}
        </>}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: COLORS.bg },
  header:         { padding: 20, paddingTop: 10 },
  title:          { color: '#fff', fontWeight: '900', fontSize: 24 },
  content:        { padding: 16, paddingBottom: 60 },
  profileCard:    { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 20, borderTopWidth: 2, marginBottom: 20 },
  avatarRow:      { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
  avatar:         { width: 56, height: 56, borderRadius: 28, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  avatarEmoji:    { fontSize: 26 },
  username:       { color: '#fff', fontWeight: '900', fontSize: 18, marginBottom: 4 },
  lvBadge:        { borderRadius: 8, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' },
  lvText:         { fontSize: 11, fontWeight: '700' },
  ptsNum:         { fontWeight: '900', fontSize: 28 },
  ptsLabel:       { color: COLORS.muted, fontSize: 10, fontWeight: '700' },
  progressSection:{ marginBottom: 20 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel:  { color: COLORS.muted, fontSize: 10, fontWeight: '700' },
  progressBg:     { height: 6, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' },
  progressFill:   { height: '100%', borderRadius: 3 },
  statsRow:       { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 12, overflow: 'hidden' },
  statItem:       { flex: 1, padding: 14, alignItems: 'center' },
  statVal:        { fontWeight: '900', fontSize: 22 },
  statLabel:      { color: COLORS.muted, fontSize: 9, fontWeight: '700', marginTop: 2 },
  sectionLabel:   { color: COLORS.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 10, marginTop: 4 },
  levelRow:       { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 14, marginBottom: 6, borderWidth: 1 },
  levelIcon:      { fontSize: 24 },
  levelName:      { fontWeight: '900', fontSize: 16 },
  levelRange:     { color: COLORS.muted, fontSize: 11, marginTop: 2 },
  activeTag:      { fontWeight: '800', fontSize: 11 },
  capRow:         { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 14, marginBottom: 6, borderLeftWidth: 3 },
  capEmoji:       { fontSize: 28 },
  capName:        { color: '#fff', fontWeight: '800', fontSize: 14 },
  capBrand:       { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  capPrice:       { color: COLORS.gold, fontWeight: '900', fontSize: 15 },
});