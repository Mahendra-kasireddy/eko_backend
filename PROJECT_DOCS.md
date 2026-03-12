# EkoRider — Project Documentation

> React Native 0.84 · iOS & Android · Zustand · React Navigation 7

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Folder Structure](#3-folder-structure)
4. [Navigation Flow](#4-navigation-flow)
5. [Color & Font System](#5-color--font-system)
6. [Global State — Zustand Stores](#6-global-state--zustand-stores)
7. [Services & API](#7-services--api)
8. [Types & Interfaces](#8-types--interfaces)
9. [Reusable Components](#9-reusable-components)
10. [Utilities & Hooks](#10-utilities--hooks)
11. [Screen — Splash](#11-screen--splash)
12. [Screen — Onboarding](#12-screen--onboarding)
13. [Screen — Login](#13-screen--login)
14. [Screen — OTP](#14-screen--otp)
15. [Screen — Home](#15-screen--home)
16. [Screen — Trips](#16-screen--trips)
17. [Screen — Plastic Collection](#17-screen--plastic-collection)
18. [Screen — Earnings](#18-screen--earnings)
19. [Screen — Profile](#19-screen--profile)
20. [App Constants](#20-app-constants)
21. [Architecture Patterns](#21-architecture-patterns)

---

## 1. Project Overview

**EkoRider** is a delivery rider app with an eco-friendly twist. Riders earn money by completing deliveries *and* collecting plastic waste from customers. The app tracks deliveries, plastic collection, earnings, and rider tier progression.

**Key Features:**
- Phone + OTP login
- Online / Offline toggle
- New order assignment with 15-second countdown modal
- Live trip tracking with map, status progress bar, and navigation
- Plastic collection logging with tier-based incentive system
- Monthly earnings breakdown (salary + plastic bonus + ride earnings)
- Rider tier progression: Bronze → Silver → Gold
- All data is currently **mock** — real API endpoints are wired but unused

---

## 2. Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| React Native | 0.84.0 | Core framework |
| React | 19.2.3 | UI library |
| TypeScript | — | Type safety |
| Zustand | 5.0.11 | Global state management |
| React Navigation | 7.x | Navigation (stack + bottom tabs) |
| React Native Screens | 4.23.0 | Native screen optimization |
| React Native Safe Area Context | 5.6.2 | Safe area / notch handling |
| React Native Vector Icons | 10.3.0 | Ionicons tab bar icons |
| Axios | 1.13.5 | HTTP client |

---

## 3. Folder Structure

```
EkoRider/
├── App.tsx                         # Entry point
├── android/                        # Android native project
├── ios/                            # iOS native project
└── src/
    ├── assets/
    │   └── images/
    │       └── app_icon.png
    ├── components/                  # Reusable UI components
    │   ├── EkoButton/
    │   ├── EkoLoader/
    │   ├── EkoStatusBadge/
    │   ├── EkoBottomSheet/
    │   └── ScreenHeader/
    ├── constants/                   # App-wide constants
    │   ├── app.constants.ts
    │   ├── colors.ts
    │   ├── fonts.ts
    │   └── api.constants.ts
    ├── hooks/
    │   └── useStatusBarStyle.ts
    ├── navigation/
    │   ├── RootNavigator.tsx
    │   ├── AuthNavigator.tsx
    │   ├── MainTabNavigator.tsx
    │   └── navigation.types.ts
    ├── screens/
    │   ├── Splash/
    │   ├── Onboarding/
    │   ├── Login/
    │   ├── OTP/
    │   ├── Home/
    │   ├── Trips/
    │   ├── Plastic/
    │   ├── Earnings/
    │   └── Profile/
    ├── services/
    │   ├── api.client.ts
    │   ├── auth.service.ts
    │   ├── trip.service.ts
    │   ├── plastic.service.ts
    │   └── earnings.service.ts
    ├── store/
    │   ├── rider.store.ts
    │   ├── trip.store.ts
    │   ├── plastic.store.ts
    │   └── earnings.store.ts
    ├── types/
    │   ├── navigation.types.ts
    │   ├── rider.types.ts
    │   ├── trip.types.ts
    │   ├── plastic.types.ts
    │   ├── earnings.types.ts
    │   └── assets.d.ts
    └── utils/
        ├── formatters.ts
        ├── validators.ts
        └── location.utils.ts
```

---

## 4. Navigation Flow

```
RootNavigator
│
├── [Not logged in] ─── AuthNavigator (Stack)
│       │
│       ├── Splash          auto-navigates after 2.5s
│       ├── Onboarding      3-slide carousel, skip / next
│       ├── Login           phone number entry
│       └── OTP             4-digit code verify
│
└── [Logged in] ──────── MainTabNavigator (Custom Bottom Tabs)
        │
        ├── Home            dashboard + new order modal
        ├── Trips           active trip map + history tabs
        ├── Plastic         [CENTER] eco collection log
        ├── Earnings        monthly pay breakdown
        └── Profile         rider info + settings + logout
```

**RootNavigator** reads `isAuthenticated` from `rider.store` and conditionally renders `AuthNavigator` or `MainTabNavigator`.

**MainTabNavigator** uses a custom tab bar with Ionicons:
- `home` / `home-outline`
- `bicycle` / `bicycle-outline`
- `leaf` / `leaf-outline` (Plastic — center button)
- `wallet` / `wallet-outline`
- `person-circle` / `person-circle-outline`

---

## 5. Color & Font System

### Colors (`src/constants/colors.ts`)

| Token | Hex | Usage |
|-------|-----|-------|
| `Colors.primary` | `#1B4332` | Main brand green (headers, buttons) |
| `Colors.accent` | `#40916C` | Accent green (icons, badges) |
| `Colors.cta` | `#52B788` | CTA highlights, chart fills |
| `Colors.ctaLight` | `#D1FAE5` | Light green backgrounds |
| `Colors.background` | `#F8FAFB` | Screen background |
| `Colors.card` | `#FFFFFF` | Card / input background |
| `Colors.border` | `#E2E8F0` | Input and card borders |
| `Colors.error` | `#EF4444` | Error text, danger buttons |
| `Colors.online` | `#22C55E` | Online status dot |
| `Colors.text.primary` | `#0F172A` | Main body text |
| `Colors.text.secondary` | `#475569` | Secondary labels |
| `Colors.text.muted` | `#94A3B8` | Placeholder, hint text |
| `Colors.text.inverse` | `#FFFFFF` | White text on dark bg |
| `Colors.text.light` | `rgba(255,255,255,0.7)` | Subtle white text |

**Tier Colors:**
- Bronze: `#92400E` bg, `#FDE68A` text
- Silver: `#374151` bg, `#E5E7EB` text
- Gold: `#78350F` bg, `#FCD34D` text

### Fonts (`src/constants/fonts.ts`)

| Token | Value | Usage |
|-------|-------|-------|
| `FontWeight.regular` | `'400'` | Body text |
| `FontWeight.medium` | `'500'` | Labels |
| `FontWeight.semiBold` | `'600'` | Subheadings |
| `FontWeight.bold` | `'700'` | Headings |
| `FontWeight.extraBold` | `'800'` | Display titles |

| Token | px | Usage |
|-------|----|-------|
| `FontSize.xs` | 11 | Badges, uppercase labels |
| `FontSize.sm` | 12 | Small helper text |
| `FontSize.base` | 14 | Normal body |
| `FontSize.md` | 16 | Input text, card titles |
| `FontSize.lg` | 18 | Section headings |
| `FontSize.xl` | 22 | Screen sub-titles |
| `FontSize.xxl` | 26 | Screen titles |
| `FontSize.xxxl` | 32 | Hero numbers |
| `FontSize.display` | 40 | Splash logo |

---

## 6. Global State — Zustand Stores

### `rider.store.ts`

```ts
{
  rider: Rider | null          // Logged-in rider profile
  stats: RiderStats | null     // Today's stats
  isAuthenticated: boolean     // Controls auth navigation
  isOnline: boolean            // Online/offline toggle

  setRider(rider)
  setStats(stats)
  setOnlineStatus(online)
  toggleOnlineStatus()
  clearRider()                 // Logout
}
```

### `trip.store.ts`

```ts
{
  activeTrip: Trip | null          // Current in-progress trip
  tripHistory: Trip[]              // Completed trips list
  pendingTrip: Trip | null         // Incoming order (before accept/decline)

  setActiveTrip(trip)
  updateTripStatus(tripId, status) // assigned → picked_up → in_transit → delivered
  setPendingTrip(trip)
  completeTrip()                   // Moves activeTrip to history, clears activeTrip
}
```

### `plastic.store.ts`

```ts
{
  collections: PlasticCollection[]
  monthlySummary: MonthlyPlasticSummary | null

  addCollection(collection)
  updateCollectionStatus(id, status)
  setMonthlySummary(summary)
}
```

### `earnings.store.ts`

```ts
{
  monthlyEarnings: MonthlyEarnings | null
  setMonthlyEarnings(earnings)
}
```

---

## 7. Services & API

**Base URL:** `https://api.ekogrocery.in/rider/v1`

All services currently return **mock data** with simulated delays.

### `auth.service.ts`

| Function | Description | Mock behavior |
|----------|-------------|---------------|
| `sendOtp(phone)` | Sends OTP to phone | 1000ms delay, always succeeds |
| `verifyOtp(phone, otp)` | Verifies OTP | Accepts `"1234"` as valid OTP |

On success, returns `{ token, rider, isNewUser }`.

### `trip.service.ts`

| Function | Description | Mock behavior |
|----------|-------------|---------------|
| `fetchActiveTrip()` | Returns current trip | Returns mock trip or null |
| `fetchTripHistory()` | Returns completed trips | Returns 3 mock trips |
| `simulateNewOrderAssignment()` | Waits then returns a new order | 8000ms delay |
| `updateTripStatus(id, status)` | Updates trip status | 500ms delay |

### `plastic.service.ts`

| Function | Description |
|----------|-------------|
| `fetchMonthlySummary()` | Returns mock monthly plastic data |
| `fetchCollections()` | Returns list of collections |
| `submitCollection(data)` | Submits a new plastic collection |

### `earnings.service.ts`

| Function | Description |
|----------|-------------|
| `fetchMonthlyEarnings()` | Returns mock monthly earnings |

### `api.client.ts`

Axios instance configured with:
- `baseURL`: API base URL
- Request interceptor: Attaches auth token (TODO: connect to auth store)
- Response interceptor: Handles 401 Unauthorized

---

## 8. Types & Interfaces

### Rider Types

```ts
type VehicleType = 'bike' | 'cycle' | 'scooter'
type RiderTier   = 'bronze' | 'silver' | 'gold'

interface Rider {
  id: string
  name: string
  phone: string
  email: string
  vehicleType: VehicleType
  vehicleNumber: string
  tier: RiderTier
  isOnline: boolean
  rating: number
  totalDeliveries: number
  joinedAt: string
  profilePhoto?: string
  city: string
}

interface RiderStats {
  todayDeliveries: number
  todayPlasticKg: number
  todayEarnings: number
  monthlyPlasticKg: number
  monthlyDeliveries: number
}
```

### Trip Types

```ts
type TripType   = 'eko_delivery' | 'public_ride'
type TripStatus = 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'completed' | 'cancelled'

interface Coordinates { latitude: number; longitude: number }

interface Customer {
  id, name, phone, address: string
  coordinates: Coordinates
}

interface Store {
  id, name, address, phone: string
  coordinates: Coordinates
}

interface OrderItem {
  id, name: string
  quantity: number
  unit: string
  price: number
}

interface Trip {
  id: string
  type: TripType
  status: TripStatus
  customer: Customer
  store: Store
  items: OrderItem[]
  totalAmount: number
  deliveryFee: number
  distance: number           // km
  estimatedDuration: number  // minutes
  createdAt: string
  updatedAt: string
}
```

### Plastic Types

```ts
interface PlasticCollection {
  id, tripId, storeId: string
  weightKg: number
  bagCount: number
  collectedAt: string
  submittedAt?: string
  status: 'collected' | 'submitted'
  customerRedeemPoints: number
}

interface MonthlyPlasticSummary {
  month: number; year: number
  totalKg: number; totalBags: number
  submittedKg: number; pendingKg: number
  collections: PlasticCollection[]
  incentiveEarned: number
  tier: RiderTier
}
```

### Earnings Types

```ts
interface WeeklyEarning  { week: number; amount: number }
interface PayoutRecord   { id, month: string; amount: number; paidAt: string; status: string }

interface MonthlyEarnings {
  month: number; year: number
  baseSalary: number
  plasticBonus: number
  rideEarnings: number
  total: number
  plasticKgCollected: number
  tier: RiderTier
  weeklyBreakdown: WeeklyEarning[]
  payoutHistory: PayoutRecord[]
}
```

---

## 9. Reusable Components

### `EkoButton`

```tsx
<EkoButton
  label="Continue"
  onPress={fn}
  variant="primary"      // 'primary' | 'secondary' | 'danger'
  loading={false}        // Shows ActivityIndicator when true
  disabled={false}
  fullWidth={true}
  style={...}
/>
```

### `EkoLoader`

```tsx
<EkoLoader fullScreen message="Loading..." />
```

Full-screen centered loader with spinner and optional message.

### `EkoStatusBadge`

Status badge for trip/delivery status display.

### `ScreenHeader`

```tsx
<ScreenHeader
  title="My Trips"
  subtitle="2 completed today"
  leftContent={<View>...</View>}   // Custom left slot (e.g. greeting + name)
  rightContent={<View>...</View>}  // Custom right slot (e.g. online badge)
/>
```

Fixed white header at top of screen — sits **outside** the ScrollView so it never scrolls away. Used on Home and Trips screens.

---

## 10. Utilities & Hooks

### `useStatusBarStyle(style, androidBgColor?)`

Imperatively sets `StatusBar` on each tab focus using `useFocusEffect`. Fixes the issue where bottom tabs keep all screens mounted simultaneously, causing StatusBar conflicts when switching tabs.

```ts
useStatusBarStyle('dark-content', Colors.card)    // Home, Trips
useStatusBarStyle('light-content', Colors.primary) // Earnings, Profile, Plastic
```

### `formatters.ts`

| Function | Input | Output |
|----------|-------|--------|
| `formatCurrency(amount)` | `1234.5` | `₹1,234.50` |
| `formatWeight(kg)` | `0.45` | `450 g` |
| `formatDistance(km)` | `1.2` | `1.2 km` |
| `formatDuration(min)` | `75` | `1h 15m` |
| `formatPhone(phone)` | `9876543210` | `98765 43210` |
| `formatDate(iso)` | ISO string | `15 Jan 2025` |
| `formatTime(iso)` | ISO string | `07:30` |
| `tierLabel(tier)` | `'gold'` | `'Gold'` |

---

## 11. Screen — Splash

**Path:** `src/screens/Splash/`

**Purpose:** Brand intro screen that plays for 2.5 seconds then navigates to Onboarding (or Home if already authenticated).

**Layout:**
```
[Dark green full screen]
  [Decorative circles — top-right, bottom-left]
  [EKO logo box] ← spring scale + fade in
    E (white) K (accent green) O (white)
    RIDER (spaced subtitle)
  [Tagline: "Deliver Green. Earn More."] ← slide up + fade
  [Hyderabad • v1.0.0] ← fade in (bottom)
```

**Animations:**
- `scale`: `0.5 → 1` (spring, tension 65 / friction 9)
- `opacity`: `0 → 1` (480ms)
- `taglineY`: `16 → 0` (380ms, after logo)
- `taglineOpacity`: `0 → 1` (380ms)
- `footerOpacity`: `0 → 1` (280ms)

All animations use `useNativeDriver: true` (only transform + opacity).

**Files:**
- `Splash.component.tsx` — animated UI
- `Splash.container.tsx` — timer + navigation logic

---

## 12. Screen — Onboarding

**Path:** `src/screens/Onboarding/`

**Purpose:** First-time user intro slides. Shown once, skippable.

**Layout:**
```
[Slide area — horizontal paging ScrollView]
  Slide 1: 🛵  "Deliver with Purpose"
  Slide 2: ♻️  "Collect Plastic. Save the Planet."
  Slide 3: 💰  "Earn More. Rise Higher."

[Progress dots — active dot expands]
[Skip button] (hidden on last slide)
[Next / Get Started button]
```

**Files:**
- `Onboarding.component.tsx` — layout
- `onboarding-sections/OnboardingSlide.section.tsx` — single slide UI
- `onboarding-sections/OnboardingDots.section.tsx` — dot indicators
- `use-onboarding-hook/useOnboardingActions.hook.ts` — swipe, skip, next logic

---

## 13. Screen — Login

**Path:** `src/screens/Login/`

**Purpose:** Phone number entry. Two-section layout.

**Layout:**
```
[Section 1 — Green header]
  EKO logo + "EKO Rider" wordmark
  "Welcome Back, Rider!" (xxxl bold)
  "Enter your mobile number to continue" (subtitle)

[Section 2 — Form, vertically centered]
  MOBILE NUMBER label
  [🇮🇳 +91 | TextInput (10 digits)]
  Error text (if any)
  Continue button (disabled until 10 digits)
  Terms & Privacy links
```

**Keyboard behaviour:**
When keyboard opens, the green header animates to a compact state:
- `paddingBottom`: 52 → 14
- `logoRow marginBottom`: 32 → 12
- Subtitle fades out (`opacity: 1 → 0`) and collapses (`maxHeight: 26 → 0`)

Total ~84px reclaimed so the form stays centered above the keyboard with no empty gap.

**Important:** All animations use `useNativeDriver: false` because `maxHeight` and `paddingBottom` are layout properties that cannot use the native driver.

**Files:**
- `Login.component.tsx` — Animated.View header + KAV form
- `Login.styles.ts`
- `login-sections/LoginHeader.section.tsx` — logo + title + animated subtitle
- `login-sections/LoginForm.section.tsx` — phone input + button + terms
- `use-login-hook/useLoginActions.hook.ts` — validation + `sendOtp()` call

---

## 14. Screen — OTP

**Path:** `src/screens/OTP/`

**Purpose:** Verify the 4-digit OTP sent to the rider's phone.

**Layout:**
```
[Section 1 — Green header]
  ← Back button
  "Verify OTP" (xxxl bold)
  "We sent a 4-digit code to +91 XXXXX" (subtitle with phone in green)

[Section 2 — Form, vertically centered]
  [Box1] [Box2] [Box3] [Box4]  ← digit boxes
  Error text (if wrong OTP)
  Verify & Continue button (disabled until all 4 filled)
  "Didn't receive? Resend OTP" (countdown 30s)
  "Change number" link
  "Use 1234 to login (demo)" hint
```

**OTP Box states:**
- Default: white bg, grey border
- Focused: light green bg (`#F0FDF4`), primary border
- Filled: accent green bg, accent border

**Resend timer:** Counts down from 30 seconds. Button disabled until timer reaches 0.

**Files:**
- `OTP.component.tsx`
- `OTP.styles.ts`
- `otp-sections/OTPHeader.section.tsx`
- `otp-sections/OTPInput.section.tsx` — 4 digit boxes with auto-focus-next logic
- `otp-sections/OTPResend.section.tsx` — resend countdown
- `use-otp-hook/useOTPData.hook.ts` — timer state
- `use-otp-hook/useOTPActions.hook.ts` — verify + resend logic

---

## 15. Screen — Home

**Path:** `src/screens/Home/`

**Purpose:** Main dashboard after login. Shows today's earnings, online status, active order, stats, and quick actions.

**Layout:**
```
[ScreenHeader — fixed, does not scroll]
  Left: "Good Morning 👋" / rider name / tier badge
  Right: online status dot

[ScrollView]
  ├── HomeHeaderSection
  │     Today's earnings (₹XX)
  │     Deliveries count
  │     [Online / Offline toggle button]
  │
  ├── HomeStatsSection
  │     🛵 Today's Deliveries
  │     ♻️ Today's Plastic (kg)
  │     📦 Monthly Deliveries
  │
  ├── HomeActiveOrderSection
  │     Active trip card (if any)
  │     OR "No active orders" empty state
  │
  └── HomeQuickActionsSection
        2×2 grid:
        [Log Plastic] [My Earnings]
        [Trip History] [Leaderboard]
```

**New Order Modal (`HomeNewOrderSection`):**
Shown as a bottom-sheet modal when `pendingTrip` is set in the store.
```
NEW ORDER badge  |  [15] countdown ring (pulsing)
"New Delivery Assigned!"
Progress bar (counts down)

[Pickup → Delivery route card]
  Green dot ─── Red dot
  Store name + address
  📍 X km · ~Y min
  Customer name + address

[₹ Delivery Fee] | [₹ Order Value] | [N Items]

[✕ Decline]  [✓ Accept]
```

Auto-declines when countdown reaches 0.

**Order Assignment Flow:**
1. Rider goes online
2. `useHomeActions` calls `simulateNewOrderAssignment()` (8s delay)
3. New trip set as `pendingTrip` in store → modal appears
4. Accept: `pendingTrip` → `activeTrip`, go to Trips tab
5. Decline: clears `pendingTrip`, starts polling again

**Files:**
- `Home.component.tsx`
- `Home.styles.ts`
- `home-sections/HomeHeader.section.tsx`
- `home-sections/HomeStats.section.tsx`
- `home-sections/HomeActiveOrder.section.tsx`
- `home-sections/HomeQuickActions.section.tsx`
- `home-sections/HomeNewOrder.section.tsx`
- `use-home-hook/useHomeData.hook.ts`
- `use-home-hook/useHomeActions.hook.ts`
- `use-home-hook/useHomeNavigation.hook.ts`

---

## 16. Screen — Trips

**Path:** `src/screens/Trips/`

**Purpose:** Shows the current active trip with map + action buttons, and a history of past orders.

**Layout:**
```
[ScreenHeader — fixed]
  "My Trips"

[Tab Bar]
  [Active Trip (1)]  [Past Orders (3)]

─── Active Trip Tab ───
  ├── TripMapSection
  │     Google Maps static image (route)
  │     OR fallback route card (green dot ─── red dot)
  │     Destination chip (top-left)
  │     Navigate button → opens Apple/Google Maps
  │     Status bar: Assigned → Picked Up → In Transit → Delivered
  │
  ├── TripDetailsSection
  │     Customer: name, phone, address
  │     Store: name, address
  │     Items list with prices
  │     Order total
  │
  └── TripActionsSection
        Primary button (changes by status):
          assigned   → "Start Trip"
          picked_up  → "Mark as Picked Up"
          in_transit → "Mark as Delivered"
        [Collect Plastic] button (shown when in_transit)
        [Call Customer] [Call Store] buttons

─── Past Orders Tab ───
  TripHistorySection
  Each card:
    [A] avatar  Customer Name  ✓ Completed  2h ago
                123 Main St, Area
    [₹120 earned] [2.3 km] [4 items] [₹340 order]
```

**Trip Status Progression:**
```
assigned → picked_up → in_transit → delivered
```
When rider taps "Mark as Delivered", `completeTrip()` is called:
- `activeTrip` moves to `tripHistory` (with `status: 'completed'`)
- `activeTrip` set to null

**Navigate Button:**
- iOS: opens `maps://` (Apple Maps)
- Android: opens `google.navigation:` intent

**Files:**
- `Trips.component.tsx`
- `Trips.styles.ts`
- `trips-sections/TripMap.section.tsx`
- `trips-sections/TripDetails.section.tsx`
- `trips-sections/TripActions.section.tsx`
- `trips-sections/TripHistory.section.tsx`
- `use-trips-hook/useTripsData.hook.ts`
- `use-trips-hook/useTripsActions.hook.ts`

---

## 17. Screen — Plastic Collection

**Path:** `src/screens/Plastic/`

**Purpose:** Track plastic waste collected from customers. Eco-incentive screen.

**Layout:**
```
[Green inset strip — status bar area]
[Green header]
  ♻️ Plastic Collection
  Collect · Submit · Earn

[Scrollable content]
  PlasticSummarySection
    Monthly summary card:
      X.X kg  |  N bags  |  ₹XX earned
      Submitted: X.X kg  |  Pending: X.X kg
      Tier badge (Bronze / Silver / Gold)

  PlasticListSection
    Each collection card:
      Weight + bag count
      Date collected
      Status: Collected (yellow) / Submitted (green)

[FAB button — bottom right]
  ♻  Log New Collection
```

**Tier Thresholds:**
- Bronze: 0–10 kg/month
- Silver: 10–25 kg/month
- Gold: 25+ kg/month

**Incentive Rates (per kg):**
- Bronze: ₹10/kg
- Silver: ₹20/kg
- Gold: ₹35/kg

**Files:**
- `Plastic.component.tsx`
- `Plastic.styles.ts`
- `plastic-sections/PlasticSummary.section.tsx`
- `plastic-sections/PlasticList.section.tsx`
- `use-plastic-hook/usePlasticData.hook.ts`

---

## 18. Screen — Earnings

**Path:** `src/screens/Earnings/`

**Purpose:** Monthly earnings breakdown showing salary, plastic bonus, and ride income.

**Layout:**
```
[Green inset strip]
[Scrollable content]
  EarningsHeaderSection
    ₹X,XXX  Total this month
    Month name | Tier badge

  EarningsBreakdownSection
    Base Salary   : ₹X,XXX
    Plastic Bonus : ₹XXX
    Ride Earnings : ₹XXX
    Total         : ₹X,XXX

  EarningsChartSection
    Weekly bar chart (4 weeks)
    W1 | W2 | W3 | W4

  EarningsHistorySection
    Payout history list:
      Jan 2025 — ₹5,200 — Paid ✓
      Dec 2024 — ₹4,800 — Paid ✓
```

**Files:**
- `Earnings.component.tsx`
- `Earnings.styles.ts`
- `earnings-sections/EarningsHeader.section.tsx`
- `earnings-sections/EarningsBreakdown.section.tsx`
- `earnings-sections/EarningsChart.section.tsx`
- `earnings-sections/EarningsHistory.section.tsx`
- `use-earnings-hook/useEarningsData.hook.ts`

---

## 19. Screen — Profile

**Path:** `src/screens/Profile/`

**Purpose:** Rider's profile, vehicle details, stats, and settings.

**Layout:**
```
[Green inset strip]
[Scrollable content]
  ProfileHeaderSection (green card)
    Avatar circle (initials)
    Rider name
    ★ Rating  |  N deliveries
    Member since [date]

  ProfileStatsSection
    Today: N deliveries | X.X kg plastic | ₹XX
    Monthly: N deliveries | X.X kg plastic

  ProfileVehicleSection
    Vehicle type (🏍️ Bike / 🚲 Cycle / 🛵 Scooter)
    Vehicle number
    Registration details

  ProfileSettingsSection
    Settings menu items
    [Logout button] (red danger)
```

**Files:**
- `Profile.component.tsx`
- `Profile.styles.ts`
- `profile-sections/ProfileHeader.section.tsx`
- `profile-sections/ProfileStats.section.tsx`
- `profile-sections/ProfileVehicle.section.tsx`
- `profile-sections/ProfileSettings.section.tsx`
- `use-profile-hook/useProfileActions.hook.ts`

---

## 20. App Constants

```ts
APP = {
  NAME:                'EKO Rider',
  TAGLINE:             'Deliver Green. Earn More.',
  VERSION:             '1.0.0',
  SPLASH_DELAY:        2500,    // ms
  OTP_RESEND_SECONDS:  30,
  RIDE_REQUEST_TIMEOUT: 15,     // seconds countdown on new order modal
}

TIER_THRESHOLDS = {
  BRONZE_MAX: 10,   // kg/month
  SILVER_MAX: 25,   // kg/month
}

INCENTIVE_RATES = {
  bronze: 10,   // ₹/kg
  silver: 20,
  gold:   35,
}

PLASTIC_POINTS_PER_KG = 50

ONBOARDING_SLIDES = [
  { id: '1', emoji: '🛵', title: 'Deliver with Purpose',          subtitle: '...' },
  { id: '2', emoji: '♻️', title: 'Collect Plastic. Save Planet.',  subtitle: '...' },
  { id: '3', emoji: '💰', title: 'Earn More. Rise Higher.',        subtitle: '...' },
]
```

---

## 21. Architecture Patterns

### Container / Component Pattern

Every screen is split into two files:

| File | Responsibility |
|------|---------------|
| `Screen.container.tsx` | Data fetching, state, navigation, event handlers |
| `Screen.component.tsx` | Pure UI — receives everything as props |

This keeps UI components testable and free from business logic.

### Section Pattern

Each screen's UI is divided into logical sections:
```
Screen.component.tsx
  └── renders multiple XxxSection components
        each section = one focused UI block
```

### Hook Composition

Each screen's container logic is split into focused hooks:
```
useScreenHook (index.ts)
  ├── useScreenData    — API calls, loading, error
  ├── useScreenActions — Event handlers, mutations
  └── useScreenNavigation — Navigation calls
```

### Status Bar Handling

Because bottom tabs keep **all screens mounted simultaneously**, `StatusBar` must be set imperatively on each focus:

```ts
// src/hooks/useStatusBarStyle.ts
export const useStatusBarStyle = (style, androidBgColor?) => {
  useFocusEffect(useCallback(() => {
    StatusBar.setBarStyle(style, true)
    if (Platform.OS === 'android' && androidBgColor)
      StatusBar.setBackgroundColor(androidBgColor, true)
  }, [style, androidBgColor]))
}
```

### Status Bar Inset Handling (Earnings / Profile / Plastic)

These screens use a dedicated green strip at the top to ensure the status bar area matches the green header, making white icons visible:

```tsx
<View style={styles.container}>       {/* Colors.background */}
  <View style={{height: insets.top, backgroundColor: Colors.primary}} />
  {/* Green header seamlessly continues below */}
  <ScrollView>...</ScrollView>
</View>
```

### Animation Rules

| Property type | `useNativeDriver` |
|--------------|-------------------|
| `opacity`, `transform` (translate/scale/rotate) | `true` ✅ |
| `height`, `maxHeight`, `padding`, `margin`, `width` | `false` ✅ |
| Mixed (same component) | `false` for all ✅ |

**Never mix `true` and `false` on the same `Animated.Value` — it causes a runtime crash.**

---

*Last updated: February 2026*
