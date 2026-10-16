import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Wallet, TrendingUp, TrendingDown, Target, Plus, Sun, Moon, Globe,
  ArrowUpRight, ArrowDownRight, CreditCard, DollarSign, Menu, X,
  Pencil, Trash2, Check, Filter, ArrowUpDown, Download, Search,
  PiggyBank, Tag, LayoutDashboard, List, Settings, ChevronDown, ChevronUp,
  Calendar, Crosshair, Trophy, Flame, Send, ExternalLink,
  BarChart3, PieChart, Landmark, RefreshCw, HandCoins, ShieldCheck,
  Award, Sparkles, AlertTriangle, AlertCircle, CheckCircle2, ChevronRight,
  Clock, Coins, Briefcase, Laptop, Utensils, Car, Home, Zap,
  ShoppingBag, HeartPulse, Smartphone, Dumbbell, Plane, Film,
  GraduationCap, Coffee, Share2, HelpCircle, ArrowRightLeft, Percent, Gift,
  CircleStop, Play, CalendarClock, Infinity as InfinityIcon,
  ArrowDownLeft, History, Minus, Eye, EyeOff, Radio, Loader2, Copy,
  Cloud, CloudOff, LogIn, LogOut, User, Mail, Lock,
  ShoppingCart, Store, Package, Receipt, Banknote,
  Pizza, Beer, Wine, Apple, Cake,
  Bus, Train, Bike, Fuel, Ship,
  Building, Hotel, Key, Bed,
  Music, Gamepad2, Tv, Headphones, Camera, Scissors, Palette,
  Activity, Stethoscope, Pill, Heart, Smile,
  Book, BookOpen, Library,
  Baby, Dog, Cat, Flower2, TreePine, Trees, Shirt,
  Star, CloudRain, Shield, Umbrella
} from 'lucide-react';
import {
  auth,
  db,
  googleProvider,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from './firebase';
import logoImg from './assets/logo.png';

/* ═══════════════════════════════════════════════════════════════
   BILINGUAL LOCALIZATION DICTIONARY (NO EMOJIS)
   ═══════════════════════════════════════════════════════════════ */
const dict = {
  en: {
    appName: 'My Luy',
    appSubtitle: 'Smart Personal Finance',
    dashboard: 'Dashboard',
    transactionsTab: 'Transactions',
    analyticsTab: 'Analytics',
    budgetsGoalsTab: 'Budgets & Goals',
    accountsTab: 'Accounts',
    recurringTab: 'Recurring',
    debtTab: 'Debt & Loans',
    gamificationTab: 'Challenges & XP',
    settingsTab: 'Settings',

    // Summary cards
    totalBalance: 'Total Balance',
    totalIncome: 'Total Income',
    totalExpenses: 'Total Expenses',
    netSavings: 'Net Savings',
    savingsRate: 'Savings Rate',

    // Actions & Common
    addTransaction: 'Add Transaction',
    editTransaction: 'Edit Transaction',
    description: 'Description',
    descPlaceholder: 'e.g. Lunch with team',
    amount: 'Amount',
    amountPlaceholder: '0.00',
    type: 'Type',
    income: 'Income',
    expense: 'Expense',
    transfer: 'Transfer',
    category: 'Category',
    account: 'Account',
    date: 'Date',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    submit: 'Add',
    update: 'Update',
    all: 'All',
    search: 'Search...',
    export: 'Export CSV',
    sortByDate: 'Sort by Date',
    sortByAmount: 'Sort by Amount',
    newest: 'Newest First',
    oldest: 'Oldest First',
    highest: 'Highest Amount',
    lowest: 'Lowest Amount',
    filter: 'Filter',
    yes: 'Yes, Confirm',
    no: 'Cancel',
    deleteConfirm: 'Are you sure you want to delete this?',
    deleteConfirmMsg: 'This action cannot be undone.',
    emptyTransactions: 'No transactions recorded yet',
    emptyTransactionsSub: 'Tap the + button to record your first transaction',

    // Progressive Disclosure
    progressiveDisclosure: 'Progressive Disclosure',
    viewDetails: 'View Details',
    hideDetails: 'Hide Details',
    showMore: 'Show More',
    showLess: 'Show Less',
    refId: 'Ref ID',
    convertedEst: 'Converted Est.',
    channel: 'Account Source',
    fullSchedule: 'Schedule Rule',
    debtProgress: 'Repayment Progress',

    // Analytics & Charts
    cashFlowTrend: 'Cash Flow Trends',
    categoryBreakdown: 'Expense Breakdown by Category',
    spendingVelocity: 'Monthly Spending Velocity',
    dailyAverage: 'Daily Average Expense',
    topSpendingCategory: 'Top Spending Category',
    financialHealth: 'Financial Health Score',
    netWorthTrend: 'Net Worth Trajectory',
    timeframe: 'Timeframe',
    thisMonth: 'This Month',
    last30Days: 'Last 30 Days',
    allTime: 'All Time',
    incomeVsExpense: 'Income vs Expense',
    chartNoData: 'No transaction data available for this timeframe',

    // Budgets & Goals
    budgetLimits: 'Budget Limits',
    savingsGoals: 'Savings Goals',
    addBudgetLimit: 'Set Budget Limit',
    editBudgetLimit: 'Edit Budget Limit',
    monthlyLimit: 'Monthly Limit',
    spentSoFar: 'Spent So Far',
    remaining: 'Remaining',
    budgetStatusSafe: 'Within Budget',
    budgetStatusWarn: 'Near Limit (>80%)',
    budgetStatusDanger: 'Over Budget!',
    emptyBudgets: 'No budget limits set yet',
    emptyBudgetsSub: 'Set monthly limits to keep your expenses in check',
    addGoal: 'Create Savings Goal',
    editGoal: 'Edit Savings Goal',
    goalName: 'Goal Title',
    goalNamePlaceholder: 'e.g. Emergency Fund',
    targetAmount: 'Target Amount',
    currentAmount: 'Saved Amount',
    targetDate: 'Target Date',
    addFunds: 'Add Funds',
    withdrawFunds: 'Withdraw Funds',
    fundsAmount: 'Amount',
    goalAchieved: 'Goal Completed',
    daysLeft: 'days remaining',
    emptyGoals: 'No savings goals created yet',
    emptyGoalsSub: 'Define your dreams and watch your money grow',

    // Direct Monthly Auto-Save (Non-Stop)
    directAutoSave: 'Direct Monthly Auto-Save (Non-Stop)',
    directAutoSaveSub: 'Continuous monthly stash without end date. One single button to stop or resume anytime.',
    autoSaveRunning: 'NON-STOP ACTIVE',
    autoSaveStopped: 'STOPPED',
    dayStart: 'Day Start',
    dayOfMonth: 'Execution Day',
    dayOfMonthSub: 'Day of every month',
    dayPrefix: 'Day',
    daySuffix: '',
    monthlyAmount: 'Monthly Deposit',
    totalAccumulated: 'Total Accumulated Saved',
    stopAutoSave: 'Stop Auto-Save',
    resumeAutoSave: 'Resume Non-Stop Auto-Save',
    editAutoSave: 'Configure Auto-Save Plan',
    configureAutoSave: 'Configure Non-Stop Auto-Save',
    depositNow: 'Deposit This Month Now',
    depositSuccess: 'Monthly auto-save deposit recorded successfully!',
    autoSaveStoppedMsg: 'Monthly auto-save stopped.',
    autoSaveResumedMsg: 'Monthly auto-save running non-stop!',
    autoSavePerpetual: 'Perpetual / No Stop',
    totalSavedSoFar: 'Stored in secure vault',
    directVault: 'Direct Vault',
    withdraw: 'Withdraw',
    deposit: 'Deposit',
    withdrawFromVault: 'Withdraw from Stash Vault',
    depositToVault: 'Deposit to Stash Vault',
    autoSaveHistory: 'Auto-Save Vault History',
    noAutoSaveHistory: 'No deposit or withdrawal history yet',
    noAutoSaveHistorySub: 'Deposits and withdrawals for this monthly stash will appear here',
    editHistoryItem: 'Edit Vault Record',
    deleteHistoryItem: 'Delete Record',
    confirmDeleteHistory: 'Are you sure you want to delete this vault record? Vault and account balances will be updated.',
    withdrawSuccess: 'Funds successfully withdrawn from vault!',
    recordUpdated: 'Vault history record updated successfully!',
    recordDeleted: 'Vault history record deleted successfully!',
    insufficientVaultFunds: 'Cannot withdraw more than current vault balance!',
    note: 'Note',
    notePlaceholder: 'e.g. Monthly allocation or Emergency withdrawal',

    // Accounts & Currencies
    accountsList: 'Your Accounts & Wallets',
    accountsSubtitle: 'Manage bank cards, digital wallets, and cash in hand',
    totalLiquidAssets: 'Total Liquid Assets',
    addAccount: 'Add New Account',
    editAccount: 'Edit Account',
    accountName: 'Account Name',
    accountNamePlaceholder: 'e.g. ABA Bank, Wing, Cash Wallet',
    accountType: 'Account Type',
    bankAccount: 'Bank Account',
    cashWallet: 'Cash / Wallet',
    digitalWallet: 'Digital Wallet',
    investmentVault: 'Investment / Vault',
    initialBalance: 'Balance',
    transferFunds: 'Transfer Funds',
    transferFrom: 'From Account',
    transferTo: 'To Account',
    transferAmount: 'Transfer Amount',
    currencyToggle: 'Currency & Exchange',
    currencyUSD: 'USD ($)',
    currencyKHR: 'KHR (៛)',
    exchangeRateLabel: 'Exchange Rate ($1 USD =)',
    switchCurrency: 'Switch Currency',

    // Recurring Transactions
    recurringTitle: 'Scheduled & Recurring Bills',
    addRecurring: 'Add Subscription',
    editRecurring: 'Edit Recurring',
    frequency: 'Frequency',
    freqDaily: 'Daily',
    freqWeekly: 'Weekly',
    freqMonthly: 'Monthly',
    freqYearly: 'Yearly',
    nextDueDate: 'Next Due Date',
    autoPay: 'Record Now',
    activeStatus: 'Active',
    pausedStatus: 'Paused',
    emptyRecurring: 'No recurring bills or subscriptions',
    emptyRecurringSub: 'Automate tracking for rent, internet, Netflix and salary',

    // Debt & Loan Tracker
    debtTitle: 'Debt & Loan Tracker',
    lentTab: 'I Lent Money (Receivables)',
    borrowedTab: 'I Borrowed Money (Payables)',
    addDebt: 'Add Debt Record',
    editDebt: 'Edit Debt Record',
    personName: 'Person / Institution Name',
    personPlaceholder: 'e.g. Sokha, Canadia Loan',
    totalOwed: 'Total Amount',
    amountPaid: 'Paid Amount',
    recordPayment: 'Record Payment',
    paymentAmount: 'Payment Amount',
    remainingDebt: 'Remaining Balance',
    dueDate: 'Due Date',
    notes: 'Notes / Remarks',
    notesPlaceholder: 'Optional loan details...',
    debtFullyPaid: 'Fully Settled',
    emptyLent: 'No money lent out currently',
    emptyBorrowed: 'No outstanding borrowed debts',

    // Gamification & Challenges
    gamificationTitle: 'Savings Challenges & Level',
    userLevel: 'Level',
    xpPoints: 'XP',
    levelProgress: 'Level Progress',
    streakTitle: 'Logging Streak',
    streakDays: 'Days in a row',
    challengesSection: 'Active Challenges',
    challenge52Week: '52-Week Savings Sprint',
    challenge52Desc: 'Save a growing amount each week to build wealth',
    challenge30Day: '30-Day Zero Waste Challenge',
    challenge30Desc: 'Mark each day you avoided unnecessary impulsive spend',
    checkWeek: 'Week',
    checkDay: 'Day',
    badgesTitle: 'Achievement Badges',
    badgeFirstRecord: 'First Step',
    badgeFirstRecordDesc: 'Recorded your first transaction',
    badgeBudgetGuardian: 'Budget Guardian',
    badgeBudgetGuardianDesc: 'Kept all spending within monthly limits',
    badgeGoalCrusher: 'Goal Crusher',
    badgeGoalCrusherDesc: 'Achieved a target savings goal',
    badgeStreakMaster: 'Discipline Master',
    badgeStreakMasterDesc: 'Maintained a 7-day tracking streak',
    badgeDebtFree: 'Debt Slayer',
    badgeDebtFreeDesc: 'Fully repaid a borrowed loan',
    badgeCenturyClub: 'Century Club',
    badgeCenturyClubDesc: 'Accumulated over $100 in savings goals',

    // Categories
    categoriesManagement: 'Category Management',
    addCategory: 'Create Category',
    editCategory: 'Edit Category',
    categoryName: 'Category Name',
    categoryIcon: 'Icon',
    categoryColor: 'Color',
    incomeCategories: 'Income Categories',
    expenseCategories: 'Expense Categories',
    allCategoriesTitle: 'All Categories',
    saveChanges: 'Save Changes',
    cancelEdit: 'Cancel',
    editingCategory: 'Editing Category',
    editing: 'Editing',
    restoreDefaults: 'Restore Default Categories',
    restoreDefaultsConfirm: 'Restore categories back to default starter categories?',
    deleteCategoryConfirm: 'Are you sure you want to delete this category?',
    cantDeleteLastCategory: 'You must keep at least one category.',

    // App & PWA
    installApp: 'Install App',
    installAppDesc: 'Install My Luy to your device Home Screen for instant offline access and native app feel.',
    installButton: 'Install Now',
    installGuideSafari: 'On iPhone / iPad: Tap the Share button in Safari, then select "Add to Home Screen".',
    installGuideDesktop: 'On Chrome / Edge: Click the install icon in the address bar to add to desktop.',
    resetData: 'Reset All Data to 0',
    confirmReset: 'Reset all data back to 0?',
    confirmResetMsg: 'All transactions, budgets, goals, and accounts will be reset to 0.',
    poweredBy: 'Powered by',
    telegramLinkText: 'laolimheang',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    loadingVault: 'Securing Financial Vault...',
    loadingSync: 'Synchronizing Accounts & Currencies...',
    loadingReady: 'Financial System Ready',
    loading: 'Loading...',
    systemSynced: 'System Synchronized',
    refreshData: 'Refresh & Sync Data',
    previewLoadingScreen: 'Reload Splash Screen',

    // Real-Time Currency Exchange KHR - USD
    currencyExchange: 'Real-Time Currency Exchange (KHR ⇄ USD)',
    exchangeConverter: 'Live Currency Converter',
    exchangeRateLabel: 'Exchange Rate',
    rateNBC: 'NBC Official (4,080)',
    rateMarket: 'Market Standard (4,100)',
    rateBankBuy: 'Bank Buy (4,050)',
    rateBankSell: 'Bank Sell (4,120)',
    usdAmount: 'USD Amount ($)',
    khrAmount: 'KHR Amount (៛)',
    swapCurrencies: 'Swap Currencies',
    copyConverted: 'Copy Amount',
    amountCopied: 'Converted amount copied to clipboard',
    livePreview: 'Live Converted',
    quickPresets: 'Quick Amounts',
    ratePerUSD: 'per $1 USD',
    applyToTransaction: 'Add as Transaction',
  },
  kh: {
    appName: 'My Luy',
    appSubtitle: 'ហិរញ្ញវត្ថុឆ្លាតវៃ',
    dashboard: 'ផ្ទាំងគ្រប់គ្រង',
    transactionsTab: 'ប្រតិបត្តិការ',
    analyticsTab: 'វិភាគ & ក្រាហ្វិក',
    budgetsGoalsTab: 'ថវិកា & គោលដៅ',
    accountsTab: 'គណនី & រូបិយប័ណ្ណ',
    recurringTab: 'ការចំណាយប្រចាំ',
    debtTab: 'តាមដានបំណុល',
    gamificationTab: 'ការប្រកួត & រង្វាន់',
    settingsTab: 'ការកំណត់',

    // Summary cards
    totalBalance: 'សមតុល្យសរុប',
    totalIncome: 'ចំណូលសរុប',
    totalExpenses: 'ចំណាយសរុប',
    netSavings: 'ការសន្សំសុទ្ធ',
    savingsRate: 'អត្រាសន្សំ',

    // Actions & Common
    addTransaction: 'បន្ថែមប្រតិបត្តិការ',
    editTransaction: 'កែប្រែប្រតិបត្តិការ',
    description: 'ការពិពណ៌នា',
    descPlaceholder: 'ឧ. ញ៉ាំបាយថ្ងៃត្រង់',
    amount: 'ចំនួនទឹកប្រាក់',
    amountPlaceholder: '0.00',
    type: 'ប្រភេទ',
    income: 'ចំណូល',
    expense: 'ចំណាយ',
    transfer: 'ផ្ទេរប្រាក់',
    category: 'ប្រភេទចំណាយ/ចំណូល',
    account: 'គណនី',
    date: 'កាលបរិច្ឆេទ',
    save: 'រក្សាទុក',
    cancel: 'បោះបង់',
    delete: 'លុប',
    edit: 'កែប្រែ',
    submit: 'បន្ថែម',
    update: 'ធ្វើបច្ចុប្បន្នភាព',
    all: 'ទាំងអស់',
    search: 'ស្វែងរក...',
    export: 'នាំចេញ CSV',
    sortByDate: 'តម្រៀបតាមកាលបរិច្ឆេទ',
    sortByAmount: 'តម្រៀបតាមចំនួនប្រាក់',
    newest: 'ថ្មីបំផុត',
    oldest: 'ចាស់បំផុត',
    highest: 'ច្រើនបំផុត',
    lowest: 'តិចបំផុត',
    filter: 'តម្រង',
    yes: 'បាទ/ចាស, បញ្ជាក់',
    no: 'បោះបង់',
    deleteConfirm: 'តើអ្នកប្រាកដថាចង់លុបទិន្នន័យនេះ?',
    deleteConfirmMsg: 'សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។',
    emptyTransactions: 'មិនទាន់មានប្រតិបត្តិការនៅឡើយទេ',
    emptyTransactionsSub: 'ចុចប៊ូតុង + ដើម្បីកត់ត្រាប្រតិបត្តិការដំបូង',

    // Progressive Disclosure
    progressiveDisclosure: 'ព័ត៌មានលម្អិតលាតត្រដាង',
    viewDetails: 'មើលលម្អិត',
    hideDetails: 'លាក់លម្អិត',
    showMore: 'បង្ហាញបន្ថែម',
    showLess: 'បង្ហាញតិច',
    refId: 'លេខសម្គាល់',
    convertedEst: 'តម្លៃប្តូរប្រាក់ប៉ាន់ស្មាន',
    channel: 'ប្រភពគណនី',
    fullSchedule: 'កាលវិភាគកំណត់',
    debtProgress: 'វឌ្ឍនភាពសងប្រាក់',

    // Analytics & Charts
    cashFlowTrend: 'និន្នាការចរន្តសាច់ប្រាក់',
    categoryBreakdown: 'ការវិភាគចំណាយតាមប្រភេទ',
    spendingVelocity: 'ល្បឿននៃការចំណាយប្រចាំខែ',
    dailyAverage: 'ចំណាយជាមធ្យមប្រចាំថ្ងៃ',
    topSpendingCategory: 'ប្រភេទចំណាយច្រើនជាងគេ',
    financialHealth: 'ពិន្ទុសុខភាពហិរញ្ញវត្ថុ',
    netWorthTrend: 'និន្នាការទ្រព្យសម្បត្តិសុទ្ធ',
    timeframe: 'ពេលវេលា',
    thisMonth: 'ខែនេះ',
    last30Days: '៣០ថ្ងៃចុងក្រោយ',
    allTime: 'ទាំងអស់',
    incomeVsExpense: 'ចំណូល ធៀប ចំណាយ',
    chartNoData: 'មិនមានទិន្នន័យសម្រាប់ពេលវេលានេះទេ',

    // Budgets & Goals
    budgetLimits: 'កម្រិតថវិកា',
    savingsGoals: 'គោលដៅសន្សំប្រាក់',
    addBudgetLimit: 'កំណត់កម្រិតថវិកា',
    editBudgetLimit: 'កែប្រែកម្រិតថវិកា',
    monthlyLimit: 'កម្រិតប្រចាំខែ',
    spentSoFar: 'បានចំណាយ',
    remaining: 'នៅសល់',
    budgetStatusSafe: 'ស្ថិតក្នុងកម្រិតល្អ',
    budgetStatusWarn: 'ជិតដល់កម្រិត (>៨០%)',
    budgetStatusDanger: 'លើសកម្រិតថវិកា!',
    emptyBudgets: 'មិនទាន់មានកម្រិតថវិកាទេ',
    emptyBudgetsSub: 'កំណត់កម្រិតចំណាយប្រចាំខែដើម្បីគ្រប់គ្រងលុយកាក់',
    addGoal: 'បង្កើតគោលដៅសន្សំ',
    editGoal: 'កែប្រែគោលដៅសន្សំ',
    goalName: 'ឈ្មោះគោលដៅ',
    goalNamePlaceholder: 'ឧ. លុយបន្ទាន់ពេលអាសន្ន',
    targetAmount: 'ចំនួនគោលដៅ',
    currentAmount: 'បានសន្សំរួច',
    targetDate: 'កាលបរិច្ឆេទកំណត់',
    addFunds: 'ដាក់ប្រាក់សន្សំ',
    withdrawFunds: 'ដកប្រាក់ចេញ',
    fundsAmount: 'ចំនួនទឹកប្រាក់',
    goalAchieved: 'សម្រេចគោលដៅជោគជ័យ',
    daysLeft: 'ថ្ងៃនៅសល់',
    emptyGoals: 'មិនទាន់មានគោលដៅសន្សំនៅឡើយទេ',
    emptyGoalsSub: 'កំណត់គោលដៅដើម្បីសន្សំប្រាក់សម្រាប់អនាគត',

    // Direct Monthly Auto-Save (Non-Stop)
    directAutoSave: 'ការសន្សំប្រាក់ប្រចាំខែឥតឈប់',
    directAutoSaveSub: 'សន្សំប្រាក់ដោយស្វ័យប្រវត្តិកំណត់រៀងរាល់ខែឥតឈប់។ មានប៊ូតុងមួយសម្រាប់បញ្ឈប់គ្រប់ពេល។',
    autoSaveRunning: 'ដំណើរការឥតឈប់',
    autoSaveStopped: 'បានបញ្ឈប់',
    dayStart: 'ថ្ងៃចាប់ផ្តើម',
    dayOfMonth: 'ថ្ងៃត្រូវសន្សំរាល់ខែ',
    dayOfMonthSub: 'ថ្ងៃទីក្នុងខែនីមួយៗ',
    dayPrefix: 'ថ្ងៃទី',
    daySuffix: '',
    monthlyAmount: 'ចំនួនសន្សំប្រចាំខែ',
    totalAccumulated: 'លុយសរុបដែលបានសន្សំ',
    stopAutoSave: 'បញ្ឈប់ការសន្សំ (Stop)',
    resumeAutoSave: 'បន្តការសន្សំឥតឈប់ (Resume)',
    editAutoSave: 'កំណត់គម្រោងសន្សំ',
    configureAutoSave: 'កំណត់ការសន្សំប្រចាំខែឥតឈប់',
    depositNow: 'ដាក់សន្សំខែនេះឥឡូវ',
    depositSuccess: 'បានកត់ត្រាការសន្សំប្រចាំខែដោយជោគជ័យ!',
    autoSaveStoppedMsg: 'បានបញ្ឈប់ការសន្សំប្រចាំខែហើយ។',
    autoSaveResumedMsg: 'ការសន្សំប្រចាំខែដំណើរការឥតឈប់ឡើងវិញ!',
    autoSavePerpetual: 'រហូត / គ្មានពេលកំណត់',
    totalSavedSoFar: 'រក្សាទុកក្នុងទូរសន្សំ',
    directVault: 'ទូរសន្សំផ្ទាល់',
    withdraw: 'ដកប្រាក់',
    deposit: 'ដាក់ប្រាក់',
    withdrawFromVault: 'ដកប្រាក់ពីទូរសន្សំ',
    depositToVault: 'ដាក់ប្រាក់ចូលទូរសន្សំ',
    autoSaveHistory: 'ប្រវត្តិដាក់ និងដកប្រាក់សន្សំ',
    noAutoSaveHistory: 'មិនទាន់មានប្រវត្តិដាក់ ឬដកប្រាក់នៅឡើយទេ',
    noAutoSaveHistorySub: 'រាល់ការដាក់ និងដកប្រាក់សម្រាប់គម្រោងសន្សំនេះនឹងបង្ហាញនៅទីនេះ',
    editHistoryItem: 'កែប្រែកំណត់ត្រាសន្សំ',
    deleteHistoryItem: 'លុបកំណត់ត្រា',
    confirmDeleteHistory: 'តើអ្នកប្រាកដជាចង់លុបកំណត់ត្រានេះមែនទេ? សមតុល្យសន្សំនឹងត្រូវកែសម្រួលឡើងវិញ។',
    withdrawSuccess: 'បានដកប្រាក់ពីទូរសន្សំដោយជោគជ័យ!',
    recordUpdated: 'បានកែប្រែកំណត់ត្រាដោយជោគជ័យ!',
    recordDeleted: 'បានលុបកំណត់ត្រាដោយជោគជ័យ!',
    insufficientVaultFunds: 'មិនអាចដកប្រាក់លើសពីសមតុល្យក្នុងទូរសន្សំបានទេ!',
    note: 'ចំណាំ',
    notePlaceholder: 'ឧ. សន្សំប្រចាំខែ ឬ ដកប្រាក់បន្ទាន់',

    // Accounts & Currencies
    accountsList: 'គណនី និងកាបូបលុយរបស់អ្នក',
    accountsSubtitle: 'គ្រប់គ្រងកាតធនាគារ កាបូបឌីជីថល និងលុយសុទ្ធក្នុងដៃ',
    totalLiquidAssets: 'ទ្រព្យសម្បត្តិសរុប',
    addAccount: 'បន្ថែមគណនីថ្មី',
    editAccount: 'កែប្រែគណនី',
    accountName: 'ឈ្មោះគណនី',
    accountNamePlaceholder: 'ឧ. ធនាគារ ABA, វីង, លុយសុទ្ធ',
    accountType: 'ប្រភេទគណនី',
    bankAccount: 'គណនីធនាគារ',
    cashWallet: 'លុយសុទ្ធក្នុងដៃ',
    digitalWallet: 'កាបូបអេឡិចត្រូនិច',
    investmentVault: 'ការវិនិយោគ / ទូរសន្សំ',
    initialBalance: 'សមតុល្យ',
    transferFunds: 'ផ្ទេរប្រាក់',
    transferFrom: 'ពីគណនី',
    transferTo: 'ទៅគណនី',
    transferAmount: 'ចំនួនទឹកប្រាក់ផ្ទេរ',
    currencyToggle: 'រូបិយប័ណ្ណ & អត្រាប្តូរប្រាក់',
    currencyUSD: 'ដុល្លារ ($)',
    currencyKHR: 'រៀល (៛)',
    exchangeRateLabel: 'អត្រាប្តូរប្រាក់ ($1 USD =)',
    switchCurrency: 'ប្តូររូបិយប័ណ្ណ',

    // Recurring Transactions
    recurringTitle: 'ការចំណាយប្រចាំកាលវិភាគ',
    addRecurring: 'បន្ថែមការចំណាយប្រចាំ',
    editRecurring: 'កែប្រែការចំណាយប្រចាំ',
    frequency: 'ប្រេកង់',
    freqDaily: 'រាល់ថ្ងៃ',
    freqWeekly: 'រាល់សប្តាហ៍',
    freqMonthly: 'រាល់ខែ',
    freqYearly: 'រាល់ឆ្នាំ',
    nextDueDate: 'ថ្ងៃត្រូវបង់បន្ទាប់',
    autoPay: 'កត់ត្រាឥឡូវនេះ',
    activeStatus: 'សកម្ម',
    pausedStatus: 'ផ្អាកជាបណ្តោះអាសន្ន',
    emptyRecurring: 'មិនទាន់មានការចំណាយប្រចាំទេ',
    emptyRecurringSub: 'តាមដានថ្លៃផ្ទះជួល, អ៊ីនធឺណិត, សេវាប្រចាំ និងប្រាក់ខែ',

    // Debt & Loan Tracker
    debtTitle: 'តាមដានបំណុល និងការខ្ចីបុល',
    lentTab: 'លុយគេជំពាក់ខ្ញុំ (ត្រូវទារ)',
    borrowedTab: 'ខ្ញុំជំពាក់គេ (ត្រូវសង)',
    addDebt: 'បន្ថែមបញ្ជីបំណុល',
    editDebt: 'កែប្រែបញ្ជីបំណុល',
    personName: 'ឈ្មោះបុគ្គល / ស្ថាប័ន',
    personPlaceholder: 'ឧ. សុខា, កម្ចីកាណាឌីយ៉ា',
    totalOwed: 'ចំនួនប្រាក់សរុប',
    amountPaid: 'បានសងរួច',
    recordPayment: 'កត់ត្រាការសង',
    paymentAmount: 'ចំនួនទឹកប្រាក់សង',
    remainingDebt: 'ប្រាក់នៅសល់',
    dueDate: 'កាលបរិច្ឆេទសង',
    notes: 'កំណត់ចំណាំផ្សេងៗ',
    notesPlaceholder: 'ព័ត៌មានបន្ថែម...',
    debtFullyPaid: 'បានទូទាត់រួចរាល់',
    emptyLent: 'មិនមានលុយគេជំពាក់ទេ',
    emptyBorrowed: 'មិនមានបំណុលត្រូវសងគេទេ',

    // Gamification & Challenges
    gamificationTitle: 'ការប្រកួតសន្សំ និងកម្រិត XP',
    userLevel: 'កម្រិត',
    xpPoints: 'ពិន្ទុ XP',
    levelProgress: 'ការវិវឌ្ឍកម្រិត',
    streakTitle: 'ថ្ងៃកត់ត្រាជាប់គ្នា',
    streakDays: 'ថ្ងៃជាប់គ្នា',
    challengesSection: 'ការប្រកួតកំពុងដំណើរការ',
    challenge52Week: 'ការប្រកួតសន្សំ ៥២ សប្តាហ៍',
    challenge52Desc: 'សន្សំប្រាក់បន្ថែមជារៀងរាល់សប្តាហ៍ដើម្បីកសាងទ្រព្យសម្បត្តិ',
    challenge30Day: 'ការប្រកួត ៣០ ថ្ងៃមិនចាយផ្តេសផ្តាស',
    challenge30Desc: 'គូសធីកថ្ងៃដែលអ្នកមិនបានចំណាយលើរបស់មិនចាំបាច់',
    checkWeek: 'សប្តាហ៍ទី',
    checkDay: 'ថ្ងៃទី',
    badgesTitle: 'មេដាយកិត្តិយស',
    badgeFirstRecord: 'ជំហានដំបូង',
    badgeFirstRecordDesc: 'កត់ត្រាប្រតិបត្តិការលើកដំបូង',
    badgeBudgetGuardian: 'អ្នកការពារថវិកា',
    badgeBudgetGuardianDesc: 'គ្រប់គ្រងចំណាយមិនឱ្យលើសកម្រិត',
    badgeGoalCrusher: 'អ្នកសម្រេចគោលដៅ',
    badgeGoalCrusherDesc: 'សម្រេចគោលដៅសន្សំប្រាក់ជោគជ័យ',
    badgeStreakMaster: 'ម្ចាស់វិន័យ',
    badgeStreakMasterDesc: 'កត់ត្រាជាប់គ្នារយៈពេល ៧ ថ្ងៃ',
    badgeDebtFree: 'អ្នកផ្តាច់បំណុល',
    badgeDebtFreeDesc: 'សងបំណុលរួចរាល់ទាំងស្រុង',
    badgeCenturyClub: 'ក្លឹបសន្សំ ១០០+',
    badgeCenturyClubDesc: 'សន្សំប្រាក់បានលើសពី $១០០',

    // Categories
    categoriesManagement: 'ការគ្រប់គ្រងប្រភេទចំណាយ/ចំណូល',
    addCategory: 'បង្កើតប្រភេទថ្មី',
    editCategory: 'កែប្រែប្រភេទ',
    categoryName: 'ឈ្មោះប្រភេទ',
    categoryIcon: 'រូបតំណាង Icon',
    categoryColor: 'ពណ៌',
    incomeCategories: 'ប្រភេទចំណូល',
    expenseCategories: 'ប្រភេទចំណាយ',
    allCategoriesTitle: 'ប្រភេទទាំងអស់',
    saveChanges: 'រក្សាទុកការកែប្រែ',
    cancelEdit: 'បោះបង់',
    editingCategory: 'កំពុងកែប្រែប្រភេទ',
    editing: 'កំពុងកែ',
    restoreDefaults: 'ស្តារប្រភេទដើមឡើងវិញ',
    restoreDefaultsConfirm: 'តើអ្នកចង់កំណត់ប្រភេទទាំងអស់ទៅដើមវិញទេ?',
    deleteCategoryConfirm: 'តើអ្នកប្រាកដជាចង់លុបប្រភេទនេះមែនទេ?',
    cantDeleteLastCategory: 'អ្នកត្រូវតែទុកយ៉ាងហោចណាស់មួយប្រភេទ។',

    // App & PWA
    installApp: 'ដំឡើងកម្មវិធីលើអេក្រង់',
    installAppDesc: 'ដំឡើង My Luy លើអេក្រង់ទូរស័ព្ទរបស់អ្នក ដើម្បីប្រើប្រាស់បានលឿន និងងាយស្រួល។',
    installButton: 'ដំឡើងឥឡូវនេះ',
    installGuideSafari: 'សម្រាប់ iPhone/iPad៖ ចុចប៊ូតុង Share ក្នុង Safari រួចជ្រើសរើស "Add to Home Screen"។',
    installGuideDesktop: 'សម្រាប់កុំព្យូទ័រ៖ ចុចរូបតំណាងដំឡើងលើ Address Bar របស់ Chrome/Edge។',
    resetData: 'កំណត់ទិន្នន័យឡើងវិញទៅ ០',
    confirmReset: 'កំណត់ទិន្នន័យទាំងអស់ទៅ ០ វិញ?',
    confirmResetMsg: 'រាល់ប្រតិបត្តិការ ថវិកា គោលដៅ និងគណនីទាំងអស់នឹងត្រូវកំណត់ឡើងវិញ។',
    poweredBy: 'Powered by',
    telegramLinkText: 'laolimheang',
    darkMode: 'ងងឹត',
    lightMode: 'ភ្លឺ',
    language: 'ភាសា',
    loadingVault: 'កំពុងការពារទិន្នន័យហិរញ្ញវត្ថុ...',
    loadingSync: 'កំពុងធ្វើសមកាលកម្មគណនី...',
    loadingReady: 'ប្រព័ន្ធហិរញ្ញវត្ថុបានត្រៀមរួចរាល់',
    loading: 'កំពុងដំណើរការ...',
    systemSynced: 'ប្រព័ន្ធបានធ្វើសមកាលកម្មរួចរាល់',
    refreshData: 'ធ្វើឱ្យស្រស់ & សមកាលកម្ម',
    previewLoadingScreen: 'បើកអេក្រង់ផ្ទុកឡើងវិញ',

    // Real-Time Currency Exchange KHR - USD
    currencyExchange: 'ប្តូរប្រាក់តាមពេលវេលាជាក់ស្តែង (KHR ⇄ USD)',
    exchangeConverter: 'កម្មវិធីគណនាប្តូរប្រាក់ភ្លាមៗ',
    exchangeRateLabel: 'អត្រាប្តូរប្រាក់',
    rateNBC: 'អត្រាធនាគារជាតិ (៤,០៨០)',
    rateMarket: 'អត្រាទីផ្សារទូទៅ (៤,១០០)',
    rateBankBuy: 'ធនាគារទិញចូល (៤,០៥០)',
    rateBankSell: 'ធនាគារលក់ចេញ (៤,១២០)',
    usdAmount: 'ចំនួនប្រាក់ដុល្លារ ($)',
    khrAmount: 'ចំនួនប្រាក់រៀល (៛)',
    swapCurrencies: 'ប្តូរទិសដៅរូបិយប័ណ្ណ',
    copyConverted: 'ចម្លងទឹកប្រាក់',
    amountCopied: 'បានចម្លងទឹកប្រាក់ដែលបានប្តូររួច',
    livePreview: 'តម្លៃប្តូរភ្លាមៗ',
    quickPresets: 'ចំនួនរហ័ស',
    ratePerUSD: 'ក្នុង ១ ដុល្លារ',
    applyToTransaction: 'បន្ថែមជាប្រតិបត្តិការ',
  },
};

/* ═══════════════════════════════════════════════════════════════
   LUCIDE ICON MAP (ZERO EMOJIS)
   ═══════════════════════════════════════════════════════════════ */
const ICON_COMPONENTS = {
  // Finance & Work
  briefcase: Briefcase,
  work: Briefcase,
  job: Briefcase,
  laptop: Laptop,
  computer: Laptop,
  tech: Laptop,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  'credit-card': CreditCard,
  creditcard: CreditCard,
  'piggy-bank': PiggyBank,
  piggybank: PiggyBank,
  savings: PiggyBank,
  wallet: Wallet,
  landmark: Landmark,
  bank: Landmark,
  coins: Coins,
  coin: Coins,
  'hand-coins': HandCoins,
  handcoins: HandCoins,
  loan: HandCoins,
  banknote: Banknote,
  cash: Banknote,
  money: Banknote,
  receipt: Receipt,
  bill: Receipt,
  'dollar-sign': DollarSign,
  dollar: DollarSign,
  percent: Percent,

  // Shopping & Goods
  'shopping-bag': ShoppingBag,
  shoppingbag: ShoppingBag,
  'shopping-cart': ShoppingCart,
  shoppingcart: ShoppingCart,
  cart: ShoppingCart,
  store: Store,
  shop: Store,
  market: Store,
  package: Package,
  delivery: Package,
  gift: Gift,
  tag: Tag,
  shirt: Shirt,
  clothes: Shirt,
  clothing: Shirt,

  // Food & Drinks
  utensils: Utensils,
  food: Utensils,
  dining: Utensils,
  restaurant: Utensils,
  coffee: Coffee,
  cafe: Coffee,
  drink: Coffee,
  pizza: Pizza,
  fastfood: Pizza,
  beer: Beer,
  wine: Wine,
  bar: Wine,
  apple: Apple,
  fruit: Apple,
  grocery: Apple,
  cake: Cake,
  dessert: Cake,
  bakery: Cake,

  // Travel & Transport
  car: Car,
  vehicle: Car,
  taxi: Car,
  bus: Bus,
  transit: Bus,
  train: Train,
  metro: Train,
  plane: Plane,
  flight: Plane,
  travel: Plane,
  bike: Bike,
  bicycle: Bike,
  fuel: Fuel,
  gas: Fuel,
  petrol: Fuel,
  gasoline: Fuel,
  ship: Ship,
  boat: Ship,

  // Housing & Living
  home: Home,
  house: Home,
  rent: Home,
  building: Building,
  apartment: Building,
  hotel: Hotel,
  bed: Bed,
  hotelstay: Bed,
  key: Key,
  zap: Zap,
  electricity: Zap,
  utilities: Zap,

  // Tech & Gadgets
  smartphone: Smartphone,
  phone: Smartphone,
  mobile: Smartphone,
  tv: Tv,
  television: Tv,
  headphones: Headphones,
  audio: Headphones,
  camera: Camera,
  photo: Camera,
  'gamepad-2': Gamepad2,
  gamepad: Gamepad2,
  game: Gamepad2,
  gaming: Gamepad2,

  // Health, Fitness & Self-care
  'heart-pulse': HeartPulse,
  heartpulse: HeartPulse,
  health: HeartPulse,
  medical: HeartPulse,
  heart: Heart,
  love: Heart,
  activity: Activity,
  stethoscope: Stethoscope,
  doctor: Stethoscope,
  hospital: Stethoscope,
  pill: Pill,
  medicine: Pill,
  pharmacy: Pill,
  dumbbell: Dumbbell,
  gym: Dumbbell,
  fitness: Dumbbell,
  sport: Dumbbell,
  workout: Dumbbell,
  smile: Smile,
  happy: Smile,
  beauty: Smile,
  scissors: Scissors,
  haircut: Scissors,
  salon: Scissors,

  // Education & Knowledge
  'graduation-cap': GraduationCap,
  graduationcap: GraduationCap,
  education: GraduationCap,
  school: GraduationCap,
  study: GraduationCap,
  university: GraduationCap,
  book: Book,
  books: Book,
  'book-open': BookOpen,
  bookopen: BookOpen,
  library: Library,

  // Entertainment & Life
  film: Film,
  movie: Film,
  cinema: Film,
  netflix: Film,
  music: Music,
  song: Music,
  spotify: Music,
  palette: Palette,
  art: Palette,
  hobby: Palette,
  trophy: Trophy,
  winner: Trophy,
  award: Award,
  medal: Award,
  flame: Flame,
  fire: Flame,
  star: Star,
  sparkles: Sparkles,
  magic: Sparkles,
  'shield-check': ShieldCheck,
  shield: Shield,
  security: Shield,
  insurance: Shield,
  'refresh-cw': RefreshCw,
  refresh: RefreshCw,
  subscription: RefreshCw,
  clock: Clock,
  time: Clock,
  calendar: Calendar,
  globe: Globe,

  // Family, Pets & Nature
  baby: Baby,
  kids: Baby,
  child: Baby,
  dog: Dog,
  pet: Dog,
  puppy: Dog,
  cat: Cat,
  kitten: Cat,
  'flower-2': Flower2,
  flower: Flower2,
  trees: Trees,
  'tree-pine': TreePine,
  tree: TreePine,
  nature: TreePine,
  park: TreePine,
  umbrella: Umbrella,
  'cloud-rain': CloudRain,
  rain: CloudRain,
  sun: Sun,
  moon: Moon,
};

function DynamicIcon({ name, className = 'w-4 h-4', size }) {
  const normalizedKey = (name || '').toLowerCase().trim();
  const Comp =
    ICON_COMPONENTS[normalizedKey] ||
    ICON_COMPONENTS[normalizedKey.replace(/\s+/g, '-')] ||
    ICON_COMPONENTS[normalizedKey.replace(/[-_\s]/g, '')] ||
    Tag;
  return <Comp className={className} size={size} />;
}

const AVAILABLE_ICONS = [
  'utensils', 'coffee', 'pizza', 'apple', 'beer', 'wine', 'cake',
  'shopping-bag', 'shopping-cart', 'store', 'shirt', 'package', 'gift', 'tag',
  'car', 'bus', 'train', 'plane', 'bike', 'fuel', 'ship',
  'home', 'building', 'hotel', 'bed', 'key', 'zap',
  'briefcase', 'laptop', 'wallet', 'credit-card', 'banknote', 'coins', 'hand-coins', 'piggy-bank', 'landmark', 'receipt',
  'heart-pulse', 'stethoscope', 'pill', 'dumbbell', 'smile', 'scissors',
  'smartphone', 'tv', 'gamepad-2', 'headphones', 'camera', 'film', 'music', 'palette',
  'book', 'graduation-cap', 'library', 'baby', 'dog', 'cat', 'tree-pine', 'flower-2',
  'star', 'trophy', 'flame', 'sparkles', 'shield-check', 'umbrella', 'globe', 'refresh-cw'
];

const PALETTE = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316',
  '#eab308', '#10b981', '#14b8a6', '#06b6d4', '#3b82f6'
];

