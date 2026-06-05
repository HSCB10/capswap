import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Svg, { Path, Line, Circle } from 'react-native-svg';
import { CONDITIONS } from '../data/constants';

const C = {
  bg: '#0C0C0C', surface: '#141414',
  white: '#FFFFFF', muted: '#444', border: 'rgba(255,255,255,0.05)', red: '#FF3030',
};

const COND_DOTS = ['#22CC66', '#4488FF', '#FFAA22', '#FF6644', '#FF4444'];

const DETAILS = [
  { examples: 'Directo de tienda, nunca usada, hangtag original intacto', priceNote: 'Precio más alto del mercado. Compradores dispuestos a pagar premium.', tip: 'Incluye fotos del hangtag y caja original para generar más confianza.' },
  { examples: 'Usada 1-3 veces, sin manchas, sin deformación de copa', priceNote: 'Hasta 85% del precio original. Alta demanda en el mercado.', tip: 'Fotografía en buena luz para mostrar que no tiene desgaste visible.' },
  { examples: 'Uso regular, pequeñas marcas de sudor, copa bien formada', priceNote: 'Entre 50-70% del precio original. Segmento más activo.', tip: 'Sé honesto con el estado. Los compradores valoran la transparencia.' },
  { examples: 'Manchas leves, deformación mínima, desgaste visible en visera', priceNote: 'Entre 25-45% del precio original. Mercado de coleccionistas.', tip: 'Detalla claramente los defectos en la descripción.' },
  { examples: 'Rotura en correa, manchas fuertes, visera muy deformada', priceNote: 'Precio simbólico. Ideal para coleccionistas o restauradores.', tip: 'Menciona qué tipo de reparación necesita.' },
];

export default function ConditionsScreen({ navigation }: any) {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Path d="M19 12H5M12 5l-7 7 7 7" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
          </Svg>
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Estados de gorras</Text>
        <Text style={styles.subtitle}>Guía oficial de condiciones y puntos en CapSwap</Text>

        {/* Points summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>¿Para qué sirven los puntos?</Text>
          <Text style={styles.summaryText}>Cada gorra que publicas te da puntos según su condición. Más puntos = nivel más alto = más privilegios.</Text>
          <View style={styles.summaryPts}>
            {CONDITIONS.map((c, i) => (
              <View key={i} style={styles.summaryItem}>
                <View style={[styles.summaryDot, { backgroundColor: COND_DOTS[i] }]} />
                <Text style={styles.summaryNum}>+{c.pts}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Condition cards */}
        <Text style={styles.sectionLabel}>CONDICIONES</Text>
        <View style={styles.conditionsCard}>
          {CONDITIONS.map((c, i) => {
            const detail  = DETAILS[i];
            const isOpen  = expanded === i;
            const isLast  = i === CONDITIONS.length - 1;
            return (
              <View key={i}>
                <TouchableOpacity
                  style={[styles.condHeader, !isLast && !isOpen && styles.condHeaderBorder]}
                  onPress={() => setExpanded(isOpen ? null : i)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.condDot, { backgroundColor: COND_DOTS[i] }]} />
                  <Text style={styles.condName}>{c.label}</Text>
                  <View style={styles.condPtsBadge}>
                    <Text style={styles.condPtsText}>+{c.pts} pts</Text>
                  </View>
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <Path d={isOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} stroke="#444" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                  </Svg>
                </TouchableOpacity>

                {isOpen && (
                  <View style={[styles.condBody, !isLast && styles.condBodyBorder]}>
                    <Text style={styles.bodyLabel}>EJEMPLOS</Text>
                    <Text style={styles.bodyText}>{detail.examples}</Text>

                    <Text style={[styles.bodyLabel, { marginTop: 14 }]}>PRECIO EN MERCADO</Text>
                    <View style={styles.priceNote}>
                      <Text style={styles.priceNoteText}>{detail.priceNote}</Text>
                    </View>

                    <Text style={[styles.bodyLabel, { marginTop: 14 }]}>CONSEJO</Text>
                    <Text style={styles.bodyText}>{detail.tip}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Points table */}
        <Text style={styles.sectionLabel}>CÓMO SUBEN TUS PUNTOS</Text>
        <View style={styles.tableCard}>
          {[
            ['Publicar gorra nueva con etiqueta', '+70'],
            ['Completar una venta exitosa',       '+20'],
            ['Completar un swap verificado',      '+25'],
            ['Recibir calificación 5 estrellas',  '+10'],
            ['Reportar abuso válido',             '+5' ],
            ['Reporte falso enviado',             '−20'],
          ].map(([action, pts], i, arr) => (
            <View key={i} style={[styles.tableRow, i < arr.length - 1 && styles.tableRowBorder]}>
              <Text style={styles.tableAction}>{action}</Text>
              <Text style={[styles.tablePts, pts.startsWith('+') ? styles.tablePtsPos : styles.tablePtsNeg]}>{pts}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: C.bg },
  header:          { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14 },
  backBtn:         { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.surface, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 9, borderWidth: 1, borderColor: C.border, alignSelf: 'flex-start' },
  backText:        { color: '#fff', fontWeight: '700', fontSize: 13 },
  scroll:          { padding: 16, paddingBottom: 60, gap: 12 },
  title:           { fontSize: 27, fontWeight: '900', color: C.white, letterSpacing: -1, marginBottom: 4 },
  subtitle:        { color: C.muted, fontSize: 13, lineHeight: 20, marginBottom: 4 },
  summaryCard:     { backgroundColor: C.surface, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: C.border, gap: 10 },
  summaryTitle:    { color: C.white, fontWeight: '800', fontSize: 14 },
  summaryText:     { color: C.muted, fontSize: 13, lineHeight: 20 },
  summaryPts:      { flexDirection: 'row', justifyContent: 'space-between' },
  summaryItem:     { alignItems: 'center', gap: 6 },
  summaryDot:      { width: 10, height: 10, borderRadius: 5 },
  summaryNum:      { color: C.white, fontWeight: '900', fontSize: 16 },
  sectionLabel:    { color: '#333', fontSize: 10, fontWeight: '700', letterSpacing: 2, marginLeft: 4 },
  conditionsCard:  { backgroundColor: C.surface, borderRadius: 20, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  condHeader:      { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  condHeaderBorder:{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  condDot:         { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  condName:        { flex: 1, color: C.white, fontWeight: '700', fontSize: 14 },
  condPtsBadge:    { backgroundColor: 'rgba(255,48,48,0.1)', borderWidth: 1, borderColor: 'rgba(255,48,48,0.2)', borderRadius: 8, paddingHorizontal: 9, paddingVertical: 4 },
  condPtsText:     { color: C.red, fontSize: 11, fontWeight: '800' },
  condBody:        { paddingHorizontal: 16, paddingBottom: 16, gap: 6 },
  condBodyBorder:  { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  bodyLabel:       { color: '#333', fontSize: 9, fontWeight: '700', letterSpacing: 2 },
  bodyText:        { color: '#666', fontSize: 13, lineHeight: 20 },
  priceNote:       { backgroundColor: '#111', borderRadius: 12, padding: 12 },
  priceNoteText:   { color: '#888', fontSize: 13, lineHeight: 18 },
  tableCard:       { backgroundColor: C.surface, borderRadius: 20, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  tableRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
  tableRowBorder:  { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  tableAction:     { color: '#666', fontSize: 13, flex: 1 },
  tablePts:        { fontWeight: '900', fontSize: 15, letterSpacing: -0.5 },
  tablePtsPos:     { color: '#22CC66' },
  tablePtsNeg:     { color: C.red },
});