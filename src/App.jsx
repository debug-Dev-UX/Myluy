import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Wallet, TrendingUp, TrendingDown, Target, Plus, Sun, Moon, Globe,
  ArrowUpRight, ArrowDownRight, CreditCard, DollarSign, Menu, X,
  Pencil, Trash2, Check, Filter, ArrowUpDown, Download, Search,
  PiggyBank, Tag, LayoutDashboard, List, Settings, ChevronDown,
  Calendar, Crosshair, Trophy, Flame, Send, ExternalLink,
  BarChart3, PieChart, Landmark, RefreshCw, HandCoins, ShieldCheck,
  Award, Sparkles, AlertTriangle, AlertCircle, CheckCircle2, ChevronRight,
  Clock, Coins, Briefcase, Laptop, Utensils, Car, Home, Zap,
  ShoppingBag, HeartPulse, Smartphone, Dumbbell, Plane, Film,
  GraduationCap, Coffee, Share2, HelpCircle, ArrowRightLeft, Percent, Gift
} from 'lucide-react';
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
  },
};

/* ═══════════════════════════════════════════════════════════════
   LUCIDE ICON MAP (ZERO EMOJIS)
   ═══════════════════════════════════════════════════════════════ */
const ICON_COMPONENTS = {
  briefcase: Briefcase,
  laptop: Laptop,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  gift: Gift,
  utensils: Utensils,
  car: Car,
  home: Home,
  zap: Zap,
  'shopping-bag': ShoppingBag,
  'heart-pulse': HeartPulse,
  smartphone: Smartphone,
  coffee: Coffee,
  film: Film,
  dumbbell: Dumbbell,
  plane: Plane,
  'graduation-cap': GraduationCap,
  'credit-card': CreditCard,
  'piggy-bank': PiggyBank,
  wallet: Wallet,
  landmark: Landmark,
  coins: Coins,
  'shield-check': ShieldCheck,
  trophy: Trophy,
  award: Award,
  flame: Flame,
  'refresh-cw': RefreshCw,
  'hand-coins': HandCoins,
};

function DynamicIcon({ name, className = 'w-4 h-4', size }) {
  const Comp = ICON_COMPONENTS[name] || Tag;
  return <Comp className={className} size={size} />;
}