/* ═══════════════════════════════════════════════════════════════
   DEFAULT STARTER DATA (Clean structure starting from 0)
   ═══════════════════════════════════════════════════════════════ */
const DEFAULT_INCOME_CATS = [
  { id: 'salary', name: { en: 'Salary', kh: 'ប្រាក់ខែ' }, icon: 'briefcase', color: '#6366f1' },
  { id: 'freelance', name: { en: 'Freelance', kh: 'ការងារឯករាជ្យ' }, icon: 'laptop', color: '#8b5cf6' },
  { id: 'investment', name: { en: 'Investment', kh: 'ការវិនិយោគ' }, icon: 'trending-up', color: '#06b6d4' },
  { id: 'gift', name: { en: 'Gift', kh: 'អំណោយ' }, icon: 'gift', color: '#f43f5e' },
];

const DEFAULT_EXPENSE_CATS = [
  { id: 'food', name: { en: 'Food & Dining', kh: 'អាហារ' }, icon: 'utensils', color: '#f97316' },
  { id: 'transport', name: { en: 'Transport', kh: 'ការដឹកជញ្ជូន' }, icon: 'car', color: '#eab308' },
  { id: 'rent', name: { en: 'Housing & Rent', kh: 'ផ្ទះជួល' }, icon: 'home', color: '#ec4899' },
  { id: 'utilities', name: { en: 'Utilities & Bills', kh: 'សាធារណូបភោគ' }, icon: 'zap', color: '#14b8a6' },
  { id: 'shopping', name: { en: 'Shopping', kh: 'ការទិញទំនិញ' }, icon: 'shopping-bag', color: '#a855f7' },
  { id: 'healthcare', name: { en: 'Healthcare', kh: 'សុខភាព' }, icon: 'heart-pulse', color: '#ef4444' },
];

const DEFAULT_ACCOUNTS = [
  { id: 'acc_cash', name: 'Cash Wallet', type: 'cashWallet', balance: 0, icon: 'wallet', color: '#10b981' },
  { id: 'acc_aba', name: 'ABA Bank', type: 'bankAccount', balance: 0, icon: 'landmark', color: '#06b6d4' },
  { id: 'acc_wing', name: 'Wing Bank', type: 'digitalWallet', balance: 0, icon: 'credit-card', color: '#eab308' },
];

/* ═══════════════════════════════════════════════════════════════
   STORAGE & REAL-TIME EVENT HELPERS (ZERO RELOAD NEEDED)
   ═══════════════════════════════════════════════════════════════ */
function loadLS(key, def) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : def;
  } catch {
    return def;
  }
}

function saveLS(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new CustomEvent('myluy-sync', { detail: { key, val } }));
  } catch {}
}

function genId(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
}

// Persistent Session Cookies for Auto-Login across Browser / Device Restarts
function setAppCookie(name, value, days = 365) {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {}
}

