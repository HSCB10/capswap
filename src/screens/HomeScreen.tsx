import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { INITIAL_CAPS } from '../data/caps';
import { CONDITIONS, LEVELS } from '../data/constants';
import { Cap } from '../types';

const C = {
  bg: '#0C0C0C', surface: '#141414', surface2: '#1C1C1C',
  white: '#FFFFFF', muted: '#444444', muted2: '#666666',
  border: 'rgba(255,255,255,0.05)', red: '#FF3030',
};

function getLevel(pts: number) {
  return LEVELS.find(l => pts >= l.min && pts <= l.max) || LEVELS[0];
}
function cop(n: number) { return '$' + n.toLocaleString('es-CO'); }

const COND_DOTS = ['#22CC66', '#4488FF', '#FFAA22', '#FF6644', '#FF4444'];

function CapCard({ cap, onPress }: { cap: Cap; onPress: () => void }) {
  const cond = CONDITIONS[cap.condition];
  const isSwap = cap.type === 'swap' || cap.type === 'ambos';
  return (
    <TouchableOpacity
      style={[styles.card, isSwap && styles.cardSwap]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.cardImg}>
        <Text style={styles.cardEmoji}>🧢</Text>
        <View style={styles.cardBadges}>
          {isSwap
            ? <View style={styles.badgeSwap}><Text style={styles.badgeSwapText}>SWAP</Text></View>
            : <View style={styles.badgeVenta}><Text style={styles.badgeVentaText}>VENTA</Text></View>
          }
        </View>
        <View style={styles.condRow}>
          <View style={[styles.condDot, { backgroundColor: COND_DOTS[cap.condition] }]} />
          <Text style={styles.condLabel}>{cond.label}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardName} numberOfLines={1}>{cap.name}</Text>
        <Text style={styles.cardBrand}>{cap.brand.toUpperCase()}</Text>
        <View style={styles.cardDiv} />
        <View style={styles.cardFoot}>
          <Text style={styles.cardPrice}>{cop(cap.price)}</Text>
          <View style={styles.cardPts}>
            <Text style={styles.cardPtsText}>+{cond.pts}</Text>
          </View>
        </View>
        <Text style={styles.cardSeller} numberOfLines={1}>📍 @{cap.owner}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }: any) {
  const [filter, setFilter] = useState<'all' | 'venta' | 'swap'>('all');

  const caps = INITIAL_CAPS.filter(c =>
    filter === 'all' ? true :
    filter === 'swap' ? c.type === 'swap' || c.type === 'ambos' :
    c.type === 'venta' || c.type === 'ambos'
  );

  const FILTERS = [
    { key: 'all',   label: 'Todos'     },
    { key: 'venta', label: '💰 Venta'  },
    { key: 'swap',  label: '🔄 Swap'   },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          Cap<Text style={{ color: C.red }}>Swap</Text>
        </Text>
        <View style={styles.headerRight}>
          <View style={styles.iconBtn}>
            <Text style={{ fontSize: 16 }}>🔔</Text>
            <View style={styles.redDot} />
          </View>
          <View style={styles.avatarBtn}>
            <Text style={styles.avatarText}>SC</Text>
          </View>
        </View>
      </View>

      {/* Filter chips */}
      <View style={styles.chipsContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={FILTERS}
          keyExtractor={i => i.key}
          contentContainerStyle={styles.chipsContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setFilter(item.key as any)}
              style={[styles.chip, filter === item.key && styles.chipOn]}
              activeOpacity={0.8}
            >
              <Text style={[styles.chipText, filter === item.key && styles.chipTextOn]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Section title */}
      <View style={styles.secTitle}>
        <Text style={styles.secTitleText}>Cerca de ti · Medellín</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.secTitleSub}>Ver todos →</Text>
        </TouchableOpacity>
      </View>

      {/* Grid */}
      <FlatList
        data={caps}
        keyExtractor={i => i.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CapCard
            cap={item}
            onPress={() => navigation.navigate('Detail', { cap: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: C.bg },
  header:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14 },
  logo:            { fontSize: 27, fontWeight: '900', color: C.white, letterSpacing: -1 },
  headerRight:     { flexDirection: 'row', gap: 10, alignItems: 'center' },
  iconBtn:         { width: 38, height: 38, backgroundColor: '#1A1A1A', borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  redDot:          { width: 8, height: 8, backgroundColor: C.red, borderRadius: 4, position: 'absolute', top: -2, right: -2, borderWidth: 1.5, borderColor: C.bg },
  avatarBtn:       { width: 38, height: 38, backgroundColor: C.white, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  avatarText:      { fontSize: 12, fontWeight: '900', color: C.bg },
  chipsContainer:  { marginBottom: 14 },
  chipsContent:    { paddingHorizontal: 20, gap: 8 },
  chip:            { paddingHorizontal: 20, paddingVertical: 9, borderRadius: 100, borderWidth: 1, borderColor: '#2A2A2A', backgroundColor: 'transparent' },
  chipOn:          { backgroundColor: C.white, borderColor: C.white },
  chipText:        { fontSize: 13, fontWeight: '700', color: '#555' },
  chipTextOn:      { color: C.bg },
  secTitle:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 14 },
  secTitleText:    { fontSize: 15, fontWeight: '800', color: C.white },
  secTitleSub:     { fontSize: 12, color: C.muted, fontWeight: '500' },
  list:            { paddingHorizontal: 16, paddingBottom: 20 },
  row:             { gap: 12, marginBottom: 12 },
  card:            { flex: 1, backgroundColor: C.surface, borderRadius: 22, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
  cardSwap:        { borderLeftWidth: 2, borderLeftColor: C.red },
  cardImg:         { height: 124, backgroundColor: '#1C1C1C', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  cardEmoji:       { fontSize: 52 },
  cardBadges:      { position: 'absolute', top: 10, right: 10 },
  badgeSwap:       { backgroundColor: C.red, borderRadius: 7, paddingHorizontal: 8, paddingVertical: 3 },
  badgeSwapText:   { fontSize: 9, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  badgeVenta:      { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 7, paddingHorizontal: 8, paddingVertical: 3 },
  badgeVentaText:  { fontSize: 9, fontWeight: '800', color: '#ccc', letterSpacing: 0.5 },
  condRow:         { position: 'absolute', bottom: 10, left: 12, flexDirection: 'row', alignItems: 'center', gap: 5 },
  condDot:         { width: 7, height: 7, borderRadius: 4 },
  condLabel:       { fontSize: 9, fontWeight: '700', color: 'rgba(255,255,255,0.5)' },
  cardBody:        { padding: 12 },
  cardName:        { fontSize: 13, fontWeight: '800', color: C.white, marginBottom: 2, letterSpacing: -0.2 },
  cardBrand:       { fontSize: 10, color: '#444', fontWeight: '600', marginBottom: 10, letterSpacing: 0.8 },
  cardDiv:         { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: 10 },
  cardFoot:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardPrice:       { fontSize: 17, fontWeight: '900', color: C.white, letterSpacing: -0.5 },
  cardPts:         { backgroundColor: 'rgba(255,48,48,0.1)', borderWidth: 1, borderColor: 'rgba(255,48,48,0.2)', borderRadius: 7, paddingHorizontal: 7, paddingVertical: 3 },
  cardPtsText:     { fontSize: 10, fontWeight: '800', color: C.red },
  cardSeller:      { marginTop: 7, fontSize: 10, color: '#3A3A3A', fontWeight: '600' },
});