const AVAILABLE_ICONS = [
  'briefcase', 'laptop', 'trending-up', 'gift', 'utensils',
  'car', 'home', 'zap', 'shopping-bag', 'heart-pulse',
  'smartphone', 'coffee', 'film', 'dumbbell', 'plane',
  'graduation-cap', 'credit-card', 'piggy-bank', 'wallet', 'landmark'
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

/* ═══════════════════════════════════════════════════════════════
   MAIN APP COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  // Localization & Theme Preferences
  const [lang, setLang] = useState(() => loadLS('myluy_lang', 'en'));
  const [theme, setTheme] = useState(() => loadLS('myluy_theme', 'dark'));
  const [currency, setCurrency] = useState(() => loadLS('myluy_curr', 'USD'));
  const [exchangeRate, setExchangeRate] = useState(() => loadLS('myluy_rate', 4100));

  // Navigation
  // Tabs: 'dashboard' | 'analytics' | 'budgets' | 'accounts' | 'recurring' | 'debt' | 'gamification'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pure Zero Data States (NO DEMO DATA PRE-LOADED)
  const [accounts, setAccounts] = useState(() => loadLS('myluy_accounts', DEFAULT_ACCOUNTS.map(a => ({ ...a, balance: 0 }))));
  const [transactions, setTransactions] = useState(() => loadLS('myluy_txs', []));
  const [customIncomeCats, setCustomIncomeCats] = useState(() => loadLS('myluy_inc_cats', []));
  const [customExpenseCats, setCustomExpenseCats] = useState(() => loadLS('myluy_exp_cats', []));
  const [budgetLimits, setBudgetLimits] = useState(() => loadLS('myluy_budgets', []));
  const [savingsGoals, setSavingsGoals] = useState(() => loadLS('myluy_goals', []));
  const [recurringTxs, setRecurringTxs] = useState(() => loadLS('myluy_recurring', []));
  const [debts, setDebts] = useState(() => loadLS('myluy_debts', []));

  // Gamification & Streaks
  const [userXp, setUserXp] = useState(() => loadLS('myluy_xp', 0));
  const [streakDays, setStreakDays] = useState(() => loadLS('myluy_streak', 1));
  const [completed52Weeks, setCompleted52Weeks] = useState(() => loadLS('myluy_c52', []));
  const [completed30Days, setCompleted30Days] = useState(() => loadLS('myluy_c30', []));

  // Transaction Filters & Sorts
  const [txTypeFilter, setTxTypeFilter] = useState('all');
  const [txCategoryFilter, setTxCategoryFilter] = useState('all');
  const [txSearchQuery, setTxSearchQuery] = useState('');
  const [txSortOption, setTxSortOption] = useState('newest');

  // Modals
  const [txModalOpen, setTxModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

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
  useEffect(() => saveLS('myluy_accounts', accounts), [accounts]);
  useEffect(() => saveLS('myluy_txs', transactions), [transactions]);
  useEffect(() => saveLS('myluy_inc_cats', customIncomeCats), [customIncomeCats]);
  useEffect(() => saveLS('myluy_exp_cats', customExpenseCats), [customExpenseCats]);
  useEffect(() => saveLS('myluy_budgets', budgetLimits), [budgetLimits]);
  useEffect(() => saveLS('myluy_goals', savingsGoals), [savingsGoals]);
  useEffect(() => saveLS('myluy_recurring', recurringTxs), [recurringTxs]);
  useEffect(() => saveLS('myluy_debts', debts), [debts]);
  useEffect(() => saveLS('myluy_xp', userXp), [userXp]);
  useEffect(() => saveLS('myluy_streak', streakDays), [streakDays]);
  useEffect(() => saveLS('myluy_c52', completed52Weeks), [completed52Weeks]);
  useEffect(() => saveLS('myluy_c30', completed30Days), [completed30Days]);

  const t = dict[lang] || dict.en;

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
  const allIncomeCats = useMemo(() => [...DEFAULT_INCOME_CATS, ...customIncomeCats], [customIncomeCats]);
  const allExpenseCats = useMemo(() => [...DEFAULT_EXPENSE_CATS, ...customExpenseCats], [customExpenseCats]);
  const allCategories = useMemo(() => [...allIncomeCats, ...allExpenseCats], [allIncomeCats, allExpenseCats]);

  const getCategoryDetails = useCallback((catId) => {
    const found = allCategories.find((c) => c.id === catId);
    if (found) {
      return {
        name: found.name[lang] || found.name.en,
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
    const totalBalance = accountSum;
    const netSavings = income - expenses;
    const savingsRate = income > 0 ? Math.max(0, Math.round(((income - expenses) / income) * 100)) : 0;

    return { income, expenses, totalBalance, netSavings, savingsRate };
  }, [transactions, accounts]);

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
      setAccounts(DEFAULT_ACCOUNTS.map((a) => ({ ...a, balance: 0 })));
      showToast('All data reset to 0.', 'success');
      setSettingsModalOpen(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text-primary)] flex flex-col font-sans transition-colors duration-200 select-none`}>
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
                onClick={() => setActiveTab(tab.id)}
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

        {/* Controls: Responsive and Clean */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Quick Currency Toggle Pill */}
          <button
            onClick={() => {
              const next = currency === 'USD' ? 'KHR' : 'USD';
              setCurrency(next);
              showToast(`${t.currencyToggle}: ${next === 'USD' ? '$ USD' : '៛ KHR'}`, 'success');
            }}
            title={t.currencyToggle}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-indigo-500 dark:text-indigo-400 shadow-sm transition-all"
          >
            <Coins size={14} />
            <span className="font-bold">{currency}</span>
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
            className="p-1.5 sm:p-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] shadow-sm transition-all"
          >
            {theme === 'dark' ? (
              <Sun size={16} className="text-amber-400" />
            ) : (
              <Moon size={16} className="text-indigo-600" />
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

          {/* Settings Button */}
          <button
            onClick={() => setSettingsModalOpen(true)}
            title={t.settingsTab}
            className="p-1.5 sm:p-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] shadow-sm transition-all"
          >
            <Settings size={16} />
          </button>

          {/* Mobile Menu Drawer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-secondary)] shadow-sm"
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
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
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

            <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-white/5 text-xs">
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
      <main className="flex-1 max-w-7xl w-full mx-auto p-3.5 sm:p-6 lg:p-8 pb-28 lg:pb-12 space-y-6">
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
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Total Balance */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:border-indigo-500/30 transition-all">
                <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
                  <span className="text-xs font-semibold">{t.totalBalance}</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center">
                    <Wallet size={16} />
                  </div>
                </div>
                <div className="text-lg sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                  {formatMoney(totals.totalBalance)}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-1 flex items-center gap-1 font-medium">
                  <span>{accounts.length} {t.accountsTab}</span>
                </div>
              </div>

              {/* Total Income */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:border-emerald-500/30 transition-all">
                <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
                  <span className="text-xs font-semibold">{t.totalIncome}</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center">
                    <TrendingUp size={16} />
                  </div>
                </div>
                <div className="text-lg sm:text-2xl font-bold tracking-tight text-emerald-500 dark:text-emerald-400">
                  {formatMoney(totals.income)}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <ArrowUpRight size={13} />
                  <span>{totals.savingsRate}% {t.savingsRate}</span>
                </div>
              </div>

              {/* Total Expenses */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:border-rose-500/30 transition-all">
                <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
                  <span className="text-xs font-semibold">{t.totalExpenses}</span>
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 dark:text-rose-400 flex items-center justify-center">
                    <TrendingDown size={16} />
                  </div>
                </div>
                <div className="text-lg sm:text-2xl font-bold tracking-tight text-rose-500 dark:text-rose-400">
                  {formatMoney(totals.expenses)}
                </div>
                <div className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1 font-medium">
                  <ArrowDownRight size={13} />
                  <span>{transactions.filter((x) => x.type === 'expense').length} records</span>
                </div>
              </div>

              {/* Net Savings */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:border-purple-500/30 transition-all">
                <div className="flex items-center justify-between text-[var(--text-muted)] mb-2">
                  <span className="text-xs font-semibold">{t.netSavings}</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 dark:text-purple-400 flex items-center justify-center">
                    <PiggyBank size={16} />
                  </div>
                </div>
                <div className={`text-lg sm:text-2xl font-bold tracking-tight ${totals.netSavings >= 0 ? 'text-purple-500 dark:text-purple-400' : 'text-rose-500 dark:text-rose-400'}`}>
                  {formatMoney(totals.netSavings)}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-1 font-medium">
                  {totals.netSavings >= 0 ? 'Net Positive Cashflow' : 'Negative Cashflow'}
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
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold transition-all shadow-sm"
              >
                <Plus size={16} />
                <span>{t.addTransaction}</span>
              </button>
              <button
                onClick={() => setActiveTab('budgets')}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-bold transition-all shadow-sm"
              >
                <Target size={16} />
                <span>{t.budgetsGoalsTab}</span>
              </button>
              <button
                onClick={() => setTransferModalOpen(true)}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-bold transition-all shadow-sm"
              >
                <ArrowRightLeft size={16} />
                <span>{t.transferFunds}</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold transition-all shadow-sm"
              >
                <Download size={16} />
                <span>{t.export}</span>
              </button>
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
                <div className="divide-y divide-[var(--border)]">
                  {filteredTransactions.map((tx) => {
                    const catInfo = getCategoryDetails(tx.category);
                    const isInc = tx.type === 'income';
                    const accountObj = accounts.find((a) => a.id === tx.accountId);

                    return (
                      <div
                        key={tx.id}
                        className="py-3 px-1 sm:px-2 flex items-center justify-between gap-3 hover:bg-[var(--surface-hover)] rounded-xl transition-colors group"
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

                        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                          <span
                            className={`text-xs sm:text-sm font-bold tracking-tight ${
                              isInc ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {isInc ? '+' : '-'} {formatMoney(tx.amount)}
                          </span>

                          <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingTx(tx);
                                setTxModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-[var(--surface)] text-[var(--text-muted)] hover:text-indigo-500"
                              title={t.edit}
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteTransaction(tx.id)}
                              className="p-1.5 rounded-lg hover:bg-[var(--surface)] text-[var(--text-muted)] hover:text-rose-500"
                              title={t.delete}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
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

                    return (
                      <div
                        key={b.id}
                        className="p-4 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] space-y-3 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                              style={{ backgroundColor: catInfo.color }}
                            >
                              <DynamicIcon name={catInfo.icon} size={15} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[var(--text-primary)]">{catInfo.name}</p>
                              <p className="text-[11px] text-[var(--text-muted)]">
                                {t.monthlyLimit}: {formatMoney(b.limit)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingBudget(b);
                                setBudgetModalOpen(true);
                              }}
                              className="p-1 rounded-lg text-[var(--text-muted)] hover:text-indigo-500"
                              title={t.edit}
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => {
                                setBudgetLimits((prev) => prev.filter((x) => x.id !== b.id));
                                showToast(t.delete, 'success');
                              }}
                              className="p-1 rounded-lg text-[var(--text-muted)] hover:text-rose-500"
                              title={t.delete}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Progress Bar & Status Pill */}
                        <div className="space-y-1.5">
                          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isOver ? 'bg-rose-500' : isWarn ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.min(100, percent)}%` }}
                            />
                          </div>

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
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section 2: Savings Goals */}
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

                    return (
                      <div
                        key={g.id}
                        className="p-4 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] space-y-3 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-500 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center">
                              {isDone ? <Trophy size={18} className="text-amber-500 dark:text-amber-400" /> : <PiggyBank size={18} />}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[var(--text-primary)]">{g.name}</p>
                              <p className="text-[11px] text-[var(--text-muted)]">
                                {t.targetAmount}: {formatMoney(g.target)} {g.date && `• ${g.date}`}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingGoal(g);
                                setGoalModalOpen(true);
                              }}
                              className="p-1 rounded-lg text-[var(--text-muted)] hover:text-purple-500"
                              title={t.edit}
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => {
                                setSavingsGoals((prev) => prev.filter((x) => x.id !== g.id));
                                showToast(t.delete, 'success');
                              }}
                              className="p-1 rounded-lg text-[var(--text-muted)] hover:text-rose-500"
                              title={t.delete}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-1.5">
                          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                              style={{ width: `${percent}%` }}
                            />
                          </div>

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
                        </div>

                        {/* Quick Deposit / Withdraw Buttons */}
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => {
                              setSelectedGoalForFund(g);
                              setFundActionType('deposit');
                              setGoalFundModalOpen(true);
                            }}
                            className="flex-1 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-semibold flex items-center justify-center gap-1"
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
                            className="flex-1 py-1.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--text-muted)] border border-[var(--border)] text-xs font-semibold flex items-center justify-center gap-1"
                          >
                            <span>{t.withdrawFunds}</span>
                          </button>
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
                {accounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
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

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingAccount(acc);
                            setAccountModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-indigo-600 hover:bg-[var(--surface-hover)] transition-colors"
                          title={t.edit}
                        >
                          <Pencil size={14} />
                        </button>
                        {accounts.length > 1 && (
                          <button
                            onClick={() => {
                              setAccounts((prev) => prev.filter((x) => x.id !== acc.id));
                              showToast(t.delete, 'success');
                            }}
                            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-rose-600 hover:bg-[var(--surface-hover)] transition-colors"
                            title={t.delete}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--border)] flex items-end justify-between">
                      <div>
                        <span className="text-[11px] text-[var(--text-muted)] block font-medium">
                          {t.initialBalance}
                        </span>
                        <span className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">
                          {formatMoney(acc.balance)}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setTransferModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-[var(--surface-hover)] text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                        title={t.transferFunds}
                      >
                        <ArrowRightLeft size={15} />
                      </button>
                    </div>
                  </div>
                ))}
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
                    return (
                      <div
                        key={r.id}
                        className="p-4 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] flex flex-col justify-between space-y-3 shadow-sm"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                              style={{ backgroundColor: catInfo.color }}
                            >
                              <DynamicIcon name={catInfo.icon} size={18} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[var(--text-primary)]">{r.desc}</p>
                              <p className="text-[11px] text-[var(--text-muted)]">
                                {t[r.freq] || r.freq} • {t.nextDueDate}: {r.nextDate}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingRecurring(r);
                                setRecurringModalOpen(true);
                              }}
                              className="p-1 rounded-lg text-[var(--text-muted)] hover:text-cyan-500"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => {
                                setRecurringTxs((prev) => prev.filter((x) => x.id !== r.id));
                                showToast(t.delete, 'success');
                              }}
                              className="p-1 rounded-lg text-[var(--text-muted)] hover:text-rose-500"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                          <span className="text-sm font-bold text-[var(--text-primary)]">
                            {formatMoney(r.amount)}
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
                            className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-600 dark:text-cyan-400 text-xs font-bold transition-all"
                          >
                            {t.autoPay}
                          </button>
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

                    return (
                      <div
                        key={d.id}
                        className="p-4 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] space-y-3 shadow-sm"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${
                                isLent ? 'bg-emerald-600' : 'bg-rose-600'
                              }`}
                            >
                              <HandCoins size={17} />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <p className="text-xs font-bold text-[var(--text-primary)]">{d.person}</p>
                                <span
                                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                    isLent ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                                  }`}
                                >
                                  {isLent ? t.lentTab.split(' ')[0] : t.borrowedTab.split(' ')[0]}
                                </span>
                              </div>
                              <p className="text-[11px] text-[var(--text-muted)]">
                                {t.dueDate}: {d.dueDate || 'N/A'} {d.notes && `• ${d.notes}`}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingDebt(d);
                                setDebtModalOpen(true);
                              }}
                              className="p-1 rounded-lg text-[var(--text-muted)] hover:text-amber-500"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => {
                                setDebts((prev) => prev.filter((x) => x.id !== d.id));
                                showToast(t.delete, 'success');
                              }}
                              className="p-1 rounded-lg text-[var(--text-muted)] hover:text-rose-500"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-1.5">
                          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isLent ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[var(--text-secondary)]">
                              {t.amountPaid}: {formatMoney(d.paid)} / {formatMoney(d.total)}
                            </span>
                            <span className={`font-bold ${isSettled ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                              {isSettled ? t.debtFullyPaid : `${t.remainingDebt}: ${formatMoney(remaining)}`}
                            </span>
                          </div>
                        </div>

                        {!isSettled && (
                          <button
                            onClick={() => {
                              setSelectedDebtForPay(d);
                              setDebtPayModalOpen(true);
                            }}
                            className="w-full py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center justify-center gap-1"
                          >
                            <Plus size={13} />
                            <span>{t.recordPayment}</span>
                          </button>
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
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-[var(--nav-bg)] backdrop-blur-xl border-t border-[var(--border)] h-16 px-2 flex items-center justify-around z-40">
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
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${
                active ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon size={19} className={active ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
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
          incomeCats={customIncomeCats}
          expenseCats={customExpenseCats}
          onAddCategory={(cat) => {
            if (cat.type === 'income') {
              setCustomIncomeCats((prev) => [...prev, cat]);
            } else {
              setCustomExpenseCats((prev) => [...prev, cat]);
            }
            showToast(t.addCategory, 'success');
          }}
          onDeleteCategory={(catId, type) => {
            if (type === 'income') {
              setCustomIncomeCats((prev) => prev.filter((c) => c.id !== catId));
            } else {
              setCustomExpenseCats((prev) => prev.filter((c) => c.id !== catId));
            }
            showToast(t.delete, 'success');
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
          onInstallApp={handleInstallClick}
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
          currency={currency}
          setCurrency={setCurrency}
          exchangeRate={exchangeRate}
          setExchangeRate={setExchangeRate}
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
function TransactionModal({ open, onClose, onSave, editingTx, accounts, incomeCats, expenseCats, lang, t }) {
  const [desc, setDesc] = useState(editingTx?.desc || '');
  const [amount, setAmount] = useState(editingTx?.amount || '');
  const [type, setType] = useState(editingTx?.type || 'expense');
  const [category, setCategory] = useState(editingTx?.category || (type === 'income' ? incomeCats[0]?.id : expenseCats[0]?.id));
  const [accountId, setAccountId] = useState(editingTx?.accountId || accounts[0]?.id || '');
  const [date, setDate] = useState(editingTx?.date || new Date().toISOString().split('T')[0]);

  const activeCats = type === 'income' ? incomeCats : expenseCats;

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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full sm:max-w-md bg-[var(--modal-bg)] rounded-t-3xl sm:rounded-2xl border border-[var(--border)] shadow-2xl overflow-hidden animate-slide-up">
        <div className="p-4 sm:p-5 border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${type === 'income' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'}`}>
              {type === 'income' ? <ArrowUpRight size={17} /> : <ArrowDownRight size={17} />}
            </div>
            <h3 className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
              {editingTx ? t.editTransaction : t.addTransaction}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Income / Expense Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-[var(--surface-hover)] border border-[var(--border)] rounded-xl">
            <button
              type="button"
              onClick={() => {
                setType('expense');
                setCategory(expenseCats[0]?.id);
              }}
              className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                type === 'expense' ? 'bg-rose-600 text-white shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <TrendingDown size={14} />
              <span>{t.expense}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setType('income');
                setCategory(incomeCats[0]?.id);
              }}
              className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                type === 'income' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <TrendingUp size={14} />
              <span>{t.income}</span>
            </button>
          </div>

          {/* Amount input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.amount}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[var(--text-muted)]">$</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t.amountPlaceholder}
                className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-sm font-bold text-[var(--text-primary)] outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.description}</label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={t.descPlaceholder}
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none focus:border-indigo-500 shadow-sm"
            />
          </div>

          {/* Category Selector Grid */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.category}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto pr-1">
              {activeCats.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: cat.color }}
                    >
                      <DynamicIcon name={cat.icon} size={13} />
                    </div>
                    <span className="text-[11px] truncate">{cat.name[lang] || cat.name.en}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Account & Date selection */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.account}</label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.date}</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:bg-[var(--surface-hover)]"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20"
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
function BudgetLimitModal({ open, onClose, onSave, editingBudget, expenseCats, lang, t }) {
  const [categoryId, setCategoryId] = useState(editingBudget?.categoryId || expenseCats[0]?.id || '');
  const [limit, setLimit] = useState(editingBudget?.limit || '');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[var(--modal-bg)] rounded-2xl border border-[var(--border)] shadow-2xl p-5 space-y-4 animate-slide-up">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[var(--text-primary)]">
            {editingBudget ? t.editBudgetLimit : t.addBudgetLimit}
          </h3>
          <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.category}</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
            >
              {expenseCats.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name[lang] || cat.name.en}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.monthlyLimit} ($)</label>
            <input
              type="number"
              step="1"
              min="1"
              required
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="e.g. 200"
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs font-bold text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:bg-[var(--surface-hover)]"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20"
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
function SavingsGoalModal({ open, onClose, onSave, editingGoal, t }) {
  const [name, setName] = useState(editingGoal?.name || '');
  const [target, setTarget] = useState(editingGoal?.target || '');
  const [current, setCurrent] = useState(editingGoal?.current || 0);
  const [date, setDate] = useState(editingGoal?.date || '');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[var(--modal-bg)] rounded-2xl border border-[var(--border)] shadow-2xl p-5 space-y-4 animate-slide-up">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[var(--text-primary)]">
            {editingGoal ? t.editGoal : t.addGoal}
          </h3>
          <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.goalName}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.goalNamePlaceholder}
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.targetAmount} ($)</label>
            <input
              type="number"
              step="1"
              min="1"
              required
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g. 1500"
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs font-bold text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.currentAmount} ($)</label>
            <input
              type="number"
              step="1"
              min="0"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="e.g. 200"
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs font-bold text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.targetDate}</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[var(--text-muted)] hover:bg-[var(--surface-hover)]"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/20"
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
function GoalFundModal({ open, onClose, goal, actionType, onConfirm, t }) {
  const [val, setVal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseFloat(val);
    if (!num || num <= 0) return;
    onConfirm(actionType === 'deposit' ? num : -num);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xs bg-[var(--modal-bg)] rounded-2xl border border-[var(--border)] shadow-2xl p-5 space-y-4 animate-slide-up">
        <h3 className="font-bold text-sm text-[var(--text-primary)]">
          {actionType === 'deposit' ? t.addFunds : t.withdrawFunds}: {goal.name}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.fundsAmount} ($)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-sm font-bold text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[var(--text-muted)]"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
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
function AccountModal({ open, onClose, onSave, editingAccount, t }) {
  const [name, setName] = useState(editingAccount?.name || '');
  const [type, setType] = useState(editingAccount?.type || 'bankAccount');
  const [balance, setBalance] = useState(editingAccount?.balance || 0);
  const [icon, setIcon] = useState(editingAccount?.icon || 'landmark');
  const [color, setColor] = useState(editingAccount?.color || '#06b6d4');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[var(--modal-bg)] rounded-2xl border border-[var(--border)] shadow-2xl p-5 space-y-4 animate-slide-up">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[var(--text-primary)]">
            {editingAccount ? t.editAccount : t.addAccount}
          </h3>
          <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.accountName}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.accountNamePlaceholder}
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.accountType}</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
            >
              <option value="bankAccount">{t.bankAccount}</option>
              <option value="cashWallet">{t.cashWallet}</option>
              <option value="digitalWallet">{t.digitalWallet}</option>
              <option value="investmentVault">{t.investmentVault}</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.initialBalance} ($)</label>
            <input
              type="number"
              step="0.01"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs font-bold text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Icon & Color</label>
            <div className="flex items-center gap-2">
              {['landmark', 'wallet', 'credit-card', 'coins', 'piggy-bank'].map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setIcon(ic)}
                  className={`p-2 rounded-xl border ${icon === ic ? 'border-indigo-500 bg-indigo-500/15' : 'border-[var(--border)]'}`}
                >
                  <DynamicIcon name={ic} size={15} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              {PALETTE.slice(0, 6).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[var(--text-muted)]"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20"
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
function TransferModal({ open, onClose, accounts, onTransfer, t }) {
  const [fromId, setFromId] = useState(accounts[0]?.id || '');
  const [toId, setToId] = useState(accounts[1]?.id || accounts[0]?.id || '');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0 || fromId === toId) return;
    onTransfer({ fromId, toId, amount: parseFloat(amount) });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[var(--modal-bg)] rounded-2xl border border-[var(--border)] shadow-2xl p-5 space-y-4 animate-slide-up">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[var(--text-primary)]">{t.transferFunds}</h3>
          <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.transferFrom}</label>
            <select
              value={fromId}
              onChange={(e) => setFromId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} (${acc.balance})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.transferTo}</label>
            <select
              value={toId}
              onChange={(e) => setToId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
            >
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} (${acc.balance})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.transferAmount} ($)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs font-bold text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[var(--text-muted)]"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/20"
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
function RecurringModal({ open, onClose, onSave, editingRecurring, expenseCats, accounts, t, lang }) {
  const [desc, setDesc] = useState(editingRecurring?.desc || '');
  const [amount, setAmount] = useState(editingRecurring?.amount || '');
  const [freq, setFreq] = useState(editingRecurring?.freq || 'freqMonthly');
  const [category, setCategory] = useState(editingRecurring?.category || expenseCats[0]?.id || '');
  const [accountId, setAccountId] = useState(editingRecurring?.accountId || accounts[0]?.id || '');
  const [nextDate, setNextDate] = useState(editingRecurring?.nextDate || new Date().toISOString().split('T')[0]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[var(--modal-bg)] rounded-2xl border border-[var(--border)] shadow-2xl p-5 space-y-4 animate-slide-up">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[var(--text-primary)]">
            {editingRecurring ? t.editRecurring : t.addRecurring}
          </h3>
          <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.description}</label>
            <input
              type="text"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="e.g. Netflix Subscription"
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.amount} ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs font-bold text-[var(--text-primary)] outline-none shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.frequency}</label>
              <select
                value={freq}
                onChange={(e) => setFreq(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
              >
                <option value="freqWeekly">{t.freqWeekly}</option>
                <option value="freqMonthly">{t.freqMonthly}</option>
                <option value="freqYearly">{t.freqYearly}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.category}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
              >
                {expenseCats.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name[lang] || c.name.en}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.account}</label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
              >
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.nextDueDate}</label>
            <input
              type="date"
              value={nextDate}
              onChange={(e) => setNextDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[var(--text-muted)]"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/20"
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
function DebtModal({ open, onClose, onSave, editingDebt, t }) {
  const [person, setPerson] = useState(editingDebt?.person || '');
  const [type, setType] = useState(editingDebt?.type || 'lent');
  const [total, setTotal] = useState(editingDebt?.total || '');
  const [paid, setPaid] = useState(editingDebt?.paid || 0);
  const [dueDate, setDueDate] = useState(editingDebt?.dueDate || '');
  const [notes, setNotes] = useState(editingDebt?.notes || '');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[var(--modal-bg)] rounded-2xl border border-[var(--border)] shadow-2xl p-5 space-y-4 animate-slide-up">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[var(--text-primary)]">
            {editingDebt ? t.editDebt : t.addDebt}
          </h3>
          <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2 p-1 bg-[var(--surface-hover)] border border-[var(--border)] rounded-xl">
            <button
              type="button"
              onClick={() => setType('lent')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                type === 'lent' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[var(--text-muted)]'
              }`}
            >
              {t.lentTab.split(' ')[0]}
            </button>
            <button
              type="button"
              onClick={() => setType('borrowed')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                type === 'borrowed' ? 'bg-rose-600 text-white shadow-sm' : 'text-[var(--text-muted)]'
              }`}
            >
              {t.borrowedTab.split(' ')[0]}
            </button>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.personName}</label>
            <input
              type="text"
              required
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              placeholder={t.personPlaceholder}
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.totalOwed} ($)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs font-bold text-[var(--text-primary)] outline-none shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.amountPaid} ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={paid}
                onChange={(e) => setPaid(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs font-bold text-[var(--text-primary)] outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.dueDate}</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.notes}</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.notesPlaceholder}
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[var(--text-muted)]"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md shadow-amber-600/20"
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
function DebtPayModal({ open, onClose, debt, onConfirm, t }) {
  const remaining = Math.max(0, debt.total - debt.paid);
  const [val, setVal] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseFloat(val);
    if (!num || num <= 0) return;
    onConfirm(num);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xs bg-[var(--modal-bg)] rounded-2xl border border-[var(--border)] shadow-2xl p-5 space-y-4 animate-slide-up">
        <h3 className="font-bold text-sm text-[var(--text-primary)]">
          {t.recordPayment}: {debt.person}
        </h3>
        <p className="text-xs text-[var(--text-muted)]">
          {t.remainingDebt}: <strong>${remaining.toFixed(2)}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t.paymentAmount} ($)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              max={remaining}
              required
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-sm font-bold text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[var(--text-muted)]"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md shadow-amber-600/20"
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
   SUB-COMPONENT: ADMIN CATEGORY MANAGEMENT MODAL (NO EMOJIS)
   ═══════════════════════════════════════════════════════════════ */
