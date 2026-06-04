import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, LEVELS } from '../data/constants';
import { Cap, Message } from '../types';

function getLevel(pts: number) {
  return LEVELS.find(l => pts >= l.min && pts <= l.max) || LEVELS[0];
}
function cop(n: number) { return '$' + n.toLocaleString('es-CO') + ' COP'; }

const INIT_MSGS: Message[] = [
  { id: 1, from: 'owner', text: '¡Hola! ¿Te interesa la gorra?', time: '9:32', mine: false },
  { id: 2, from: 'yo',    text: 'Sí parce, todavía disponible 🔥', time: '9:33', mine: true },
  { id: 3, from: 'owner', text: '¿Harías swap por una Palace?', time: '9:34', mine: false },
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
  const [msgs, setMsgs] = useState<Message[]>(INIT_MSGS);
  const [input, setInput] = useState('');
  const listRef = useRef<FlatList>(null);
  const lv = getLevel(cap.ownerPts);

  function send() {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
    const newMsg: Message = { id: Date.now(), from: 'yo', text: input.trim(), time: now, mine: true };
    setMsgs(p => [...p, newMsg]);
    setInput('');
    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        from: cap.owner,
        text: REPLIES[Math.floor(Math.random() * REPLIES.length)],
        time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
        mine: false,
      };
      setMsgs(p => [...p, reply]);
      listRef.current?.scrollToEnd({ animated: true });
    }, 1200);
    listRef.current?.scrollToEnd({ animated: true });
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Volver</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerUser}>@{cap.owner}</Text>
          <View style={[styles.lvBadge, { backgroundColor: lv.color + '20', borderColor: lv.color + '40' }]}>
            <Text style={[styles.lvText, { color: lv.color }]}>{lv.icon} {lv.name}</Text>
          </View>
        </View>
        <View style={{ width: 60 }} />
      </View>

      {/* Cap preview */}
      <View style={styles.capPreview}>
        <Text style={styles.capPreviewEmoji}>🧢</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.capPreviewName} numberOfLines={1}>{cap.name}</Text>
          <Text style={styles.capPreviewPrice}>{cop(cap.price)} COP</Text>
        </View>
        <TouchableOpacity style={styles.escrowBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.escrowBtnText}>ESCROW</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
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
            placeholderTextColor="rgba(255,255,255,0.25)"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={send}>
            <Text style={styles.sendBtnText}>→</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: COLORS.bg },
  header:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  back:             { color: COLORS.gold, fontWeight: '800', fontSize: 14 },
  headerCenter:     { alignItems: 'center', gap: 4 },
  headerUser:       { color: '#fff', fontWeight: '800', fontSize: 15 },
  lvBadge:          { borderRadius: 8, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3 },
  lvText:           { fontSize: 10, fontWeight: '700' },
  capPreview:       { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, paddingHorizontal: 16, backgroundColor: 'rgba(255,255,255,0.04)', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  capPreviewEmoji:  { fontSize: 28 },
  capPreviewName:   { color: '#fff', fontWeight: '800', fontSize: 13 },
  capPreviewPrice:  { color: COLORS.gold, fontWeight: '900', fontSize: 16 },
  escrowBtn:        { backgroundColor: COLORS.gold, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  escrowBtnText:    { color: '#000', fontWeight: '800', fontSize: 11 },
  msgList:          { padding: 16, gap: 12 },
  msgWrapper:       { alignItems: 'flex-start', marginBottom: 4 },
  msgWrapperMine:   { alignItems: 'flex-end' },
  bubble:           { maxWidth: '75%', padding: 12, borderRadius: 18 },
  bubbleMine:       { backgroundColor: COLORS.gold, borderBottomRightRadius: 4 },
  bubbleOther:      { backgroundColor: 'rgba(255,255,255,0.08)', borderBottomLeftRadius: 4 },
  bubbleText:       { color: '#fff', fontSize: 14 },
  bubbleTextMine:   { color: '#000', fontWeight: '600' },
  msgTime:          { fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 3 },
  inputRow:         { flexDirection: 'row', gap: 10, padding: 12, paddingBottom: 20, backgroundColor: 'rgba(7,7,16,0.95)', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  input:            { flex: 1, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12, color: '#fff', fontSize: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  sendBtn:          { backgroundColor: COLORS.gold, borderRadius: 14, width: 48, alignItems: 'center', justifyContent: 'center' },
  sendBtnText:      { color: '#000', fontWeight: '900', fontSize: 20 },
});