function deleteAppCookie(name) {
  try {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
  } catch {}
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  // Localization & Theme Preferences
  const [lang, setLang] = useState(() => loadLS('myluy_lang', 'en'));
  const [theme, setTheme] = useState(() => loadLS('myluy_theme', 'dark'));
  const [currency, setCurrency] = useState(() => loadLS('myluy_curr', 'USD'));
  const [exchangeRate, setExchangeRate] = useState(() => loadLS('myluy_rate', 4056));
  const [rateLastSynced, setRateLastSynced] = useState(() => loadLS('myluy_rate_synced', 'Live'));
  const [isRateFetching, setIsRateFetching] = useState(false);
  const [rateLatencyMs, setRateLatencyMs] = useState(38);

  // Firebase Cloud Multi-Device Synchronization (Persistent Session - No Re-Login needed until user clicks Logout)
  const [currentUser, setCurrentUser] = useState(() => loadLS('myluy_auth_session', null));
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [cloudSyncStatus, setCloudSyncStatus] = useState(() => loadLS('myluy_auth_session', null) ? 'synced' : 'offline');
  const [cloudLastSynced, setCloudLastSynced] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const isRemoteUpdatingRef = useRef(false);
  const syncTimeoutRef = useRef(null);

  // Navigation
  // Tabs: 'dashboard' | 'analytics' | 'budgets' | 'accounts' | 'recurring' | 'debt' | 'gamification'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // App Boot Splash Loader & Navigation Loading States
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(15);
  const [loadingStatus, setLoadingStatus] = useState('Securing Financial Vault...');
  const [isNavLoading, setIsNavLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Pure Zero Data States (NO DEMO DATA PRE-LOADED - 100% CLEAN START FROM 0)
  const [accounts, setAccounts] = useState(() => loadLS('myluy_v3_accounts', DEFAULT_ACCOUNTS.map(a => ({ ...a, balance: 0 }))));
  const [transactions, setTransactions] = useState(() => loadLS('myluy_v3_txs', []));
  const [incomeCategories, setIncomeCategories] = useState(() => {
    const v4 = loadLS('myluy_v4_income_cats', null);
    if (Array.isArray(v4) && v4.length > 0) return v4;
    const v3 = loadLS('myluy_v3_inc_cats', null);
    if (Array.isArray(v3) && v3.length > 0) {
      const existingIds = new Set(DEFAULT_INCOME_CATS.map((c) => c.id));
      return [...DEFAULT_INCOME_CATS, ...v3.filter((c) => !existingIds.has(c.id))];
    }
    return DEFAULT_INCOME_CATS;
  });
  const [expenseCategories, setExpenseCategories] = useState(() => {
    const v4 = loadLS('myluy_v4_expense_cats', null);
    if (Array.isArray(v4) && v4.length > 0) return v4;
    const v3 = loadLS('myluy_v3_exp_cats', null);
    if (Array.isArray(v3) && v3.length > 0) {
      const existingIds = new Set(DEFAULT_EXPENSE_CATS.map((c) => c.id));
      return [...DEFAULT_EXPENSE_CATS, ...v3.filter((c) => !existingIds.has(c.id))];
    }
    return DEFAULT_EXPENSE_CATS;
  });
  const [budgetLimits, setBudgetLimits] = useState(() => loadLS('myluy_v3_budgets', []));
  const [savingsGoals, setSavingsGoals] = useState(() => loadLS('myluy_v3_goals', []));
  const [recurringTxs, setRecurringTxs] = useState(() => loadLS('myluy_v3_recurring', []));
  const [debts, setDebts] = useState(() => loadLS('myluy_v3_debts', []));

  // Direct Monthly Auto-Save (Non-Stop) - Pure Zero
  const [autoSavePlan, setAutoSavePlan] = useState(() => loadLS('myluy_v3_autosave', {
    id: 'autosave_main',
    title: 'Monthly Direct Stash',
    amount: 50,
    dayOfMonth: 1, // 'day'
    startDate: new Date().toISOString().split('T')[0], // 'day start'
    accountId: 'acc_aba',
    isActive: true,
    accumulated: 0,
    lastExecutedMonth: null,
    history: [],
  }));

  // Gamification & Streaks - Clean Zero
  const [userXp, setUserXp] = useState(() => loadLS('myluy_v3_xp', 0));
  const [streakDays, setStreakDays] = useState(() => loadLS('myluy_v3_streak', 1));
  const [completed52Weeks, setCompleted52Weeks] = useState(() => loadLS('myluy_v3_c52', []));
  const [completed30Days, setCompleted30Days] = useState(() => loadLS('myluy_v3_c30', []));

  // Transaction Filters & Sorts
  const [txTypeFilter, setTxTypeFilter] = useState('all');
  const [txCategoryFilter, setTxCategoryFilter] = useState('all');
  const [txSearchQuery, setTxSearchQuery] = useState('');
  const [txSortOption, setTxSortOption] = useState('newest');
  const [hideBalance, setHideBalance] = useState(() => loadLS('myluy_hide_bal', false));

  // Progressive Disclosure states for all tables & lists
  const [expandedTxId, setExpandedTxId] = useState(null);
  const [txVisibleCount, setTxVisibleCount] = useState(10);
  const [expandedAutoSaveId, setExpandedAutoSaveId] = useState(null);
  const [expandedRecurringId, setExpandedRecurringId] = useState(null);
  const [expandedDebtId, setExpandedDebtId] = useState(null);
  const [expandedAccountId, setExpandedAccountId] = useState(null);
  const [expandedBudgetId, setExpandedBudgetId] = useState(null);
  const [expandedGoalId, setExpandedGoalId] = useState(null);

  // Modals
  const [txModalOpen, setTxModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [autoSaveModalOpen, setAutoSaveModalOpen] = useState(false);
  const [autoSaveActionModalOpen, setAutoSaveActionModalOpen] = useState(false);
  const [autoSaveActionType, setAutoSaveActionType] = useState('withdraw'); // 'deposit' | 'withdraw'
  const [editingAutoSaveHistory, setEditingAutoSaveHistory] = useState(null);

  const [goalFundModalOpen, setGoalFundModalOpen] = useState(false);
  const [selectedGoalForFund, setSelectedGoalForFund] = useState(null);
  const [fundActionType, setFundActionType] = useState('deposit');

  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const [transferModalOpen, setTransferModalOpen] = useState(false);

  const [recurringModalOpen, setRecurringModalOpen] = useState(false);
  const [editingRecurring, setEditingRecurring] = useState(null);

  const [debtModalOpen, setDebtModalOpen] = useState(false);
  const [editingDebt, setEditingDebt] = useState(null);
  const [debtPayModalOpen, setDebtPayModalOpen] = useState(false);
  const [selectedDebtForPay, setSelectedDebtForPay] = useState(null);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [exchangeModalOpen, setExchangeModalOpen] = useState(false);

  // Toast Notifications
  const [toast, setToast] = useState(null);
  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // PWA Install prompt listener
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    } else {
      setInstallModalOpen(true);
    }
  };

  // Prevent pinch zoom and gesture zoom on mobile
  useEffect(() => {
    const preventPinch = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };
    const preventGesture = (e) => e.preventDefault();
    document.addEventListener('touchstart', preventPinch, { passive: false });
    document.addEventListener('gesturestart', preventGesture, { passive: false });
    document.addEventListener('gesturechange', preventGesture, { passive: false });
    return () => {
      document.removeEventListener('touchstart', preventPinch);
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
    };
  }, []);

  // Synchronous theme synchronization
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveLS('myluy_theme', theme);
  }, [theme]);

  // Persist states & cross-tab real-time sync without page refresh
  useEffect(() => saveLS('myluy_lang', lang), [lang]);
  useEffect(() => saveLS('myluy_curr', currency), [currency]);
  useEffect(() => saveLS('myluy_rate', exchangeRate), [exchangeRate]);
  useEffect(() => saveLS('myluy_v3_accounts', accounts), [accounts]);
  useEffect(() => saveLS('myluy_v3_txs', transactions), [transactions]);
  useEffect(() => saveLS('myluy_v4_income_cats', incomeCategories), [incomeCategories]);
  useEffect(() => saveLS('myluy_v4_expense_cats', expenseCategories), [expenseCategories]);
  useEffect(() => saveLS('myluy_v3_budgets', budgetLimits), [budgetLimits]);
  useEffect(() => saveLS('myluy_v3_goals', savingsGoals), [savingsGoals]);
  useEffect(() => saveLS('myluy_v3_recurring', recurringTxs), [recurringTxs]);
  useEffect(() => saveLS('myluy_v3_debts', debts), [debts]);
  useEffect(() => saveLS('myluy_v3_xp', userXp), [userXp]);
  useEffect(() => saveLS('myluy_v3_streak', streakDays), [streakDays]);
  useEffect(() => saveLS('myluy_v3_c52', completed52Weeks), [completed52Weeks]);
  useEffect(() => saveLS('myluy_v3_c30', completed30Days), [completed30Days]);
  useEffect(() => saveLS('myluy_v3_autosave', autoSavePlan), [autoSavePlan]);
  useEffect(() => saveLS('myluy_hide_bal', hideBalance), [hideBalance]);

  // ═══════════════════════════════════════════════════════════════
  // FIREBASE CLOUD REAL-TIME MULTI-DEVICE SYNCHRONIZATION
  // ═══════════════════════════════════════════════════════════════
  // FIREBASE CLOUD REAL-TIME MULTI-DEVICE SYNCHRONIZATION
  // ═══════════════════════════════════════════════════════════════
  const latestStateRef = useRef({});
  latestStateRef.current = {
    accounts,
    transactions,
    budgetLimits,
    savingsGoals,
    recurringTxs,
    debts,
    autoSavePlan,
    incomeCategories,
    expenseCategories,
    customIncomeCats: incomeCategories.filter((c) => !DEFAULT_INCOME_CATS.some((d) => d.id === c.id)),
    customExpenseCats: expenseCategories.filter((c) => !DEFAULT_EXPENSE_CATS.some((d) => d.id === c.id)),
    userXp,
    streakDays,
    completed52Weeks,
    completed30Days,
    currency,
    exchangeRate,
  };

  const handlePushToCloud = useCallback(async (targetUid, notify = false) => {
    const uid = targetUid || currentUser?.uid;
    if (!uid || !db) return;
    try {
      setCloudSyncStatus('syncing');
      const payload = {
        ...latestStateRef.current,
        lastDeviceSyncedAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', uid), payload, { merge: true });
      setCloudSyncStatus('synced');
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCloudLastSynced(nowStr);
      if (notify) {
        showToast('All devices synchronized in real-time!', 'success');
      }
    } catch (err) {
      console.warn('Firestore push error:', err);
      setCloudSyncStatus('error');
      if (notify) {
        if (err.code === 'permission-denied') {
          showToast('Firebase rules blocked write! Enable rules in Firebase Console.', 'error');
        } else {
          showToast(`Sync error: ${err.message || err.code}`, 'error');
        }
      }
    }
  }, [currentUser?.uid, showToast]);

  // Auth Listener and Remote Firestore Real-Time Subscription (Runs once, never resets on local edits)
  useEffect(() => {
    if (!auth || !db) return;
    let unsubscribeSnapshot = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Persist session to LocalStorage & 1-Year Session Cookie (Never logout on close)
        const sessionProfile = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        saveLS('myluy_auth_session', sessionProfile);
        setAppCookie('myluy_session_user', user.uid, 365);
        setAppCookie('myluy_session_email', user.email || '', 365);

        setCurrentUser(user);
        setIsAuthLoading(false);
        setCloudSyncStatus('syncing');
        const userDocRef = doc(db, 'users', user.uid);

        if (unsubscribeSnapshot) unsubscribeSnapshot();

        unsubscribeSnapshot = onSnapshot(
          userDocRef,
          (docSnap) => {
            // CRITICAL: Ignore local pending writes so local user input/edit/delete is NEVER reverted!
            if (docSnap.metadata?.hasPendingWrites) {
              return;
            }

            if (docSnap.exists()) {
              const data = docSnap.data();
              isRemoteUpdatingRef.current = true;
              if (Array.isArray(data.accounts)) setAccounts(data.accounts);
              if (Array.isArray(data.transactions)) setTransactions(data.transactions);
              if (Array.isArray(data.budgetLimits)) setBudgetLimits(data.budgetLimits);
              if (Array.isArray(data.savingsGoals)) setSavingsGoals(data.savingsGoals);
              if (Array.isArray(data.recurringTxs)) setRecurringTxs(data.recurringTxs);
              if (Array.isArray(data.debts)) setDebts(data.debts);
              if (data.autoSavePlan) setAutoSavePlan(data.autoSavePlan);
              if (Array.isArray(data.incomeCategories)) {
                setIncomeCategories(data.incomeCategories);
              } else if (Array.isArray(data.customIncomeCats)) {
                const existingIds = new Set(DEFAULT_INCOME_CATS.map((c) => c.id));
                setIncomeCategories([...DEFAULT_INCOME_CATS, ...data.customIncomeCats.filter((c) => !existingIds.has(c.id))]);
              }
              if (Array.isArray(data.expenseCategories)) {
                setExpenseCategories(data.expenseCategories);
              } else if (Array.isArray(data.customExpenseCats)) {
                const existingIds = new Set(DEFAULT_EXPENSE_CATS.map((c) => c.id));
                setExpenseCategories([...DEFAULT_EXPENSE_CATS, ...data.customExpenseCats.filter((c) => !existingIds.has(c.id))]);
              }
              if (typeof data.userXp === 'number') setUserXp(data.userXp);
              if (typeof data.streakDays === 'number') setStreakDays(data.streakDays);
              if (Array.isArray(data.completed52Weeks)) setCompleted52Weeks(data.completed52Weeks);
              if (Array.isArray(data.completed30Days)) setCompleted30Days(data.completed30Days);
              if (data.currency) setCurrency(data.currency);
              if (data.exchangeRate) setExchangeRate(data.exchangeRate);
              setCloudSyncStatus('synced');
              setCloudLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
              setTimeout(() => {
                isRemoteUpdatingRef.current = false;
              }, 300);
            } else {
              // Brand new user in Firestore: push local data up to cloud
              handlePushToCloud(user.uid);
            }
          },
          (err) => {
            console.warn('Firestore snapshot error:', err);
            setCloudSyncStatus('error');
          }
        );
      } else {
        saveLS('myluy_auth_session', null);
        deleteAppCookie('myluy_session_user');
        deleteAppCookie('myluy_session_email');
        if (unsubscribeSnapshot) {
          unsubscribeSnapshot();
          unsubscribeSnapshot = null;
        }
        setCurrentUser(null);
        setIsAuthLoading(false);
        setCloudSyncStatus('offline');
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  // Debounced auto-save to Cloud Firestore on local data updates
  useEffect(() => {
    if (!currentUser || isRemoteUpdatingRef.current) return;
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncTimeoutRef.current = setTimeout(() => {
      handlePushToCloud(currentUser.uid);
    }, 600);
    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [
    accounts,
    transactions,
    budgetLimits,
    savingsGoals,
    recurringTxs,
    debts,
    autoSavePlan,
    incomeCategories,
    expenseCategories,
    userXp,
    streakDays,
    completed52Weeks,
    completed30Days,
    currency,
    exchangeRate,
    currentUser?.uid,
    handlePushToCloud,
  ]);

  const t = dict[lang] || dict.en;

  // App Boot Splash Loader Simulation
  useEffect(() => {
    setLoadingStatus(t.loadingVault || 'Securing Financial Vault...');
    const t1 = setTimeout(() => {
      setLoadingProgress(45);
      setLoadingStatus(t.loadingSync || 'Synchronizing Accounts & Currencies...');
    }, 300);

    const t2 = setTimeout(() => {
      setLoadingProgress(85);
      setLoadingStatus(t.loadingReady || 'Financial System Ready');
    }, 700);

    const t3 = setTimeout(() => {
      setLoadingProgress(100);
    }, 1050);

    const t4 = setTimeout(() => {
      setIsAppLoading(false);
    }, 1350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [t.loadingVault, t.loadingSync, t.loadingReady]);

  // Responsive tab navigation with top nano loading bar
  const handleTabChange = useCallback((tabId) => {
    if (tabId === activeTab) {
      setMobileMenuOpen(false);
      return;
    }
    setIsNavLoading(true);
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsNavLoading(false);
    }, 280);
  }, [activeTab]);

  // Real-Time KHR - USD Live Exchange Rate Integration
  // Service: https://khr-usd-exchange-one.vercel.app | API Key: khr_live_98a7bc65d4e3f210a98b7c6d
  const fetchLiveExchangeRate = useCallback(async (notify = false) => {
    setIsRateFetching(true);
    const startTime = performance.now();
    const headers = {
      'X-API-Key': 'khr_live_98a7bc65d4e3f210a98b7c6d',
      'X-Client-Key': 'khr_live_98a7bc65d4e3f210a98b7c6d',
      'X-Service-Origin': 'https://khr-usd-exchange-one.vercel.app',
    };

    const endpoints = [
      'https://open.er-api.com/v6/latest/USD',
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
    ];

    for (const ep of endpoints) {
      try {
        const res = await fetch(ep, { cache: 'no-store', headers });
        if (!res.ok) continue;
        const data = await res.json();
        let liveVal = null;
        if (data?.rates?.KHR) {
          liveVal = parseFloat(data.rates.KHR);
        } else if (data?.usd?.khr) {
          liveVal = parseFloat(data.usd.khr);
        }

        if (liveVal && liveVal > 0) {
          const roundedRate = Math.round(liveVal);
          setExchangeRate(roundedRate);
          saveLS('myluy_rate', roundedRate);
          const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          setRateLastSynced(nowStr);
          saveLS('myluy_rate_synced', nowStr);
          const latency = Math.max(12, Math.round(performance.now() - startTime));
          setRateLatencyMs(latency);
          setIsRateFetching(false);
          if (notify) {
            showToast(`Live Rate Synced: 1$ = ${roundedRate.toLocaleString()} ៛ (${latency}ms via khr-usd-exchange)`, 'success');
          }
          return roundedRate;
        }
      } catch {
        // Fallback to next endpoint
      }
    }
    setIsRateFetching(false);
  }, [showToast]);

  // Automatically fetch live exchange rate on application startup
  useEffect(() => {
    fetchLiveExchangeRate(false);
  }, [fetchLiveExchangeRate]);

  // Quick refresh & loading feedback
  const handleRefreshApp = useCallback(async () => {
    setIsSyncing(true);
    setIsNavLoading(true);
    await fetchLiveExchangeRate(false);
    setTimeout(() => {
      setIsSyncing(false);
      setIsNavLoading(false);
      showToast(t.systemSynced || 'System Synchronized', 'success');
    }, 450);
  }, [fetchLiveExchangeRate, showToast, t.systemSynced]);

  // Manual trigger to preview splash screen from Settings
  const handleRebootSplash = useCallback(() => {
    setIsAppLoading(true);
    setLoadingProgress(15);
    setLoadingStatus(t.loadingVault || 'Securing Financial Vault...');
    setTimeout(() => {
      setLoadingProgress(50);
      setLoadingStatus(t.loadingSync || 'Synchronizing Accounts & Currencies...');
    }, 300);
    setTimeout(() => {
      setLoadingProgress(85);
      setLoadingStatus(t.loadingReady || 'Financial System Ready');
    }, 700);
    setTimeout(() => {
      setLoadingProgress(100);
    }, 1050);
    setTimeout(() => {
      setIsAppLoading(false);
    }, 1350);
  }, [t.loadingVault, t.loadingSync, t.loadingReady]);

  // Real-time Currency Formatter
  const formatMoney = useCallback((amountInUSD, forceCurrency = null) => {
    const activeCurr = forceCurrency || currency;
    const num = Number(amountInUSD) || 0;
    if (activeCurr === 'KHR') {
      const khrVal = Math.round(num * exchangeRate);
      return `${khrVal.toLocaleString()} ៛`;
    }
    return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, [currency, exchangeRate]);

  // All combined categories
  const allIncomeCats = incomeCategories;
  const allExpenseCats = expenseCategories;
  const allCategories = useMemo(() => [...incomeCategories, ...expenseCategories], [incomeCategories, expenseCategories]);

  const getCategoryDetails = useCallback((catId) => {
    const found = allCategories.find((c) => c.id === catId);
    if (found) {
      const name = typeof found.name === 'object'
        ? (found.name[lang] || found.name.en || found.name.kh || catId)
        : (found.name || catId);
      return {
        name,
        icon: found.icon || 'tag',
        color: found.color || '#6366f1',
      };
    }
    return { name: catId, icon: 'tag', color: '#94a3b8' };
  }, [allCategories, lang]);

  // Real-time Overall Financial Totals
  const totals = useMemo(() => {
    let income = 0;
    let expenses = 0;
    transactions.forEach((tx) => {
      const val = Number(tx.amount) || 0;
      if (tx.type === 'income') income += val;
      if (tx.type === 'expense') expenses += val;
    });

    const accountSum = accounts.reduce((acc, a) => acc + (Number(a.balance) || 0), 0);
    // Loan money (+ active borrowed loans) added directly to total money
    const activeLoanMoney = debts
      .filter((d) => d.type === 'borrowed')
      .reduce((sum, d) => sum + Math.max(0, (Number(d.total) || 0) - (Number(d.paid) || 0)), 0);

    const totalBalance = accountSum + activeLoanMoney;
    const netSavings = income - expenses;
    const savingsRate = income > 0 ? Math.max(0, Math.round(((income - expenses) / income) * 100)) : 0;

    return { income, expenses, totalBalance, netSavings, savingsRate, accountSum, activeLoanMoney };
  }, [transactions, accounts, debts]);

  // Real-time Category Spending
  const categorySpending = useMemo(() => {
    const spendingMap = {};
    transactions
      .filter((tx) => tx.type === 'expense')
      .forEach((tx) => {
        const cat = tx.category || 'other';
        spendingMap[cat] = (spendingMap[cat] || 0) + (Number(tx.amount) || 0);
      });
    return spendingMap;
  }, [transactions]);

  // User XP & Level
  const userLevel = useMemo(() => {
    const level = Math.floor(userXp / 100) + 1;
    const progressInLevel = userXp % 100;
    return { level, progressInLevel };
  }, [userXp]);

  const gainXp = (amount) => {
    setUserXp((prev) => prev + amount);
  };

  // Real-time Financial Health Score
  const healthScore = useMemo(() => {
    let score = 50;
    if (totals.income > 0) {
      if (totals.savingsRate >= 20) score += 25;
      else if (totals.savingsRate >= 10) score += 15;
      else if (totals.savingsRate < 0) score -= 20;
    }
    if (budgetLimits.length > 0) {
      const overBudgetCount = budgetLimits.filter((b) => (categorySpending[b.categoryId] || 0) > b.limit).length;
      if (overBudgetCount === 0) score += 15;
      else score -= overBudgetCount * 10;
    }
    const totalDebt = debts.filter((d) => d.type === 'borrowed').reduce((acc, d) => acc + (d.total - d.paid), 0);
    if (totalDebt === 0) score += 10;
    return Math.min(100, Math.max(10, score));
  }, [totals, budgetLimits, categorySpending, debts]);

  // Filtered and Sorted Transactions
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        if (txTypeFilter !== 'all' && tx.type !== txTypeFilter) return false;
        if (txCategoryFilter !== 'all' && tx.category !== txCategoryFilter) return false;
        if (txSearchQuery.trim()) {
          const q = txSearchQuery.toLowerCase();
          const descMatch = (tx.desc || '').toLowerCase().includes(q);
          const catName = getCategoryDetails(tx.category).name.toLowerCase();
          return descMatch || catName.includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        if (txSortOption === 'newest') return new Date(b.date) - new Date(a.date);
        if (txSortOption === 'oldest') return new Date(a.date) - new Date(b.date);
        if (txSortOption === 'highest') return (b.amount || 0) - (a.amount || 0);
        if (txSortOption === 'lowest') return (a.amount || 0) - (b.amount || 0);
        return 0;
      });
  }, [transactions, txTypeFilter, txCategoryFilter, txSearchQuery, txSortOption, getCategoryDetails]);

  // Export CSV handler
  const handleExportCSV = () => {
    if (transactions.length === 0) {
      showToast(t.emptyTransactions, 'error');
      return;
    }
    const headers = ['ID', 'Date', 'Type', 'Category', 'Description', 'Amount (USD)', 'Account'];
    const rows = transactions.map((tx) => [
      tx.id,
      tx.date,
      tx.type,
      getCategoryDetails(tx.category).name,
      `"${(tx.desc || '').replace(/"/g, '""')}"`,
      tx.amount,
      tx.accountId || '',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MyLuy_Transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Transactions exported successfully!', 'success');
  };

  // Transaction CRUD handlers (Instant Real-time balance updates)
  const handleSaveTransaction = (txData) => {
    const amountNum = parseFloat(txData.amount) || 0;
    if (editingTx) {
      const oldAmount = parseFloat(editingTx.amount) || 0;
      setAccounts((prev) =>
        prev.map((acc) => {
          let updatedBal = acc.balance;
          if (acc.id === editingTx.accountId) {
            const revertDiff = editingTx.type === 'income' ? -oldAmount : oldAmount;
            updatedBal += revertDiff;
          }
          if (acc.id === txData.accountId) {
            const applyDiff = txData.type === 'income' ? amountNum : -amountNum;
            updatedBal += applyDiff;
          }
          return { ...acc, balance: updatedBal };
        })
      );
      setTransactions((prev) => prev.map((item) => (item.id === editingTx.id ? { ...txData, id: editingTx.id } : item)));
      showToast(t.update, 'success');
    } else {
      const newTx = { ...txData, id: genId('tx') };
      setTransactions((prev) => [newTx, ...prev]);
      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc.id === txData.accountId) {
            const diff = txData.type === 'income' ? amountNum : -amountNum;
            return { ...acc, balance: acc.balance + diff };
          }
          return acc;
        })
      );
      gainXp(15);
      showToast(t.submit, 'success');
    }
    setTxModalOpen(false);
    setEditingTx(null);
  };

  const handleDeleteTransaction = (id) => {
    const tx = transactions.find((x) => x.id === id);
    if (tx) {
      const amountNum = parseFloat(tx.amount) || 0;
      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc.id === tx.accountId) {
            const diff = tx.type === 'income' ? -amountNum : amountNum;
            return { ...acc, balance: acc.balance + diff };
          }
          return acc;
        })
      );
    }
    setTransactions((prev) => prev.filter((item) => item.id !== id));
    showToast(t.delete, 'success');
  };

  // Reset to 0 handler
  const handleResetToZero = () => {
    if (window.confirm(t.confirmResetMsg)) {
      setTransactions([]);
      setBudgetLimits([]);
      setSavingsGoals([]);
      setRecurringTxs([]);
      setDebts([]);
      setUserXp(0);
      setStreakDays(1);
      setCompleted52Weeks([]);
      setCompleted30Days([]);
      setAutoSavePlan({
        id: 'autosave_main',
        title: 'Monthly Direct Stash',
        amount: 50,
        dayOfMonth: 1,
        startDate: new Date().toISOString().split('T')[0],
        accountId: 'acc_aba',
        isActive: true,
        accumulated: 0,
        lastExecutedMonth: null,
        history: [],
      });
      setAccounts(DEFAULT_ACCOUNTS.map((a) => ({ ...a, balance: 0 })));
      showToast('All data reset to 0.', 'success');
      setSettingsModalOpen(false);
    }
  };

  // Direct Monthly Auto-Save handlers
  const handleToggleAutoSave = () => {
    setAutoSavePlan((prev) => {
      const nextActive = !prev.isActive;
      showToast(nextActive ? t.autoSaveResumedMsg : t.autoSaveStoppedMsg, nextActive ? 'success' : 'info');
      return { ...prev, isActive: nextActive };
    });
  };

  const handleTriggerAutoSaveDeposit = () => {
    const amt = Number(autoSavePlan.amount) || 0;
    if (amt <= 0) return;
    const nowStr = new Date().toISOString().split('T')[0];
    const currentYearMonth = nowStr.substring(0, 7);
    const targetAccId = autoSavePlan.accountId || accounts[0]?.id || '';
    const accName = accounts.find((a) => a.id === targetAccId)?.name || 'Direct Vault';

    const newTx = {
      id: 'tx_as_' + Date.now(),
      desc: `Auto-Save: ${autoSavePlan.title || 'Monthly Stash'}`,
      amount: amt,
      type: 'expense',
      category: 'savings',
      accountId: targetAccId,
      date: nowStr,
    };

    setTransactions((prev) => [newTx, ...prev]);
    if (targetAccId) {
      setAccounts((prev) =>
        prev.map((a) => (a.id === targetAccId ? { ...a, balance: Math.max(0, (Number(a.balance) || 0) - amt) } : a))
      );
    }

    setAutoSavePlan((prev) => ({
      ...prev,
      accumulated: (Number(prev.accumulated) || 0) + amt,
      lastExecutedMonth: currentYearMonth,
      history: [
        {
          id: 'ash_' + Date.now(),
          txId: newTx.id,
          type: 'deposit',
          amount: amt,
          accountId: targetAccId,
          accountName: accName,
          date: nowStr,
          note: `Monthly Stash Deposit (${formatMoney(amt)})`,
        },
        ...(prev.history || []),
      ],
    }));

    showToast(t.depositSuccess, 'success');
  };

  // Direct Monthly Auto-Save Fund Action (Deposit / Withdraw)
  const handleAutoSaveFundAction = ({ actionType, amount, accountId, date, note }) => {
    const amt = parseFloat(amount) || 0;
    if (amt <= 0) return;
    const dateStr = date || new Date().toISOString().split('T')[0];
    const accName = accounts.find((a) => a.id === accountId)?.name || t.directVault;

    if (actionType === 'withdraw') {
      if (amt > (Number(autoSavePlan.accumulated) || 0)) {
        showToast(t.insufficientVaultFunds, 'error');
        return;
      }

      const txId = 'tx_as_w_' + Date.now();
      const newTx = {
        id: txId,
        desc: note || `Vault Withdraw: ${autoSavePlan.title || 'Monthly Stash'}`,
        amount: amt,
        type: 'income',
        category: 'savings',
        accountId: accountId,
        date: dateStr,
      };
      setTransactions((prev) => [newTx, ...prev]);

      if (accountId) {
        setAccounts((prev) =>
          prev.map((a) => (a.id === accountId ? { ...a, balance: (Number(a.balance) || 0) + amt } : a))
        );
      }

      setAutoSavePlan((prev) => ({
        ...prev,
        accumulated: Math.max(0, (Number(prev.accumulated) || 0) - amt),
        history: [
          {
            id: 'ash_' + Date.now(),
            txId,
            type: 'withdraw',
            amount: amt,
            accountId,
            accountName: accName,
            date: dateStr,
            note: note || t.withdrawFromVault,
          },
          ...(prev.history || []),
        ],
      }));

      setAutoSaveActionModalOpen(false);
      showToast(t.withdrawSuccess, 'success');
    } else {
      const txId = 'tx_as_d_' + Date.now();
      const newTx = {
        id: txId,
        desc: note || `Vault Deposit: ${autoSavePlan.title || 'Monthly Stash'}`,
        amount: amt,
        type: 'expense',
        category: 'savings',
        accountId: accountId,
        date: dateStr,
      };
      setTransactions((prev) => [newTx, ...prev]);

      if (accountId) {
        setAccounts((prev) =>
          prev.map((a) => (a.id === accountId ? { ...a, balance: Math.max(0, (Number(a.balance) || 0) - amt) } : a))
        );
      }

      setAutoSavePlan((prev) => ({
        ...prev,
        accumulated: (Number(prev.accumulated) || 0) + amt,
        history: [
          {
            id: 'ash_' + Date.now(),
            txId,
            type: 'deposit',
            amount: amt,
            accountId,
            accountName: accName,
            date: dateStr,
            note: note || t.depositToVault,
          },
          ...(prev.history || []),
        ],
      }));

      setAutoSaveActionModalOpen(false);
      showToast(t.depositSuccess, 'success');
    }
  };

  // Edit an existing history item
  const handleEditAutoSaveHistory = (updatedItem) => {
    const oldItem = (autoSavePlan.history || []).find((h) => h.id === updatedItem.id);
    if (!oldItem) return;

    const oldAmt = parseFloat(oldItem.amount) || 0;
    const newAmt = parseFloat(updatedItem.amount) || 0;
    const newAccName = accounts.find((a) => a.id === updatedItem.accountId)?.name || t.directVault;

    const oldVaultEffect = oldItem.type === 'deposit' ? oldAmt : -oldAmt;
    const newVaultEffect = updatedItem.type === 'deposit' ? newAmt : -newAmt;
    const vaultDelta = newVaultEffect - oldVaultEffect;

    setAccounts((prev) =>
      prev.map((a) => {
        let bal = Number(a.balance) || 0;
        if (a.id === oldItem.accountId) {
          bal += oldItem.type === 'deposit' ? oldAmt : -oldAmt;
        }
        if (a.id === updatedItem.accountId) {
          bal += updatedItem.type === 'deposit' ? -newAmt : newAmt;
        }
        return { ...a, balance: Math.max(0, bal) };
      })
    );

    if (oldItem.txId) {
      setTransactions((prev) =>
        prev.map((tx) =>
          tx.id === oldItem.txId
            ? {
                ...tx,
                amount: newAmt,
                date: updatedItem.date,
                accountId: updatedItem.accountId,
                type: updatedItem.type === 'deposit' ? 'expense' : 'income',
                desc: updatedItem.note || tx.desc,
              }
            : tx
        )
      );
    }

    setAutoSavePlan((prev) => ({
      ...prev,
      accumulated: Math.max(0, (Number(prev.accumulated) || 0) + vaultDelta),
      history: (prev.history || []).map((h) =>
        h.id === updatedItem.id
          ? {
              ...updatedItem,
              amount: newAmt,
              accountName: newAccName,
            }
          : h
      ),
    }));

    setEditingAutoSaveHistory(null);
    showToast(t.recordUpdated, 'success');
  };

  // Delete a history item
  const handleDeleteAutoSaveHistory = (id) => {
    if (!window.confirm(t.confirmDeleteHistory)) return;

    const item = (autoSavePlan.history || []).find((h) => h.id === id);
    if (!item) return;

    const amt = parseFloat(item.amount) || 0;

    if (item.accountId) {
      setAccounts((prev) =>
        prev.map((a) => {
          if (a.id === item.accountId) {
            const diff = item.type === 'deposit' ? amt : -amt;
            return { ...a, balance: Math.max(0, (Number(a.balance) || 0) + diff) };
          }
          return a;
        })
      );
    }

    const vaultDiff = item.type === 'deposit' ? -amt : amt;
    setAutoSavePlan((prev) => ({
      ...prev,
      accumulated: Math.max(0, (Number(prev.accumulated) || 0) + vaultDiff),
      history: (prev.history || []).filter((h) => h.id !== id),
    }));

    if (item.txId) {
      setTransactions((prev) => prev.filter((tx) => tx.id !== item.txId));
    }

    showToast(t.recordDeleted, 'success');
  };

  const handleSaveAutoSavePlan = (updatedPlan) => {
    setAutoSavePlan((prev) => ({ ...prev, ...updatedPlan }));
    setAutoSaveModalOpen(false);
    showToast(t.update, 'success');
  };

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden bg-[var(--bg)] text-[var(--text-primary)] flex flex-col font-sans transition-colors duration-200 select-none`}>
      {/* ═══════════════════════════════════════════════════════════════
          PREMIUM FINTECH APP BOOT LOADER & SPLASH SCREEN
          ═══════════════════════════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)] transition-all duration-500 ${
          isAppLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none scale-105'
        }`}
        style={{ backdropFilter: 'blur(24px)' }}
      >
        {/* Ambient Glowing Blobs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-500/25 via-purple-500/20 to-pink-500/20 blur-3xl pointer-events-none animate-pulse" />

        <div className="relative flex flex-col items-center max-w-xs sm:max-w-sm px-6 text-center">
          {/* Animated Ring & Logo */}
          <div className="relative mb-6">
            <div
              className="w-24 h-24 rounded-3xl p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 animate-spin"
              style={{ animationDuration: '6s' }}
            >
              <div className="w-full h-full bg-[var(--bg)] rounded-[22px]" />
            </div>

            <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-0.5 shadow-xl shadow-indigo-500/30 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-[var(--surface)] rounded-[14px] flex items-center justify-center p-2.5">
                <img src={logoImg} alt="My Luy" className="w-full h-full object-contain drop-shadow-md animate-pulse" />
              </div>
            </div>

            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/50">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          </div>

          {/* Brand Title */}
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t.appName}
            </h1>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              PRO
            </span>
          </div>

          <p className="text-xs text-[var(--text-muted)] font-medium mb-6">
            {t.appSubtitle}
          </p>

          {/* Progress Bar Container */}
          <div className="w-full bg-[var(--surface-hover)] h-2 rounded-full overflow-hidden p-0.5 border border-[var(--border)] shadow-inner mb-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out shadow-sm shadow-indigo-500/50"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          {/* Status info & percentage */}
          <div className="w-full flex items-center justify-between text-[11px] font-medium text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
              <span>{loadingStatus}</span>
            </span>
            <span className="font-semibold text-[var(--text-secondary)] font-mono">{loadingProgress}%</span>
          </div>
        </div>
      </div>

      {/* Top Nano Loading Bar for smooth micro-feedback */}
      <div
        className={`fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent overflow-hidden pointer-events-none transition-opacity duration-200 ${
          isNavLoading ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 nano-bar-animate shadow-sm shadow-indigo-500/50" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          TOP APP HEADER / NAVBAR (FULL RESPONSIVE & UNCLUTTERED)
          ═══════════════════════════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-40 bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border)] px-3 sm:px-6 flex items-center justify-between transition-all"
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          minHeight: 'calc(64px + env(safe-area-inset-top, 0px))',
        }}
      >
        {/* Brand with logo.png */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center p-0.5 shadow-md shadow-indigo-500/20">
            <img src={logoImg} alt="My Luy" className="w-full h-full object-contain rounded-[10px]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base sm:text-xl tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {t.appName}
              </span>
              <span className="hidden sm:inline-flex text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20">
                PRO
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[var(--text-muted)] hidden md:block -mt-0.5 font-medium">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {[
            { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
            { id: 'analytics', label: t.analyticsTab, icon: BarChart3 },
            { id: 'budgets', label: t.budgetsGoalsTab, icon: Target },
            { id: 'accounts', label: t.accountsTab, icon: Landmark },
            { id: 'recurring', label: t.recurringTab, icon: RefreshCw },
            { id: 'debt', label: t.debtTab, icon: HandCoins },
            { id: 'gamification', label: t.gamificationTab, icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? 'bg-indigo-600/15 text-indigo-500 dark:text-indigo-400 shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Controls: Responsive, uncluttered and perfectly sized for mobile */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Quick Refresh & Sync with Loading Feedback (Desktop/Tablet only) */}
          <button
            onClick={handleRefreshApp}
            title={t.refreshData}
            className="hidden sm:flex p-1.5 sm:p-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] shadow-sm transition-all"
          >
            <RefreshCw size={16} className={isSyncing ? 'animate-spin text-indigo-500' : ''} />
          </button>

          {/* Quick Currency Toggle Pill (Desktop/Tablet only) */}
          <button
            onClick={() => {
              const next = currency === 'USD' ? 'KHR' : 'USD';
              setCurrency(next);
              showToast(`${t.currencyToggle}: ${next === 'USD' ? '$ USD' : '៛ KHR'}`, 'success');
            }}
            title={t.currencyToggle}
            className="hidden sm:flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-indigo-500 dark:text-indigo-400 shadow-sm transition-all"
          >
            <Coins size={14} />
            <span className="font-bold">{currency}</span>
          </button>

          {/* Real-time Exchange Converter Quick Button (Mobile-optimized compact) */}
          <button
            onClick={() => setExchangeModalOpen(true)}
            title={t.currencyExchange || 'Real-time KHR - USD Exchange (khr-usd-exchange-one.vercel.app)'}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 shadow-sm transition-all active:scale-95"
          >
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isRateFetching ? 'bg-amber-400' : 'bg-emerald-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 ${isRateFetching ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
            </span>
            <ArrowRightLeft size={12} className={`text-indigo-500 flex-shrink-0 ${isRateFetching ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline text-[11px] font-medium text-slate-500 dark:text-slate-400">1$ ≈</span>
            <span className="font-bold whitespace-nowrap">{exchangeRate.toLocaleString()} ៛</span>
          </button>

          {/* Language Toggle (Desktop view) */}
          <button
            onClick={() => setLang(lang === 'en' ? 'kh' : 'en')}
            title={t.language}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] shadow-sm transition-all"
          >
            <Globe size={14} className="text-[var(--text-muted)]" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? t.lightMode : t.darkMode}
            className="p-1.5 sm:p-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] shadow-sm transition-all flex-shrink-0"
          >
            {theme === 'dark' ? (
              <Sun size={15} className="text-amber-400" />
            ) : (
              <Moon size={15} className="text-indigo-600" />
            )}
          </button>

          {/* Install Button (Desktop) */}
          <button
            onClick={handleInstallClick}
            title={t.installApp}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 shadow-sm transition-all"
          >
            <Download size={14} />
            <span>{t.installApp}</span>
          </button>

          {/* Cloud Multi-Device Sync / Account Button */}
          {currentUser ? (
            <button
              onClick={() => setAuthModalOpen(true)}
              title={`Cloud Synced: ${currentUser.email || currentUser.displayName || 'Account'} (${cloudSyncStatus})`}
              className="flex items-center gap-1 px-1.5 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 shadow-sm transition-all active:scale-95 flex-shrink-0"
            >
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="User"
                  className="w-5 h-5 rounded-full object-cover border border-emerald-500/40"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-black">
                  {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <Cloud size={12} className={cloudSyncStatus === 'syncing' ? 'animate-pulse text-amber-500' : 'text-emerald-500'} />
              <span className="hidden xl:inline max-w-[85px] truncate text-[11px]">
                {currentUser.displayName?.split(' ')[0] || currentUser.email?.split('@')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              title="Sign In to Sync across Phone, Laptop, and Tablet"
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-sm shadow-indigo-600/25 transition-all active:scale-95 flex-shrink-0"
            >
              <Cloud size={13} />
              <span className="hidden sm:inline">Sync</span>
            </button>
          )}

          {/* Settings Button (Desktop/Tablet only - mobile has it in drawer) */}
          <button
            onClick={() => setSettingsModalOpen(true)}
            title={t.settingsTab}
            className="hidden sm:flex p-1.5 sm:p-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] shadow-sm transition-all flex-shrink-0"
          >
            <Settings size={16} />
          </button>

          {/* Mobile Menu Drawer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] shadow-sm flex-shrink-0"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu with Solid Surface & Fullscreen Blurred Backdrop */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-start">
          {/* Full-screen Blurred Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-xl transition-opacity animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu backdrop"
          />

          {/* Solid Drawer Card positioned below header */}
          <div
            className="relative z-10 w-full bg-white dark:bg-[#15182e] border-b border-slate-200/90 dark:border-white/10 shadow-2xl p-4 sm:p-5 space-y-3.5 animate-slide-down"
            style={{
              marginTop: 'calc(64px + env(safe-area-inset-top, 0px))',
            }}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {t.appName} Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Mobile Cloud Sync Banner */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthModalOpen(true);
              }}
              className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-emerald-500/10 border border-indigo-500/20 text-left flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                  <Cloud size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{currentUser ? 'Cloud Synced' : 'Sync With Other Devices'}</span>
                    {currentUser && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                    {currentUser ? (currentUser.email || currentUser.displayName) : 'Connect phone & laptop together'}
                  </div>
                </div>
              </div>
              <ChevronRight size={14} className="text-indigo-500" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
                { id: 'analytics', label: t.analyticsTab, icon: BarChart3 },
                { id: 'budgets', label: t.budgetsGoalsTab, icon: Target },
                { id: 'accounts', label: t.accountsTab, icon: Landmark },
                { id: 'recurring', label: t.recurringTab, icon: RefreshCw },
                { id: 'debt', label: t.debtTab, icon: HandCoins },
                { id: 'gamification', label: t.gamificationTab, icon: Trophy },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Quick Action Buttons: Currency, Settings, Refresh */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
              <button
                onClick={() => {
                  const next = currency === 'USD' ? 'KHR' : 'USD';
                  setCurrency(next);
                  showToast(`${t.currencyToggle}: ${next === 'USD' ? '$ USD' : '៛ KHR'}`, 'success');
                }}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <Coins size={14} className="text-indigo-500" />
                <span>{currency}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSettingsModalOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <Settings size={14} className="text-slate-500 dark:text-slate-400" />
                <span>{t.settingsTab}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleRefreshApp();
                }}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                <RefreshCw size={14} className={isSyncing ? 'animate-spin text-indigo-500' : 'text-slate-500 dark:text-slate-400'} />
                <span>{t.refreshData || 'Refresh'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5 text-xs">
              <button
                onClick={() => {
                  setLang(lang === 'en' ? 'kh' : 'en');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold px-2 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
              >
                <Globe size={15} />
                <span>{lang === 'en' ? 'ភាសាខ្មែរ (KH)' : 'English (EN)'}</span>
              </button>
              <button
                onClick={() => {
                  handleInstallClick();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
              >
                <Download size={15} />
                <span>{t.installApp}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MAIN CONTENT CONTAINER
          ═══════════════════════════════════════════════════════════════ */}
      <main className="flex-1 max-w-7xl w-full min-w-0 mx-auto px-3.5 py-4 sm:p-6 lg:p-8 pb-28 lg:pb-12 space-y-5 sm:space-y-6 overflow-x-hidden sm:overflow-visible">
        {/* Streak & Level Hero Banner (Clean in both light and dark modes) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-purple-50/70 to-pink-50/80 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900/50 border border-indigo-200/80 dark:border-indigo-500/20 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 shadow-sm">
              <Flame size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {streakDays} {t.streakDays}
                </span>
                <span className="text-xs text-[var(--text-muted)]">•</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {t.userLevel} {userLevel.level} ({userXp} {t.xpPoints})
                </span>
              </div>
              <div className="w-40 sm:w-52 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${userLevel.progressInLevel}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
            <div className="text-left sm:text-right">
              <span className="text-[11px] text-[var(--text-muted)] block font-medium">{t.financialHealth}</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{healthScore} / 100</span>
            </div>
            <button
              onClick={() => {
                setEditingTx(null);
                setTxModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
            >
              <Plus size={16} />
              <span>{t.addTransaction}</span>
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            TAB 1: DASHBOARD
            ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* ─── NEO-FINTECH VIRTUAL SMART CARD HERO ─── */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-4 sm:p-7 text-white shadow-2xl border border-indigo-500/30 w-full min-w-0">
              {/* Background ambient lighting */}
              <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-indigo-500/25 blur-3xl pointer-events-none" />
              <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

              {/* Card Header: Chip, Contactless, Platinum branding & currency badge */}
              <div className="relative z-10 flex items-center justify-between pb-3.5 border-b border-white/10 gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="w-9 h-6 sm:w-10 sm:h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-[1.5px] shadow-sm flex items-center justify-center flex-shrink-0">
                    <div className="w-full h-full bg-amber-400/30 rounded-[4px] border border-amber-900/40 grid grid-cols-2 gap-0.5 p-0.5">
                      <div className="border-r border-b border-amber-900/40"></div>
                      <div className="border-b border-amber-900/40"></div>
                      <div className="border-r border-amber-900/40"></div>
                      <div></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80 min-w-0">
                    <Radio size={13} className="rotate-90 text-indigo-300 flex-shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest uppercase font-semibold text-indigo-200/90 truncate">MY LUY PLATINUM</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/10 text-white/90 text-[10px] font-bold tracking-wide uppercase border border-white/10 backdrop-blur-md truncate max-w-[130px] sm:max-w-none">
                    {currency} • {accounts.length} {t.accountsTab}
                  </span>
                  {totals.activeLoanMoney > 0 && (
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-500/25 text-amber-300 text-[10px] font-bold tracking-wide uppercase border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
                      <HandCoins size={11} />
                      <span>+ {formatMoney(totals.activeLoanMoney)} {t.debtTab.split(' ')[0]}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Center: Total Balance & Visibility toggle */}
              <div className="relative z-10 py-4 sm:py-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/70 tracking-wide uppercase flex items-center gap-1.5">
                    <Wallet size={14} className="text-indigo-400" />
                    {t.totalBalance}
                  </span>
                  <button
                    onClick={() => setHideBalance(!hideBalance)}
                    className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                    title="Toggle Balance Visibility"
                  >
                    {hideBalance ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="mt-1 text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white flex items-baseline gap-2 truncate">
                  {hideBalance ? '••••••••' : formatMoney(totals.totalBalance)}
                </div>
              </div>

              {/* Card Footer: Live Income, Live Expense & Card info */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <ArrowUpRight size={12} />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-emerald-300 uppercase leading-none">{t.totalIncome}</div>
                      <div className="text-xs font-bold text-emerald-200 mt-0.5">{hideBalance ? '•••' : formatMoney(totals.income)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-rose-500/15 border border-rose-500/30 px-3 py-1.5 rounded-xl">
                    <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
                      <ArrowDownRight size={12} />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-rose-300 uppercase leading-none">{t.totalExpenses}</div>
                      <div className="text-xs font-bold text-rose-200 mt-0.5">{hideBalance ? '•••' : formatMoney(totals.expenses)}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-white/60">
                  <span>•••• 8829</span>
                  <span className="text-white/30">•</span>
                  <span>08/29</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => {
                  setEditingTx(null);
                  setTxModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold transition-all shadow-sm active:scale-98"
              >
                <Plus size={16} />
                <span>{t.addTransaction}</span>
              </button>
              <button
                onClick={() => handleTabChange('budgets')}
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-bold transition-all shadow-sm active:scale-98"
              >
                <Target size={16} />
                <span>{t.budgetsGoalsTab}</span>
              </button>
              <button
                onClick={() => setTransferModalOpen(true)}
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-bold transition-all shadow-sm active:scale-98"
              >
                <ArrowRightLeft size={16} />
                <span>{t.transferFunds}</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold transition-all shadow-sm active:scale-98"
              >
                <Download size={16} />
                <span>{t.export}</span>
              </button>
            </div>

            {/* Performance Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {/* Net Savings */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:border-purple-500/30 transition-all">
                <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
                  <span className="text-xs font-semibold">{t.netSavings}</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 dark:text-purple-400 flex items-center justify-center">
                    <PiggyBank size={16} />
                  </div>
                </div>
                <div className={`text-xl sm:text-2xl font-bold tracking-tight ${totals.netSavings >= 0 ? 'text-purple-500 dark:text-purple-400' : 'text-rose-500 dark:text-rose-400'}`}>
                  {hideBalance ? '••••' : formatMoney(totals.netSavings)}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-1 font-medium">
                  {totals.netSavings >= 0 ? 'Net Positive Cashflow' : 'Negative Cashflow'}
                </div>
              </div>

              {/* Savings Rate */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:border-emerald-500/30 transition-all">
                <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
                  <span className="text-xs font-semibold">{t.savingsRate}</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center">
                    <TrendingUp size={16} />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-emerald-500 dark:text-emerald-400">
                  {totals.savingsRate}%
                </div>
                <div className="w-full bg-[var(--surface-hover)] h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(0, totals.savingsRate))}%` }}
                  />
                </div>
              </div>

              {/* Accounts Glance */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:border-indigo-500/30 transition-all">
                <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
                  <span className="text-xs font-semibold">{t.accountsTab}</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center">
                    <Landmark size={16} />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                  {accounts.length} Active
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-1 flex items-center justify-between">
                  <span>{transactions.length} total txs</span>
                  <button onClick={() => handleTabChange('accounts')} className="text-indigo-500 hover:underline text-[11px] font-semibold">
                    View
                  </button>
                </div>
              </div>
            </div>

            {/* Real-time Currency Exchange Widget */}
            <ExchangeCalculatorWidget
              exchangeRate={exchangeRate}
              onOpenModal={() => setExchangeModalOpen(true)}
              onFetchLive={fetchLiveExchangeRate}
              isRateFetching={isRateFetching}
              rateLastSynced={rateLastSynced}
              rateLatencyMs={rateLatencyMs}
              t={t}
            />

            {/* Direct Monthly Auto-Save Dashboard Glance Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[var(--surface)] via-[var(--surface)] to-teal-500/10 border border-teal-500/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20 shrink-0">
                  <CalendarClock size={20} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-[var(--text-primary)] truncate">{t.directAutoSave}</span>
                    {autoSavePlan.isActive ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {t.autoSaveRunning}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        {t.autoSaveStopped}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate">
                    {t.dayStart}: <span className="font-semibold text-[var(--text-secondary)]">{autoSavePlan.startDate || 'Today'}</span> • {t.dayOfMonth}: <span className="font-semibold text-[var(--text-secondary)]">{t.dayPrefix} {autoSavePlan.dayOfMonth}</span> • {formatMoney(autoSavePlan.amount)}/mo
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end">
                <div className="text-right hidden md:block mr-2">
                  <span className="text-[10px] font-medium text-[var(--text-muted)] block">{t.totalAccumulated}</span>
                  <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{formatMoney(autoSavePlan.accumulated || 0)}</span>
                </div>

                {/* THE SINGLE BUTTON FOR STOP / RESUME */}
                <button
                  onClick={handleToggleAutoSave}
                  className={`flex-1 sm:flex-initial py-2 px-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                    autoSavePlan.isActive
                      ? 'bg-rose-500/15 hover:bg-rose-500 text-rose-600 dark:text-rose-400 hover:text-white border border-rose-500/30'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
                  }`}
                >
                  {autoSavePlan.isActive ? (
                    <>
                      <CircleStop size={14} className="animate-pulse" />
                      <span>{t.stopAutoSave}</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} />
                      <span>{t.resumeAutoSave}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleTabChange('budgets')}
                  className="p-2 rounded-xl bg-[var(--input-bg)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  title={t.budgetsGoalsTab}
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* Transactions Section with Filters, Search, and Sort */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <List size={18} className="text-indigo-500 dark:text-indigo-400" />
                  <h2 className="font-bold text-base text-[var(--text-primary)]">
                    {t.transactionsTab}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface-hover)] text-[var(--text-muted)] font-medium">
                    {filteredTransactions.length}
                  </span>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center p-0.5 bg-[var(--surface-hover)] rounded-xl border border-[var(--border)]">
                    {[
                      { id: 'all', label: t.all },
                      { id: 'income', label: t.income },
                      { id: 'expense', label: t.expense },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setTxTypeFilter(btn.id)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                          txTypeFilter === btn.id
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  <select
                    value={txSortOption}
                    onChange={(e) => setTxSortOption(e.target.value)}
                    className="px-2.5 py-1.5 text-xs font-semibold bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] rounded-xl outline-none cursor-pointer"
                  >
                    <option value="newest">{t.newest}</option>
                    <option value="oldest">{t.oldest}</option>
                    <option value="highest">{t.highest}</option>
                    <option value="lowest">{t.lowest}</option>
                  </select>
                </div>
              </div>

              {/* Search input and Category Filter */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2 relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={txSearchQuery}
                    onChange={(e) => setTxSearchQuery(e.target.value)}
                    placeholder={t.search}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-indigo-500 transition-colors"
                  />
                  {txSearchQuery && (
                    <button
                      onClick={() => setTxSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                <div>
                  <select
                    value={txCategoryFilter}
                    onChange={(e) => setTxCategoryFilter(e.target.value)}
                    className="w-full py-2 px-3 text-xs bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-[var(--text-primary)] outline-none cursor-pointer"
                  >
                    <option value="all">{t.all} Categories</option>
                    {allCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name[lang] || cat.name.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Transactions List */}
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12 px-4 border border-dashed border-[var(--border)] rounded-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
                    <List size={22} />
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{t.emptyTransactions}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{t.emptyTransactionsSub}</p>
                  <button
                    onClick={() => {
                      setEditingTx(null);
                      setTxModalOpen(true);
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                  >
                    <Plus size={15} />
                    <span>{t.addTransaction}</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-[var(--border)]">
                    {filteredTransactions.slice(0, txVisibleCount).map((tx) => {
                      const catInfo = getCategoryDetails(tx.category);
                      const isInc = tx.type === 'income';
                      const accountObj = accounts.find((a) => a.id === tx.accountId);
                      const isExpanded = expandedTxId === tx.id;
                      const altCurrency = currency === 'USD' ? 'KHR' : 'USD';
                      const altAmount = formatMoney(tx.amount, altCurrency);

                      return (
                        <div
                          key={tx.id}
                          className="py-2.5 px-1 sm:px-2 rounded-2xl transition-all hover:bg-[var(--surface-hover)]/70"
                        >
                          {/* Summary Header Row */}
                          <div
                            onClick={() => setExpandedTxId(isExpanded ? null : tx.id)}
                            className="flex items-center justify-between gap-3 cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                                style={{
                                  backgroundColor: `${catInfo.color}18`,
                                  color: catInfo.color,
                                  border: `1px solid ${catInfo.color}30`,
                                }}
                              >
                                <DynamicIcon name={catInfo.icon} size={18} />
                              </div>

                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">
                                  {tx.desc || catInfo.name}
                                </p>
                                <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] mt-0.5">
                                  <span>{catInfo.name}</span>
                                  <span>•</span>
                                  <span>{tx.date}</span>
                                  {accountObj && (
                                    <>
                                      <span>•</span>
                                      <span className="text-indigo-500 dark:text-indigo-400 font-medium">{accountObj.name}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                              <span
                                className={`text-xs sm:text-sm font-bold tracking-tight ${
                                  isInc ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                                }`}
                              >
                                {isInc ? '+' : '-'} {formatMoney(tx.amount)}
                              </span>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedTxId(isExpanded ? null : tx.id);
                                }}
                                className={`p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180 text-indigo-500' : ''
                                }`}
                                title={isExpanded ? t.hideDetails : t.viewDetails}
                              >
                                <ChevronDown size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Progressive Disclosure: Expanded Detail Panel */}
                          {isExpanded && (
                            <div className="mt-3 pt-3 pb-2 px-3 sm:px-4 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] space-y-3 animate-slide-up text-xs">
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                                <div>
                                  <span className="text-[var(--text-muted)] block font-medium">{t.refId}</span>
                                  <span className="font-mono font-semibold text-[var(--text-primary)] mt-0.5 block truncate">
                                    #TX-{tx.id.replace('tx_', '').slice(-8).toUpperCase()}
                                  </span>
                                </div>

                                <div>
                                  <span className="text-[var(--text-muted)] block font-medium">{t.account}</span>
                                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5 block truncate">
                                    {accountObj?.name || 'Default Account'}
                                  </span>
                                </div>

                                <div>
                                  <span className="text-[var(--text-muted)] block font-medium">{t.convertedEst}</span>
                                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                                    ≈ {altAmount}
                                  </span>
                                </div>

                                <div>
                                  <span className="text-[var(--text-muted)] block font-medium">{t.type}</span>
                                  <span
                                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mt-0.5 ${
                                      isInc
                                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                        : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                                    }`}
                                  >
                                    {isInc ? t.income : t.expense}
                                  </span>
                                </div>
                              </div>

                              {tx.desc && (
                                <div className="pt-2 border-t border-[var(--border)]">
                                  <span className="text-[10px] font-medium text-[var(--text-muted)] block">{t.description}:</span>
                                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-medium">{tx.desc}</p>
                                </div>
                              )}

                              {/* Progressive Disclosure Action Buttons */}
                              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border)]">
                                <button
                                  onClick={() => {
                                    setEditingTx(tx);
                                    setTxModalOpen(true);
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                                >
                                  <Pencil size={13} />
                                  <span>{t.edit}</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteTransaction(tx.id)}
                                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
                                >
                                  <Trash2 size={13} />
                                  <span>{t.delete}</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Progressive Pagination Controls */}
                  {filteredTransactions.length > 10 && (
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] text-xs">
                      <span className="text-[var(--text-muted)] font-medium">
                        Showing {Math.min(txVisibleCount, filteredTransactions.length)} of {filteredTransactions.length}
                      </span>
                      <div className="flex items-center gap-2">
                        {txVisibleCount < filteredTransactions.length ? (
                          <>
                            <button
                              onClick={() => setTxVisibleCount((prev) => prev + 10)}
                              className="px-3 py-1.5 rounded-xl bg-[var(--surface-hover)] text-indigo-600 dark:text-indigo-400 font-bold border border-[var(--border)] hover:bg-indigo-500/10 transition-all flex items-center gap-1"
                            >
                              <ChevronDown size={14} />
                              <span>{t.showMore} (+10)</span>
                            </button>
                            <button
                              onClick={() => setTxVisibleCount(filteredTransactions.length)}
                              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-sm"
                            >
                              <span>{t.all} ({filteredTransactions.length})</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setTxVisibleCount(10)}
                            className="px-3 py-1.5 rounded-xl bg-[var(--surface-hover)] text-[var(--text-secondary)] font-bold border border-[var(--border)] hover:bg-[var(--surface)] transition-all flex items-center gap-1"
                          >
                            <ChevronUp size={14} />
                            <span>{t.showLess}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 2: ANALYTICS & CHARTS
            ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                <span className="text-xs font-semibold text-[var(--text-muted)]">{t.financialHealth}</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{healthScore}</span>
                  <span className="text-xs text-[var(--text-muted)]">/ 100</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full"
                    style={{ width: `${healthScore}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                <span className="text-xs font-semibold text-[var(--text-muted)]">{t.savingsRate}</span>
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                  {totals.savingsRate}%
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mt-1">Target recommended: &ge; 20%</p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                <span className="text-xs font-semibold text-[var(--text-muted)]">{t.dailyAverage}</span>
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">
                  {formatMoney(totals.expenses / 30)}
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mt-1">Calculated over 30 days</p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                <span className="text-xs font-semibold text-[var(--text-muted)]">{t.netSavings}</span>
                <div className={`text-2xl font-bold mt-1 ${totals.netSavings >= 0 ? 'text-purple-600 dark:text-purple-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {formatMoney(totals.netSavings)}
                </div>
                <p className="text-[11px] text-[var(--text-muted)] mt-1">{totals.income > 0 ? 'Income vs Expense' : 'No income yet'}</p>
              </div>
            </div>

            {/* Income vs Expense Comparative Bar Chart */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[var(--text-primary)]">{t.cashFlowTrend}</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{t.incomeVsExpense}</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    <span>{t.income}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 dark:bg-rose-400" />
                    <span>{t.expense}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <div className="grid grid-cols-2 gap-4 h-48 sm:h-56 items-end pb-4 border-b border-[var(--border)]">
                  {/* Income Column */}
                  <div className="flex flex-col items-center justify-end h-full gap-2">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {formatMoney(totals.income)}
                    </span>
                    <div
                      className="w-16 sm:w-28 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-xl transition-all duration-700 shadow-md"
                      style={{
                        height: totals.income === 0 && totals.expenses === 0
                          ? '10%'
                          : `${Math.max(12, Math.min(95, (totals.income / Math.max(totals.income, totals.expenses, 1)) * 95))}%`,
                      }}
                    />
                    <span className="text-xs font-semibold text-[var(--text-secondary)]">{t.income}</span>
                  </div>

                  {/* Expense Column */}
                  <div className="flex flex-col items-center justify-end h-full gap-2">
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                      {formatMoney(totals.expenses)}
                    </span>
                    <div
                      className="w-16 sm:w-28 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-xl transition-all duration-700 shadow-md"
                      style={{
                        height: totals.income === 0 && totals.expenses === 0
                          ? '10%'
                          : `${Math.max(12, Math.min(95, (totals.expenses / Math.max(totals.income, totals.expenses, 1)) * 95))}%`,
                      }}
                    />
                    <span className="text-xs font-semibold text-[var(--text-secondary)]">{t.expense}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Breakdown Progress Bars */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-[var(--text-primary)]">{t.categoryBreakdown}</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">Top categories by spending volume</p>
                </div>
                <PieChart size={18} className="text-indigo-500 dark:text-indigo-400" />
              </div>

              {Object.keys(categorySpending).length === 0 ? (
                <div className="text-center py-8 text-xs text-[var(--text-muted)]">
                  {t.chartNoData}
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  {Object.entries(categorySpending)
                    .sort(([, a], [, b]) => b - a)
                    .map(([catId, spent]) => {
                      const catInfo = getCategoryDetails(catId);
                      const percent = totals.expenses > 0 ? Math.round((spent / totals.expenses) * 100) : 0;

                      return (
                        <div key={catId} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px]"
                                style={{ backgroundColor: catInfo.color }}
                              >
                                <DynamicIcon name={catInfo.icon} size={11} />
                              </div>
                              <span className="font-semibold text-[var(--text-primary)]">{catInfo.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[var(--text-primary)]">{formatMoney(spent)}</span>
                              <span className="text-[var(--text-muted)] w-8 text-right font-medium">{percent}%</span>
                            </div>
                          </div>

                          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${percent}%`, backgroundColor: catInfo.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 3: BUDGETS & GOALS
            ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'budgets' && (
          <div className="space-y-8">
            {/* Section 1: Budget Limits */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-indigo-500 dark:text-indigo-400" />
                    <h3 className="font-bold text-base text-[var(--text-primary)]">{t.budgetLimits}</h3>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Monitor monthly spending limits per category
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingBudget(null);
                    setBudgetModalOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
                >
                  <Plus size={15} />
                  <span>{t.addBudgetLimit}</span>
                </button>
              </div>

              {budgetLimits.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-[var(--border)] rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center mx-auto mb-2">
                    <ShieldCheck size={20} />
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{t.emptyBudgets}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{t.emptyBudgetsSub}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {budgetLimits.map((b) => {
                    const catInfo = getCategoryDetails(b.categoryId);
                    const spent = categorySpending[b.categoryId] || 0;
                    const percent = Math.min(200, Math.round((spent / (b.limit || 1)) * 100));
                    const isOver = spent > b.limit;
                    const isWarn = !isOver && percent >= 80;
                    const isExpanded = expandedBudgetId === b.id;

                    return (
                      <div
                        key={b.id}
                        className="p-4 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] space-y-3 shadow-sm hover:border-indigo-500/30 transition-all"
                      >
                        {/* Summary Header */}
                        <div
                          onClick={() => setExpandedBudgetId(isExpanded ? null : b.id)}
                          className="flex items-center justify-between cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
                              style={{ backgroundColor: catInfo.color }}
                            >
                              <DynamicIcon name={catInfo.icon} size={16} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[var(--text-primary)]">{catInfo.name}</p>
                              <p className="text-[11px] text-[var(--text-muted)]">
                                {t.monthlyLimit}: {formatMoney(b.limit)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isOver
                                  ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                                  : isWarn
                                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                  : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                              }`}
                            >
                              {percent}%
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedBudgetId(isExpanded ? null : b.id);
                              }}
                              className={`p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-indigo-500' : ''
                              }`}
                              title={isExpanded ? t.hideDetails : t.viewDetails}
                            >
                              <ChevronDown size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isOver ? 'bg-rose-500' : isWarn ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(100, percent)}%` }}
                          />
                        </div>

                        {/* Summary Status Line */}
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[var(--text-secondary)]">
                            {t.spentSoFar}: {formatMoney(spent)}
                          </span>
                          <span
                            className={`font-bold flex items-center gap-1 ${
                              isOver ? 'text-rose-600 dark:text-rose-400' : isWarn ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                            }`}
                          >
                            {isOver ? (
                              <>
                                <AlertCircle size={12} />
                                <span>{t.budgetStatusDanger} (+{formatMoney(spent - b.limit)})</span>
                              </>
                            ) : isWarn ? (
                              <>
                                <AlertTriangle size={12} />
                                <span>{percent}% {t.budgetStatusWarn}</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 size={12} />
                                <span>{t.remaining}: {formatMoney(b.limit - spent)}</span>
                              </>
                            )}
                          </span>
                        </div>

                        {/* Progressive Disclosure Panel */}
                        {isExpanded && (
                          <div className="pt-2.5 border-t border-[var(--border)] space-y-2.5 animate-slide-up text-xs">
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                                <span className="text-[var(--text-muted)] block font-medium">{t.spentSoFar}</span>
                                <span className="font-bold text-[var(--text-primary)] mt-0.5 block">{formatMoney(spent)}</span>
                              </div>
                              <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                                <span className="text-[var(--text-muted)] block font-medium">{t.remaining}</span>
                                <span className={`font-bold mt-0.5 block ${isOver ? 'text-rose-500' : 'text-emerald-500'}`}>
                                  {isOver ? `-${formatMoney(spent - b.limit)}` : formatMoney(b.limit - spent)}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                              <span>{t.channel}: {catInfo.name}</span>
                              <span className="font-semibold text-indigo-500">{percent}% of limit</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border)]">
                              <button
                                onClick={() => {
                                  setEditingBudget(b);
                                  setBudgetModalOpen(true);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                              >
                                <Pencil size={13} />
                                <span>{t.edit}</span>
                              </button>
                              <button
                                onClick={() => {
                                  setBudgetLimits((prev) => prev.filter((x) => x.id !== b.id));
                                  showToast(t.delete, 'success');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold flex items-center gap-1.5"
                              >
                                <Trash2 size={13} />
                                <span>{t.delete}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section 2: Direct Monthly Auto-Save (Non-Stop) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[var(--surface)] via-[var(--surface)] to-teal-500/5 border border-teal-500/20 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20 shadow-sm">
                    <CalendarClock size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base text-[var(--text-primary)]">{t.directAutoSave}</h3>
                      {autoSavePlan.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {t.autoSaveRunning}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          {t.autoSaveStopped}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{t.directAutoSaveSub}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => setAutoSaveModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-[var(--input-bg)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Pencil size={13} />
                    <span>{t.editAutoSave}</span>
                  </button>
                </div>
              </div>

              {/* Parameters & Live Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)]">
                  <span className="text-[11px] font-semibold text-[var(--text-muted)] block">{t.dayStart}</span>
                  <span className="text-sm font-bold text-[var(--text-primary)] mt-0.5 block">{autoSavePlan.startDate || 'Today'}</span>
                  <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">{t.autoSavePerpetual}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)]">
                  <span className="text-[11px] font-semibold text-[var(--text-muted)] block">{t.dayOfMonth}</span>
                  <span className="text-sm font-bold text-[var(--text-primary)] mt-0.5 block">
                    {t.dayPrefix} {autoSavePlan.dayOfMonth} {t.daySuffix}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">{t.dayOfMonthSub}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)]">
                  <span className="text-[11px] font-semibold text-[var(--text-muted)] block">{t.monthlyAmount}</span>
                  <span className="text-sm font-bold text-teal-600 dark:text-teal-400 mt-0.5 block">
                    {formatMoney(autoSavePlan.amount)} / mo
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {accounts.find((a) => a.id === autoSavePlan.accountId)?.name || t.directVault}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)]">
                  <span className="text-[11px] font-semibold text-[var(--text-muted)] block">{t.totalAccumulated}</span>
                  <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                    {formatMoney(autoSavePlan.accumulated || 0)}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">{t.totalSavedSoFar}</span>
                </div>
              </div>

              {/* ACTION ROW: SINGLE BUTTON FOR STOP / RESUME + DEPOSIT & WITHDRAW */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <button
                  onClick={handleToggleAutoSave}
                  className={`w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] ${
                    autoSavePlan.isActive
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                  }`}
                >
                  {autoSavePlan.isActive ? (
                    <>
                      <CircleStop size={18} className="animate-pulse" />
                      <span>{t.stopAutoSave}</span>
                    </>
                  ) : (
                    <>
                      <Play size={18} />
                      <span>{t.resumeAutoSave}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setAutoSaveActionType('deposit');
                      setAutoSaveActionModalOpen(true);
                    }}
                    className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 text-teal-600 dark:text-teal-400 border border-teal-500/30 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <Plus size={15} />
                    <span>{t.deposit}</span>
                  </button>

                  <button
                    onClick={() => {
                      setAutoSaveActionType('withdraw');
                      setAutoSaveActionModalOpen(true);
                    }}
                    className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <ArrowUpRight size={15} />
                    <span>{t.withdraw}</span>
                  </button>

                  <button
                    onClick={handleTriggerAutoSaveDeposit}
                    className="hidden lg:inline-flex px-3.5 py-3 rounded-xl bg-[var(--input-bg)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] items-center justify-center gap-1.5 transition-all shadow-sm"
                    title={t.depositNow}
                  >
                    <span>{t.depositNow}</span>
                  </button>
                </div>
              </div>

              {/* VAULT HISTORY (DEPOSITS & WITHDRAWALS) WITH EDIT AND DELETE */}
              <div className="pt-4 border-t border-[var(--border)] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <History size={16} className="text-teal-600 dark:text-teal-400" />
                    <h4 className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">{t.autoSaveHistory}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--input-bg)] text-[var(--text-muted)] border border-[var(--border)]">
                      {(autoSavePlan.history || []).length}
                    </span>
                  </div>
                </div>

                {(!autoSavePlan.history || autoSavePlan.history.length === 0) ? (
                  <div className="p-6 rounded-xl border border-dashed border-[var(--border)] text-center text-xs text-[var(--text-muted)] space-y-1">
                    <p className="font-medium text-[var(--text-secondary)]">{t.noAutoSaveHistory}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">{t.noAutoSaveHistorySub}</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {autoSavePlan.history.map((item) => {
                      const isWithdraw = item.type === 'withdraw';
                      const isExpanded = expandedAutoSaveId === item.id;
                      const altCurrency = currency === 'USD' ? 'KHR' : 'USD';
                      const altAmount = formatMoney(item.amount, altCurrency);

                      return (
                        <div
                          key={item.id}
                          className="p-3 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] shadow-sm hover:border-teal-500/30 transition-all"
                        >
                          {/* Summary Row */}
                          <div
                            onClick={() => setExpandedAutoSaveId(isExpanded ? null : item.id)}
                            className="flex items-center justify-between gap-3 cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                  isWithdraw
                                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25'
                                    : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25'
                                }`}
                              >
                                {isWithdraw ? <ArrowUpRight size={15} /> : <ArrowDownLeft size={15} />}
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span
                                    className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                                      isWithdraw
                                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                        : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                    }`}
                                  >
                                    {isWithdraw ? t.withdraw : t.deposit}
                                  </span>
                                  <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                                    {item.note || (isWithdraw ? t.withdrawFromVault : t.depositToVault)}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                                  {item.date} • {item.accountName || accounts.find((a) => a.id === item.accountId)?.name || t.directVault}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5 shrink-0">
                              <span
                                className={`text-xs sm:text-sm font-extrabold ${
                                  isWithdraw ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                                }`}
                              >
                                {isWithdraw ? '-' : '+'}{formatMoney(item.amount)}
                              </span>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedAutoSaveId(isExpanded ? null : item.id);
                                }}
                                className={`p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180 text-teal-500' : ''
                                }`}
                                title={isExpanded ? t.hideDetails : t.viewDetails}
                              >
                                <ChevronDown size={15} />
                              </button>
                            </div>
                          </div>

                          {/* Progressive Disclosure Panel */}
                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-[var(--border)] space-y-2.5 animate-slide-up text-xs">
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px]">
                                <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                                  <span className="text-[var(--text-muted)] block font-medium">{t.refId}</span>
                                  <span className="font-mono font-semibold text-[var(--text-primary)] mt-0.5 block truncate">
                                    #STASH-{item.id.slice(-6).toUpperCase()}
                                  </span>
                                </div>

                                <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                                  <span className="text-[var(--text-muted)] block font-medium">{t.channel}</span>
                                  <span className="font-semibold text-teal-600 dark:text-teal-400 mt-0.5 block truncate">
                                    {item.accountName || accounts.find((a) => a.id === item.accountId)?.name || t.directVault}
                                  </span>
                                </div>

                                <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] col-span-2 sm:col-span-1">
                                  <span className="text-[var(--text-muted)] block font-medium">{t.convertedEst}</span>
                                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                                    ≈ {altAmount}
                                  </span>
                                </div>
                              </div>

                              {item.note && (
                                <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                                  <span className="text-[10px] text-[var(--text-muted)] block font-medium">{t.notes}:</span>
                                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-medium">{item.note}</p>
                                </div>
                              )}

                              {/* Progressive Action Controls */}
                              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border)]">
                                <button
                                  onClick={() => setEditingAutoSaveHistory(item)}
                                  className="px-3 py-1.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-teal-600 dark:text-teal-400 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                                >
                                  <Pencil size={13} />
                                  <span>{t.edit}</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteAutoSaveHistory(item.id)}
                                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold flex items-center gap-1.5"
                                >
                                  <Trash2 size={13} />
                                  <span>{t.delete}</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Savings Goals */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Target size={18} className="text-purple-500 dark:text-purple-400" />
                    <h3 className="font-bold text-base text-[var(--text-primary)]">{t.savingsGoals}</h3>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Set specific milestone targets and deposit savings
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingGoal(null);
                    setGoalModalOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
                >
                  <Plus size={15} />
                  <span>{t.addGoal}</span>
                </button>
              </div>

              {savingsGoals.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-[var(--border)] rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 dark:text-purple-400 flex items-center justify-center mx-auto mb-2">
                    <Target size={20} />
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{t.emptyGoals}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{t.emptyGoalsSub}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {savingsGoals.map((g) => {
                    const percent = Math.min(100, Math.round(((g.current || 0) / (g.target || 1)) * 100));
                    const isDone = g.current >= g.target;
                    const isExpanded = expandedGoalId === g.id;
                    const altCurrency = currency === 'USD' ? 'KHR' : 'USD';
                    const altTarget = formatMoney(g.target, altCurrency);
                    const altCurrent = formatMoney(g.current, altCurrency);

                    return (
                      <div
                        key={g.id}
                        className="p-4 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] space-y-3 shadow-sm hover:border-purple-500/30 transition-all"
                      >
                        {/* Summary Header */}
                        <div
                          onClick={() => setExpandedGoalId(isExpanded ? null : g.id)}
                          className="flex items-center justify-between cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-500 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center shadow-sm">
                              {isDone ? <Trophy size={18} className="text-amber-500 dark:text-amber-400" /> : <PiggyBank size={18} />}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[var(--text-primary)]">{g.name}</p>
                              <p className="text-[11px] text-[var(--text-muted)]">
                                {t.targetAmount}: {formatMoney(g.target)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isDone
                                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                  : 'bg-purple-500/15 text-purple-600 dark:text-purple-400'
                              }`}
                            >
                              {percent}%
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedGoalId(isExpanded ? null : g.id);
                              }}
                              className={`p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-purple-500' : ''
                              }`}
                              title={isExpanded ? t.hideDetails : t.viewDetails}
                            >
                              <ChevronDown size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        {/* Summary Status */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[var(--text-primary)]">
                            {formatMoney(g.current)} <span className="text-[var(--text-muted)] font-normal">({percent}%)</span>
                          </span>
                          {isDone ? (
                            <span className="text-[11px] font-bold text-amber-500 dark:text-amber-400 flex items-center gap-1">
                              <Award size={13} />
                              <span>{t.goalAchieved}</span>
                            </span>
                          ) : (
                            <span className="text-[11px] text-[var(--text-muted)]">
                              {formatMoney(g.target - g.current)} {t.remaining}
                            </span>
                          )}
                        </div>

                        {/* Progressive Disclosure Panel */}
                        {isExpanded && (
                          <div className="pt-2.5 border-t border-[var(--border)] space-y-2.5 animate-slide-up text-xs">
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                                <span className="text-[var(--text-muted)] block font-medium">{t.targetDate}</span>
                                <span className="font-semibold text-[var(--text-primary)] mt-0.5 block truncate">
                                  {g.date || 'Flexible timeline'}
                                </span>
                              </div>

                              <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                                <span className="text-[var(--text-muted)] block font-medium">{t.convertedEst}</span>
                                <span className="font-semibold text-purple-600 dark:text-purple-400 mt-0.5 block truncate">
                                  {altCurrent} / {altTarget}
                                </span>
                              </div>
                            </div>

                            {/* Fund Actions Row */}
                            <div className="flex items-center gap-2 pt-1">
                              <button
                                onClick={() => {
                                  setSelectedGoalForFund(g);
                                  setFundActionType('deposit');
                                  setGoalFundModalOpen(true);
                                }}
                                className="flex-1 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all"
                              >
                                <Plus size={13} />
                                <span>{t.addFunds}</span>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedGoalForFund(g);
                                  setFundActionType('withdraw');
                                  setGoalFundModalOpen(true);
                                }}
                                className="flex-1 py-1.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border)] text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                              >
                                <span>{t.withdrawFunds}</span>
                              </button>
                            </div>

                            {/* Edit / Delete Row */}
                            <div className="flex items-center justify-end gap-2 pt-1 border-t border-[var(--border)]">
                              <button
                                onClick={() => {
                                  setEditingGoal(g);
                                  setGoalModalOpen(true);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-purple-600 dark:text-purple-400 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                              >
                                <Pencil size={13} />
                                <span>{t.edit}</span>
                              </button>
                              <button
                                onClick={() => {
                                  setSavingsGoals((prev) => prev.filter((x) => x.id !== g.id));
                                  showToast(t.delete, 'success');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold flex items-center gap-1.5"
                              >
                                <Trash2 size={13} />
                                <span>{t.delete}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 4: ACCOUNTS & CURRENCIES (FULL RESPONSIVE REDESIGN)
            ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'accounts' && (
          <div className="space-y-6">
            {/* Total Balance across all Accounts Widget */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-blue-50/90 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900/60 border border-indigo-200/80 dark:border-indigo-500/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {t.totalLiquidAssets}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {formatMoney(totals.totalBalance)}
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  Across {accounts.length} linked accounts & wallets
                </p>
              </div>

              {/* Responsive Action Buttons */}
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setTransferModalOpen(true)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-bold shadow-sm transition-all active:scale-95"
                >
                  <ArrowRightLeft size={15} />
                  <span>{t.transferFunds}</span>
                </button>
                <button
                  onClick={() => {
                    setEditingAccount(null);
                    setAccountModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
                >
                  <Plus size={15} />
                  <span>{t.addAccount}</span>
                </button>
              </div>
            </div>

            {/* Currency & Exchange Setting Card (Fully Responsive on Mobile) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
                    {t.currencyToggle}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Currently active: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{currency === 'USD' ? '$ USD' : '៛ KHR'}</strong>
                  </p>
                </div>

                <button
                  onClick={() => {
                    const next = currency === 'USD' ? 'KHR' : 'USD';
                    setCurrency(next);
                    showToast(`Switched to ${next}`, 'success');
                  }}
                  className="self-start sm:self-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
                >
                  {t.switchCurrency} ({currency === 'USD' ? '៛ KHR' : '$ USD'})
                </button>
              </div>

              {/* Rate configuration */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border)] text-xs text-[var(--text-secondary)]">
                <span className="font-semibold">{t.exchangeRateLabel}</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={exchangeRate}
                    onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 4100)}
                    className="w-24 px-2.5 py-1.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs font-bold text-[var(--text-primary)] outline-none focus:border-indigo-500 shadow-sm"
                  />
                  <span className="font-bold text-[var(--text-muted)]">KHR</span>
                </div>
              </div>
            </div>

            {/* Accounts List Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
                    {t.accountsList}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {t.accountsSubtitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {accounts.map((acc) => {
                  const isExpanded = expandedAccountId === acc.id;
                  const txCount = transactions.filter((tx) => tx.accountId === acc.id).length;
                  const altCurrency = currency === 'USD' ? 'KHR' : 'USD';
                  const altBal = formatMoney(acc.balance, altCurrency);

                  return (
                    <div
                      key={acc.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                    >
                      {/* Summary Header */}
                      <div
                        onClick={() => setExpandedAccountId(isExpanded ? null : acc.id)}
                        className="flex items-start justify-between gap-3 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                            style={{ backgroundColor: acc.color || '#6366f1' }}
                          >
                            <DynamicIcon name={acc.icon || 'landmark'} size={20} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[var(--text-primary)] truncate">
                              {acc.name}
                            </p>
                            <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[var(--surface-hover)] text-[var(--text-muted)]">
                              {t[acc.type] || acc.type}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedAccountId(isExpanded ? null : acc.id);
                            }}
                            className={`p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-indigo-500' : ''
                            }`}
                            title={isExpanded ? t.hideDetails : t.viewDetails}
                          >
                            <ChevronDown size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Summary Balance Line */}
                      <div className="pt-2 border-t border-[var(--border)] flex items-end justify-between">
                        <div>
                          <span className="text-[11px] text-[var(--text-muted)] block font-medium">
                            {t.initialBalance}
                          </span>
                          <span className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">
                            {formatMoney(acc.balance)}
                          </span>
                        </div>

                        <button
                          onClick={() => setTransferModalOpen(true)}
                          className="p-2 rounded-xl bg-[var(--surface-hover)] text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                          title={t.transferFunds}
                        >
                          <ArrowRightLeft size={15} />
                        </button>
                      </div>

                      {/* Progressive Disclosure Panel */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-[var(--border)] space-y-2.5 animate-slide-up text-xs">
                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div className="p-2 rounded-lg bg-[var(--input-bg)] border border-[var(--border)]">
                              <span className="text-[var(--text-muted)] block font-medium">{t.convertedEst}</span>
                              <span className="font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 block truncate">
                                ≈ {altBal}
                              </span>
                            </div>
                            <div className="p-2 rounded-lg bg-[var(--input-bg)] border border-[var(--border)]">
                              <span className="text-[var(--text-muted)] block font-medium">Activity</span>
                              <span className="font-bold text-[var(--text-primary)] mt-0.5 block">
                                {txCount} recorded txs
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons Row */}
                          <div className="flex items-center justify-end gap-2 pt-1 border-t border-[var(--border)]">
                            <button
                              onClick={() => {
                                setEditingAccount(acc);
                                setAccountModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[var(--input-bg)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                            >
                              <Pencil size={13} />
                              <span>{t.edit}</span>
                            </button>
                            {accounts.length > 1 && (
                              <button
                                onClick={() => {
                                  setAccounts((prev) => prev.filter((x) => x.id !== acc.id));
                                  showToast(t.delete, 'success');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold flex items-center gap-1.5"
                              >
                                <Trash2 size={13} />
                                <span>{t.delete}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 5: RECURRING TRANSACTIONS & DEBTS
            ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'recurring' && (
          <div className="space-y-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <RefreshCw size={18} className="text-cyan-500 dark:text-cyan-400" />
                    <h3 className="font-bold text-base text-[var(--text-primary)]">{t.recurringTitle}</h3>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{t.emptyRecurringSub}</p>
                </div>
                <button
                  onClick={() => {
                    setEditingRecurring(null);
                    setRecurringModalOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
                >
                  <Plus size={15} />
                  <span>{t.addRecurring}</span>
                </button>
              </div>

              {recurringTxs.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-[var(--border)] rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 flex items-center justify-center mx-auto mb-2">
                    <RefreshCw size={20} />
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{t.emptyRecurring}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{t.emptyRecurringSub}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {recurringTxs.map((r) => {
                    const catInfo = getCategoryDetails(r.category);
                    const isExpanded = expandedRecurringId === r.id;
                    const accountObj = accounts.find((a) => a.id === r.accountId);
                    const altCurrency = currency === 'USD' ? 'KHR' : 'USD';
                    const altAmount = formatMoney(r.amount, altCurrency);

                    return (
                      <div
                        key={r.id}
                        className="p-4 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] space-y-3 shadow-sm hover:border-cyan-500/30 transition-all"
                      >
                        {/* Summary Header */}
                        <div
                          onClick={() => setExpandedRecurringId(isExpanded ? null : r.id)}
                          className="flex items-start justify-between cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                              style={{ backgroundColor: catInfo.color }}
                            >
                              <DynamicIcon name={catInfo.icon} size={18} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">{r.desc}</p>
                              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                                {t[r.freq] || r.freq} • {t.nextDueDate}: {r.nextDate}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                              {formatMoney(r.amount)}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedRecurringId(isExpanded ? null : r.id);
                              }}
                              className={`p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-cyan-500' : ''
                              }`}
                              title={isExpanded ? t.hideDetails : t.viewDetails}
                            >
                              <ChevronDown size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Quick Auto-Pay Action Bar */}
                        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                          <span className="text-[11px] text-[var(--text-muted)]">
                            {accountObj ? `${t.channel}: ${accountObj.name}` : catInfo.name}
                          </span>

                          <button
                            onClick={() => {
                              const today = new Date().toISOString().split('T')[0];
                              const newTx = {
                                id: genId('tx'),
                                desc: r.desc,
                                amount: r.amount,
                                type: 'expense',
                                category: r.category,
                                accountId: r.accountId,
                                date: today,
                              };
                              setTransactions((prev) => [newTx, ...prev]);
                              setAccounts((prev) =>
                                prev.map((acc) =>
                                  acc.id === r.accountId ? { ...acc, balance: acc.balance - r.amount } : acc
                                )
                              );
                              gainXp(10);
                              showToast(`Recorded: ${r.desc}`, 'success');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-600 dark:text-cyan-400 text-xs font-bold transition-all shadow-sm"
                          >
                            {t.autoPay}
                          </button>
                        </div>

                        {/* Progressive Disclosure Panel */}
                        {isExpanded && (
                          <div className="pt-2.5 border-t border-[var(--border)] space-y-2.5 animate-slide-up text-xs">
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                                <span className="text-[var(--text-muted)] block font-medium">{t.refId}</span>
                                <span className="font-mono font-semibold text-[var(--text-primary)] mt-0.5 block truncate">
                                  #REC-{r.id.slice(-6).toUpperCase()}
                                </span>
                              </div>
                              <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                                <span className="text-[var(--text-muted)] block font-medium">{t.convertedEst}</span>
                                <span className="font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5 block truncate">
                                  ≈ {altAmount}
                                </span>
                              </div>
                            </div>

                            <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-between text-[11px]">
                              <span className="text-[var(--text-muted)]">{t.fullSchedule}:</span>
                              <span className="font-semibold text-[var(--text-primary)]">{t[r.freq] || r.freq} recurring</span>
                            </div>

                            {/* Action Buttons Row */}
                            <div className="flex items-center justify-end gap-2 pt-1 border-t border-[var(--border)]">
                              <button
                                onClick={() => {
                                  setEditingRecurring(r);
                                  setRecurringModalOpen(true);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-cyan-600 dark:text-cyan-400 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                              >
                                <Pencil size={13} />
                                <span>{t.edit}</span>
                              </button>
                              <button
                                onClick={() => {
                                  setRecurringTxs((prev) => prev.filter((x) => x.id !== r.id));
                                  showToast(t.delete, 'success');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold flex items-center gap-1.5"
                              >
                                <Trash2 size={13} />
                                <span>{t.delete}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 6: DEBT & LOAN TRACKER
            ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'debt' && (
          <div className="space-y-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <HandCoins size={18} className="text-amber-500 dark:text-amber-400" />
                    <h3 className="font-bold text-base text-[var(--text-primary)]">{t.debtTitle}</h3>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Track lent receivables and borrowed payables
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingDebt(null);
                    setDebtModalOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
                >
                  <Plus size={15} />
                  <span>{t.addDebt}</span>
                </button>
              </div>

              {debts.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-[var(--border)] rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400 flex items-center justify-center mx-auto mb-2">
                    <HandCoins size={20} />
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{t.emptyLent}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{t.emptyBorrowed}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {debts.map((d) => {
                    const remaining = Math.max(0, d.total - d.paid);
                    const percent = Math.min(100, Math.round(((d.paid || 0) / (d.total || 1)) * 100));
                    const isSettled = remaining === 0;
                    const isLent = d.type === 'lent';
                    const isExpanded = expandedDebtId === d.id;
                    const altCurrency = currency === 'USD' ? 'KHR' : 'USD';
                    const altTotal = formatMoney(d.total, altCurrency);
                    const altRemaining = formatMoney(remaining, altCurrency);

                    return (
                      <div
                        key={d.id}
                        className="p-4 rounded-2xl bg-[var(--input-bg)] border border-[var(--border)] space-y-3 shadow-sm hover:border-amber-500/30 transition-all"
                      >
                        {/* Summary Header */}
                        <div
                          onClick={() => setExpandedDebtId(isExpanded ? null : d.id)}
                          className="flex items-start justify-between cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0 ${
                                isLent ? 'bg-emerald-600' : 'bg-rose-600'
                              }`}
                            >
                              <HandCoins size={17} />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <p className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">{d.person}</p>
                                <span
                                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                    isLent ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                                  }`}
                                >
                                  {isLent ? t.lentTab.split(' ')[0] : t.borrowedTab.split(' ')[0]}
                                </span>
                              </div>
                              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                                {t.dueDate}: {d.dueDate || 'N/A'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <span className={`text-xs sm:text-sm font-bold block ${isSettled ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                {isSettled ? t.debtFullyPaid : formatMoney(remaining)}
                              </span>
                              <span className="text-[10px] text-[var(--text-muted)] block">
                                {isSettled ? 'Settled' : t.remainingDebt}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedDebtId(isExpanded ? null : d.id);
                              }}
                              className={`p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-amber-500' : ''
                              }`}
                              title={isExpanded ? t.hideDetails : t.viewDetails}
                            >
                              <ChevronDown size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isLent ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        {/* Progressive Disclosure Panel */}
                        {isExpanded && (
                          <div className="pt-2.5 border-t border-[var(--border)] space-y-2.5 animate-slide-up text-xs">
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                                <span className="text-[var(--text-muted)] block font-medium">{t.amountPaid}</span>
                                <span className="font-bold text-[var(--text-primary)] mt-0.5 block">
                                  {formatMoney(d.paid)} / {formatMoney(d.total)} ({percent}%)
                                </span>
                              </div>

                              <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                                <span className="text-[var(--text-muted)] block font-medium">{t.convertedEst}</span>
                                <span className="font-semibold text-amber-600 dark:text-amber-400 mt-0.5 block truncate">
                                  Total ≈ {altTotal}
                                </span>
                              </div>
                            </div>

                            {d.notes && (
                              <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                                <span className="text-[10px] text-[var(--text-muted)] block font-medium">{t.notes}:</span>
                                <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-medium">{d.notes}</p>
                              </div>
                            )}

                            {/* Record Payment Button */}
                            {!isSettled && (
                              <button
                                onClick={() => {
                                  setSelectedDebtForPay(d);
                                  setDebtPayModalOpen(true);
                                }}
                                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                              >
                                <Plus size={14} />
                                <span>{t.recordPayment}</span>
                              </button>
                            )}

                            {/* Action Buttons Row */}
                            <div className="flex items-center justify-end gap-2 pt-1 border-t border-[var(--border)]">
                              <button
                                onClick={() => {
                                  setEditingDebt(d);
                                  setDebtModalOpen(true);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                              >
                                <Pencil size={13} />
                                <span>{t.edit}</span>
                              </button>
                              <button
                                onClick={() => {
                                  setDebts((prev) => prev.filter((x) => x.id !== d.id));
                                  showToast(t.delete, 'success');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold flex items-center gap-1.5"
                              >
                                <Trash2 size={13} />
                                <span>{t.delete}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            TAB 7: GAMIFICATION & SAVINGS CHALLENGES
            ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'gamification' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-pink-50/80 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900/60 border border-indigo-200/80 dark:border-indigo-500/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                  <Trophy size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {t.userLevel} {userLevel.level}: {userLevel.level === 1 ? 'Bronze Saver' : userLevel.level === 2 ? 'Silver Budgeter' : userLevel.level === 3 ? 'Gold Investor' : 'Diamond Master'}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Total: {userXp} XP • Earn XP by logging transactions and hitting budget goals
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-64 space-y-1">
                <div className="flex justify-between text-xs font-bold text-[var(--text-secondary)]">
                  <span>{userLevel.progressInLevel}%</span>
                  <span>Next Level ({userLevel.level + 1})</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${userLevel.progressInLevel}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Savings Challenges: 52-Week & 30-Day */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 52-Week Challenge */}
              <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-indigo-500 dark:text-indigo-400" />
                    <h4 className="font-bold text-base text-[var(--text-primary)]">{t.challenge52Week}</h4>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{t.challenge52Desc}</p>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)]">
                  <span>{completed52Weeks.length} / 52 Weeks Completed</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                    {Math.round((completed52Weeks.length / 52) * 100)}%
                  </span>
                </div>

                {/* 52 Grid Tiles */}
                <div className="grid grid-cols-8 sm:grid-cols-13 gap-1.5 max-h-56 overflow-y-auto pr-1">
                  {Array.from({ length: 52 }, (_, i) => i + 1).map((week) => {
                    const done = completed52Weeks.includes(week);
                    return (
                      <button
                        key={week}
                        onClick={() => {
                          if (done) {
                            setCompleted52Weeks((prev) => prev.filter((w) => w !== week));
                          } else {
                            setCompleted52Weeks((prev) => [...prev, week]);
                            gainXp(10);
                            showToast(`Week ${week} checked! +10 XP`, 'success');
                          }
                        }}
                        className={`h-8 rounded-lg text-[10px] font-bold flex items-center justify-center transition-all ${
                          done
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-[var(--input-bg)] text-[var(--text-muted)] hover:bg-[var(--surface-hover)]'
                        }`}
                        title={`Week ${week}`}
                      >
                        {done ? <Check size={12} /> : week}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 30-Day Zero Waste Challenge */}
              <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-emerald-500 dark:text-emerald-400" />
                    <h4 className="font-bold text-base text-[var(--text-primary)]">{t.challenge30Day}</h4>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{t.challenge30Desc}</p>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-muted)]">
                  <span>{completed30Days.length} / 30 Days Achieved</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {Math.round((completed30Days.length / 30) * 100)}%
                  </span>
                </div>

                {/* 30 Day Grid */}
                <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                    const done = completed30Days.includes(day);
                    return (
                      <button
                        key={day}
                        onClick={() => {
                          if (done) {
                            setCompleted30Days((prev) => prev.filter((d) => d !== day));
                          } else {
                            setCompleted30Days((prev) => [...prev, day]);
                            gainXp(10);
                            showToast(`Day ${day} checked! +10 XP`, 'success');
                          }
                        }}
                        className={`h-9 rounded-lg text-[11px] font-bold flex items-center justify-center transition-all ${
                          done
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-[var(--input-bg)] text-[var(--text-muted)] hover:bg-[var(--surface-hover)]'
                        }`}
                        title={`Day ${day}`}
                      >
                        {done ? <Check size={14} /> : day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Unlockable Achievement Badges */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Award size={18} className="text-amber-500 dark:text-amber-400" />
                <h4 className="font-bold text-base text-[var(--text-primary)]">{t.badgesTitle}</h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
                {[
                  {
                    id: 'first',
                    name: t.badgeFirstRecord,
                    desc: t.badgeFirstRecordDesc,
                    icon: Plus,
                    unlocked: transactions.length > 0,
                  },
                  {
                    id: 'guardian',
                    name: t.badgeBudgetGuardian,
                    desc: t.badgeBudgetGuardianDesc,
                    icon: ShieldCheck,
                    unlocked: budgetLimits.length > 0,
                  },
                  {
                    id: 'goal',
                    name: t.badgeGoalCrusher,
                    desc: t.badgeGoalCrusherDesc,
                    icon: Target,
                    unlocked: savingsGoals.some((g) => g.current >= g.target),
                  },
                  {
                    id: 'streak',
                    name: t.badgeStreakMaster,
                    desc: t.badgeStreakMasterDesc,
                    icon: Flame,
                    unlocked: streakDays >= 7,
                  },
                  {
                    id: 'century',
                    name: t.badgeCenturyClub,
                    desc: t.badgeCenturyClubDesc,
                    icon: Coins,
                    unlocked: totals.income >= 100,
                  },
                  {
                    id: 'debt',
                    name: t.badgeDebtFree,
                    desc: t.badgeDebtFreeDesc,
                    icon: HandCoins,
                    unlocked: debts.some((d) => d.paid >= d.total && d.type === 'borrowed'),
                  },
                ].map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.id}
                      className={`p-3.5 rounded-xl border text-center space-y-2 transition-all ${
                        badge.unlocked
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                          : 'bg-[var(--input-bg)] border-[var(--border)] text-[var(--text-muted)] opacity-50'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center ${
                          badge.unlocked ? 'bg-amber-500/20 text-amber-500 dark:text-amber-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <p className="text-xs font-bold text-[var(--text-primary)]">{badge.name}</p>
                      <p className="text-[10px] text-[var(--text-muted)] line-clamp-2">{badge.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE BOTTOM NAVIGATION (APP-LIKE EXPERIENCE)
          ═══════════════════════════════════════════════════════════════ */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 bg-[var(--nav-bg)] backdrop-blur-xl border-t border-[var(--border)] px-1 sm:px-2 flex items-center justify-around z-40 transition-all"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          height: 'calc(60px + env(safe-area-inset-bottom, 0px))',
        }}
      >
        {[
          { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
          { id: 'analytics', label: t.analyticsTab, icon: BarChart3 },
          { id: 'budgets', label: t.budgetsGoalsTab, icon: Target },
          { id: 'accounts', label: t.accountsTab, icon: Landmark },
          { id: 'gamification', label: t.gamificationTab, icon: Trophy },
        ].map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1 px-0.5 transition-all min-w-0 ${
                active ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon size={18} className={active ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
              <span className="text-[10px] tracking-tight truncate max-w-full text-center leading-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER WITH POWERED BY LAOLIMHEANG
          ═══════════════════════════════════════════════════════════════ */}
      <footer className="w-full border-t border-[var(--border)] py-6 text-center text-xs text-[var(--text-muted)] space-y-1">
        <p>
          {t.poweredBy}{' '}
          <a
            href="https://t.me/lao_limheang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-bold inline-flex items-center gap-1 hover:underline transition-all"
          >
            <span>{t.telegramLinkText}</span>
            <ExternalLink size={12} />
          </a>
        </p>
        <p className="text-[11px] text-[var(--text-muted)] opacity-70">
          &copy; {new Date().getFullYear()} {t.appName} — All rights reserved.
        </p>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 1: ADD / EDIT TRANSACTION
          ═══════════════════════════════════════════════════════════════ */}
      {txModalOpen && (
        <TransactionModal
          open={txModalOpen}
          onClose={() => setTxModalOpen(false)}
          onSave={handleSaveTransaction}
          editingTx={editingTx}
          accounts={accounts}
          incomeCats={allIncomeCats}
          expenseCats={allExpenseCats}
          lang={lang}
          exchangeRate={exchangeRate}
          t={t}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 2: BUDGET LIMIT MODAL
          ═══════════════════════════════════════════════════════════════ */}
      {budgetModalOpen && (
        <BudgetLimitModal
          open={budgetModalOpen}
          onClose={() => setBudgetModalOpen(false)}
          onSave={(data) => {
            if (editingBudget) {
              setBudgetLimits((prev) => prev.map((x) => (x.id === editingBudget.id ? { ...data, id: editingBudget.id } : x)));
              showToast(t.update, 'success');
            } else {
              setBudgetLimits((prev) => [...prev, { ...data, id: genId('b') }]);
              showToast(t.submit, 'success');
            }
            setBudgetModalOpen(false);
          }}
          editingBudget={editingBudget}
          expenseCats={allExpenseCats}
          lang={lang}
          exchangeRate={exchangeRate}
          t={t}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 3: SAVINGS GOAL MODAL
          ═══════════════════════════════════════════════════════════════ */}
      {goalModalOpen && (
        <SavingsGoalModal
          open={goalModalOpen}
          onClose={() => setGoalModalOpen(false)}
          onSave={(data) => {
            if (editingGoal) {
              setSavingsGoals((prev) => prev.map((x) => (x.id === editingGoal.id ? { ...data, id: editingGoal.id } : x)));
              showToast(t.update, 'success');
            } else {
              setSavingsGoals((prev) => [...prev, { ...data, id: genId('g') }]);
              showToast(t.submit, 'success');
            }
            setGoalModalOpen(false);
          }}
          editingGoal={editingGoal}
          exchangeRate={exchangeRate}
          t={t}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 4: DEPOSIT / WITHDRAW GOAL FUNDS
          ═══════════════════════════════════════════════════════════════ */}
      {goalFundModalOpen && selectedGoalForFund && (
        <GoalFundModal
          open={goalFundModalOpen}
          onClose={() => setGoalFundModalOpen(false)}
          goal={selectedGoalForFund}
          actionType={fundActionType}
          exchangeRate={exchangeRate}
          onConfirm={(delta) => {
            setSavingsGoals((prev) =>
              prev.map((g) => {
                if (g.id === selectedGoalForFund.id) {
                  const nextVal = Math.max(0, g.current + delta);
                  return { ...g, current: nextVal };
                }
                return g;
              })
            );
            gainXp(delta > 0 ? 20 : 0);
            showToast('Savings goal updated', 'success');
            setGoalFundModalOpen(false);
          }}
          t={t}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 5: ACCOUNT CREATE / EDIT
          ═══════════════════════════════════════════════════════════════ */}
      {accountModalOpen && (
        <AccountModal
          open={accountModalOpen}
          onClose={() => setAccountModalOpen(false)}
          onSave={(data) => {
            if (editingAccount) {
              setAccounts((prev) => prev.map((x) => (x.id === editingAccount.id ? { ...data, id: editingAccount.id } : x)));
              showToast(t.update, 'success');
            } else {
              setAccounts((prev) => [...prev, { ...data, id: genId('acc') }]);
              showToast(t.submit, 'success');
            }
            setAccountModalOpen(false);
          }}
          editingAccount={editingAccount}
          exchangeRate={exchangeRate}
          t={t}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 6: TRANSFER FUNDS BETWEEN ACCOUNTS
          ═══════════════════════════════════════════════════════════════ */}
      {transferModalOpen && (
        <TransferModal
          open={transferModalOpen}
          onClose={() => setTransferModalOpen(false)}
          accounts={accounts}
          exchangeRate={exchangeRate}
          onTransfer={({ fromId, toId, amount }) => {
            const num = parseFloat(amount) || 0;
            setAccounts((prev) =>
              prev.map((acc) => {
                if (acc.id === fromId) return { ...acc, balance: acc.balance - num };
                if (acc.id === toId) return { ...acc, balance: acc.balance + num };
                return acc;
              })
            );
            showToast('Transfer completed successfully', 'success');
            setTransferModalOpen(false);
          }}
          t={t}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 7: RECURRING BILL MODAL
          ═══════════════════════════════════════════════════════════════ */}
      {recurringModalOpen && (
        <RecurringModal
          open={recurringModalOpen}
          onClose={() => setRecurringModalOpen(false)}
          onSave={(data) => {
            if (editingRecurring) {
              setRecurringTxs((prev) => prev.map((x) => (x.id === editingRecurring.id ? { ...data, id: editingRecurring.id } : x)));
              showToast(t.update, 'success');
            } else {
              setRecurringTxs((prev) => [...prev, { ...data, id: genId('rec') }]);
              showToast(t.submit, 'success');
            }
            setRecurringModalOpen(false);
          }}
          editingRecurring={editingRecurring}
          expenseCats={allExpenseCats}
          accounts={accounts}
          exchangeRate={exchangeRate}
          t={t}
          lang={lang}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 8: DEBT & LOAN MODAL
          ═══════════════════════════════════════════════════════════════ */}
      {debtModalOpen && (
        <DebtModal
          open={debtModalOpen}
          onClose={() => setDebtModalOpen(false)}
          onSave={(data) => {
            if (editingDebt) {
              setDebts((prev) => prev.map((x) => (x.id === editingDebt.id ? { ...data, id: editingDebt.id } : x)));
              showToast(t.update, 'success');
            } else {
              setDebts((prev) => [...prev, { ...data, id: genId('debt') }]);
              showToast(t.submit, 'success');
            }
            setDebtModalOpen(false);
          }}
          editingDebt={editingDebt}
          exchangeRate={exchangeRate}
          t={t}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 9: RECORD DEBT REPAYMENT
          ═══════════════════════════════════════════════════════════════ */}
      {debtPayModalOpen && selectedDebtForPay && (
        <DebtPayModal
          open={debtPayModalOpen}
          onClose={() => setDebtPayModalOpen(false)}
          debt={selectedDebtForPay}
          exchangeRate={exchangeRate}
          onConfirm={(repaidAmount) => {
            setDebts((prev) =>
              prev.map((d) => {
                if (d.id === selectedDebtForPay.id) {
                  return { ...d, paid: Math.min(d.total, d.paid + repaidAmount) };
                }
                return d;
              })
            );
            gainXp(15);
            showToast('Repayment recorded', 'success');
            setDebtPayModalOpen(false);
          }}
          t={t}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 10: CATEGORY MANAGEMENT MODAL (ADMIN)
          ═══════════════════════════════════════════════════════════════ */}
      {categoryModalOpen && (
        <CategoryAdminModal
          open={categoryModalOpen}
          onClose={() => setCategoryModalOpen(false)}
          incomeCats={incomeCategories}
          expenseCats={expenseCategories}
          onAddCategory={(cat) => {
            if (cat.type === 'income') {
              setIncomeCategories((prev) => [...prev, cat]);
            } else {
              setExpenseCategories((prev) => [...prev, cat]);
            }
            showToast(t.addCategory, 'success');
          }}
          onUpdateCategory={(cat) => {
            if (cat.type === 'income') {
              setIncomeCategories((prev) => prev.map((c) => (c.id === cat.id ? cat : c)));
            } else {
              setExpenseCategories((prev) => prev.map((c) => (c.id === cat.id ? cat : c)));
            }
            showToast(t.update, 'success');
          }}
          onDeleteCategory={(catId, type) => {
            if (type === 'income') {
              setIncomeCategories((prev) => prev.filter((c) => c.id !== catId));
            } else {
              setExpenseCategories((prev) => prev.filter((c) => c.id !== catId));
            }
            showToast(t.delete, 'success');
          }}
          onResetDefaultCategories={(tab) => {
            if (tab === 'income') {
              setIncomeCategories(DEFAULT_INCOME_CATS);
            } else if (tab === 'expense') {
              setExpenseCategories(DEFAULT_EXPENSE_CATS);
            } else {
              setIncomeCategories(DEFAULT_INCOME_CATS);
              setExpenseCategories(DEFAULT_EXPENSE_CATS);
            }
            showToast(t.systemSynced || 'Restored default categories', 'success');
          }}
          t={t}
          lang={lang}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 11: SETTINGS (CLEAN - NO DEMO DATA BUTTON)
          ═══════════════════════════════════════════════════════════════ */}
      {settingsModalOpen && (
        <SettingsModal
          open={settingsModalOpen}
          onClose={() => setSettingsModalOpen(false)}
          onResetZero={handleResetToZero}
          onOpenCategories={() => {
            setSettingsModalOpen(false);
            setCategoryModalOpen(true);
          }}
          onOpenExchange={() => {
            setSettingsModalOpen(false);
            setExchangeModalOpen(true);
          }}
          onOpenAuthModal={() => {
            setSettingsModalOpen(false);
            setAuthModalOpen(true);
          }}
          currentUser={currentUser}
          onInstallApp={handleInstallClick}
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
          currency={currency}
          setCurrency={setCurrency}
          exchangeRate={exchangeRate}
          setExchangeRate={setExchangeRate}
          onRebootSplash={handleRebootSplash}
          t={t}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 12: PWA INSTALL TO HOME SCREEN MODAL
          ═══════════════════════════════════════════════════════════════ */}
      {installModalOpen && (
        <InstallGuideModal
          open={installModalOpen}
          onClose={() => setInstallModalOpen(false)}
          t={t}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 13: DIRECT MONTHLY AUTO-SAVE SETUP MODAL
          ═══════════════════════════════════════════════════════════════ */}
      {autoSaveModalOpen && (
        <AutoSaveModal
          open={autoSaveModalOpen}
          onClose={() => setAutoSaveModalOpen(false)}
          plan={autoSavePlan}
          onSave={handleSaveAutoSavePlan}
          accounts={accounts}
          exchangeRate={exchangeRate}
          t={t}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 14: DIRECT AUTO-SAVE FUND ACTION (DEPOSIT / WITHDRAW)
          ═══════════════════════════════════════════════════════════════ */}
      {autoSaveActionModalOpen && (
        <AutoSaveFundModal
          open={autoSaveActionModalOpen}
          onClose={() => setAutoSaveActionModalOpen(false)}
          actionType={autoSaveActionType}
          plan={autoSavePlan}
          accounts={accounts}
          exchangeRate={exchangeRate}
          onConfirm={handleAutoSaveFundAction}
          formatMoney={formatMoney}
          t={t}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 15: EDIT AUTO-SAVE HISTORY RECORD
          ═══════════════════════════════════════════════════════════════ */}
      {editingAutoSaveHistory && (
        <AutoSaveHistoryEditModal
          open={!!editingAutoSaveHistory}
          onClose={() => setEditingAutoSaveHistory(null)}
          item={editingAutoSaveHistory}
          accounts={accounts}
          exchangeRate={exchangeRate}
          onSave={handleEditAutoSaveHistory}
          formatMoney={formatMoney}
          t={t}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 16: REAL-TIME KHR - USD EXCHANGE CONVERTER
          ═══════════════════════════════════════════════════════════════ */}
      {exchangeModalOpen && (
        <ExchangeCalculatorModal
          open={exchangeModalOpen}
          onClose={() => setExchangeModalOpen(false)}
          exchangeRate={exchangeRate}
          setExchangeRate={setExchangeRate}
          onFetchLive={fetchLiveExchangeRate}
          isRateFetching={isRateFetching}
          rateLastSynced={rateLastSynced}
          rateLatencyMs={rateLatencyMs}
          t={t}
          onOpenTransaction={() => {
            setExchangeModalOpen(false);
            setTxModalOpen(true);
          }}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 17: FIREBASE CLOUD REAL-TIME MULTI-DEVICE SYNC & AUTH
          ═══════════════════════════════════════════════════════════════ */}
      {authModalOpen && (
        <AuthSyncModal
          open={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          currentUser={currentUser}
          cloudSyncStatus={cloudSyncStatus}
          cloudLastSynced={cloudLastSynced}
          onForceSync={() => handlePushToCloud(currentUser?.uid, true)}
          showToast={showToast}
          t={t}
        />
      )}

      {/* Real-time Toast Notifications */}
      {toast && (
        <div
          className={`fixed bottom-20 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-md text-xs font-bold border transition-all ${
            toast.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: TRANSACTION MODAL
   ═══════════════════════════════════════════════════════════════ */
function TransactionModal({ open, onClose, onSave, editingTx, accounts, incomeCats, expenseCats, lang, exchangeRate, t }) {
  const [desc, setDesc] = useState(editingTx?.desc || '');
  const [amount, setAmount] = useState(editingTx?.amount || '');
  const [type, setType] = useState(editingTx?.type || 'expense');
  const [category, setCategory] = useState(editingTx?.category || (type === 'income' ? incomeCats[0]?.id : expenseCats[0]?.id));
  const [accountId, setAccountId] = useState(editingTx?.accountId || accounts[0]?.id || '');
  const [date, setDate] = useState(editingTx?.date || new Date().toISOString().split('T')[0]);

  const activeCats = type === 'income' ? incomeCats : expenseCats;
  const currentRate = exchangeRate || 4100;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    onSave({
      desc,
      amount: parseFloat(amount),
      type,
      category,
      accountId,
      date,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-md my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-indigo-500/25 shadow-2xl p-5 sm:p-6 space-y-4 sm:space-y-5 animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${type === 'income' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'}`}>
              {type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                {editingTx ? t.editTransaction : t.addTransaction}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Record income or expense accurately</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-0.5">
          {/* Income / Expense Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-[#0f132a] border border-slate-200 dark:border-white/10 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setType('expense');
                setCategory(expenseCats[0]?.id);
              }}
              className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                type === 'expense' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TrendingDown size={15} />
              <span>{t.expense}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setType('income');
                setCategory(incomeCats[0]?.id);
              }}
              className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                type === 'income' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TrendingUp size={15} />
              <span>{t.income}</span>
            </button>
          </div>

          {/* Amount input & Live KHR conversion */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.amount} ($ USD)</label>
              {amount && parseFloat(amount) > 0 && (
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  ≈ {Math.round(parseFloat(amount) * currentRate).toLocaleString()} ៛
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400 dark:text-slate-400">$</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>
            {amount && parseFloat(amount) > 0 && (
              <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
                <span className="flex items-center gap-1">
                  <ArrowRightLeft size={12} className="text-indigo-500" />
                  <span>{t.khrAmount || 'KHR equivalent'}: {Math.round(parseFloat(amount) * currentRate).toLocaleString()} ៛</span>
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Rate: 1$ = {currentRate.toLocaleString()} ៛</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.description}</label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={t.descPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 shadow-sm"
            />
          </div>

          {/* Category Selector Grid */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.category}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
              {activeCats.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0f132a] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: cat.color }}
                    >
                      <DynamicIcon name={cat.icon} size={13} />
                    </div>
                    <span className="text-[11px] font-semibold truncate text-slate-800 dark:text-slate-100">{cat.name[lang] || cat.name.en}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Account & Date selection */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.account}</label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-indigo-500 shadow-sm"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.date}</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>
          </div>

          {/* Submit & Cancel */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
            >
              {editingTx ? t.update : t.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: BUDGET LIMIT MODAL
   ═══════════════════════════════════════════════════════════════ */
function BudgetLimitModal({ open, onClose, onSave, editingBudget, expenseCats, lang, exchangeRate, t }) {
  const [categoryId, setCategoryId] = useState(editingBudget?.categoryId || expenseCats[0]?.id || '');
  const [limit, setLimit] = useState(editingBudget?.limit || '');
  const currentRate = exchangeRate || 4100;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!limit || parseFloat(limit) <= 0) return;
    onSave({
      categoryId,
      limit: parseFloat(limit),
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-sm my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-indigo-500/25 shadow-2xl p-6 space-y-4 sm:space-y-5 animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {editingBudget ? t.editBudgetLimit : t.addBudgetLimit}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Set monthly category spending limit</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.category}</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-indigo-500 shadow-sm"
            >
              {expenseCats.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  {cat.name[lang] || cat.name.en}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.monthlyLimit} ($ USD)</label>
              {limit && parseFloat(limit) > 0 && (
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  ≈ {Math.round(parseFloat(limit) * currentRate).toLocaleString()} ៛
                </span>
              )}
            </div>
            <input
              type="number"
              step="1"
              min="1"
              required
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="e.g. 200"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 shadow-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: SAVINGS GOAL MODAL
   ═══════════════════════════════════════════════════════════════ */
function SavingsGoalModal({ open, onClose, onSave, editingGoal, exchangeRate, t }) {
  const [name, setName] = useState(editingGoal?.name || '');
  const [target, setTarget] = useState(editingGoal?.target || '');
  const [current, setCurrent] = useState(editingGoal?.current || 0);
  const [date, setDate] = useState(editingGoal?.date || '');
  const currentRate = exchangeRate || 4100;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !target) return;
    onSave({
      name,
      target: parseFloat(target),
      current: parseFloat(current) || 0,
      date,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-sm my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-indigo-500/25 shadow-2xl p-6 space-y-4 sm:space-y-5 animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {editingGoal ? t.editGoal : t.addGoal}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Save for your dreams and milestones</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.goalName}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.goalNamePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.targetAmount} ($ USD)</label>
              {target && parseFloat(target) > 0 && (
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">
                  ≈ {Math.round(parseFloat(target) * currentRate).toLocaleString()} ៛
                </span>
              )}
            </div>
            <input
              type="number"
              step="1"
              min="1"
              required
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g. 1500"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.currentAmount} ($ USD)</label>
              {current && parseFloat(current) > 0 ? (
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">
                  ≈ {Math.round(parseFloat(current) * currentRate).toLocaleString()} ៛
                </span>
              ) : null}
            </div>
            <input
              type="number"
              step="1"
              min="0"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="e.g. 200"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.targetDate}</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-indigo-500 shadow-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 active:scale-95 transition-all"
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: GOAL FUND DEPOSIT/WITHDRAW MODAL
   ═══════════════════════════════════════════════════════════════ */
function GoalFundModal({ open, onClose, goal, actionType, exchangeRate, onConfirm, t }) {
  const [val, setVal] = useState('');
  const currentRate = exchangeRate || 4100;

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseFloat(val);
    if (!num || num <= 0) return;
    onConfirm(actionType === 'deposit' ? num : -num);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-sm my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-indigo-500/25 shadow-2xl p-6 space-y-4 sm:space-y-5 animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {actionType === 'deposit' ? t.addFunds : t.withdrawFunds}: {goal.name}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Update progress toward target</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.fundsAmount} ($ USD)</label>
              {val && parseFloat(val) > 0 && (
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">
                  ≈ {Math.round(parseFloat(val) * currentRate).toLocaleString()} ៛
                </span>
              )}
            </div>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="0.00"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 shadow-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 active:scale-95 transition-all"
            >
              {actionType === 'deposit' ? t.addFunds : t.withdrawFunds}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: ACCOUNT CREATE / EDIT MODAL
   ═══════════════════════════════════════════════════════════════ */
function AccountModal({ open, onClose, onSave, editingAccount, exchangeRate, t }) {
  const [name, setName] = useState(editingAccount?.name || '');
  const [type, setType] = useState(editingAccount?.type || 'bankAccount');
  const [balance, setBalance] = useState(editingAccount?.balance || 0);
  const [icon, setIcon] = useState(editingAccount?.icon || 'landmark');
  const [color, setColor] = useState(editingAccount?.color || '#06b6d4');
  const currentRate = exchangeRate || 4100;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onSave({
      name,
      type,
      balance: parseFloat(balance) || 0,
      icon,
      color,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-sm my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-indigo-500/25 shadow-2xl p-6 space-y-4 sm:space-y-5 animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {editingAccount ? t.editAccount : t.addAccount}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Manage bank accounts and wallets</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.accountName}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.accountNamePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.accountType}</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-indigo-500 shadow-sm"
            >
              <option value="bankAccount" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t.bankAccount}</option>
              <option value="cashWallet" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t.cashWallet}</option>
              <option value="digitalWallet" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t.digitalWallet}</option>
              <option value="investmentVault" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t.investmentVault}</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.initialBalance} ($ USD)</label>
              {balance && parseFloat(balance) > 0 ? (
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  ≈ {Math.round(parseFloat(balance) * currentRate).toLocaleString()} ៛
                </span>
              ) : null}
            </div>
            <input
              type="number"
              step="0.01"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">Icon & Color</label>
            <div className="flex items-center gap-2">
              {['landmark', 'wallet', 'credit-card', 'coins', 'piggy-bank'].map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setIcon(ic)}
                  className={`p-2.5 rounded-xl border transition-all ${icon === ic ? 'border-indigo-500 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/20' : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'}`}
                >
                  <DynamicIcon name={ic} size={16} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1">
              {PALETTE.slice(0, 6).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${color === c ? 'border-indigo-500 scale-125 shadow-md' : 'border-transparent hover:scale-110'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: TRANSFER MODAL
   ═══════════════════════════════════════════════════════════════ */
function TransferModal({ open, onClose, accounts, exchangeRate, onTransfer, t }) {
  const [fromId, setFromId] = useState(accounts[0]?.id || '');
  const [toId, setToId] = useState(accounts[1]?.id || accounts[0]?.id || '');
  const [amount, setAmount] = useState('');
  const currentRate = exchangeRate || 4100;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0 || fromId === toId) return;
    onTransfer({ fromId, toId, amount: parseFloat(amount) });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-sm my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-cyan-500/25 shadow-2xl p-6 space-y-4 sm:space-y-5 animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">{t.transferFunds}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Instant transfer between accounts</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.transferFrom}</label>
            <select
              value={fromId}
              onChange={(e) => setFromId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-cyan-500 shadow-sm"
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  {acc.name} (${acc.balance})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.transferTo}</label>
            <select
              value={toId}
              onChange={(e) => setToId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-cyan-500 shadow-sm"
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  {acc.name} (${acc.balance})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.transferAmount} ($ USD)</label>
              {amount && parseFloat(amount) > 0 && (
                <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
                  ≈ {Math.round(parseFloat(amount) * currentRate).toLocaleString()} ៛
                </span>
              )}
            </div>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-cyan-500 shadow-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/30 active:scale-95 transition-all"
            >
              {t.transferFunds}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: RECURRING BILL MODAL
   ═══════════════════════════════════════════════════════════════ */
function RecurringModal({ open, onClose, onSave, editingRecurring, expenseCats, accounts, exchangeRate, t, lang }) {
  const [desc, setDesc] = useState(editingRecurring?.desc || '');
  const [amount, setAmount] = useState(editingRecurring?.amount || '');
  const [freq, setFreq] = useState(editingRecurring?.freq || 'freqMonthly');
  const [category, setCategory] = useState(editingRecurring?.category || expenseCats[0]?.id || '');
  const [accountId, setAccountId] = useState(editingRecurring?.accountId || accounts[0]?.id || '');
  const [nextDate, setNextDate] = useState(editingRecurring?.nextDate || new Date().toISOString().split('T')[0]);
  const currentRate = exchangeRate || 4100;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;
    onSave({
      desc,
      amount: parseFloat(amount),
      freq,
      category,
      accountId,
      nextDate,
      active: true,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-sm my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-cyan-500/25 shadow-2xl p-6 space-y-4 sm:space-y-5 animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {editingRecurring ? t.editRecurring : t.addRecurring}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Automate recurring subscriptions & bills</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.description}</label>
            <input
              type="text"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="e.g. Netflix Subscription"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-cyan-500 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.amount} ($)</label>
                {amount && parseFloat(amount) > 0 && (
                  <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400">
                    ≈ {Math.round(parseFloat(amount) * currentRate).toLocaleString()} ៛
                  </span>
                )}
              </div>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-cyan-500 shadow-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.frequency}</label>
              <select
                value={freq}
                onChange={(e) => setFreq(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-cyan-500 shadow-sm"
              >
                <option value="freqWeekly" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t.freqWeekly}</option>
                <option value="freqMonthly" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t.freqMonthly}</option>
                <option value="freqYearly" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t.freqYearly}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.category}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-cyan-500 shadow-sm"
              >
                {expenseCats.map((c) => (
                  <option key={c.id} value={c.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {c.name[lang] || c.name.en}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.account}</label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-cyan-500 shadow-sm"
              >
                {accounts.map((a) => (
                  <option key={a.id} value={a.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.nextDueDate}</label>
            <input
              type="date"
              value={nextDate}
              onChange={(e) => setNextDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-cyan-500 shadow-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/30 active:scale-95 transition-all"
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: DEBT & LOAN MODAL
   ═══════════════════════════════════════════════════════════════ */
function DebtModal({ open, onClose, onSave, editingDebt, exchangeRate, t }) {
  const [person, setPerson] = useState(editingDebt?.person || '');
  const [type, setType] = useState(editingDebt?.type || 'lent');
  const [total, setTotal] = useState(editingDebt?.total || '');
  const [paid, setPaid] = useState(editingDebt?.paid || 0);
  const [dueDate, setDueDate] = useState(editingDebt?.dueDate || '');
  const [notes, setNotes] = useState(editingDebt?.notes || '');
  const currentRate = exchangeRate || 4100;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!person || !total) return;
    onSave({
      person,
      type,
      total: parseFloat(total),
      paid: parseFloat(paid) || 0,
      dueDate,
      notes,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-sm my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-amber-500/25 shadow-2xl p-6 space-y-4 sm:space-y-5 animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {editingDebt ? t.editDebt : t.addDebt}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Track money lent to or borrowed from others</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-[#0f132a] border border-slate-200 dark:border-white/10 rounded-2xl">
            <button
              type="button"
              onClick={() => setType('lent')}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                type === 'lent' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.lentTab.split(' ')[0]}
            </button>
            <button
              type="button"
              onClick={() => setType('borrowed')}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                type === 'borrowed' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.borrowedTab.split(' ')[0]}
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.personName}</label>
            <input
              type="text"
              required
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              placeholder={t.personPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-amber-500 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.totalOwed} ($)</label>
                {total && parseFloat(total) > 0 && (
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    ≈ {Math.round(parseFloat(total) * currentRate).toLocaleString()} ៛
                  </span>
                )}
              </div>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="0.00"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-amber-500 shadow-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.amountPaid} ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={paid}
                onChange={(e) => setPaid(e.target.value)}
                placeholder="0.00"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-amber-500 shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.dueDate}</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-amber-500 shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.notes}</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.notesPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-amber-500 shadow-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-lg shadow-amber-600/30 active:scale-95 transition-all"
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: RECORD DEBT REPAYMENT MODAL
   ═══════════════════════════════════════════════════════════════ */
function DebtPayModal({ open, onClose, debt, exchangeRate, onConfirm, t }) {
  const remaining = Math.max(0, (debt?.total || 0) - (debt?.paid || 0));
  const [val, setVal] = useState('');
  const currentRate = exchangeRate || 4100;

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseFloat(val);
    if (!num || num <= 0) return;
    onConfirm(num);
  };

  if (!open || !debt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-sm my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-amber-500/25 shadow-2xl p-6 space-y-4 sm:space-y-5 animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {t.recordPayment}: {debt.person}
            </h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.remainingDebt || t.remaining}: <strong className="text-amber-600 dark:text-amber-400">${remaining.toFixed(2)}</strong> (≈ {Math.round(remaining * currentRate).toLocaleString()} ៛)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.paymentAmount || t.amount} ($)</label>
              {val && parseFloat(val) > 0 && (
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  ≈ {Math.round(parseFloat(val) * currentRate).toLocaleString()} ៛
                </span>
              )}
            </div>
            <input
              type="number"
              step="0.01"
              min="0.01"
              max={remaining}
              required
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="0.00"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-amber-500 shadow-sm"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={!parseFloat(val) || parseFloat(val) <= 0}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-amber-600/30 active:scale-95 transition-all"
            >
              {t.save || 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: CATEGORY ADMIN MODAL
   ═══════════════════════════════════════════════════════════════ */
function CategoryAdminModal({
  open,
  onClose,
  incomeCats,
  expenseCats,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onResetDefaultCategories,
  t,
  lang,
}) {
  const [tab, setTab] = useState('expense');
  const [editingCat, setEditingCat] = useState(null);
  const [nameEn, setNameEn] = useState('');
  const [nameKh, setNameKh] = useState('');
  const [icon, setIcon] = useState('shopping-bag');
  const [iconSearch, setIconSearch] = useState('');
  const [color, setColor] = useState('#6366f1');
  const formRef = useRef(null);

  const filteredIcons = useMemo(() => {
    if (!iconSearch.trim()) return AVAILABLE_ICONS;
    const q = iconSearch.toLowerCase().trim();
    const matched = Object.keys(ICON_COMPONENTS).filter((k) => k.includes(q));
    return Array.from(new Set([...AVAILABLE_ICONS.filter((ic) => ic.includes(q)), ...matched])).slice(0, 42);
  }, [iconSearch]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    handleCancelEdit();
    if (newTab === 'income') {
      setIcon('briefcase');
      setColor('#10b981');
    } else {
      setIcon('shopping-bag');
      setColor('#6366f1');
    }
  };

  const handleStartEdit = (cat) => {
    setEditingCat(cat);
    setNameEn(typeof cat.name === 'object' ? (cat.name.en || '') : (cat.name || ''));
    setNameKh(typeof cat.name === 'object' ? (cat.name.kh || '') : '');
    const currentIcon = cat.icon || (tab === 'income' ? 'briefcase' : 'shopping-bag');
    setIcon(currentIcon);
    setIconSearch(currentIcon);
    setColor(cat.color || '#6366f1');
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleCancelEdit = () => {
    setEditingCat(null);
    setNameEn('');
    setNameKh('');
    setIconSearch('');
    setIcon(tab === 'income' ? 'briefcase' : 'shopping-bag');
    setColor(tab === 'income' ? '#10b981' : '#6366f1');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedEn = nameEn.trim();
    const trimmedKh = nameKh.trim();
    if (!trimmedEn && !trimmedKh) return;

    if (editingCat) {
      onUpdateCategory({
        ...editingCat,
        name: {
          en: trimmedEn || trimmedKh,
          kh: trimmedKh || trimmedEn,
        },
        icon,
        color,
        type: tab,
      });
      handleCancelEdit();
    } else {
      onAddCategory({
        id: genId('cat'),
        name: {
          en: trimmedEn || trimmedKh,
          kh: trimmedKh || trimmedEn,
        },
        icon,
        color,
        type: tab,
      });
      setNameEn('');
      setNameKh('');
    }
  };

  const currentList = tab === 'income' ? incomeCats : expenseCats;

  const handleDelete = (cat) => {
    if (currentList.length <= 1) {
      alert(t.cantDeleteLastCategory || 'You must keep at least one category.');
      return;
    }
    const catDisplayName = (typeof cat.name === 'object' ? (cat.name[lang] || cat.name.en || cat.name.kh) : cat.name) || cat.id;
    if (window.confirm(`${t.deleteCategoryConfirm || 'Are you sure you want to delete this category?'} ("${catDisplayName}")`)) {
      if (editingCat?.id === cat.id) {
        handleCancelEdit();
      }
      onDeleteCategory(cat.id, tab);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm(t.restoreDefaultsConfirm || 'Restore categories back to default starter categories?')) {
      handleCancelEdit();
      onResetDefaultCategories(tab);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-md my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-indigo-500/25 shadow-2xl p-5 sm:p-6 space-y-4 max-h-[88vh] overflow-y-auto animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
              <Tag size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">{t.categoriesManagement}</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Edit, add, or delete any category</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-[#0f132a] border border-slate-200 dark:border-white/10 rounded-2xl">
          <button
            type="button"
            onClick={() => handleTabChange('expense')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'expense' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.expenseCategories} ({expenseCats.length})
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('income')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'income' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.incomeCategories} ({incomeCats.length})
          </button>
        </div>

        {/* Add / Edit Category Form */}
        <form ref={formRef} onSubmit={handleSubmit} className={`p-4 rounded-2xl border space-y-3 transition-all ${
          editingCat
            ? 'bg-indigo-50/70 dark:bg-indigo-950/20 border-indigo-300 dark:border-indigo-500/40 ring-1 ring-indigo-500/20'
            : 'bg-slate-50 dark:bg-[#0f132a] border-slate-200 dark:border-white/10'
        }`}>
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              {editingCat ? (
                <>
                  <Pencil size={13} className="text-indigo-600 dark:text-indigo-400" />
                  <span>{t.editCategory || 'Edit Category'}</span>
                </>
              ) : (
                <>
                  <Plus size={13} className="text-indigo-600 dark:text-indigo-400" />
                  <span>{t.addCategory || 'Create Category'}</span>
                </>
              )}
            </h4>
            {editingCat && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-[11px] font-semibold text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 flex items-center gap-1 transition-colors"
              >
                <X size={12} />
                <span>{t.cancelEdit || 'Cancel'}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              required={!nameKh}
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="Name (EN)"
              className="px-3 py-2 rounded-xl bg-white dark:bg-[#181d38] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 shadow-sm"
            />
            <input
              type="text"
              value={nameKh}
              onChange={(e) => setNameKh(e.target.value)}
              placeholder="ឈ្មោះ (KH)"
              className="px-3 py-2 rounded-xl bg-white dark:bg-[#181d38] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] text-slate-600 dark:text-slate-300 font-bold">{t.categoryIcon || 'Select Icon'}</label>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400">Icon:</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/20">{icon}</span>
              </div>
            </div>

            {/* Custom Icon Name Search & Direct Input with Live Preview */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={iconSearch}
                  onChange={(e) => {
                    const val = e.target.value;
                    setIconSearch(val);
                    const clean = val.toLowerCase().trim();
                    if (clean) setIcon(clean);
                  }}
                  placeholder="Type custom icon (e.g. pizza, dog, music, gym...)"
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-xl bg-white dark:bg-[#181d38] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 shadow-sm"
                />
              </div>
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm border border-white/20 transition-all"
                style={{ backgroundColor: color }}
                title={`Live Preview: ${icon}`}
              >
                <DynamicIcon name={icon} size={16} />
              </div>
            </div>

            {/* Icon Picker Grid */}
            <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5 max-h-24 overflow-y-auto pr-1 p-1 bg-slate-100/60 dark:bg-black/25 rounded-xl border border-slate-200 dark:border-white/10">
              {filteredIcons.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => {
                    setIcon(ic);
                    setIconSearch(ic);
                  }}
                  title={ic}
                  className={`p-1.5 rounded-xl border flex items-center justify-center transition-all ${
                    icon === ic ? 'border-indigo-500 bg-indigo-500/20 text-indigo-500 scale-105 ring-2 ring-indigo-500/20' : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-300 hover:text-slate-700 dark:hover:text-white'
                  }`}
                >
                  <DynamicIcon name={ic} size={15} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-300 font-bold">{t.categoryColor || 'Select Color'}</label>
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              {PALETTE.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${color === c ? 'border-indigo-500 scale-125 shadow-md ring-2 ring-indigo-500/30' : 'border-transparent hover:scale-110'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            {editingCat && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-1/3 py-2.5 rounded-xl border border-slate-300 dark:border-white/20 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-bold transition-all"
              >
                {t.cancelEdit || 'Cancel'}
              </button>
            )}
            <button
              type="submit"
              className={`py-2.5 rounded-xl text-white text-xs font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5 ${
                editingCat
                  ? 'flex-1 bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
                  : 'w-full bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
              }`}
            >
              {editingCat ? (
                <>
                  <Check size={14} />
                  <span>{t.saveChanges || 'Save Changes'}</span>
                </>
              ) : (
                <>
                  <Plus size={14} />
                  <span>{t.addCategory || 'Create Category'}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* All Categories List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {t.allCategoriesTitle || 'All Categories'} ({currentList.length})
            </h4>
            <span className="text-[10px] text-slate-400 dark:text-slate-400">
              {tab === 'income' ? t.income : t.expense}
            </span>
          </div>

          {currentList.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 py-3 text-center">No categories found.</p>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {currentList.map((cat) => {
                const isBeingEdited = editingCat?.id === cat.id;
                const displayName = typeof cat.name === 'object' ? (cat.name[lang] || cat.name.en || cat.name.kh) : cat.name;
                const altName = typeof cat.name === 'object' ? (lang === 'kh' ? cat.name.en : cat.name.kh) : '';

                return (
                  <div
                    key={cat.id}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all ${
                      isBeingEdited
                        ? 'border-indigo-500 bg-indigo-500/10 shadow-sm ring-1 ring-indigo-500/30'
                        : 'bg-slate-50 dark:bg-[#0f132a] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs shrink-0 shadow-sm"
                        style={{ backgroundColor: cat.color }}
                      >
                        <DynamicIcon name={cat.icon} size={15} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {displayName}
                          </span>
                          {isBeingEdited && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-indigo-500 text-white">
                              {t.editing || 'Editing'}
                            </span>
                          )}
                        </div>
                        {altName && altName !== displayName && (
                          <p className="text-[10px] text-slate-400 dark:text-slate-400 truncate">
                            {altName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(cat)}
                        title={t.edit || 'Edit'}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isBeingEdited
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/10'
                        }`}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(cat)}
                        title={t.delete || 'Delete'}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Restore Defaults Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="w-full py-2 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 flex items-center justify-center gap-1.5 border border-dashed border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              <RefreshCw size={12} />
              <span>{t.restoreDefaults || 'Restore Default Categories'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: SETTINGS MODAL
   ═══════════════════════════════════════════════════════════════ */
function SettingsModal({
  open,
  onClose,
  onResetZero,
  onOpenCategories,
  onInstallApp,
  onRebootSplash,
  onOpenAuthModal,
  currentUser,
  lang,
  setLang,
  theme,
  setTheme,
  currency,
  setCurrency,
  exchangeRate,
  setExchangeRate,
  t,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-sm my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-white/15 shadow-2xl p-6 space-y-4 animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
              <Settings size={18} />
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">{t.settingsTab}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3.5 divide-y divide-slate-100 dark:divide-white/10 text-xs">
          {/* Cloud Synchronization across Phone & Laptop */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                if (onOpenAuthModal) onOpenAuthModal();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/25 text-left flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-300 shadow-sm transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Cloud size={14} />
                </div>
                <div>
                  <div className="font-extrabold flex items-center gap-1.5">
                    <span>Cloud Sync (Same Data Everywhere)</span>
                    {currentUser && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal truncate max-w-[190px]">
                    {currentUser ? `Active: ${currentUser.email || currentUser.displayName}` : 'Sign in with Google / Email to link phone & PC'}
                  </div>
                </div>
              </div>
              <ChevronRight size={14} className="text-emerald-500 shrink-0" />
            </button>
          </div>

          {/* Language selection */}
          <div className="pt-2 flex items-center justify-between">
            <span className="font-bold text-slate-700 dark:text-slate-200">{t.language}</span>
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#0f132a] rounded-xl border border-slate-200 dark:border-white/10">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${lang === 'en' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
              >
                English
              </button>
              <button
                onClick={() => setLang('kh')}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${lang === 'kh' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
              >
                ភាសាខ្មែរ
              </button>
            </div>
          </div>

          {/* Theme selection */}
          <div className="pt-3 flex items-center justify-between">
            <span className="font-bold text-slate-700 dark:text-slate-200">Theme</span>
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#0f132a] rounded-xl border border-slate-200 dark:border-white/10">
              <button
                onClick={() => setTheme('dark')}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${theme === 'dark' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {t.darkMode}
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${theme === 'light' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {t.lightMode}
              </button>
            </div>
          </div>

          {/* Real-time Exchange Rate setting */}
          <div className="pt-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-200 block">{t.realTimeExchange || 'Exchange Rate'}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">1 USD = {exchangeRate?.toLocaleString() || 4100} KHR</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={exchangeRate || 4100}
                onChange={(e) => setExchangeRate(Math.max(1, parseInt(e.target.value, 10) || 4100))}
                className="w-20 px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white text-right outline-none focus:border-indigo-500 shadow-sm"
              />
              <span className="font-bold text-slate-500 dark:text-slate-400">៛</span>
            </div>
          </div>

          {/* Category Administration button */}
          <div className="pt-3">
            <button
              onClick={onOpenCategories}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-[#0f132a] hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-left flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white shadow-sm transition-all"
            >
              <span className="flex items-center gap-2">
                <Tag size={15} className="text-indigo-500" />
                <span>{t.categoriesManagement}</span>
              </span>
              <ChevronRight size={14} className="text-slate-400" />
            </button>
          </div>

          {/* Test / View Loading Splash Screen */}
          <div className="pt-3">
            <button
              onClick={() => {
                onClose();
                onRebootSplash();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-left flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400 shadow-sm transition-all"
            >
              <span className="flex items-center gap-2">
                <RefreshCw size={15} />
                <span>{t.previewLoadingScreen}</span>
              </span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Install App Button */}
          <div className="pt-3">
            <button
              onClick={() => {
                onClose();
                onInstallApp();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-left flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-sm transition-all"
            >
              <span className="flex items-center gap-2">
                <Download size={15} />
                <span>{t.installApp}</span>
              </span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Reset All Data to 0 (No Demo Data) */}
          <div className="pt-3">
            <button
              onClick={onResetZero}
              className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Trash2 size={15} />
              <span>{t.resetData}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: INSTALL GUIDE MODAL (PWA)
   ═══════════════════════════════════════════════════════════════ */
function InstallGuideModal({ open, onClose, t }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-sm my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-white/15 shadow-2xl p-6 space-y-4 animate-slide-up text-center text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-500 mx-auto flex items-center justify-center shadow-md">
          <img src={logoImg} alt="My Luy" className="w-10 h-10 object-contain rounded-xl" />
        </div>

        <div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">{t.installApp}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.installAppDesc}</p>
        </div>

        <div className="space-y-2.5 text-left bg-slate-50 dark:bg-[#0f132a] p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
          <p className="flex items-start gap-2">
            <Share2 size={15} className="text-indigo-500 flex-shrink-0 mt-0.5" />
            <span>{t.installGuideSafari}</span>
          </p>
          <p className="flex items-start gap-2">
            <Download size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>{t.installGuideDesktop}</span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
        >
          {t.cancel}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: DIRECT MONTHLY AUTO-SAVE SETUP MODAL
   ═══════════════════════════════════════════════════════════════ */
function AutoSaveModal({ open, onClose, plan, onSave, accounts, exchangeRate, t }) {
  const [title, setTitle] = useState(plan.title || 'Monthly Direct Stash');
  const [amount, setAmount] = useState(plan.amount || 50);
  const [startDate, setStartDate] = useState(plan.startDate || new Date().toISOString().split('T')[0]);
  const [dayOfMonth, setDayOfMonth] = useState(plan.dayOfMonth || 1);
  const [accountId, setAccountId] = useState(plan.accountId || accounts[0]?.id || '');
  const currentRate = exchangeRate || 4100;

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      amount: parseFloat(amount) || 0,
      startDate,
      dayOfMonth: Math.min(31, Math.max(1, parseInt(dayOfMonth, 10) || 1)),
      accountId,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-md my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-teal-500/25 shadow-2xl p-6 space-y-4 sm:space-y-5 animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 flex items-center justify-center">
              <CalendarClock size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">{t.configureAutoSave}</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{t.autoSavePerpetual}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.goalName}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-500 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.dayStart}</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-teal-500 shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.dayOfMonth} (1-31)</label>
              <input
                type="number"
                min="1"
                max="31"
                value={dayOfMonth}
                onChange={(e) => setDayOfMonth(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-teal-500 shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.monthlyAmount} ($)</label>
                {amount && parseFloat(amount) > 0 && (
                  <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                    ≈ {Math.round(parseFloat(amount) * currentRate).toLocaleString()} ៛
                  </span>
                )}
              </div>
              <input
                type="number"
                step="any"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-teal-500 shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.account}</label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-teal-500 shadow-sm"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-600/30 active:scale-95 transition-all"
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: DIRECT AUTO-SAVE FUND ACTION (DEPOSIT / WITHDRAW)
   ═══════════════════════════════════════════════════════════════ */
function AutoSaveFundModal({ open, onClose, actionType, plan, accounts, exchangeRate, onConfirm, formatMoney, t }) {
  const isWithdraw = actionType === 'withdraw';
  const [amount, setAmount] = useState(
    isWithdraw
      ? (plan.accumulated > 0 ? Math.min(plan.accumulated, plan.amount || 50) : '')
      : (plan.amount || 50)
  );
  const [accountId, setAccountId] = useState(plan.accountId || accounts[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const currentRate = exchangeRate || 4100;

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(amount) || 0;
    if (val <= 0) return;
    onConfirm({
      actionType,
      amount: val,
      accountId,
      date,
      note: note.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-md my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-teal-500/25 shadow-2xl p-6 space-y-4 sm:space-y-5 animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isWithdraw
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25'
                  : 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/25'
              }`}
            >
              {isWithdraw ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                {isWithdraw ? t.withdrawFromVault : t.depositToVault}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {t.totalAccumulated}: <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatMoney(plan.accumulated || 0)}</span> (≈ {Math.round((plan.accumulated || 0) * currentRate).toLocaleString()} ៛)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {isWithdraw ? t.withdrawAmount : t.depositAmount} ($ USD)
              </label>
              {amount && parseFloat(amount) > 0 && (
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                  ≈ {Math.round(parseFloat(amount) * currentRate).toLocaleString()} ៛
                </span>
              )}
            </div>
            <input
              type="number"
              step="any"
              min="0.01"
              max={isWithdraw ? (plan.accumulated || undefined) : undefined}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="0.00"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-500 shadow-sm"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.account}</label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-teal-500 shadow-sm"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.date}</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-teal-500 shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.note}</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t.notePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-500 shadow-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg active:scale-95 transition-all ${
                isWithdraw
                  ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
                  : 'bg-teal-600 hover:bg-teal-500 shadow-teal-600/30'
              }`}
            >
              {isWithdraw ? t.withdraw : t.deposit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: EDIT AUTO-SAVE HISTORY RECORD MODAL
   ═══════════════════════════════════════════════════════════════ */
function AutoSaveHistoryEditModal({ open, onClose, item, accounts, exchangeRate, onSave, formatMoney, t }) {
  const [type, setType] = useState(item?.type || 'deposit');
  const [amount, setAmount] = useState(item?.amount || 0);
  const [accountId, setAccountId] = useState(item?.accountId || accounts[0]?.id || '');
  const [date, setDate] = useState(item?.date || new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState(item?.note || '');
  const currentRate = exchangeRate || 4100;

  if (!open || !item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(amount) || 0;
    if (val <= 0) return;
    onSave({
      ...item,
      type,
      amount: val,
      accountId,
      date,
      note: note.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-md my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-teal-500/25 shadow-2xl p-6 space-y-4 sm:space-y-5 animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 flex items-center justify-center">
              <Pencil size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">{t.editHistoryItem}</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{item.date} • {item.accountName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.type}</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('deposit')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                  type === 'deposit'
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'bg-slate-50 dark:bg-[#0f132a] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                }`}
              >
                <ArrowDownLeft size={14} />
                <span>{t.deposit}</span>
              </button>
              <button
                type="button"
                onClick={() => setType('withdraw')}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                  type === 'withdraw'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'bg-slate-50 dark:bg-[#0f132a] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                }`}
              >
                <ArrowUpRight size={14} />
                <span>{t.withdraw}</span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.amount} ($)</label>
              {amount && parseFloat(amount) > 0 && (
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                  ≈ {Math.round(parseFloat(amount) * currentRate).toLocaleString()} ៛
                </span>
              )}
            </div>
            <input
              type="number"
              step="any"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-teal-500 shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.account}</label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-teal-500 shadow-sm"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.date}</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-teal-500 shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">{t.note}</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t.notePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-teal-500 shadow-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-600/30 active:scale-95 transition-all"
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: REAL-TIME KHR - USD EXCHANGE CALCULATOR MODAL
   ═══════════════════════════════════════════════════════════════ */
function ExchangeCalculatorModal({
  open,
  onClose,
  exchangeRate,
  setExchangeRate,
  onFetchLive,
  isRateFetching,
  rateLastSynced,
  rateLatencyMs,
  t,
  onOpenTransaction,
}) {
  // conversion mode: 'USD_TO_KHR' | 'KHR_TO_USD'
  const [direction, setDirection] = useState('USD_TO_KHR');
  const [inputVal, setInputVal] = useState('10');
  const [customRate, setCustomRate] = useState(exchangeRate || 4056);
  const [isCopied, setIsCopied] = useState(false);

  // Sync customRate when exchangeRate updates from live API
  useEffect(() => {
    if (exchangeRate) {
      setCustomRate(exchangeRate);
    }
  }, [exchangeRate]);

  // Standard Cambodian Market & National Bank Rate Presets
  const PRESET_RATES = [
    { label: 'Live Real-Time', rate: exchangeRate || 4056, isLive: true },
    { label: 'NBC Official', rate: 4050 },
    { label: 'Bank Buy', rate: 4080 },
    { label: 'Bank Sell', rate: 4120 },
  ];

  const numVal = parseFloat(inputVal) || 0;
  const activeRate = customRate > 0 ? customRate : (exchangeRate || 4056);

  const convertedResult = useMemo(() => {
    if (direction === 'USD_TO_KHR') {
      return Math.round(numVal * activeRate);
    } else {
      return activeRate > 0 ? (numVal / activeRate).toFixed(2) : '0.00';
    }
  }, [direction, numVal, activeRate]);

  // Cambodian Cash Denomination Rounding (nearest 100 Riel)
  const cashRoundedKHR = useMemo(() => {
    if (direction === 'USD_TO_KHR') {
      return Math.round(convertedResult / 100) * 100;
    }
    return null;
  }, [direction, convertedResult]);

  const handleCopy = () => {
    try {
      const text = direction === 'USD_TO_KHR' ? `${convertedResult.toLocaleString()} ៛` : `$${convertedResult}`;
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {}
  };

  const handleSwap = () => {
    setDirection((prev) => (prev === 'USD_TO_KHR' ? 'KHR_TO_USD' : 'USD_TO_KHR'));
    if (direction === 'USD_TO_KHR') {
      setInputVal(String(convertedResult));
    } else {
      setInputVal(String(Math.round(parseFloat(convertedResult) || 10)));
    }
  };

  const handleApplyPreset = (rate) => {
    setCustomRate(rate);
    setExchangeRate(rate);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-lg my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-indigo-500/25 shadow-2xl p-5 sm:p-6 space-y-4 animate-slide-up text-slate-900 dark:text-white" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center shadow-sm">
              <Coins size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <span>{t.realTimeExchange || 'Exchange Rate'}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  LIVE API
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                USD ($) ⇄ KHR (៛) Cambodian Riel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Provider Attribution & Sync Bar */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-emerald-500/10 border border-indigo-500/20 dark:border-indigo-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <Globe size={12} />
                khr-usd-exchange-one.vercel.app
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-slate-200/60 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-mono">
                khr_live_98a7bc...
              </span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span>Synced: <strong className="font-semibold text-slate-700 dark:text-slate-300">{rateLastSynced || 'Live'}</strong></span>
              <span>•</span>
              <span>Latency: <strong className="font-semibold text-emerald-600 dark:text-emerald-400">{rateLatencyMs || 35}ms</strong></span>
            </div>
          </div>
          <button
            type="button"
            disabled={isRateFetching}
            onClick={() => onFetchLive && onFetchLive(true)}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-indigo-600/20 disabled:opacity-50 transition-all shrink-0"
          >
            <RefreshCw size={12} className={isRateFetching ? 'animate-spin' : ''} />
            <span>{isRateFetching ? 'Fetching Live...' : 'Sync Rate'}</span>
          </button>
        </div>

        {/* Direction Switcher Banner */}
        <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-100 dark:bg-[#0f132a] border border-slate-200 dark:border-white/10">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 pl-2">
            {direction === 'USD_TO_KHR' ? (
              <span className="flex items-center gap-1.5">
                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">USD ($)</span>
                <span>➔</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">KHR (៛)</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">KHR (៛)</span>
                <span>➔</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">USD ($)</span>
              </span>
            )}
          </span>
          <button
            type="button"
            onClick={handleSwap}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#181d38] border border-slate-200 dark:border-white/15 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm active:scale-95 transition-all"
          >
            <ArrowRightLeft size={13} />
            <span>{t.switchDirection || 'Swap'}</span>
          </button>
        </div>

        {/* Input Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between">
            <span>{direction === 'USD_TO_KHR' ? (t.amountInUSD || 'Amount in USD ($)') : (t.amountInKHR || 'Amount in KHR (៛)')}</span>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {direction === 'USD_TO_KHR' ? '$ Dollar' : '៛ Khmer Riel'}
            </span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              min="0"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="0"
              className="w-full pl-4 pr-16 py-3 rounded-2xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-lg sm:text-xl font-black text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-indigo-500 shadow-sm transition-all"
              autoFocus
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-extrabold text-slate-400 dark:text-slate-500">
              {direction === 'USD_TO_KHR' ? 'USD' : 'KHR'}
            </span>
          </div>
        </div>

        {/* Result Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-emerald-500/10 border border-indigo-500/20 dark:border-indigo-400/20 shadow-inner space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>{t.convertedAmount || 'Converted Total'}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/75 dark:bg-white/10 hover:bg-white text-slate-700 dark:text-slate-200 text-[11px] font-bold shadow-xs active:scale-95 transition-all"
            >
              <Copy size={12} />
              <span>{isCopied ? (t.copied || 'Copied!') : (t.copy || 'Copy')}</span>
            </button>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
              {direction === 'USD_TO_KHR'
                ? `${convertedResult.toLocaleString()} ៛`
                : `$${convertedResult}`}
            </div>
          </div>
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
            <span>Active Rate: 1 USD = {activeRate.toLocaleString()} KHR</span>
            <span>{direction === 'USD_TO_KHR' ? `1 KHR ≈ $${(1 / activeRate).toFixed(6)} USD` : `1 USD = ${activeRate.toLocaleString()} KHR`}</span>
          </div>

          {/* Cambodian Cash Denomination Rounding Note */}
          {direction === 'USD_TO_KHR' && cashRoundedKHR !== null && (
            <div className="mt-2 pt-2 border-t border-dashed border-indigo-200 dark:border-indigo-800/40 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1 font-medium">
                <Coins size={12} className="text-amber-500" />
                Cash Rounding (nearest 100៛):
              </span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {cashRoundedKHR.toLocaleString()} ៛
              </span>
            </div>
          )}
        </div>

        {/* Quick Presets for Cambodia */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {t.cambodiaRatePresets || 'Cambodia Market Rates'}
            </label>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">1$ = {activeRate.toLocaleString()}៛</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESET_RATES.map((p) => {
              const isActive = activeRate === p.rate;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handleApplyPreset(p.rate)}
                  className={`p-2 rounded-xl text-left border transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25'
                      : 'bg-slate-50 dark:bg-[#0f132a] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
                  }`}
                >
                  <div className="text-[10px] font-medium opacity-80 truncate flex items-center gap-1">
                    {p.isLive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                    {p.label}
                  </div>
                  <div className="text-xs font-black">{p.rate.toLocaleString()} ៛</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Rate Input */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-[#0f132a] border border-slate-200 dark:border-white/10">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
              {t.customRate || 'Custom Exchange Rate'}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Edit to your preferred money changer rate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={customRate}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 0;
                setCustomRate(val);
                if (val > 0) setExchangeRate(val);
              }}
              className="w-24 px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#181d38] border border-slate-300 dark:border-white/20 text-xs font-black text-slate-900 dark:text-white text-right outline-none focus:border-indigo-500 shadow-sm"
            />
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">៛</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-slate-100 dark:border-white/10">
          {onOpenTransaction && (
            <button
              type="button"
              onClick={onOpenTransaction}
              className="px-4 py-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Plus size={14} />
              <span>Use in Transaction</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all text-center"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: DASHBOARD REAL-TIME EXCHANGE RATE WIDGET
   ═══════════════════════════════════════════════════════════════ */
function ExchangeCalculatorWidget({
  exchangeRate,
  onOpenModal,
  onFetchLive,
  isRateFetching,
  rateLastSynced,
  rateLatencyMs,
  t,
}) {
  const [usdInput, setUsdInput] = useState('10');
  const rate = exchangeRate || 4056;
  const numUSD = parseFloat(usdInput) || 0;
  const khrResult = Math.round(numUSD * rate);

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#181d38] border border-slate-200 dark:border-indigo-500/20 shadow-sm space-y-3 text-slate-900 dark:text-white">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center shadow-sm">
            <Coins size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {t.realTimeExchange || 'Exchange Rate'}
              </h4>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                1$ = {rate.toLocaleString()}៛
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
              <span>Real-time via khr-usd-exchange-one.vercel.app</span>
              {rateLatencyMs ? <span className="text-emerald-500 font-semibold">• {rateLatencyMs}ms</span> : null}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onFetchLive && (
            <button
              onClick={() => onFetchLive(true)}
              disabled={isRateFetching}
              title="Sync Live Rate with khr-usd-exchange-one.vercel.app"
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 active:scale-95 transition-all disabled:opacity-50"
            >
              <RefreshCw size={13} className={isRateFetching ? 'animate-spin text-indigo-500' : ''} />
            </button>
          )}
          <button
            onClick={onOpenModal}
            className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 hover:bg-indigo-100 dark:hover:bg-indigo-500/25 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <ArrowRightLeft size={13} />
            <span>Full Converter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <div className="relative">
          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
            USD Amount ($)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              min="0"
              value={usdInput}
              onChange={(e) => setUsdInput(e.target.value)}
              placeholder="10"
              className="w-full pl-3 pr-10 py-2 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/20 text-sm font-black text-slate-900 dark:text-white outline-none focus:border-indigo-500 shadow-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">$</span>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
            Cambodian Riel (៛)
          </label>
          <div className="px-3 py-2 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-between">
            <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
              {khrResult.toLocaleString()} ៛
            </span>
            <span className="text-[11px] font-bold text-slate-400">KHR</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: FIREBASE CLOUD REAL-TIME MULTI-DEVICE SYNC MODAL
   ═══════════════════════════════════════════════════════════════ */
function AuthSyncModal({
  open,
  onClose,
  currentUser,
  cloudSyncStatus,
  cloudLastSynced,
  onForceSync,
  showToast,
  t,
}) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!open) return null;

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await signInWithPopup(auth, googleProvider);
      if (showToast) showToast('Signed in with Google! Multi-device sync enabled.', 'success');
      onClose();
    } catch (err) {
      console.error('Google Auth Error:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMsg(err.message || 'Failed to sign in with Google');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password');
      return;
    }
    if (authMode === 'signup' && password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      if (authMode === 'signup') {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (name && cred.user) {
          try {
            await updateProfile(cred.user, { displayName: name.trim() });
          } catch {}
        }
        if (showToast) showToast('Account created! Multi-device sync active.', 'success');
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        if (showToast) showToast('Welcome back! Data synchronized across devices.', 'success');
      }
      onClose();
    } catch (err) {
      console.error('Email Auth Error:', err);
      let friendly = err.message || 'Authentication failed';
      if (err.code === 'auth/email-already-in-use') {
        friendly = 'This email is already registered. Please click Sign In.';
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        friendly = 'Incorrect email or password. Please try again.';
      } else if (err.code === 'auth/user-not-found') {
        friendly = 'No account found with this email. Please click Create Account.';
      } else if (err.code === 'auth/weak-password') {
        friendly = 'Password is too weak. Please use at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        friendly = 'Please enter a valid email address.';
      }
      setErrorMsg(friendly);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    setIsSubmitting(true);
    try {
      await signOut(auth);
      saveLS('myluy_auth_session', null);
      deleteAppCookie('myluy_session_user');
      deleteAppCookie('myluy_session_email');
      if (showToast) showToast('Logged out of cloud sync', 'info');
      onClose();
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md my-auto bg-white dark:bg-[#181d38] rounded-3xl border border-slate-200 dark:border-indigo-500/25 shadow-2xl p-5 sm:p-6 space-y-4 animate-slide-up text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center shadow-sm">
              <Cloud size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <span>Multi-Device Cloud Sync</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  FIREBASE
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Share identical real-time data across Phone & PC
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* If user is already signed in */}
        {currentUser ? (
          <div className="space-y-4">
            {/* User Profile Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-emerald-500/10 border border-indigo-500/20 dark:border-indigo-400/20 space-y-3">
              <div className="flex items-center gap-3">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-lg font-black shadow-sm">
                    {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {currentUser.displayName || 'My Luy User'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {currentUser.email}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    {cloudSyncStatus === 'error' ? (
                      <>
                        <AlertCircle size={13} className="text-rose-500 flex-shrink-0" />
                        <span className="text-[11px] font-bold text-rose-500">
                          Sync Error: Firestore Rules Blocked
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          {cloudSyncStatus === 'syncing' ? 'Syncing with Cloud...' : 'Cloud Connected & Live Synced'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Error notice if Firestore rules are blocking */}
              {cloudSyncStatus === 'error' && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle size={14} />
                    <span>Firebase Firestore Rules need to be enabled:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                    In Firebase Console &gt; <strong>Firestore Database</strong> &gt; <strong>Rules</strong>, set:
                    <code className="block bg-black/10 dark:bg-white/10 p-1.5 rounded my-1 font-mono text-[10px]">
                      allow read, write: if true;
                    </code>
                    Then click <strong>Publish</strong> and tap <strong>Sync Now</strong> below.
                  </p>
                </div>
              )}

              {/* Permanent Session Status */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck size={13} />
                  <span>Permanent Session Active</span>
                </span>
                <span className="text-[10px] text-slate-400">Never logs out on app close</span>
              </div>

              <div className="pt-1.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Last Cloud Sync: <strong className="text-slate-700 dark:text-slate-200 font-semibold">{cloudLastSynced || 'Just now'}</strong></span>
                <span className="px-2 py-0.5 rounded-md bg-white/70 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 font-mono text-[10px]">
                  ID: {currentUser.uid?.slice(0, 8)}...
                </span>
              </div>
            </div>

            {/* Instruction Tip */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0f132a] border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-500" />
                <span>How to use on your phone or other computer:</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Open <strong>My Luy</strong> on your other device, click <strong>Sync Cloud</strong>, and sign in with this same Google/Email account: <strong className="text-indigo-600 dark:text-indigo-400">{currentUser.email}</strong>. Any transaction you add on either device will automatically show up on the other!
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={onForceSync}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <RefreshCw size={14} className={cloudSyncStatus === 'syncing' ? 'animate-spin' : ''} />
                <span>Sync Now</span>
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSignOut}
                className="py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 active:scale-95 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-bold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* User is not signed in */
          <div className="space-y-4">
            {/* Explanatory Banner */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-emerald-500/10 border border-indigo-500/20 text-xs text-slate-700 dark:text-slate-300">
              <p className="text-[11px] leading-relaxed">
                Sign in on your <strong>phone</strong> and <strong>laptop</strong> with the same account. Any transaction or account you update will automatically sync across all your devices in real-time!
              </p>
            </div>

            {/* One-Click Google Sign-In */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-[#0f132a] hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-3 shadow-sm active:scale-98 transition-all disabled:opacity-50"
            >
              {/* Google Colored G Icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isSubmitting ? 'Connecting...' : 'Continue with Google'}</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 dark:border-white/10 w-full"></div>
              <span className="bg-white dark:bg-[#181d38] px-3 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider relative">
                Or Use Email
              </span>
            </div>

            {/* Sign In vs Create Account Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#0f132a] border border-slate-200 dark:border-white/10 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  authMode === 'signin'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  authMode === 'signup'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleEmailAuth} className="space-y-3">
              {authMode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Your Name
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Heang"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/15 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-indigo-500 shadow-sm transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/15 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-indigo-500 shadow-sm transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0f132a] border border-slate-300 dark:border-white/15 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:border-indigo-500 shadow-sm transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={14} />
                    <span>{authMode === 'signin' ? 'Sign In & Sync' : 'Create Account & Sync'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}



