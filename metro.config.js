// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname); // Fix the variable name here
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;

