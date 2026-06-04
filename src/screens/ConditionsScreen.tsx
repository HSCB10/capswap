import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { CONDITIONS, COLORS } from '../data/constants';

const DETAILS = [
  {
    examples: 'Directo de tienda, nunca usada, hangtag original intacto',
    priceNote: 'Precio más alto del mercado. Compradores dispuestos a pagar premium.',
    tip: 'Incluye fotos del hangtag y caja original para generar más confianza.',
  },
  {
    examples: 'Usada 1-3 veces, sin manchas, sin deformación de copa',
    priceNote: 'Hasta 85% del precio original. Alta demanda en el mercado.',
    tip: 'Fotografía en buena luz para mostrar que no tiene desgaste visible.',
  },
  {
    examples: 'Uso regular, pequeñas marcas de sudor, copa bien formada',
    priceNote: 'Entre 50-70% del precio original. Segmento más activo.',
    tip: 'Sé honesto con el estado. Los compradores valoran la transparencia.',
  },
  {
    examples: 'Manchas leves, deformación mínima, desgaste visible en visera',
    priceNote: 'Entre 25-45% del precio original. Mercado de coleccionistas.',
    tip: 'Detalla claramente los defectos en la descripción para evitar disputas.',
  },
  {
    examples: 'Rotura en correa, manchas fuertes, visera muy deformada',
    priceNote: 'Precio simbólico. Ideal para coleccionistas o restauradores.',
    tip: 'Menciona qué tipo de reparación necesita para atraer al comprador correcto.',
  },
];

export default function ConditionsScreen() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Estados de gorras</Text>
        <Text style={styles.heroSub}>Guía oficial de condiciones y puntos en CapSwap</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Points summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>¿Para qué sirven los puntos?</Text>
          <Text style={styles.summaryText}>Cada gorra que publicas te da puntos según su condición. Más puntos = nivel más alto = más privilegios en la plataforma.</Text>
          <View style={styles.summaryRow}>
            {CONDITIONS.map((c, i) => (
              <View key={i} style={styles.summaryItem}>
                <Text style={[styles.summaryPts, { color: c.color }]}>+{c.pts}</Text>
                <Text style={styles.summaryLabel}>pts</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Condition cards */}
        {CONDITIONS.map((c, i) => {
          const detail = DETAILS[i];
          const isOpen = expanded === i;
          return (
            <TouchableOpacity
              key={i}
              style={[styles.card, { borderColor: isOpen ? c.color + '60' : 'rgba(255,255,255,0.06)', backgroundColor: isOpen ? c.color + '08' : 'rgba(255,255,255,0.04)' }]}
              onPress={() => setExpanded(isOpen ? null : i)}
              activeOpacity={0.8}
            >
              {/* Header */}
              <View style={styles.cardHead}>
                <View style={[styles.dot, { backgroundColor: c.color }]} />
                <Text style={[styles.cardName, { color: c.color }]}>{c.label}</Text>
                <View style={[styles.ptsBadge, { backgroundColor: c.color + '20', borderColor: c.color + '40' }]}>
                  <Text style={[styles.ptsText, { color: c.color }]}>+{c.pts} pts</Text>
                </View>
                <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
              </View>

              {/* Expanded content */}
              {isOpen && (
                <View style={styles.cardBody}>
                  <View style={styles.divider} />

                  <Text style={styles.bodyLabel}>EJEMPLOS</Text>
                  <Text style={styles.bodyText}>{detail.examples}</Text>

                  <Text style={[styles.bodyLabel, { marginTop: 14 }]}>PRECIO EN MERCADO</Text>
                  <View style={[styles.priceNote, { backgroundColor: c.color + '15', borderColor: c.color + '30' }]}>
                    <Text style={[styles.priceNoteText, { color: c.color }]}>{detail.priceNote}</Text>
                  </View>

                  <Text style={[styles.bodyLabel, { marginTop: 14 }]}>💡 TIP</Text>
                  <Text style={styles.bodyText}>{detail.tip}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* How points work */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🏆 Cómo suben tus puntos</Text>
          {[
            ['Publicar gorra Nueva con etiqueta', '+70 pts'],
            ['Completar una venta exitosa', '+20 pts'],
            ['Completar un swap verificado', '+25 pts'],
            ['Recibir calificación 5 estrellas', '+10 pts'],
            ['Reportar abuso (válido)', '+5 pts'],
            ['Reporte falso enviado', '−20 pts'],
          ].map(([action, pts], i) => (
            <View key={i} style={styles.infoRow}>
              <Text style={styles.infoAction}>{action}</Text>
              <Text style={[styles.infoPts, { color: pts.startsWith('+') ? '#00E5A0' : '#FF5252' }]}>{pts}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: COLORS.bg },
  hero:           { backgroundColor: '#0D0D1A', padding: 20, paddingTop: 10 },
  heroTitle:      { color: '#fff', fontWeight: '900', fontSize: 22, marginBottom: 4 },
  heroSub:        { color: 'rgba(255,255,255,0.4)', fontSize: 13 },
  content:        { padding: 16, paddingBottom: 80 },
  summaryCard:    { backgroundColor: 'rgba(255,215,0,0.08)', borderWidth: 1, borderColor: 'rgba(255,215,0,0.2)', borderRadius: 16, padding: 18, marginBottom: 16 },
  summaryTitle:   { color: COLORS.gold, fontWeight: '800', fontSize: 14, marginBottom: 8 },
  summaryText:    { color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 20, marginBottom: 14 },
  summaryRow:     { flexDirection: 'row', justifyContent: 'space-between' },
  summaryItem:    { alignItems: 'center' },
  summaryPts:     { fontWeight: '900', fontSize: 20 },
  summaryLabel:   { color: COLORS.muted, fontSize: 10, fontWeight: '700' },
  card:           { borderRadius: 14, borderWidth: 1, marginBottom: 8, overflow: 'hidden' },
  cardHead:       { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 16 },
  dot:            { width: 10, height: 10, borderRadius: 5, flexShrink: 0 },
  cardName:       { flex: 1, fontWeight: '800', fontSize: 15 },
  ptsBadge:       { borderRadius: 8, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4 },
  ptsText:        { fontSize: 11, fontWeight: '800' },
  arrow:          { color: COLORS.muted, fontSize: 11 },
  cardBody:       { paddingHorizontal: 16, paddingBottom: 16 },
  divider:        { height: 0.5, backgroundColor: 'rgba(255,255,255,0.08)', marginBottom: 14 },
  bodyLabel:      { color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  bodyText:       { color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 20 },
  priceNote:      { borderRadius: 10, borderWidth: 1, padding: 12 },
  priceNoteText:  { fontSize: 13, fontWeight: '600', lineHeight: 18 },
  infoCard:       { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 18, marginTop: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  infoTitle:      { color: '#fff', fontWeight: '800', fontSize: 15, marginBottom: 14 },
  infoRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.06)' },
  infoAction:     { color: 'rgba(255,255,255,0.6)', fontSize: 13, flex: 1 },
  infoPts:        { fontWeight: '800', fontSize: 14 },
});