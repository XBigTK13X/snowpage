import React from 'react'

import { Image } from 'expo-image'

import {
    Linking,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import { useDebouncedCallback } from 'use-debounce';

// https://www.npmjs.com/package/react-native-tvos
// TVFocusGuideView docs

import util from './util'

import { useAppContext } from './app-context'

import {
    SnowFillView,
    SnowGrid,
    SnowHeader,
    SnowImageButton,
    SnowInput,
    SnowLabel,
    SnowText,
    SnowTextButton,
    useSnowContext
} from 'expo-snowui'

const isWeb = Platform.OS === 'web'
const isAndroid = Platform.OS === 'android'
const isTV = Platform.isTV

export default {
    isAndroid,
    isTV,
    isWeb,
    useAppContext,
    useDebouncedCallback,
    useSnowContext,
    util,
    FillView: SnowFillView,
    Image,
    Linking,
    Platform,
    React,
    ScrollView,
    SnowGrid,
    SnowHeader,
    SnowImageButton,
    SnowInput,
    SnowLabel,
    SnowText,
    SnowTextButton,
    Text,
    TouchableOpacity,
    View,
}
