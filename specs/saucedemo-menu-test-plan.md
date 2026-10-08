# Hamburger Menu Test Plan

## Application Overview

Test SauceDemo hamburger menu interactions, all top-level choices, Dynamic Catalog child choices, and the menu open/close state as independent tests.

## Test Scenarios

### 1. Hamburger menu

**Seed:** `tests/seed.spec.ts`

#### 1.1. Open and close hamburger menu

**File:** `tests/navigation/menu.spec.ts`

**Steps:**
  1. Log in as standard_user and open the hamburger menu using the Open Menu control.
    - expect: The menu becomes visible and exposes All Items, Dynamic Catalog, About, Logout, and Reset App State.
  2. Close the menu.
    - expect: Menu items are no longer visible and the product page remains usable.

#### 1.2. Expand Dynamic Catalog submenu

**File:** `tests/navigation/menu.spec.ts`

**Steps:**
  1. Open hamburger menu and select Dynamic Catalog.
    - expect: Lazy Load, Spinner, and Slider child items are visible.

#### 1.3. Navigate Dynamic Catalog children

**File:** `tests/navigation/menu.spec.ts`

**Steps:**
  1. For each child choice (Lazy Load, Spinner, Slider), select it from Dynamic Catalog.
    - expect: The app leaves the Products route and displays the selected Dynamic Catalog section.

#### 1.4. All Items returns to inventory

**File:** `tests/navigation/menu.spec.ts`

**Steps:**
  1. Navigate to product details, open hamburger menu, and select All Items.
    - expect: Products inventory is displayed.

#### 1.5. About target and existing account actions

**File:** `tests/navigation/menu.spec.ts`

**Steps:**
  1. Inspect About destination, then separately run existing Logout and Reset App State cases.
    - expect: About links to Sauce Labs; existing tests confirm Logout and Reset App State behavior.
