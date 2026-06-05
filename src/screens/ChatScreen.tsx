import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { LEVELS } from '../data/constants';
import { Cap, Message } from '../types';

const C = {
  bg: '#0C0C0C', surface: '#141414', surface2: '#1C1C1C',
  white: '#FFFFFF', muted: '#444', border: 'rgba(255,255,255,0.05)', red: '#FF3030',
};

function getLevel(pts: number) {
  return LEVELS.find(l => pts >= l.min && pts <= l.max) || LEVELS[0];
}
function cop(n: number) { return '$' + n.toLocaleString('es-CO'); }

const INIT_MSGS: Message[] = [
  { id: 1, from: 'owner', text: '¡Hola! ¿Te interesa la gorra?',   time: '9:32', mine: false },
  { id: 2, from: 'yo',    text: 'Sí parce, todavía disponible 🔥', time: '9:33', mine: true  },
  { id: 3, from: 'owner', text: '¿Harías swap por una Palace?',     time: '9:34', mine: false },
];

const REPLIES = [
  'Dale parce, ¿cuándo te quedaría?',
  '¿Haría rebaja?',
  'Tiene 3 meses de uso 🔥',
  '¿En Oviedo te queda bien? 📍',
  'Está como nueva, te lo juro',
];

export default function ChatScreen({ route, navigation }: any) {
  const { cap }: { cap: Cap } = route.params;
  const [msgs, setMsgs]   = useState<Message[]>(INIT_MSGS);
  const [input, setInput] = useState('');
  const listRef           = useRef<FlatList>(null);
  const lv                = getLevel(cap.ownerPts);

  function send() {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
    setMsgs(p => [...p, { id: Date.now(), from: 'yo', text: input.trim(), time: now, mine: true }]);
    setInput('');
    setTimeout(() => {
      setMsgs(p => [...p, {
        id: Date.now() + 1, from: cap.owner,
        text: REPLIES[Math.floor(Math.random() * REPLIES.length)],
        time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        mine: false,
      }]);
      listRef.current?.scrollToEnd({ animated: true });
    }, 1200);
    listRef.current?.scrollToEnd({ animated: true });
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
        <View style={styles.headerCenter}>
          <View style={styles.headerAvatar}>
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#fff" strokeWidth={2} strokeLinecap="round"/>
              <Circle cx="12" cy="7" r="4" stroke="#fff" strokeWidth={2}/>
            </Svg>
          </View>
          <View>
            <Text style={styles.headerUser}>@{cap.owner}</Text>
            <Text style={styles.headerLevel}>{lv.icon} {lv.name}</Text>
          </View>
        </View>
        <View style={{ width: 80 }} />
      </View>

      {/* Cap preview */}
      <View style={styles.capPreview}>
        <View style={styles.capPreviewImg}>
          <Text style={{ fontSize: 24 }}>🧢</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.capPreviewName} numberOfLines={1}>{cap.name}</Text>
          <Text style={styles.capPreviewPrice}>{cop(cap.price)} COP</Text>
        </View>
        <TouchableOpacity style={styles.escrowBtn} onPress={() => navigation.goBack()}>
          <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
            <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={C.bg} strokeWidth={2.5} strokeLinecap="round"/>
          </Svg>
          <Text style={styles.escrowBtnText}>Escrow</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={listRef}
          data={msgs}
          keyExtractor={m => m.id.toString()}
          contentContainerStyle={styles.msgList}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item: m }) => (
            <View style={[styles.msgWrapper, m.mine && styles.msgWrapperMine]}>
              <View style={[styles.bubble, m.mine ? styles.bubbleMine : styles.bubbleOther]}>
                <Text style={[styles.bubbleText, m.mine && styles.bubbleTextMine]}>{m.text}</Text>
              </View>
              <Text style={styles.msgTime}>{m.time}</Text>
            </View>
          )}
        />

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Escribe un mensaje..."
            placeholderTextColor="#333"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={send} activeOpacity={0.8}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Line x1="22" y1="2" x2="11" y2="13" stroke={C.bg} strokeWidth={2.5} strokeLinecap="round"/>
              <Path d="M22 2L15 22l-4-9-9-4 20-7z" stroke={C.bg} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: C.bg },
  header:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14 },
  backBtn:          { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.surface, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 9, borderWidth: 1, borderColor: C.border },
  backText:         { color: '#fff', fontWeight: '700', fontSize: 13 },
  headerCenter:     { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerAvatar:     { width: 36, height: 36, backgroundColor: '#1A1A1A', borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border },
  headerUser:       { color: C.white, fontWeight: '800', fontSize: 14 },
  headerLevel:      { color: C.muted, fontSize: 11, marginTop: 1 },
  capPreview:       { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 12, backgroundColor: C.surface, borderTopWidth: 1, borderBottomWidth: 1, borderColor: C.border },
  capPreviewImg:    { width: 44, height: 44, backgroundColor: '#1C1C1C', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  capPreviewName:   { color: C.white, fontWeight: '800', fontSize: 13 },
  capPreviewPrice:  { color: C.muted, fontSize: 12, marginTop: 1 },
  escrowBtn:        { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.white, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 9 },
  escrowBtnText:    { color: C.bg, fontWeight: '800', fontSize: 12 },
  msgList:          { padding: 16, gap: 12 },
  msgWrapper:       { alignItems: 'flex-start', marginBottom: 4 },
  msgWrapperMine:   { alignItems: 'flex-end' },
  bubble:           { maxWidth: '75%', padding: 12, borderRadius: 18 },
  bubbleMine:       { backgroundColor: C.white, borderBottomRightRadius: 4 },
  bubbleOther:      { backgroundColor: C.surface, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: C.border },
  bubbleText:       { color: C.white, fontSize: 14, lineHeight: 20 },
  bubbleTextMine:   { color: C.bg, fontWeight: '600' },
  msgTime:          { fontSize: 10, color: '#333', marginTop: 4 },
  inputRow:         { flexDirection: 'row', gap: 10, padding: 12, paddingBottom: 20, backgroundColor: C.surface, borderTopWidth: 1, borderTopColor: C.border },
  input:            { flex: 1, backgroundColor: '#1A1A1A', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12, color: C.white, fontSize: 14, borderWidth: 1, borderColor: C.border },
  sendBtn:          { backgroundColor: C.white, borderRadius: 14, width: 48, alignItems: 'center', justifyContent: 'center' },
});