function CategoryAdminModal({ open, onClose, incomeCats, expenseCats, onAddCategory, onDeleteCategory, t, lang }) {
  const [tab, setTab] = useState('expense');
  const [nameEn, setNameEn] = useState('');
  const [nameKh, setNameKh] = useState('');
  const [icon, setIcon] = useState('shopping-bag');
  const [color, setColor] = useState('#6366f1');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameEn) return;
    onAddCategory({
      id: genId('cat'),
      name: { en: nameEn, kh: nameKh || nameEn },
      icon,
      color,
      type: tab,
    });
    setNameEn('');
    setNameKh('');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[var(--modal-bg)] rounded-2xl border border-[var(--border)] shadow-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[var(--text-primary)]">{t.categoriesManagement}</h3>
          <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[var(--surface-hover)] border border-[var(--border)] rounded-xl">
          <button
            type="button"
            onClick={() => setTab('expense')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'expense' ? 'bg-rose-600 text-white shadow-sm' : 'text-[var(--text-muted)]'
            }`}
          >
            {t.expenseCategories}
          </button>
          <button
            type="button"
            onClick={() => setTab('income')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'income' ? 'bg-emerald-600 text-white shadow-sm' : 'text-[var(--text-muted)]'
            }`}
          >
            {t.incomeCategories}
          </button>
        </div>

        {/* Add Category Form */}
        <form onSubmit={handleSubmit} className="p-3.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border)] space-y-3">
          <h4 className="text-xs font-bold text-[var(--text-primary)]">{t.addCategory}</h4>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              required
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="Name (EN)"
              className="px-2.5 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
            />
            <input
              type="text"
              value={nameKh}
              onChange={(e) => setNameKh(e.target.value)}
              placeholder="ឈ្មោះ (KH)"
              className="px-2.5 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-primary)] outline-none shadow-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-[var(--text-muted)] font-medium">Select Icon</label>
            <div className="grid grid-cols-6 gap-1 max-h-24 overflow-y-auto pr-1">
              {AVAILABLE_ICONS.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setIcon(ic)}
                  className={`p-1.5 rounded-lg border flex items-center justify-center ${
                    icon === ic ? 'border-indigo-500 bg-indigo-500/20 text-indigo-500' : 'border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  <DynamicIcon name={ic} size={15} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {PALETTE.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-5 h-5 rounded-full border-2 ${color === c ? 'border-white scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20"
          >
            {t.addCategory}
          </button>
        </form>

        {/* Existing Custom Categories List */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-[var(--text-secondary)]">Custom Categories</h4>
          {(tab === 'income' ? incomeCats : expenseCats).length === 0 ? (
            <p className="text-xs text-[var(--text-muted)]">No custom categories added yet.</p>
          ) : (
            <div className="space-y-1.5">
              {(tab === 'income' ? incomeCats : expenseCats).map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs"
                      style={{ backgroundColor: cat.color }}
                    >
                      <DynamicIcon name={cat.icon} size={13} />
                    </div>
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      {cat.name[lang] || cat.name.en}
                    </span>
                  </div>
                  <button
                    onClick={() => onDeleteCategory(cat.id, tab)}
                    className="p-1 text-[var(--text-muted)] hover:text-rose-500"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENT: SETTINGS MODAL (NO DEMO DATA PRE-LOADS)
   ═══════════════════════════════════════════════════════════════ */
function SettingsModal({
  open,
  onClose,
  onResetZero,
  onOpenCategories,
  onInstallApp,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[var(--modal-bg)] rounded-2xl border border-[var(--border)] shadow-2xl p-5 space-y-4 animate-slide-up">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[var(--text-primary)]">{t.settingsTab}</h3>
          <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3 divide-y divide-[var(--border)] text-xs">
          {/* Language selection */}
          <div className="pt-2 flex items-center justify-between">
            <span className="font-semibold text-[var(--text-secondary)]">{t.language}</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${lang === 'en' ? 'bg-indigo-600 text-white' : 'bg-[var(--surface)] text-[var(--text-muted)]'}`}
              >
                English
              </button>
              <button
                onClick={() => setLang('kh')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${lang === 'kh' ? 'bg-indigo-600 text-white' : 'bg-[var(--surface)] text-[var(--text-muted)]'}`}
              >
                ភាសាខ្មែរ
              </button>
            </div>
          </div>

          {/* Theme selection */}
          <div className="pt-3 flex items-center justify-between">
            <span className="font-semibold text-[var(--text-secondary)]">Theme</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTheme('dark')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-[var(--surface)] text-[var(--text-muted)]'}`}
              >
                {t.darkMode}
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${theme === 'light' ? 'bg-indigo-600 text-white' : 'bg-[var(--surface)] text-[var(--text-muted)]'}`}
              >
                {t.lightMode}
              </button>
            </div>
          </div>

          {/* Category Administration button */}
          <div className="pt-3">
            <button
              onClick={onOpenCategories}
              className="w-full py-2 px-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-left flex items-center justify-between text-xs font-bold text-[var(--text-primary)] shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Tag size={15} className="text-indigo-500" />
                <span>{t.categoriesManagement}</span>
              </span>
              <ChevronRight size={14} className="text-[var(--text-muted)]" />
            </button>
          </div>

          {/* Install App Button */}
          <div className="pt-3">
            <button
              onClick={() => {
                onClose();
                onInstallApp();
              }}
              className="w-full py-2 px-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-left flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 shadow-sm"
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
              className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[var(--modal-bg)] rounded-2xl border border-[var(--border)] shadow-2xl p-5 space-y-4 animate-slide-up text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-500 mx-auto flex items-center justify-center shadow-md">
          <img src={logoImg} alt="My Luy" className="w-10 h-10 object-contain rounded-xl" />
        </div>

        <div>
          <h3 className="font-bold text-base text-[var(--text-primary)]">{t.installApp}</h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">{t.installAppDesc}</p>
        </div>

        <div className="space-y-2 text-left bg-[var(--input-bg)] p-3 rounded-xl border border-[var(--border)] text-xs text-[var(--text-secondary)] shadow-sm">
          <p className="flex items-start gap-2">
            <Share2 size={14} className="text-indigo-500 flex-shrink-0 mt-0.5" />
            <span>{t.installGuideSafari}</span>
          </p>
          <p className="flex items-start gap-2">
            <Download size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>{t.installGuideDesktop}</span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20"
        >
          {t.cancel}
        </button>
      </div>
    </div>
  );
}
