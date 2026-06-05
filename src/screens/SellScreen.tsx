import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Svg, { Path, Line, Circle } from 'react-native-svg';
import { CONDITIONS } from '../data/constants';
import { CapType } from '../types';

const C = {
  bg: '#0C0C0C', surface: '#141414', surface2: '#1C1C1C',
  white: '#FFFFFF', muted: '#444', border: 'rgba(255,255,255,0.05)', red: '#FF3030',
};

const COND_DOTS = ['#22CC66', '#4488FF', '#FFAA22', '#FF6644', '#FF4444'];

export default function SellScreen({ navigation }: any) {
  const [name, setName]           = useState('');
  const [brand, setBrand]         = useState('');
  const [price, setPrice]         = useState('');
  const [condition, setCondition] = useState(0);
  const [type, setType]           = useState<CapType>('venta');

  function publish() {
    if (!name.trim() || !price.trim()) {
      Alert.alert('Faltan datos', 'Nombre y precio son obligatorios');
      return;
    }
    Alert.alert('¡Publicado!', `${name} publicada exitosamente.`, [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Publicar gorra</Text>
        <View style={styles.headerIcon}>
          <Text style={{ fontSize: 20 }}>🧢</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Name */}
        <Text style={styles.label}>NOMBRE *</Text>
        <TextInput
          style={styles.input}
          placeholder="New Era 59Fifty Lakers..."
          placeholderTextColor="#333"
          value={name}
          onChangeText={setName}
        />

        {/* Brand */}
        <Text style={styles.label}>MARCA</Text>
        <TextInput
          style={styles.input}
          placeholder="New Era, Supreme, Jordan..."
          placeholderTextColor="#333"
          value={brand}
          onChangeText={setBrand}
        />

        {/* Price */}
        <Text style={styles.label}>PRECIO (COP) *</Text>
        <TextInput
          style={styles.input}
          placeholder="150000"
          placeholderTextColor="#333"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Condition */}
        <Text style={styles.label}>CONDICIÓN</Text>
        <View style={styles.condList}>
          {CONDITIONS.map((c, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setCondition(i)}
              style={[styles.condItem, condition === i && styles.condItemOn]}
              activeOpacity={0.8}
            >
              <View style={styles.condLeft}>
                <View style={[styles.condDot, { backgroundColor: COND_DOTS[i] }]} />
                <Text style={[styles.condLabel, condition === i && styles.condLabelOn]}>{c.label}</Text>
              </View>
              <View style={styles.condRight}>
                <Text style={styles.condPts}>+{c.pts} pts</Text>
                {condition === i && (
                  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                    <Path d="M20 6L9 17l-5-5" stroke={C.white} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
                  </Svg>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Type */}
        <Text style={styles.label}>TIPO DE PUBLICACIÓN</Text>
        <View style={styles.typeRow}>
          {([
            { key: 'venta', label: 'Venta', desc: 'Solo compra directa' },
            { key: 'swap',  label: 'Swap',  desc: 'Solo intercambio'    },
            { key: 'ambos', label: 'Ambos', desc: 'Venta e intercambio' },
          ] as { key: CapType; label: string; desc: string }[]).map(t => (
            <TouchableOpacity
              key={t.key}
              onPress={() => setType(t.key)}
              style={[styles.typeBtn, type === t.key && styles.typeBtnOn]}
              activeOpacity={0.8}
            >
              <Text style={[styles.typeBtnLabel, type === t.key && styles.typeBtnLabelOn]}>{t.label}</Text>
              <Text style={styles.typeBtnDesc}>{t.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary */}
        {name.trim() && price.trim() && (
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#fff" strokeWidth={2} strokeLinecap="round"/>
              </Svg>
              <Text style={styles.summaryText}>Escrow automático activado en cada transacción</Text>
            </View>
            <View style={styles.summaryRow}>
              <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth={2}/>
                <Path d="M12 8v4M12 16h.01" stroke="#fff" strokeWidth={2} strokeLinecap="round"/>
              </Svg>
              <Text style={styles.summaryText}>Comisión: 3% vendedor + 2% comprador</Text>
            </View>
            <View style={styles.summaryRow}>
              <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
              <Text style={styles.summaryText}>+{CONDITIONS[condition].pts} puntos al publicar</Text>
            </View>
          </View>
        )}

        {/* Publish button */}
        <TouchableOpacity style={styles.publishBtn} onPress={publish} activeOpacity={0.85}>
          <Text style={styles.publishBtnText}>Publicar gorra</Text>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke={C.bg} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: C.bg },
  header:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14 },
  title:          { fontSize: 27, fontWeight: '900', color: C.white, letterSpacing: -1 },
  headerIcon:     { width: 44, height: 44, backgroundColor: C.surface, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border },
  scroll:         { padding: 20, paddingBottom: 60, gap: 8 },
  label:          { color: '#444', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginTop: 10, marginBottom: 8 },
  input:          { backgroundColor: C.surface, borderRadius: 16, padding: 15, color: C.white, fontSize: 14, borderWidth: 1, borderColor: C.border },
  condList:       { gap: 6 },
  condItem:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.surface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.border },
  condItemOn:     { backgroundColor: '#1A1A1A', borderColor: 'rgba(255,255,255,0.12)' },
  condLeft:       { flexDirection: 'row', alignItems: 'center', gap: 10 },
  condDot:        { width: 8, height: 8, borderRadius: 4 },
  condLabel:      { color: '#666', fontWeight: '700', fontSize: 13 },
  condLabelOn:    { color: C.white },
  condRight:      { flexDirection: 'row', alignItems: 'center', gap: 8 },
  condPts:        { color: C.red, fontWeight: '800', fontSize: 13 },
  typeRow:        { flexDirection: 'row', gap: 8 },
  typeBtn:        { flex: 1, backgroundColor: C.surface, borderRadius: 14, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: C.border },
  typeBtnOn:      { backgroundColor: C.white, borderColor: C.white },
  typeBtnLabel:   { color: '#555', fontWeight: '800', fontSize: 13, marginBottom: 3 },
  typeBtnLabelOn: { color: C.bg },
  typeBtnDesc:    { color: '#333', fontSize: 10, textAlign: 'center' },
  summary:        { backgroundColor: C.surface, borderRadius: 16, padding: 16, gap: 10, borderWidth: 1, borderColor: C.border, marginTop: 8 },
  summaryRow:     { flexDirection: 'row', alignItems: 'center', gap: 10 },
  summaryText:    { color: '#666', fontSize: 12, flex: 1 },
  publishBtn:     { backgroundColor: C.white, borderRadius: 18, padding: 18, alignItems: 'center', justifyContent: 'center', marginTop: 16, flexDirection: 'row', gap: 10 },
  publishBtnText: { color: C.bg, fontWeight: '900', fontSize: 16 },
});