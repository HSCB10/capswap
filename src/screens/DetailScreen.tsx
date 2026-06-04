import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { CONDITIONS, COLORS, LEVELS, SAFE_SPOTS } from '../data/constants';
import { Cap, EscrowState } from '../types';

function getLevel(pts: number) {
  return LEVELS.find(l => pts >= l.min && pts <= l.max) || LEVELS[0];
}
function cop(n: number) { return '$' + n.toLocaleString('es-CO') + ' COP'; }

export default function DetailScreen({ route, navigation }: any) {
  const { cap }: { cap: Cap } = route.params;
  const [escrow, setEscrow] = useState<EscrowState>('idle');
  const [reported, setReported] = useState(cap.reported);
  const cond = CONDITIONS[cap.condition];
  const ownerLv = getLevel(cap.ownerPts);

  function handleEscrow() {
    setEscrow('locked');
    Alert.alert('🔒 Escrow activado', 'Fondos retenidos. Realiza el pago y confirma.');
  }

  function handleConfirm() {
    setEscrow('confirmed');
    setTimeout(() => {
      setEscrow('released');
      Alert.alert('🎉 ¡Completado!', 'Transacción liberada exitosamente.');
    }, 1500);
  }

  function handleReport() {
    Alert.alert('⚠️ Reportar', '¿Confirmas el reporte? Costo: 20 pts', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Reportar', style: 'destructive', onPress: () => setReported(r => r + 1) },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReport}>
          <Text style={styles.reportBtn}>⚠️ Reportar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: cap.color + '15' }]}>
          <Text style={styles.heroEmoji}>🧢</Text>
          {reported >= 3 && (
            <View style={styles.pausedOverlay}>
              <Text style={styles.pausedText}>⚠️ PAUSADA POR REPORTES</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          {/* Info */}
          <View style={[styles.card, { borderTopColor: cap.color }]}>
            <Text style={styles.capName}>{cap.name}</Text>
            <Text style={styles.capBrand}>{cap.brand}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{cop(cap.price)}</Text>
              <View style={[styles.condBadge, { backgroundColor: cond.color + '20', borderColor: cond.color + '50' }]}>
                <Text style={[styles.condText, { color: cond.color }]}>{cond.label}</Text>
              </View>
            </View>
          </View>

          {/* Owner */}
          <View style={[styles.card, { borderTopColor: ownerLv.color }]}>
            <View style={styles.ownerRow}>
              <View style={[styles.ownerAvatar, { backgroundColor: ownerLv.color + '20', borderColor: ownerLv.color + '50' }]}>
                <Text style={styles.ownerEmoji}>👤</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.ownerName}>@{cap.owner}</Text>
                <View style={[styles.lvBadge, { backgroundColor: ownerLv.color + '20', borderColor: ownerLv.color + '40' }]}>
                  <Text style={[styles.lvText, { color: ownerLv.color }]}>{ownerLv.icon} {ownerLv.name}</Text>
                </View>
              </View>
              <Text style={[styles.ownerPts, { color: ownerLv.color }]}>{cap.ownerPts}pts</Text>
            </View>
          </View>

          {/* Reports */}
          {reported > 0 && (
            <View style={styles.reportWarning}>
              <Text style={styles.reportWarnText}>⚠️ {reported} reporte{reported > 1 ? 's' : ''}{reported >= 3 ? ' — PAUSADA' : ''}</Text>
            </View>
          )}

          {/* Escrow */}
          {escrow === 'idle' ? (
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.btnPrimary} onPress={handleEscrow}>
                <Text style={styles.btnPrimaryText}>{cap.type === 'swap' ? '🔄 Iniciar Swap' : '💰 Comprar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnGhost} onPress={() => navigation.navigate('Chat', { cap })}>
                <Text style={styles.btnGhostText}>💬 Chat</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.card, { borderTopColor: '#00E5A0' }]}>
              <Text style={styles.escrowTitle}>🔒 ESCROW ACTIVO</Text>
              <View style={styles.escrowStates}>
                {(['locked', 'confirmed', 'released'] as EscrowState[]).map((s, i) => {
                  const order = ['locked', 'confirmed', 'released'];
                  const active = escrow === s;
                  const done = order.indexOf(escrow) > i;
                  return (
                    <View key={s} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <View style={[styles.stateBox, (active || done) && styles.stateBoxActive]}>
                        <Text style={[styles.stateText, (active || done) && styles.stateTextActive]}>{s.toUpperCase()}</Text>
                      </View>
                      {i < 2 && <Text style={styles.arrow}>→</Text>}
                    </View>
                  );
                })}
              </View>
              <View style={styles.commissionBox}>
                <Text style={styles.commLabel}>COMISIÓN CAPSWAP</Text>
                {[['Vendedor (3%)', Math.round(cap.price * 0.03)], ['Comprador (2%)', Math.round(cap.price * 0.02)]].map(([l, v]) => (
                  <View key={l as string} style={styles.commRow}>
                    <Text style={styles.commKey}>{l}</Text>
                    <Text style={styles.commVal}>{cop(v as number)}</Text>
                  </View>
                ))}
                <View style={styles.nequiRow}>
                  <Text style={styles.nequiLabel}>Nequi:</Text>
                  <Text style={styles.nequiNum}>300-000-0000</Text>
                </View>
              </View>
              {escrow === 'locked' && (
                <TouchableOpacity style={[styles.btnPrimary, { backgroundColor: '#00E5A0' }]} onPress={handleConfirm}>
                  <Text style={[styles.btnPrimaryText, { color: '#000' }]}>✅ Confirmar recibido</Text>
                </TouchableOpacity>
              )}
              {escrow === 'released' && (
                <Text style={styles.releasedText}>🎉 ¡Transacción completada!</Text>
              )}
            </View>
          )}

          {/* Safe spots */}
          <Text style={styles.sectionLabel}>📍 ENCUENTROS SEGUROS</Text>
          {SAFE_SPOTS.slice(0, 2).map(s => (
            <View key={s.name} style={styles.spotCard}>
              <View>
                <Text style={styles.spotName}>{s.name}</Text>
                <Text style={styles.spotAddress}>{s.address}</Text>
              </View>
              <View style={styles.metroBadge}>
                <Text style={styles.metroText}>🚇 {s.metro}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: COLORS.bg },
  header:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 10 },
  back:           { color: COLORS.gold, fontWeight: '800', fontSize: 14 },
  reportBtn:      { color: '#FF5252', fontWeight: '700', fontSize: 13 },
  hero:           { height: 200, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  heroEmoji:      { fontSize: 100 },
  pausedOverlay:  { position: 'absolute', inset: 0, backgroundColor: 'rgba(193,48,48,0.7)', alignItems: 'center', justifyContent: 'center' },
  pausedText:     { color: '#fff', fontWeight: '800', fontSize: 16 },
  content:        { padding: 16, gap: 12 },
  card:           { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 18, borderTopWidth: 2, marginBottom: 4 },
  capName:        { color: '#fff', fontWeight: '900', fontSize: 22, marginBottom: 4 },
  capBrand:       { color: COLORS.muted, fontSize: 14, marginBottom: 14 },
  priceRow:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price:          { color: '#fff', fontWeight: '900', fontSize: 28 },
  condBadge:      { borderRadius: 10, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6 },
  condText:       { fontSize: 12, fontWeight: '700' },
  ownerRow:       { flexDirection: 'row', alignItems: 'center', gap: 14 },
  ownerAvatar:    { width: 48, height: 48, borderRadius: 24, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  ownerEmoji:     { fontSize: 22 },
  ownerName:      { color: '#fff', fontWeight: '800', fontSize: 15, marginBottom: 4 },
  lvBadge:        { borderRadius: 8, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' },
  lvText:         { fontSize: 11, fontWeight: '700' },
  ownerPts:       { fontWeight: '900', fontSize: 16 },
  reportWarning:  { backgroundColor: 'rgba(255,82,82,0.1)', borderWidth: 1, borderColor: 'rgba(255,82,82,0.3)', borderRadius: 12, padding: 14 },
  reportWarnText: { color: '#FF5252', fontWeight: '700', fontSize: 13 },
  actionRow:      { flexDirection: 'row', gap: 12 },
  btnPrimary:     { flex: 1, backgroundColor: COLORS.gold, borderRadius: 14, padding: 16, alignItems: 'center' },
  btnPrimaryText: { color: '#000', fontWeight: '800', fontSize: 14 },
  btnGhost:       { flex: 1, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  btnGhostText:   { color: '#fff', fontWeight: '800', fontSize: 14 },
  escrowTitle:    { color: '#00E5A0', fontWeight: '800', fontSize: 13, letterSpacing: 1, marginBottom: 16 },
  escrowStates:   { flexDirection: 'row', marginBottom: 16 },
  stateBox:       { flex: 1, padding: 6, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  stateBoxActive: { backgroundColor: 'rgba(0,229,160,0.15)', borderColor: 'rgba(0,229,160,0.4)' },
  stateText:      { fontSize: 8, fontWeight: '800', color: 'rgba(255,255,255,0.3)' },
  stateTextActive:{ color: '#00E5A0' },
  arrow:          { color: 'rgba(255,255,255,0.2)', marginHorizontal: 2, fontSize: 10 },
  commissionBox:  { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 14, marginBottom: 14 },
  commLabel:      { color: COLORS.muted, fontSize: 10, fontWeight: '700', marginBottom: 10, letterSpacing: 1 },
  commRow:        { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  commKey:        { color: COLORS.muted, fontSize: 13 },
  commVal:        { color: COLORS.gold, fontWeight: '800', fontSize: 13 },
  nequiRow:       { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', paddingTop: 10, marginTop: 4 },
  nequiLabel:     { color: COLORS.muted, fontSize: 12 },
  nequiNum:       { color: COLORS.gold, fontWeight: '800', fontSize: 12 },
  releasedText:   { color: '#00E5A0', fontWeight: '800', fontSize: 16, textAlign: 'center', marginTop: 8 },
  sectionLabel:   { color: COLORS.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginTop: 4, marginBottom: 8 },
  spotCard:       { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  spotName:       { color: '#fff', fontWeight: '800', fontSize: 14, marginBottom: 3 },
  spotAddress:    { color: COLORS.muted, fontSize: 12 },
  metroBadge:     { backgroundColor: 'rgba(255,215,0,0.1)', borderWidth: 1, borderColor: 'rgba(255,215,0,0.25)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  metroText:      { color: COLORS.gold, fontSize: 10, fontWeight: '700' },
});