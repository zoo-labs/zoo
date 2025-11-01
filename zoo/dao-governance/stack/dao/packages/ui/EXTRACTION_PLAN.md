# UI Library Extraction Plan

## ✅ Completed

1. **Created package structure** (`@luxdao/ui`)
   - Set up package.json with proper dependencies
   - Created TypeScript configuration
   - Added README with usage instructions

2. **Extracted theme system**
   - Copied theme files from app (colors, breakpoints, text styles, components)
   - Created luxTheme export for ChakraProvider

3. **Started component extraction**
   - Extracted Badge component (renamed from DAO references)
   - Extracted Tooltip component (renamed from DAOTooltip to Tooltip)
   - Set up proper exports structure

## 🔄 In Progress

### Replacing "DAO" References

Components that need renaming:
- `DAOLogo` → `Logo` 
- `DAOSignature` → `Signature`
- `DAOHourGlass` → `HourGlass` 
- `DAOTooltip` → `Tooltip` ✅
- `useDAOModal` → `useModal`
- `DAOModule` → `Module` (type)

### Component Extraction Priority

1. **Basic UI Elements** (High Priority)
   - ✅ Badge
   - ✅ Tooltip
   - [ ] Card
   - [ ] ContentBox
   - [ ] InfoBox
   - [ ] Divider
   - [ ] ProgressBar

2. **Form Components** (High Priority)
   - [ ] AddressInput (EthAddressInput)
   - [ ] BigIntInput
   - [ ] DatePicker
   - [ ] LabelWrapper
   - [ ] InputComponent
   - [ ] NumberStepperInput

3. **Navigation & Layout** (Medium Priority)
   - [ ] Breadcrumbs
   - [ ] NavigationLink
   - [ ] PageHeader
   - [ ] Footer

4. **Loaders & Feedback** (Medium Priority)
   - [ ] BarLoader
   - [ ] CircleLoader
   - [ ] InfoBoxLoader
   - [ ] AlertBanner

5. **Utility Components** (Medium Priority)
   - [ ] AddressCopier
   - [ ] DisplayAddress
   - [ ] ExternalLink
   - [ ] EtherscanLink

6. **Complex Components** (Low Priority - May need refactoring)
   - [ ] Modals (ModalBase, ModalProvider, useModal hook)
   - [ ] Menus (DropdownMenu, OptionMenu)
   - [ ] Complex forms (requires removing app-specific logic)

## 📋 Next Steps

1. **Continue extracting components**
   - Focus on components with minimal dependencies first
   - Remove app-specific imports (types, hooks, stores)
   - Make components more generic and reusable

2. **Handle translations**
   - Either remove i18n dependencies or make them optional
   - Consider passing labels as props instead

3. **Add Storybook stories**
   - Create stories for each extracted component
   - Document component props and usage

4. **Build and test**
   - Set up build process with tsup
   - Test the package can be imported correctly
   - Add unit tests for components

5. **Update app to use @luxdao/ui**
   - Replace local component imports with package imports
   - Ensure backward compatibility

## 🚧 Challenges to Address

1. **Type Dependencies**
   - Many components depend on app-specific types
   - Need to either extract shared types or make components more generic

2. **Hook Dependencies**
   - Components use app-specific hooks
   - Need to either extract hooks or refactor components

3. **Translation System**
   - Components use react-i18next
   - Consider making translations optional or prop-based

4. **Store Dependencies**
   - Some components access app stores directly
   - Need to refactor to accept props instead

## 📦 Package Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── badges/        ✅
│   │   ├── cards/         🔄
│   │   ├── containers/    🔄
│   │   ├── forms/         🔄
│   │   ├── layout/        🔄
│   │   ├── loaders/       🔄
│   │   ├── modals/        🔄
│   │   └── utils/         ✅
│   ├── theme/             ✅
│   ├── hooks/             🔄
│   ├── utils/             🔄
│   └── index.ts           ✅
├── package.json           ✅
├── tsconfig.json          ✅
├── README.md              ✅
└── .gitignore             ✅
```

## 🎯 Success Criteria

- [ ] All basic UI components extracted and working
- [ ] No "DAO" references remain (only "Lux" or generic names)
- [ ] Package builds successfully
- [ ] Package can be imported in the app
- [ ] Storybook documentation available
- [ ] Tests passing
- [ ] App successfully uses @luxdao/ui package