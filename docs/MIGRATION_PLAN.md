# Sidebar to Dock Navigation Migration Plan

This document outlines the strategy for migrating the existing sidebar navigation in the MyOvae application to a new "dock" navigation system. The plan is based on the comprehensive audit conducted on the current implementation.

## 1. Navigation Item Mapping (Sidebar to Dock)

The new dock will serve as the primary navigation element. All existing sidebar items will be mapped to an icon-based representation in the new dock component.

| Current Item      | Route             | Icon Component    | Dock Equivalent |
| ----------------- | ----------------- | ----------------- | --------------- |
| Dashboard         | `/dashboard`      | `LayoutDashboard` | Icon Button     |
| Cycle Tracker     | `/cycle-tracker`  | `Moon`            | Icon Button     |
| Symptom Log       | `/symptom-log`    | `HeartPulse`      | Icon Button     |
| Insights          | `/insights`       | `TrendingUp`      | Icon Button     |
| AI Coach          | `/coaching`       | `Bot`             | Icon Button     |
| Sisterhood        | `/community`      | `Users`           | Icon Button     |
| Nutrition         | `/nutrition`      | `Carrot`          | Icon Button     |
| Fitness           | `/fitness`        | `Dumbbell`        | Icon Button     |
| Lab Results       | `/lab-results`    | `NotebookText`    | Icon Button     |

The user profile section will be moved from the sidebar footer to a dedicated user menu, likely in the main header or as a distinct element in the dock.

## 2. Dependent Component Identification

The following components and files have dependencies on the current sidebar implementation and will require modification:

- **`src/app/dashboard/layout.tsx`**: The primary consumer of the `SidebarProvider` and all `Sidebar` components. This file will be completely refactored to use the new dock navigation structure.
- **`src/components/ui/sidebar.tsx`**: This entire file and all its exported components (`SidebarProvider`, `Sidebar`, `SidebarMenuButton`, etc.) will be removed and replaced by the new dock component.
- **`src/app/globals.css`**: Contains CSS variables prefixed with `--sidebar-` that will be removed.

## 3. Obsolete CSS and Styles

The following CSS classes, custom properties, and styles will be removed:

- **CSS Variables in `globals.css`**: All variables prefixed with `--sidebar-`, including:
  - `--sidebar-background`
  - `--sidebar-foreground`
  - `--sidebar-primary`
  - `--sidebar-primary-foreground`
  - `--sidebar-accent`
  - `--sidebar-accent-foreground`
  - `--sidebar-border`
  - `--sidebar-ring`
- **Tailwind Config (`tailwind.config.ts`)**: The `sidebar` color palette extension will be removed.
- **`sidebar.tsx` Specific Styles**: All `data-` attribute-driven styles within `src/components/ui/sidebar.tsx` (e.g., `group-data-[collapsible=icon]`, `peer-data-[variant=inset]`) will become obsolete with the file's deletion.

## 4. Firestore Calls & State Management

- **Navigation State**: The audit confirms that navigation state (expanded/collapsed) is managed via a browser cookie (`sidebar_state`) and React Context, not through Firestore. No Firestore calls are tied to the navigation state itself.
- **User Theme Preference**: The `themePreference` field in the `UserProfile` entity was previously tied to the UI. This has been simplified to a light/dark mode toggle and is no longer directly coupled with the navigation component's logic in the same way. No changes to Firestore logic are required for this migration.

## 5. Rollback Strategy

If the migration causes critical issues, the following steps will be taken to revert the changes:

1.  **Restore `layout.tsx`**: Delete the modified `src/app/dashboard/layout.tsx` and rename `src/app/dashboard/layout.tsx.bak` back to `layout.tsx`.
2.  **Restore `sidebar.tsx`**: Restore the `src/components/ui/sidebar.tsx` file from version control or a backup.
3.  **Restore `globals.css`**: Re-add the `--sidebar-` CSS variables.
4.  **Restore `tailwind.config.ts`**: Re-add the `sidebar` color configuration.
5.  **Restore `package.json`**: Restore any removed dependencies.
6.  **Run `npm install`** to reinstall any removed dependencies.

## 6. Test File Updates

The current project structure does not contain any automated test files (`.test.ts`, `.spec.tsx`, etc.). Therefore, this section is not applicable. Manual testing will be required to verify the new navigation's functionality across all supported browsers and devices.

## 7. Order of Component Updates (Migration Steps)

To prevent breaking changes during development, the migration will proceed in the following order:

1.  **Create New Dock Component**: A new set of dock and header components will be created in a new directory (e.g., `src/components/navigation/`) without immediately integrating them.
2.  **Refactor `dashboard/layout.tsx`**: The main layout will be updated to import and use the new dock and header components, completely removing all references to the old `Sidebar` components.
3.  **Delete Obsolete Sidebar Component**: The `src/components/ui/sidebar.tsx` file will be deleted.
4.  **Clean Up `package.json`**: Remove any unused dependencies.
5.  **Clean Up CSS**: Remove the obsolete `--sidebar-` variables from `globals.css` and the `sidebar` color definitions from `tailwind.config.ts`.
6.  **Testing**: Manually test all navigation flows, active state highlighting, responsive behavior, and user profile access to ensure full functionality.
