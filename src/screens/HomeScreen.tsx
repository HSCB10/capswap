import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { INITIAL_CAPS } from '../data/caps';
import { CONDITIONS, COLORS, LEVELS } from '../data/constants';
import { Cap } from '../types';

function getLevel(pts: number) {
  return LEVELS.find(l => pts >= l.min && pts <= l.max) || LEVELS[0];
}

function cop(n: number) {
  return '$' + n.toLocaleString('es-CO') + ' COP';
}

function CapCard({ cap, onPress }: { cap: Cap; onPress: () => void }) {
  const cond = CONDITIONS[cap.condition];
  const lv = getLevel(cap.ownerPts);
  return (
    <TouchableOpacity style={[styles.card, { borderTopColor: cap.color }]} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.capImage, { backgroundColor: cap.color + '15' }]}>
        <Text style={styles.capEmoji}>🧢</Text>
        <View style={[styles.typeBadge, { borderColor: cap.color + '60', backgroundColor: cap.color + '20' }]}>
          <Text style={[styles.typeBadgeText, { color: cap.color }]}>
            {cap.type === 'swap' ? '🔄 SWAP' : cap.type === 'ambos' ? '🔄💰' : '💰 VENTA'}
          </Text>
        </View>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardName} numberOfLines={1}>{cap.name}</Text>
        <Text style={styles.cardBrand}>{cap.brand}</Text>
        <View style={styles.cardBottom}>
          <Text style={styles.cardPrice}>{cop(cap.price)}</Text>
          <View style={[styles.ptsBadge, { backgroundColor: cond.color + '20', borderColor: cond.color + '50' }]}>
            <Text style={[styles.ptsText, { color: cond.color }]}>+{cond.pts}pts</Text>
          </View>
        </View>
        <View style={[styles.levelBadge, { backgroundColor: lv.color + '20', borderColor: lv.color + '40' }]}>
          <Text style={[styles.levelText, { color: lv.color }]}>{lv.icon} {lv.name} · @{cap.owner}</Text>
        </View>
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>CAP<Text style={{ color: COLORS.gold }}>SWAP</Text></Text>
        <View style={styles.levelPill}>
          <Text style={styles.levelPillText}>🥇 1800pts</Text>
        </View>
      </View>

      <View style={styles.filters}>
        {(['all', 'venta', 'swap'] as const).map(f => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? 'Todos' : f === 'venta' ? '💰 Venta' : '🔄 Swap'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={caps}
        keyExtractor={i => i.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CapCard cap={item} onPress={() => navigation.navigate('Detail', { cap: item })} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: COLORS.bg },
  header:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 10 },
  logo:            { fontFamily: 'System', fontWeight: '900', fontSize: 28, color: '#fff', letterSpacing: 2 },
  levelPill:       { backgroundColor: 'rgba(255,215,0,0.15)', borderWidth: 1, borderColor: 'rgba(255,215,0,0.4)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  levelPillText:   { color: COLORS.gold, fontSize: 12, fontWeight: '700' },
  filters:         { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 12 },
  filterBtn:       { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  filterBtnActive: { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  filterText:      { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '700' },
  filterTextActive:{ color: '#000' },
  list:            { padding: 8 },
  row:             { gap: 8, marginBottom: 8 },
  card:            { flex: 1, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 16, overflow: 'hidden', borderTopWidth: 2 },
  capImage:        { height: 110, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  capEmoji:        { fontSize: 52 },
  typeBadge:       { position: 'absolute', top: 8, left: 8, borderRadius: 8, borderWidth: 1, paddingHorizontal: 7, paddingVertical: 3 },
  typeBadgeText:   { fontSize: 9, fontWeight: '800' },
  cardInfo:        { padding: 12 },
  cardName:        { color: '#fff', fontWeight: '800', fontSize: 13, marginBottom: 2 },
  cardBrand:       { color: 'rgba(255,255,255,0.4)', fontSize: 11, marginBottom: 8 },
  cardBottom:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardPrice:       { color: '#fff', fontWeight: '900', fontSize: 15 },
  ptsBadge:        { borderRadius: 6, borderWidth: 1, paddingHorizontal: 7, paddingVertical: 3 },
  ptsText:         { fontSize: 9, fontWeight: '700' },
  levelBadge:      { borderRadius: 8, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4 },
  levelText:       { fontSize: 10, fontWeight: '700' },
});