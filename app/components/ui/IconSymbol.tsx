// This file is a fallback for using MaterialIcons on Android and web.

import createIconSet from '@expo/vector-icons/build/createIconSet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';
import iconMap from '../../assets/iconmap.json';

const MaterialSymbols = createIconSet(iconMap, 'Material Symbols Outlined', require('../../assets/fonts/MaterialIcons-Regular.ttf'));

export function IconSymbol({
  name,
  size = 24,
  color
}: {
  name: any;
  size?: number;
  color: string | OpaqueColorValue;
}) {
  return <MaterialSymbols color={color} size={size} name={name}  />;
}
