# Implementation Plan - E Tech All Tech ERP System

Building a premium, enterprise-grade Repair Shop Management ERP for "E Tech All Tech" in Ethiopia. This system will handle the full lifecycle of electronic repairs, inventory, invoicing, and financial reporting.

## Scope Summary
- **Core ERP:** Customer & Device management, Repair Ticketing, Inventory, and Invoicing.
- **Financials:** Expense/Revenue tracking, Profit analysis, and Executive Dashboard.
- **Branding:** Modern technology-focused UI/Logo for "E Tech All Tech".
- **Localization:** Support for ETB currency and Amharic-ready structure.
- **Security:** Role-based access (Admin, Technician, Receptionist, etc.).

## Non-Goals
- Real-time SMS/WhatsApp sending (UI-ready hooks only).
- Actual Electron.js packaging (focus on the web-based ERP foundation).
- Production-grade database backup scripts (conceptual/UI only).

## Assumptions
- The application will be a single-page React application.
- Since no Supabase credentials are provided, data will be persisted via `localStorage` for this session's prototype/demonstration.
- The UI will follow a high-end "Enterprise" aesthetic using Tailwind CSS and Shadcn UI components.

## Affected Areas
- **Frontend:** Full UI suite (Dashboard, Inventory, Repairs, Customers, Invoices).
- **State Management:** Complex client-side state to simulate a "full-stack" experience without a live DB.
- **Assets:** Branding/Logo generation in CSS/SVG.

## Phases

### Phase 1: Foundation & Branding
- **Owner:** `frontend_engineer`
- **Deliverables:**
    - App Shell with Sidebar navigation (Collapsible).
    - Theme configuration (Dark/Light mode) and ETB currency formatting utils.
    - SVG Logo for "E Tech All Tech" (modern/futuristic electronics theme).
    - Basic Routing structure.

### Phase 2: Customer & Device Management
- **Owner:** `frontend_engineer`
- **Deliverables:**
    - Customer CRUD (Create, Read, Update, Delete).
    - Device registration linked to customers (Serial, IMEI, Category).
    - Advanced search functionality (Search by Phone/Serial/Name).

### Phase 3: Repair Workflow & Status System
- **Owner:** `frontend_engineer`
- **Deliverables:**
    - Repair Ticket Generation with automatic numbering.
    - Status management (Received -> Diagnosing -> ... -> Delivered).
    - Technician assignment and Diagnostic notes.
    - Photo upload UI placeholder.

### Phase 4: Inventory & Parts Management
- **Owner:** `frontend_engineer`
- **Deliverables:**
    - Parts inventory table with low-stock alerts.
    - Stock tracking logic (deducting parts when added to a repair).
    - Supplier management UI.

### Phase 5: Invoicing & Receipts
- **Owner:** `frontend_engineer`
- **Deliverables:**
    - Print-ready Invoice template (A4 and Thermal).
    - QR Code and Barcode visual components for tracking.
    - Payment logging (Cash, Bank Transfer, Mobile Money).

### Phase 6: Executive Dashboard & Analytics
- **Owner:** `frontend_engineer`
- **Deliverables:**
    - High-level KPI cards (Total Repairs, Monthly Revenue).
    - Recharts-based financial charts (Revenue vs Expenses).
    - Role-based UI view filtering (simulated permissions).

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Build the core ERP structure, branding, and all functional modules using local state.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1-6
- **Scope:** Create a complete, high-fidelity ERP. Use `src/components/ui` for standard elements. Use `localStorage` for data persistence so the app remains functional across refreshes.
- **Files:**
    - `src/App.tsx` (Main router/layout)
    - `src/components/layout/Sidebar.tsx`
    - `src/components/branding/Logo.tsx`
    - `src/pages/Dashboard.tsx`
    - `src/pages/Repairs.tsx`
    - `src/pages/Inventory.tsx`
    - `src/pages/Invoices.tsx`
    - `src/pages/Customers.tsx`
    - `src/hooks/useERPData.ts` (Centralized state management)
- **Depends on:** none
- **Acceptance criteria:**
    - Professional, "Enterprise" look and feel.
    - Working repair ticket lifecycle.
    - Functional inventory with stock deduction.
    - Printable invoice generation.
    - Dashboard showing realistic mock data and charts.
    - ETB currency used throughout.
