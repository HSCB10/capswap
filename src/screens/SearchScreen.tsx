import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { INITIAL_CAPS } from '../data/caps';
import { CONDITIONS, COLORS, LEVELS } from '../data/constants';
import { Cap } from '../types';

function getLevel(pts: number) {
  return LEVELS.find(l => pts >= l.min && pts <= l.max) || LEVELS[0];
}
function cop(n: number) { return '$' + n.toLocaleString('es-CO'); }

const BRANDS = ['Todas', 'New Era', 'Supreme', 'Jordan', 'Stussy', 'Palace', 'Carhartt'];
const TYPES  = ['Todos', 'Venta', 'Swap', 'Ambos'];

export default function SearchScreen({ navigation }: any) {
  const [query, setQuery]       = useState('');
  const [brand, setBrand]       = useState('Todas');
  const [type, setType]         = useState('Todos');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
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
      {/* Search hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Buscar gorras</Text>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="New Era, Supreme, Jordan..."
            placeholderTextColor="rgba(240,237,230,0.35)"
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

        {/* Brand chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips} contentContainerStyle={{ gap: 7 }}>
          {BRANDS.map(b => (
            <TouchableOpacity key={b} onPress={() => setBrand(b)}
              style={[styles.chip, brand === b && styles.chipActive]}>
              <Text style={[styles.chipText, brand === b && styles.chipTextActive]}>{b}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Advanced filters toggle */}
      <TouchableOpacity style={styles.filterToggle} onPress={() => setShowFilters(p => !p)}>
        <Text style={styles.filterToggleText}>⚙️ Filtros avanzados</Text>
        <Text style={styles.filterToggleArrow}>{showFilters ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showFilters && (
        <View style={styles.advFilters}>
          {/* Type */}
          <Text style={styles.afLabel}>TIPO</Text>
          <View style={styles.afRow}>
            {TYPES.map(t => (
              <TouchableOpacity key={t} onPress={() => setType(t)}
                style={[styles.afBtn, type === t && styles.afBtnActive]}>
                <Text style={[styles.afBtnText, type === t && styles.afBtnTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price range */}
          <Text style={styles.afLabel}>PRECIO (COP)</Text>
          <View style={styles.priceRow}>
            <TextInput style={styles.priceInput} placeholder="Mínimo" placeholderTextColor={COLORS.muted} value={minPrice} onChangeText={setMinPrice} keyboardType="numeric" />
            <Text style={styles.priceSep}>—</Text>
            <TextInput style={styles.priceInput} placeholder="Máximo" placeholderTextColor={COLORS.muted} value={maxPrice} onChangeText={setMaxPrice} keyboardType="numeric" />
          </View>

          {/* Condition */}
          <Text style={styles.afLabel}>CONDICIÓN</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
            <TouchableOpacity onPress={() => setCondition(-1)}
              style={[styles.condChip, condition === -1 && styles.condChipActive]}>
              <Text style={[styles.condChipText, condition === -1 && styles.condChipTextActive]}>Todas</Text>
            </TouchableOpacity>
            {CONDITIONS.map((c, i) => (
              <TouchableOpacity key={i} onPress={() => setCondition(i)}
                style={[styles.condChip, condition === i && { backgroundColor: c.color + '20', borderColor: c.color }]}>
                <Text style={[styles.condChipText, condition === i && { color: c.color }]}>{c.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.clearFilters} onPress={() => { setBrand('Todas'); setType('Todos'); setMinPrice(''); setMaxPrice(''); setCondition(-1); }}>
            <Text style={styles.clearFiltersText}>Limpiar filtros</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Results */}
      <View style={styles.resultsHead}>
        <Text style={styles.resultsCount}><Text style={{ color: '#fff', fontWeight: '700' }}>{results.length}</Text> resultados</Text>
        <TouchableOpacity style={styles.sortBtn}>
          <Text style={styles.sortBtnText}>↕ Ordenar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {results.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>No encontramos gorras con esos filtros</Text>
          </View>
        ) : (
          results.map(cap => <ResultItem key={cap.id} cap={cap} onPress={() => navigation.navigate('Detail', { cap })} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function ResultItem({ cap, onPress }: { cap: Cap; onPress: () => void }) {
  const cond = CONDITIONS[cap.condition];
  const lv   = getLevel(cap.ownerPts);
  return (
    <TouchableOpacity style={styles.resultItem} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.riImg, { backgroundColor: cap.color + '20' }]}>
        <Text style={{ fontSize: 36 }}>🧢</Text>
      </View>
      <View style={styles.riInfo}>
        <Text style={styles.riBrand}>{cap.name}</Text>
        <Text style={styles.riDesc}>{cap.brand}</Text>
        <View style={styles.riTags}>
          <View style={[styles.riTag, { backgroundColor: cond.color + '20', borderColor: cond.color + '40' }]}>
            <Text style={[styles.riTagText, { color: cond.color }]}>{cond.label}</Text>
          </View>
          <View style={[styles.riTag, { backgroundColor: cap.color + '20', borderColor: cap.color + '40' }]}>
            <Text style={[styles.riTagText, { color: cap.color }]}>
              {cap.type === 'swap' ? '🔄 Swap' : cap.type === 'ambos' ? '🔄💰' : '💰 Venta'}
            </Text>
          </View>
        </View>
        <View style={styles.riFoot}>
          <Text style={styles.riPrice}>{cop(cap.price)} COP</Text>
          <View style={[styles.lvMini, { backgroundColor: lv.color + '20', borderColor: lv.color + '40' }]}>
            <Text style={[styles.lvMiniText, { color: lv.color }]}>{lv.icon} @{cap.owner}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: COLORS.bg },
  hero:             { backgroundColor: '#0D0D1A', paddingBottom: 4 },
  heroTitle:        { color: '#fff', fontWeight: '900', fontSize: 20, padding: 20, paddingBottom: 12 },
  searchBox:        { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 12, marginHorizontal: 20, padding: 12 },
  searchIcon:       { fontSize: 18 },
  searchInput:      { flex: 1, color: '#F0EDE6', fontSize: 14, fontFamily: 'System' },
  clearBtn:         { color: 'rgba(240,237,230,0.5)', fontSize: 16, paddingHorizontal: 4 },
  chips:            { paddingHorizontal: 20, paddingVertical: 12 },
  chip:             { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 100, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.06)' },
  chipActive:       { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  chipText:         { color: 'rgba(240,237,230,0.6)', fontSize: 12, fontWeight: '600' },
  chipTextActive:   { color: '#000' },
  filterToggle:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, paddingHorizontal: 20, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.06)', backgroundColor: '#0F0F1E' },
  filterToggleText: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '600' },
  filterToggleArrow:{ color: COLORS.gold, fontSize: 12 },
  advFilters:       { backgroundColor: '#0F0F1E', padding: 16, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.06)' },
  afLabel:          { color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8, marginTop: 4 },
  afRow:            { flexDirection: 'row', gap: 6, marginBottom: 12, flexWrap: 'wrap' },
  afBtn:            { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.1)' },
  afBtnActive:      { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  afBtnText:        { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: '600' },
  afBtnTextActive:  { color: '#000' },
  priceRow:         { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  priceInput:       { flex: 1, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: 10, color: '#fff', fontSize: 13, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.1)' },
  priceSep:         { color: COLORS.muted, fontSize: 14 },
  condChip:         { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.1)' },
  condChipActive:   { backgroundColor: COLORS.gold + '20', borderColor: COLORS.gold },
  condChipText:     { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '600' },
  condChipTextActive:{ color: COLORS.gold },
  clearFilters:     { marginTop: 12, alignItems: 'center' },
  clearFiltersText: { color: '#FF5252', fontSize: 12, fontWeight: '700' },
  resultsHead:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, paddingHorizontal: 20 },
  resultsCount:     { color: COLORS.muted, fontSize: 13 },
  sortBtn:          { backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 100, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.1)' },
  sortBtnText:      { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  list:             { paddingHorizontal: 16, paddingBottom: 80 },
  empty:            { alignItems: 'center', paddingTop: 60 },
  emptyEmoji:       { fontSize: 48, marginBottom: 12 },
  emptyText:        { color: COLORS.muted, fontSize: 14, textAlign: 'center' },
  resultItem:       { flexDirection: 'row', gap: 12, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 12, marginBottom: 8, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.06)' },
  riImg:            { width: 72, height: 72, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  riInfo:           { flex: 1 },
  riBrand:          { color: '#fff', fontWeight: '800', fontSize: 14, marginBottom: 2 },
  riDesc:           { color: COLORS.muted, fontSize: 12, marginBottom: 6 },
  riTags:           { flexDirection: 'row', gap: 5, marginBottom: 6, flexWrap: 'wrap' },
  riTag:            { borderRadius: 5, borderWidth: 0.5, paddingHorizontal: 7, paddingVertical: 2 },
  riTagText:        { fontSize: 10, fontWeight: '700' },
  riFoot:           { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  riPrice:          { color: '#fff', fontWeight: '900', fontSize: 15 },
  lvMini:           { borderRadius: 6, borderWidth: 0.5, paddingHorizontal: 7, paddingVertical: 3 },
  lvMiniText:       { fontSize: 10, fontWeight: '700' },
});