import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { CONDITIONS, COLORS } from '../data/constants';
import { CapType } from '../types';

export default function SellScreen({ navigation }: any) {
  const [name, setName]       = useState('');
  const [brand, setBrand]     = useState('');
  const [price, setPrice]     = useState('');
  const [condition, setCondition] = useState(0);
  const [type, setType]       = useState<CapType>('venta');

  function publish() {
    if (!name.trim() || !price.trim()) {
      Alert.alert('Faltan datos', 'Nombre y precio son obligatorios');
      return;
    }
    Alert.alert('🧢 ¡Publicado!', `${name} publicada exitosamente.`, [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Publicar Gorra 🧢</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}>

        {/* Nombre */}
        <Text style={styles.label}>NOMBRE *</Text>
        <TextInput style={styles.input} placeholder="New Era 59Fifty Lakers..." placeholderTextColor={COLORS.muted} value={name} onChangeText={setName} />

        {/* Marca */}
        <Text style={styles.label}>MARCA</Text>
        <TextInput style={styles.input} placeholder="New Era, Supreme, Jordan..." placeholderTextColor={COLORS.muted} value={brand} onChangeText={setBrand} />

        {/* Precio */}
        <Text style={styles.label}>PRECIO (COP) *</Text>
        <TextInput style={styles.input} placeholder="150000" placeholderTextColor={COLORS.muted} value={price} onChangeText={setPrice} keyboardType="numeric" />

        {/* Condición */}
        <Text style={styles.label}>CONDICIÓN</Text>
        {CONDITIONS.map((c, i) => (
          <TouchableOpacity key={i} onPress={() => setCondition(i)}
            style={[styles.condBtn, condition === i && { backgroundColor: c.color + '20', borderColor: c.color + '60' }]}>
            <Text style={[styles.condBtnLabel, condition === i && { color: c.color }]}>{c.label}</Text>
            <Text style={[styles.condBtnPts, { color: c.color }]}>+{c.pts} pts</Text>
          </TouchableOpacity>
        ))}

        {/* Tipo */}
        <Text style={styles.label}>TIPO DE PUBLICACIÓN</Text>
        <View style={styles.typeRow}>
          {(['venta', 'swap', 'ambos'] as CapType[]).map(t => (
            <TouchableOpacity key={t} onPress={() => setType(t)}
              style={[styles.typeBtn, type === t && styles.typeBtnActive]}>
              <Text style={[styles.typeBtnText, type === t && styles.typeBtnTextActive]}>
                {t === 'venta' ? '💰 Venta' : t === 'swap' ? '🔄 Swap' : '💰🔄 Ambos'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.publishBtn} onPress={publish}>
          <Text style={styles.publishBtnText}>Publicar gorra 🧢</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: COLORS.bg },
  header:           { padding: 20, paddingTop: 10 },
  title:            { color: '#fff', fontWeight: '900', fontSize: 24 },
  form:             { padding: 20, gap: 8, paddingBottom: 60 },
  label:            { color: COLORS.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginTop: 12, marginBottom: 6 },
  input:            { backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 14, color: '#fff', fontSize: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  condBtn:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 4 },
  condBtnLabel:     { color: 'rgba(255,255,255,0.6)', fontWeight: '700', fontSize: 13 },
  condBtnPts:       { fontWeight: '800', fontSize: 13 },
  typeRow:          { flexDirection: 'row', gap: 8 },
  typeBtn:          { flex: 1, padding: 12, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', alignItems: 'center' },
  typeBtnActive:    { backgroundColor: 'rgba(255,215,0,0.15)', borderColor: 'rgba(255,215,0,0.5)' },
  typeBtnText:      { color: 'rgba(255,255,255,0.4)', fontWeight: '800', fontSize: 10 },
  typeBtnTextActive:{ color: COLORS.gold },
  publishBtn:       { backgroundColor: COLORS.gold, borderRadius: 16, padding: 18, alignItems: 'center', marginTop: 20 },
  publishBtnText:   { color: '#000', fontWeight: '900', fontSize: 16 },
});