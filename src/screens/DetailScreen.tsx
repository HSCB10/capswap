import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import Svg, { Path, Circle, Line, Polyline } from 'react-native-svg';
import { CONDITIONS, LEVELS, SAFE_SPOTS } from '../data/constants';
import { Cap, EscrowState } from '../types';

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

export default function DetailScreen({ route, navigation }: any) {
  const { cap }: { cap: Cap } = route.params;
  const [escrow, setEscrow] = useState<EscrowState>('idle');
  const [reported, setReported] = useState(cap.reported);
  const cond = CONDITIONS[cap.condition];
  const ownerLv = getLevel(cap.ownerPts);
  const isSwap = cap.type === 'swap' || cap.type === 'ambos';

  function handleBuy() {
    setEscrow('locked');
    Alert.alert('🔒 Escrow activado', 'Fondos retenidos. Realiza el pago y confirma.');
  }

  function handleConfirm() {
    setEscrow('confirmed');
    setTimeout(() => {
      setEscrow('released');
      Alert.alert('✅ ¡Completado!', 'Transacción liberada exitosamente.');
    }, 1500);
  }

  function handleReport() {
    Alert.alert('Reportar gorra', '¿Confirmas el reporte? Costo: 20 pts', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Reportar', style: 'destructive', onPress: () => setReported(r => r + 1) },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path d="M19 12H5M12 5l-7 7 7 7" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReport} style={styles.reportBtn}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={C.red} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
            <Line x1="12" y1="9" x2="12" y2="13" stroke={C.red} strokeWidth={2} strokeLinecap="round"/>
            <Line x1="12" y1="17" x2="12.01" y2="17" stroke={C.red} strokeWidth={2} strokeLinecap="round"/>
          </Svg>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🧢</Text>
          <View style={[styles.typePill, isSwap ? styles.typePillSwap : styles.typePillVenta]}>
            <Text style={[styles.typePillText, isSwap && { color: '#fff' }]}>
              {isSwap ? 'SWAP' : 'VENTA'}
            </Text>
          </View>
          <View style={styles.condPill}>
            <View style={[styles.condDot, { backgroundColor: COND_DOTS[cap.condition] }]} />
            <Text style={styles.condText}>{cond.label}</Text>
          </View>
          {reported >= 3 && (
            <View style={styles.pausedOverlay}>
              <Text style={styles.pausedText}>PAUSADA POR REPORTES</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          {/* Title */}
          <View style={styles.titleSection}>
            <Text style={styles.capName}>{cap.name}</Text>
            <Text style={styles.capBrand}>{cap.brand.toUpperCase()}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{cop(cap.price)}</Text>
              <View style={styles.ptsBadge}>
                <Text style={styles.ptsBadgeText}>+{cond.pts} pts</Text>
              </View>
            </View>
          </View>

          {/* Owner */}
          <View style={styles.ownerCard}>
            <View style={styles.ownerAvatar}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#fff" strokeWidth={2} strokeLinecap="round"/>
                <Circle cx="12" cy="7" r="4" stroke="#fff" strokeWidth={2}/>
              </Svg>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.ownerName}>@{cap.owner}</Text>
              <Text style={styles.ownerLevel}>{ownerLv.icon} {ownerLv.name} · Verificado</Text>
            </View>
            <Text style={styles.ownerPts}>{cap.ownerPts}<Text style={styles.ownerPtsLabel}>{'\n'}pts</Text></Text>
          </View>

          {/* Report warning */}
          {reported > 0 && (
            <View style={styles.reportWarn}>
              <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                <Path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={C.red} strokeWidth={2}/>
                <Line x1="12" y1="9" x2="12" y2="13" stroke={C.red} strokeWidth={2} strokeLinecap="round"/>
              </Svg>
              <Text style={styles.reportWarnText}>{reported} reporte{reported > 1 ? 's' : ''}{reported >= 3 ? ' — PAUSADA' : ''}</Text>
            </View>
          )}

          {/* Actions */}
          {escrow === 'idle' ? (
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.btnPrimary} onPress={handleBuy}>
                <Text style={styles.btnPrimaryText}>{isSwap ? 'Iniciar Swap' : 'Comprar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnGhost} onPress={() => navigation.navigate('Chat', { cap })}>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <Path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
                <Text style={styles.btnGhostText}>Chat</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.escrowCard}>
              <View style={styles.escrowHeader}>
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                  <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
                <Text style={styles.escrowTitle}>ESCROW PROTEGIDO</Text>
              </View>

              {/* States */}
              <View style={styles.escrowStates}>
                {(['locked', 'confirmed', 'released'] as EscrowState[]).map((s, i) => {
                  const order = ['locked', 'confirmed', 'released'];
                  const active = escrow === s;
                  const done = order.indexOf(escrow) > i;
                  return (
                    <View key={s} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                      <View style={[styles.stateBox, (active || done) && styles.stateBoxOn]}>
                        <Text style={[styles.stateText, (active || done) && styles.stateTextOn]}>
                          {s === 'locked' ? 'BLOQUEADO' : s === 'confirmed' ? 'CONFIRMADO' : 'LIBERADO'}
                        </Text>
                      </View>
                      {i < 2 && <Text style={styles.stateArrow}>›</Text>}
                    </View>
                  );
                })}
              </View>

              {/* Commission */}
              <View style={styles.commBox}>
                {[
                  ['Vendedor (3%)', Math.round(cap.price * 0.03)],
                  ['Comprador (2%)', Math.round(cap.price * 0.02)],
                ].map(([l, v]) => (
                  <View key={l as string} style={styles.commRow}>
                    <Text style={styles.commKey}>{l}</Text>
                    <Text style={styles.commVal}>{cop(v as number)}</Text>
                  </View>
                ))}
                <View style={[styles.commRow, { borderBottomWidth: 0, paddingTop: 10, marginTop: 4, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' }]}>
                  <Text style={styles.commKey}>Pagar a Nequi</Text>
                  <Text style={[styles.commVal, { color: '#fff' }]}>300-000-0000</Text>
                </View>
              </View>

              {escrow === 'locked' && (
                <TouchableOpacity style={styles.btnPrimary} onPress={handleConfirm}>
                  <Text style={styles.btnPrimaryText}>Confirmar recibido</Text>
                </TouchableOpacity>
              )}
              {escrow === 'released' && (
                <Text style={styles.releasedText}>✅ ¡Transacción completada!</Text>
              )}
            </View>
          )}

          {/* Safe spots */}
          <Text style={styles.sectionLabel}>Puntos de encuentro</Text>
          {SAFE_SPOTS.slice(0, 2).map(s => (
            <View key={s.name} style={styles.spotCard}>
              <View style={styles.spotIcon}>
                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#fff" strokeWidth={2} strokeLinecap="round"/>
                  <Circle cx="12" cy="10" r="3" stroke="#fff" strokeWidth={2}/>
                </Svg>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.spotName}>{s.name}</Text>
                <Text style={styles.spotAddr}>{s.address}</Text>
              </View>
              <View style={styles.spotBadge}>
                <Text style={styles.spotBadgeText}>VERIFICADO</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: C.bg },
  header:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14 },
  backBtn:         { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.surface, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 9, borderWidth: 1, borderColor: C.border },
  backText:        { color: '#fff', fontWeight: '700', fontSize: 13 },
  reportBtn:       { backgroundColor: 'rgba(255,48,48,0.1)', borderRadius: 12, padding: 10, borderWidth: 1, borderColor: 'rgba(255,48,48,0.2)' },
  scroll:          { paddingBottom: 40 },
  hero:            { height: 220, backgroundColor: C.surface, alignItems: 'center', justifyContent: 'center', position: 'relative', marginHorizontal: 16, borderRadius: 24, overflow: 'hidden' },
  heroEmoji:       { fontSize: 100 },
  typePill:        { position: 'absolute', top: 14, right: 14, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 5 },
  typePillVenta:   { backgroundColor: 'rgba(255,255,255,0.1)' },
  typePillSwap:    { backgroundColor: C.red },
  typePillText:    { fontSize: 10, fontWeight: '800', color: '#ccc', letterSpacing: 0.5 },
  condPill:        { position: 'absolute', bottom: 14, left: 14, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  condDot:         { width: 7, height: 7, borderRadius: 4 },
  condText:        { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.7)' },
  pausedOverlay:   { position: 'absolute', inset: 0, backgroundColor: 'rgba(255,48,48,0.6)', alignItems: 'center', justifyContent: 'center' },
  pausedText:      { color: '#fff', fontWeight: '900', fontSize: 16, letterSpacing: 1 },
  content:         { padding: 20, gap: 12 },
  titleSection:    { backgroundColor: C.surface, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: C.border },
  capName:         { fontSize: 22, fontWeight: '900', color: C.white, letterSpacing: -0.5, marginBottom: 2 },
  capBrand:        { fontSize: 11, color: C.muted, fontWeight: '600', letterSpacing: 1.5, marginBottom: 14 },
  priceRow:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price:           { fontSize: 32, fontWeight: '900', color: C.white, letterSpacing: -1 },
  ptsBadge:        { backgroundColor: 'rgba(255,48,48,0.1)', borderWidth: 1, borderColor: 'rgba(255,48,48,0.2)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  ptsBadgeText:    { fontSize: 12, fontWeight: '800', color: C.red },
  ownerCard:       { backgroundColor: C.surface, borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14, borderWidth: 1, borderColor: C.border },
  ownerAvatar:     { width: 46, height: 46, backgroundColor: '#222', borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  ownerName:       { fontSize: 14, fontWeight: '800', color: C.white },
  ownerLevel:      { fontSize: 11, color: C.muted, marginTop: 2, fontWeight: '500' },
  ownerPts:        { fontSize: 20, fontWeight: '900', color: C.white, textAlign: 'right' },
  ownerPtsLabel:   { fontSize: 9, color: C.muted, fontWeight: '600' },
  reportWarn:      { backgroundColor: 'rgba(255,48,48,0.08)', borderWidth: 1, borderColor: 'rgba(255,48,48,0.2)', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  reportWarnText:  { color: C.red, fontWeight: '700', fontSize: 13 },
  actionRow:       { flexDirection: 'row', gap: 12 },
  btnPrimary:      { flex: 1, backgroundColor: C.white, borderRadius: 16, padding: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  btnPrimaryText:  { color: C.bg, fontWeight: '900', fontSize: 14 },
  btnGhost:        { flex: 1, backgroundColor: C.surface, borderRadius: 16, padding: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, borderWidth: 1, borderColor: C.border },
  btnGhostText:    { color: C.white, fontWeight: '700', fontSize: 14 },
  escrowCard:      { backgroundColor: C.surface, borderRadius: 20, padding: 18, gap: 14, borderWidth: 1, borderColor: C.border },
  escrowHeader:    { flexDirection: 'row', alignItems: 'center', gap: 8 },
  escrowTitle:     { fontSize: 11, fontWeight: '800', color: C.white, letterSpacing: 1 },
  escrowStates:    { flexDirection: 'row', alignItems: 'center', gap: 4 },
  stateBox:        { flex: 1, padding: 8, alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  stateBoxOn:      { backgroundColor: C.white },
  stateText:       { fontSize: 7, fontWeight: '800', color: '#333', letterSpacing: 0.5 },
  stateTextOn:     { color: C.bg },
  stateArrow:      { color: '#2A2A2A', fontSize: 16 },
  commBox:         { backgroundColor: '#111', borderRadius: 14, padding: 14 },
  commRow:         { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  commKey:         { fontSize: 12, color: C.muted },
  commVal:         { fontSize: 13, fontWeight: '800', color: C.red },
  releasedText:    { color: C.white, fontWeight: '800', fontSize: 15, textAlign: 'center' },
  sectionLabel:    { fontSize: 13, fontWeight: '800', color: C.white, marginTop: 4 },
  spotCard:        { backgroundColor: C.surface, borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: C.border },
  spotIcon:        { width: 38, height: 38, backgroundColor: '#1A1A1A', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  spotName:        { fontSize: 13, fontWeight: '700', color: C.white, marginBottom: 2 },
  spotAddr:        { fontSize: 11, color: C.muted },
  spotBadge:       { backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  spotBadgeText:   { fontSize: 9, fontWeight: '800', color: '#888' },
});