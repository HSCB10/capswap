import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { INITIAL_CAPS } from '../data/caps';
import { CONDITIONS, LEVELS } from '../data/constants';
import { Cap } from '../types';

const C = {
  bg: '#0C0C0C', surface: '#141414', surface2: '#1C1C1C',
  white: '#FFFFFF', muted: '#444', muted2: '#666',
  border: 'rgba(255,255,255,0.05)', red: '#FF3030',
};

function getLevel(pts: number) {
  return LEVELS.find(l => pts >= l.min && pts <= l.max) || LEVELS[0];
}
function cop(n: number) { return '$' + n.toLocaleString('es-CO'); }

const COND_DOTS = ['#22CC66', '#4488FF', '#FFAA22', '#FF6644', '#FF4444'];
const BRANDS = ['Todas', 'New Era', 'Supreme', 'Jordan', 'Stussy', 'Palace', 'Carhartt'];
const TYPES  = ['Todos', 'Venta', 'Swap', 'Ambos'];

export default function SearchScreen({ navigation }: any) {
  const [query, setQuery]         = useState('');
  const [brand, setBrand]         = useState('Todas');
  const [type, setType]           = useState('Todos');
  const [minPrice, setMinPrice]   = useState('');
  const [maxPrice, setMaxPrice]   = useState('');
  const [condition, setCondition] = useState(-1);
  const [showFilters, setShowFilters] = useState(false);

  const results = INITIAL_CAPS.filter(c => {
    const matchQuery = query === '' || c.name.toLowerCase().includes(query.toLowerCase()) || c.brand.toLowerCase().includes(query.toLowerCase());
    const matchBrand = brand === 'Todas' || c.brand === brand;
    const matchType  = type === 'Todos' || c.type === type.toLowerCase();
    const matchMin   = minPrice === '' || c.price >= parseInt(minPrice);
    const matchMax   = maxPrice === '' || c.price <= parseInt(maxPrice);
    const matchCond  = condition === -1 || c.condition === condition;
    return matchQuery && matchBrand && matchType && matchMin && matchMax && matchCond;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Buscar</Text>
        <TouchableOpacity
          style={[styles.filterToggle, showFilters && styles.filterToggleOn]}
          onPress={() => setShowFilters(p => !p)}
        >
          <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
            <Line x1="4" y1="6" x2="20" y2="6" stroke={showFilters ? C.bg : '#fff'} strokeWidth={2} strokeLinecap="round"/>
            <Line x1="8" y1="12" x2="16" y2="12" stroke={showFilters ? C.bg : '#fff'} strokeWidth={2} strokeLinecap="round"/>
            <Line x1="11" y1="18" x2="13" y2="18" stroke={showFilters ? C.bg : '#fff'} strokeWidth={2} strokeLinecap="round"/>
          </Svg>
          <Text style={[styles.filterToggleText, showFilters && { color: C.bg }]}>Filtros</Text>
        </TouchableOpacity>
      </View>

      {/* Search box */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Circle cx="11" cy="11" r="8" stroke="#555" strokeWidth={2}/>
            <Line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#555" strokeWidth={2} strokeLinecap="round"/>
          </Svg>
          <TextInput
            style={styles.searchInput}
            placeholder="New Era, Supreme, Jordan..."
            placeholderTextColor="#333"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Brand chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.brandsScroll} contentContainerStyle={styles.brandsContent}>
        {BRANDS.map(b => (
          <TouchableOpacity key={b} onPress={() => setBrand(b)} style={[styles.chip, brand === b && styles.chipOn]}>
            <Text style={[styles.chipText, brand === b && styles.chipTextOn]}>{b}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Advanced filters */}
      {showFilters && (
        <View style={styles.advFilters}>
          <Text style={styles.afLabel}>TIPO</Text>
          <View style={styles.afRow}>
            {TYPES.map(t => (
              <TouchableOpacity key={t} onPress={() => setType(t)} style={[styles.afBtn, type === t && styles.afBtnOn]}>
                <Text style={[styles.afBtnText, type === t && styles.afBtnTextOn]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.afLabel}>PRECIO (COP)</Text>
          <View style={styles.priceRow}>
            <TextInput style={styles.priceInput} placeholder="Mínimo" placeholderTextColor="#333" value={minPrice} onChangeText={setMinPrice} keyboardType="numeric" />
            <Text style={styles.priceSep}>—</Text>
            <TextInput style={styles.priceInput} placeholder="Máximo" placeholderTextColor="#333" value={maxPrice} onChangeText={setMaxPrice} keyboardType="numeric" />
          </View>

          <Text style={styles.afLabel}>CONDICIÓN</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
            <TouchableOpacity onPress={() => setCondition(-1)} style={[styles.condChip, condition === -1 && styles.condChipOn]}>
              <Text style={[styles.condChipText, condition === -1 && styles.condChipTextOn]}>Todas</Text>
            </TouchableOpacity>
            {CONDITIONS.map((c, i) => (
              <TouchableOpacity key={i} onPress={() => setCondition(i)} style={[styles.condChip, condition === i && styles.condChipOn]}>
                <View style={[styles.condDot, { backgroundColor: COND_DOTS[i] }]} />
                <Text style={[styles.condChipText, condition === i && styles.condChipTextOn]}>{c.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity onPress={() => { setBrand('Todas'); setType('Todos'); setMinPrice(''); setMaxPrice(''); setCondition(-1); }} style={styles.clearFilters}>
            <Text style={styles.clearFiltersText}>Limpiar filtros</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Results count */}
      <View style={styles.resultsHead}>
        <Text style={styles.resultsCount}><Text style={{ color: C.white, fontWeight: '800' }}>{results.length}</Text> resultados</Text>
      </View>

      {/* Results list */}
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {results.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>Sin resultados para esa búsqueda</Text>
          </View>
        ) : (
          results.map(cap => (
            <ResultItem key={cap.id} cap={cap} onPress={() => navigation.navigate('Detail', { cap })} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function ResultItem({ cap, onPress }: { cap: Cap; onPress: () => void }) {
  const cond = CONDITIONS[cap.condition];
  const lv   = getLevel(cap.ownerPts);
  const isSwap = cap.type === 'swap' || cap.type === 'ambos';
  return (
    <TouchableOpacity style={[styles.resultItem, isSwap && styles.resultItemSwap]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.riImg}>
        <Text style={{ fontSize: 36 }}>🧢</Text>
      </View>
      <View style={styles.riInfo}>
        <Text style={styles.riName} numberOfLines={1}>{cap.name}</Text>
        <Text style={styles.riBrand}>{cap.brand.toUpperCase()}</Text>
        <View style={styles.riTags}>
          <View style={styles.riCondTag}>
            <View style={[styles.condDot, { backgroundColor: COND_DOTS[cap.condition] }]} />
            <Text style={styles.riCondText}>{cond.label}</Text>
          </View>
          <View style={[styles.riTypeTag, isSwap && styles.riTypeTagSwap]}>
            <Text style={[styles.riTypeText, isSwap && { color: '#fff' }]}>
              {cap.type === 'swap' ? 'SWAP' : cap.type === 'ambos' ? 'SWAP+VENTA' : 'VENTA'}
            </Text>
          </View>
        </View>
        <View style={styles.riFoot}>
          <Text style={styles.riPrice}>{cop(cap.price)}</Text>
          <Text style={styles.riSeller}>@{cap.owner} · {lv.icon} {lv.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: C.bg },
  header:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14 },
  title:           { fontSize: 27, fontWeight: '900', color: C.white, letterSpacing: -1 },
  filterToggle:    { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: C.surface, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 9, borderWidth: 1, borderColor: C.border },
  filterToggleOn:  { backgroundColor: C.white },
  filterToggleText:{ color: C.white, fontWeight: '700', fontSize: 13 },
  searchWrap:      { paddingHorizontal: 20, paddingBottom: 14 },
  searchBox:       { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: C.surface, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: C.border },
  searchInput:     { flex: 1, color: C.white, fontSize: 14, fontFamily: 'System' },
  clearBtn:        { color: '#444', fontSize: 16, paddingHorizontal: 4 },
  brandsScroll:    { flexGrow: 0, marginBottom: 14 },
  brandsContent:   { paddingHorizontal: 20, gap: 8 },
  chip:            { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 100, borderWidth: 1, borderColor: '#222' },
  chipOn:          { backgroundColor: C.white, borderColor: C.white },
  chipText:        { fontSize: 12, fontWeight: '700', color: '#555' },
  chipTextOn:      { color: C.bg },
  advFilters:      { backgroundColor: C.surface, marginHorizontal: 16, borderRadius: 20, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: C.border, gap: 10 },
  afLabel:         { color: '#444', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  afRow:           { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  afBtn:           { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: '#222' },
  afBtnOn:         { backgroundColor: C.white, borderColor: C.white },
  afBtnText:       { color: '#555', fontSize: 12, fontWeight: '700' },
  afBtnTextOn:     { color: C.bg },
  priceRow:        { flexDirection: 'row', alignItems: 'center', gap: 8 },
  priceInput:      { flex: 1, backgroundColor: '#1A1A1A', borderRadius: 10, padding: 10, color: C.white, fontSize: 13, borderWidth: 1, borderColor: '#222' },
  priceSep:        { color: '#444', fontSize: 14 },
  condChip:        { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: '#222' },
  condChipOn:      { backgroundColor: C.white, borderColor: C.white },
  condChipText:    { color: '#555', fontSize: 11, fontWeight: '700' },
  condChipTextOn:  { color: C.bg },
  condDot:         { width: 7, height: 7, borderRadius: 4 },
  clearFilters:    { alignItems: 'center', paddingTop: 4 },
  clearFiltersText:{ color: C.red, fontSize: 12, fontWeight: '700' },
  resultsHead:     { paddingHorizontal: 20, paddingBottom: 12 },
  resultsCount:    { color: C.muted, fontSize: 13 },
  list:            { paddingHorizontal: 16, paddingBottom: 80, gap: 10 },
  empty:           { alignItems: 'center', paddingTop: 60 },
  emptyEmoji:      { fontSize: 48, marginBottom: 12 },
  emptyText:       { color: C.muted, fontSize: 14, textAlign: 'center' },
  resultItem:      { flexDirection: 'row', gap: 14, backgroundColor: C.surface, borderRadius: 20, padding: 14, borderWidth: 1, borderColor: C.border },
  resultItemSwap:  { borderLeftWidth: 2, borderLeftColor: C.red },
  riImg:           { width: 72, height: 72, borderRadius: 14, backgroundColor: '#1C1C1C', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  riInfo:          { flex: 1, gap: 4 },
  riName:          { color: C.white, fontWeight: '800', fontSize: 14, letterSpacing: -0.2 },
  riBrand:         { color: '#444', fontSize: 10, fontWeight: '600', letterSpacing: 1 },
  riTags:          { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  riCondTag:       { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#1A1A1A', borderRadius: 7, paddingHorizontal: 8, paddingVertical: 4 },
  riCondText:      { fontSize: 10, fontWeight: '700', color: '#888' },
  riTypeTag:       { backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 7, paddingHorizontal: 8, paddingVertical: 4 },
  riTypeTagSwap:   { backgroundColor: C.red },
  riTypeText:      { fontSize: 10, fontWeight: '800', color: '#888' },
  riFoot:          { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  riPrice:         { color: C.white, fontWeight: '900', fontSize: 16, letterSpacing: -0.5 },
  riSeller:        { color: '#444', fontSize: 10, fontWeight: '600' },
});