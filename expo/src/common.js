import React from 'react'

import {
    Link,
    Redirect,
    Slot,
    Stack,
    useLocalSearchParams,
    useNavigation,
    useRouter
} from 'expo-router'

import { Image } from 'expo-image'

import {
    Linking,
    Modal,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    TVFocusGuideView,
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
    SnowTextButton
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
    useLocalSearchParams,
    useNavigation,
    useRouter,
    util,
    FillView: SnowFillView,
    Image,
    Link,
    Linking,
    Modal,
    Platform,
    React,
    Redirect,
    ScrollView,
    Slot,
    SnowGrid,
    SnowHeader,
    SnowImageButton,
    SnowInput,
    SnowLabel,
    SnowText,
    SnowTextButton,
    Stack,
    Text,
    TouchableOpacity,
    TVFocusGuideView,
    View,
}
