# 🧢 CapSwap

> Marketplace móvil de gorras para la comunidad sneaker/streetwear de Medellín, Colombia.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)

## 📱 Demo

| Home | Detalle | Chat | Perfil |
|------|---------|------|--------|
| Grid de gorras con filtros | Escrow + reportes | Chat en tiempo real | Niveles y puntos |

## 🚀 El Problema

Los intercambios de gorras en Medellín ocurren en grupos de Facebook sin ninguna protección. Fraude frecuente, sin historial de reputación, sin sistema de pagos seguro.

**CapSwap resuelve esto** con escrow obligatorio, sistema de reputación por niveles y puntos de encuentro verificados.

## ✨ Features

- 🔒 **Escrow obligatorio** — fondos retenidos hasta confirmación de ambas partes
- 🔄 **Swap verificado** — intercambio directo con comisión fija de $3.000 COP
- 🏆 **Sistema de niveles** — Bronce → Plata → Oro → Élite basado en puntos
- 💬 **Chat en tiempo real** — mensajería con ofertas embebidas
- ⚠️ **Sistema antifraude** — reportes con costo de puntos, pausado automático
- 📍 **Spots seguros** — puntos de encuentro verificados en Medellín
- 💰 **3 tipos de cuenta** — Personal, Vendedor Pro, Negocio

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | React Native + Expo SDK 54 |
| Language | TypeScript |
| Navigation | React Navigation v6 |
| Backend (WIP) | Node.js + Fastify |
| Database (WIP) | PostgreSQL + Drizzle ORM |
| Auth (WIP) | Supabase (Google + Apple) |
| Realtime (WIP) | Socket.io |
| Storage (WIP) | Supabase Storage |

## capswap/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── DetailScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── SellScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── SpotsScreen.tsx
│   ├── data/
│   │   ├── caps.ts
│   │   └── constants.ts
│   └── types/
│       └── index.ts
└── App.

## 🏃 Correr el proyecto

```bash
npm install
npx expo start

Escanear QR con Expo Go en iPhone o Android.

🗺️ Roadmap

	•	UI/UX mobile completa
	•	Navegación entre pantallas
	•	Sistema de escrow (frontend)
	•	Chat con respuestas automáticas
	•	Sistema de niveles y puntos
	•	Backend Node.js + Fastify
	•	Base de datos PostgreSQL
	•	Auth con Google y Apple
	•	Chat real con Socket.io
	•	Subir fotos de gorras
	•	Pagos con Nequi

👨‍💻 Autor

Steven Cuesta — @HSCB10

Estudiante de Análisis y Desarrollo de Software — SENA, Medellín 🇨🇴