/**
 * React Native 0.84 turns New Architecture on by default. That causes:
 * - PlatformConstants TurboModule error at runtime
 * - RNScreens build failure (missing Fabric headers)
 *
 * This script applies 3 edits so Podfile ENV['RCT_NEW_ARCH_ENABLED']='0' is respected.
 * Run automatically after npm install (postinstall).
 */
const fs = require('fs');
const path = require('path');

const rnPath = path.join(__dirname, '../node_modules/react-native');
if (!fs.existsSync(rnPath)) return;

// 1) react_native_pods.rb: respect ENV instead of forcing "1"
const podsRb = path.join(rnPath, 'scripts/react_native_pods.rb');
let pods = fs.readFileSync(podsRb, 'utf8');
if (!pods.includes("ENV[\"RCT_NEW_ARCH_ENABLED\"] == \"0\" ? \"0\" : \"1\"")) {
  pods = pods.replace(
    /ENV\["RCT_NEW_ARCH_ENABLED"\] = "1"/,
    "ENV[\"RCT_NEW_ARCH_ENABLED\"] = ENV[\"RCT_NEW_ARCH_ENABLED\"] == \"0\" ? \"0\" : \"1\""
  );
  fs.writeFileSync(podsRb, pods);
  console.log('[fix-react-native-new-arch] Updated react_native_pods.rb');
}

// 2) react_native_pods.rb: pass new_arch_enabled to helper (not hardcoded true)
if (pods.includes('install_modules_dependencies(spec, true,')) {
  pods = pods.replace(
    'NewArchitectureHelper.install_modules_dependencies(spec, true, folly_config[:version])',
    'NewArchitectureHelper.install_modules_dependencies(spec, new_arch_enabled, folly_config[:version])'
  );
  fs.writeFileSync(podsRb, pods);
  console.log('[fix-react-native-new-arch] Updated install_modules_dependencies in react_native_pods.rb');
}

// 3) new_architecture.rb: new_arch_enabled = check ENV, not always true
const newArchPath = path.join(rnPath, 'scripts/cocoapods/new_architecture.rb');
let newArch = fs.readFileSync(newArchPath, 'utf8');
if (newArch.includes("return true") && newArch.includes('def self.new_arch_enabled')) {
  newArch = newArch.replace(
    /(\s+def self\.new_arch_enabled\s*\n)\s+return true\s*(\n\s+end)/,
    "$1        return ENV['RCT_NEW_ARCH_ENABLED'] != '0'$2"
  );
  fs.writeFileSync(newArchPath, newArch);
  console.log('[fix-react-native-new-arch] Updated new_architecture.rb');
}
