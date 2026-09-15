import {
  AppStore,
  LineEntry,
  ProductionLine,
  RolePerson,
  TierDefinition,
  GoogleUserSession,
  CustomFloor,
  CustomCompartment,
  CloudSyncState,
  UserAccountSession,
  RegisteredUser
} from '../types';

export const DEFAULT_CUSTOMIZABLE_TIERS: TierDefinition[] = [
  {
    id: 'tier_0',
    level: 0,
    name: 'admin',
    shortCode: 'T0',
    color: 'brand',
    description: 'Full System Management',
    canManageTierLevels: [1, 2, 3, 4], // Customizable: can manage Tier 1, 2, 3, 4
    allowSelfAssignment: true,
    canCreateTodos: true,
    canCreateSchedules: true,
    canEditLineData: true,
    canApproveChecklist: true,
    canEdit: true,
    canDelete: true,
    canExport: true,
    canManageLines: true,
    canManageRoles: true,
    systemRoleKey: 'admin'
  },
  {
    id: 'tier_1',
    level: 1,
    name: 'IE Sr. Manager',
    shortCode: 'T1',
    color: 'violet',
    description: 'Head of Industrial Engineering & Strategic Operations',
    canManageTierLevels: [2, 3, 4], // Customizable: can manage Tier 2, 3, 4
    allowSelfAssignment: true,
    canCreateTodos: true,
    canCreateSchedules: true,
    canEditLineData: true,
    canApproveChecklist: true,
    canEdit: true,
    canDelete: true,
    canExport: true,
    canManageLines: true,
    canManageRoles: true,
    systemRoleKey: 'hod'
  },
  {
    id: 'tier_2',
    level: 2,
    name: 'IE Manager',
    shortCode: 'T2',
    color: 'sky',
    description: 'Unit IE Supervision & Production Floor Balancing Lead',
    canManageTierLevels: [3, 4], // Customizable: can manage Tier 3, 4
    allowSelfAssignment: true,
    canCreateTodos: true,
    canCreateSchedules: true,
    canEditLineData: true,
    canApproveChecklist: true,
    canEdit: true,
    canDelete: false,
    canExport: true,
    canManageLines: true,
    canManageRoles: false,
    systemRoleKey: 'manager'
  },
  {
    id: 'tier_3',
    level: 3,
    name: 'IE Assistant Manager',
    shortCode: 'T3',
    color: 'emerald',
    description: 'Floor Execution, Production Line Balancing Lead',
    canManageTierLevels: [4], // Customizable: can manage Tier 4
    allowSelfAssignment: true,
    canCreateTodos: true,
    canCreateSchedules: true,
    canEditLineData: true,
    canApproveChecklist: false,
    canEdit: true,
    canDelete: false,
    canExport: true,
    canManageLines: true,
    canManageRoles: false,
    systemRoleKey: 'ie_asst_manager'
  },
  {
    id: 'tier_4',
    level: 4,
    name: 'Jr / IE Executive',
    shortCode: 'T4',
    color: 'amber',
    description: 'Field Time Study Observer & Capacity Matrix Recorder',
    canManageTierLevels: [], // Customizable: can be configured as needed
    allowSelfAssignment: true,
    canCreateTodos: true,
    canCreateSchedules: false,
    canEditLineData: true,
    canApproveChecklist: false,
    canEdit: false,
    canDelete: false,
    canExport: true,
    canManageLines: false,
    canManageRoles: false,
    systemRoleKey: 'line_ie'
  }
];

export const DEFAULT_GOOGLE_USER: GoogleUserSession = {
  isSignedIn: true,
  userId: 'google_user_ashashikhossain77',
  email: 'ashashikhossain77@gmail.com',
  name: 'Ashikur Rahman',
  role: 'admin',
  tierId: 'tier_0',
  department: 'Industrial Engineering & CIT',
  employeeId: 'IE-12455',
  loginTime: new Date().toISOString(),
  authProvider: 'google',
  accessToken: 'ya29.a0AfH6SM_live_session_token_apparel_ie'
};

export const DEFAULT_REGISTERED_USERS: RegisteredUser[] = [
  {
    id: 'user-google-1',
    name: 'MD. Ashikur Rahman',
    email: 'ashikur.rahman.0971@gmail.com',
    employeeId: 'IE-12455',
    department: 'Industrial Engineering & CIT',
    tierId: 'tier_0',
    role: 'admin',
    authProvider: 'google',
    assignedLines: ['Line 18', 'Line 19'],
    createdAt: '2023-07-15T08:00:00.000Z'
  },
  {
    id: 'user-google-2',
    name: 'Ashik Hossain',
    email: 'ashashikhossain77@gmail.com',
    employeeId: 'IE-8801',
    department: 'Industrial Engineering & CIT',
    tierId: 'tier_0',
    role: 'admin',
    authProvider: 'google',
    assignedLines: ['Line 18', 'Line 19'],
    createdAt: '2023-07-15T08:00:00.000Z'
  },
];

export const DEFAULT_CUSTOM_FLOORS: CustomFloor[] = [
  {
    id: 'floor_04',
    name: 'Karatoya Floor (Sewing Floor)',
    code: 'KTF',
    building: 'New Building',
    ieAsstManager: 'Shaheen Alom',
    lineCapacity: 06,
    notes: 'Medium efficiency Outerwear, Jacket lines'
  },
  {
    id: 'floor_05',
    name: 'Shitalakhaya Floor (Sewing Floor)',
    code: 'SF',
    building: 'New Building',
    ieAsstManager: 'Mehedi',
    lineCapacity: 06,
    notes: 'Medium efficiency Outerwear, Jacket lines'
  },
  {
    id: 'floor_06',
    name: 'Turag Floor (Sewing Floor)',
    code: 'TF',
    building: 'New Building',
    ieAsstManager: 'Afjal Hossain',
    lineCapacity: 06,
    notes: 'Medium efficiency Outerwear, Jacket lines'
  }
];

export const DEFAULT_CUSTOM_COMPARTMENTS: CustomCompartment[] = [
  {
    id: 'comp_1',
    name: 'Old Building (Jacket & Outerwear)',
    code: 'Old Building',
    floorId: 'floor_01,floor_02,floor_03',
    sectionType: 'sewing',
    ieManager: 'Shoriful Islam Rasel',
    lineCapacity: 17,
    notes: 'Lines 1 to 17 dedicated to H&M and C&A programs'
  },
  {
    id: 'comp_2',
    name: 'New Building (Jacket & Outerwear)',
    code: 'New Building',
    floorId: 'floor_04,floor_05,floor_06',
    sectionType: 'sewing',
    ieManager: 'Tasnimal Reza',
    lineCapacity: 17,
    notes: 'Lines 18 to 34 dedicated to OTCF and C&A programs'
  }
];

export const DEFAULT_CLOUD_SYNC: CloudSyncState = {
  isLive: true,
  status: 'live',
  lastSyncTime: new Date().toISOString(),
  autoSyncIntervalSec: 15,
  conflictResolution: 'merge',
  cloudEndpoint: 'wss://cloud.ie-apparel-systems.io/v1/factory-node-01',
  latencyMs: 24,
  totalSyncedPayloadKb: 148.6,
  offlineQueueCount: 0,
  syncHistory: [
    {
      id: 'sync-1',
      timestamp: new Date(Date.now() - 45000).toISOString(),
      action: 'Hourly Production & Efficiency Telemetry Uploaded',
      status: 'success',
      recordsSynced: 8,
      sizeBytes: 4210,
      latencyMs: 22
    },
    {
      id: 'sync-2',
      timestamp: new Date(Date.now() - 120000).toISOString(),
      action: 'Floor 01 & Floor 02 Manpower Attendance Broadcasted',
      status: 'success',
      recordsSynced: 5,
      sizeBytes: 2840,
      latencyMs: 27
    },
    {
      id: 'sync-3',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      action: 'Customizable Tier Delegation Matrix Config Synced',
      status: 'success',
      recordsSynced: 4,
      sizeBytes: 1980,
      latencyMs: 19
    }
  ]
};

export function getTodayISO(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function getDateOffsetISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export const BASE_PRESETS: Record<string, {
  label: string;
  color: 'brand' | 'violet' | 'sky' | 'emerald' | 'amber' | 'slate';
  edit: boolean;
  checklist: boolean;
  linedata: boolean;
  reports: boolean;
  download: boolean;
  audit: boolean;
  manageLines: boolean;
  export: boolean;
  delete: boolean;
  manageRoles: boolean;
  defaultLines: string[] | null;
  hierarchyLevel: number;
  canManageTiers: number[];
}> = {
  admin: {
    label: 'Admin',
    color: 'brand',
    edit: true,
    checklist: true,
    linedata: true,
    reports: true,
    download: true,
    audit: true,
    manageLines: true,
    export: true,
    delete: true,
    manageRoles: true,
    defaultLines: null,
    hierarchyLevel: 0,
    canManageTiers: [1, 2, 3, 4]
  },
  sr_manager: {
    label: 'Sr Manager',
    color: 'violet',
    edit: true,
    checklist: true,
    linedata: true,
    reports: true,
    download: true,
    audit: true,
    manageLines: true,
    export: true,
    delete: true,
    manageRoles: true,
    defaultLines: null,
    hierarchyLevel: 1,
    canManageTiers: [2, 3, 4] // Sr Manager: manage and make to-do list & custom time schedule for 2, 3 & 4
  },
  manager: {
    label: 'Manager',
    color: 'sky',
    edit: true,
    checklist: true,
    linedata: true,
    reports: true,
    download: true,
    audit: true,
    manageLines: true,
    export: true,
    delete: false,
    manageRoles: false,
    defaultLines: null,
    hierarchyLevel: 2,
    canManageTiers: [3, 4] // Manager: manage and make to-do list & custom time schedule for 3 & 4
  },
  assistant_manager: {
    label: 'Assistant Manager',
    color: 'emerald',
    edit: true,
    checklist: true,
    linedata: true,
    reports: true,
    download: true,
    audit: ture,
    manageLines: false,
    export: true,
    delete: false,
    manageRoles: false,
    defaultLines: null,
    hierarchyLevel: 3,
    canManageTiers: [4] // Assistant Manager: manage and make to-do list & custom time schedule for 4
  },
  line_ie: {
    label: 'Line IE',
    color: 'slate',
    edit: false,
    checklist: false,
    linedata: true,
    reports: true,
    download: false,
    audit: false,
    manageLines: false,
    export: false,
    delete: false,
    manageRoles: false,
    defaultLines: null,
    hierarchyLevel: 4,
    canManageTiers: []
  },
  user: {
    label: 'User',
    color: 'slate',
    edit: false,
    checklist: false,
    linedata: false,
    reports: true,
    download: false,
    audit: false,
    manageLines: false,
    export: false,
    delete: false,
    manageRoles: false,
    defaultLines: null,
    hierarchyLevel: 4,
    canManageTiers: []
  }
};

export const INITIAL_LINES: ProductionLine[] = [
  {
    id: 1,
    lineNo: '18',
    floor: 'Floor 01 (Ground Floor)',
    floorId: 'floor_01',
    compartment: 'Unit A (Polo & T-Shirt Bay)',
    compartmentId: 'comp_1',
    status: 'active',
    runningStyle: 'TS-2401 Crewneck',
    currentBuyer: 'H&M',
    operators: 27,
    helpers: 8,
    ironMen: 3,
    targetDailyOutput: 1200,
    smv: 0.85,
    targetEfficiency: 85,
    supervisor: 'Mahmudul Hoque',
    teamMembers: [
      { name: 'Rina Begum', role: 'Operator' },
      { name: 'Karim Mollah', role: 'Helper' },
      { name: 'Sabbir Hossain', role: 'Iron Man' }
    ],
    active: true
  },
  {
    id: 2,
    lineNo: '19',
    floor: 'Floor 01 (Ground Floor)',
    floorId: 'floor_01',
    compartment: 'Unit A (Polo & T-Shirt Bay)',
    compartmentId: 'comp_1',
    status: 'active',
    runningStyle: 'JK-1180 Windbreaker',
    currentBuyer: 'Zara',
    operators: 30,
    helpers: 9,
    ironMen: 3,
    targetDailyOutput: 900,
    smv: 1.25,
    targetEfficiency: 80,
    supervisor: 'Jahangir Alam',
    teamMembers: [
      { name: 'Nasima Khatun', role: 'Operator' },
      { name: 'Nila Akhter', role: 'Helper' },
      { name: 'Jahangir Alam', role: 'Supervisor' }
    ],
    active: true
  },
  {
    id: 3,
    lineNo: '20',
    floor: 'Floor 01 (Ground Floor)',
    floorId: 'floor_01',
    compartment: 'Unit B (Woven & Windbreaker Cell)',
    compartmentId: 'comp_2',
    status: 'active',
    runningStyle: 'PL-3302 Pique Polo',
    currentBuyer: 'Gap',
    operators: 28,
    helpers: 8,
    ironMen: 2,
    targetDailyOutput: 1100,
    smv: 0.95,
    targetEfficiency: 88,
    supervisor: 'Mahmudul Hoque',
    teamMembers: [
      { name: 'Imran Khan', role: 'Operator' },
      { name: 'Shahidul Islam', role: 'Helper' }
    ],
    active: true
  },
  {
    id: 4,
    lineNo: '21',
    floor: 'Floor 01 (Ground Floor)',
    floorId: 'floor_01',
    compartment: 'Unit B (Woven & Windbreaker Cell)',
    compartmentId: 'comp_2',
    status: 'changeover',
    runningStyle: 'TS-2410 V-Neck',
    currentBuyer: 'H&M',
    operators: 25,
    helpers: 7,
    ironMen: 2,
    targetDailyOutput: 1000,
    smv: 0.90,
    targetEfficiency: 85,
    supervisor: 'Sharmin Sultana',
    teamMembers: [
      { name: 'Tania Sultana', role: 'Operator' },
      { name: 'Morium Begum', role: 'Helper' }
    ],
    active: true
  },
  {
    id: 5,
    lineNo: '22',
    floor: 'Floor 01 (Ground Floor)',
    floorId: 'floor_01',
    compartment: 'Unit C (Specialty & Automation Bay)',
    compartmentId: 'comp_3',
    status: 'active',
    runningStyle: 'HD-5501 Zip Hoodie',
    currentBuyer: 'Target',
    operators: 32,
    helpers: 8,
    ironMen: 2,
    targetDailyOutput: 800,
    smv: 1.45,
    targetEfficiency: 82,
    supervisor: 'Sharmin Sultana',
    teamMembers: [
      { name: 'Raju Ahmed', role: 'Operator' }
    ],
    active: true
  },
  {
    id: 6,
    lineNo: '23',
    floor: 'Floor 01 (Ground Floor)',
    floorId: 'floor_01',
    compartment: 'Unit C (Specialty & Automation Bay)',
    compartmentId: 'comp_3',
    status: 'maintenance',
    runningStyle: 'SW-9022 Thermal Fleece',
    currentBuyer: 'Next',
    operators: 29,
    helpers: 7,
    ironMen: 2,
    targetDailyOutput: 750,
    smv: 1.60,
    targetEfficiency: 78,
    supervisor: 'Jahangir Alam',
    teamMembers: [
      { name: 'Hasina Banu', role: 'Operator' }
    ],
    active: true
  },
  {
    id: 7,
    lineNo: '24',
    floor: 'Floor 02 (Sewing Hall)',
    floorId: 'floor_02',
    compartment: 'Unit A (Dry-Ex Activewear Cell)',
    compartmentId: 'comp_4',
    status: 'active',
    runningStyle: 'PL-1100 Dry-Ex',
    currentBuyer: 'Uniqlo',
    operators: 30,
    helpers: 9,
    ironMen: 3,
    targetDailyOutput: 1300,
    smv: 0.80,
    targetEfficiency: 92,
    supervisor: 'Faruk Hossain',
    teamMembers: [
      { name: 'Faruk Hossain', role: 'Operator' },
      { name: 'Bilkis Akter', role: 'Helper' }
    ],
    active: true
  },
  {
    id: 8,
    lineNo: '25',
    floor: 'Floor 02 (Sewing Hall)',
    floorId: 'floor_02',
    compartment: 'Unit A (Dry-Ex Activewear Cell)',
    compartmentId: 'comp_4',
    status: 'active',
    runningStyle: 'ACT-770 Runner Singlet',
    currentBuyer: 'Uniqlo',
    operators: 26,
    helpers: 6,
    ironMen: 2,
    targetDailyOutput: 1400,
    smv: 0.72,
    targetEfficiency: 90,
    supervisor: 'Bilkis Akter',
    teamMembers: [
      { name: 'Shakil Mia', role: 'Operator' }
    ],
    active: true
  }
];

export const INITIAL_ROLE_PEOPLE: RolePerson[] = [
  { id: 1, name: 'Engr. Ashikur Rahman', roleKey: 'admin', lines: [], active: true },
  { id: 2, name: 'Tanvir Hasan', roleKey: 'manager', lines: [], active: true },
  { id: 3, name: 'Farhana Chowdhury', roleKey: 'assistant_manager', lines: ['18', '19', '20', '21', '22', '24'], active: true },
  { id: 4, name: 'Mahmudul Hoque', roleKey: 'officer', lines: ['18', '19', '20'], active: true },
  { id: 5, name: 'Sharmin Sultana', roleKey: 'officer', lines: ['21', '22', '24'], active: true }
];

export function getInitialData(): AppStore {
  const today = getTodayISO();
  const dMinus1 = getDateOffsetISO(-1);
  const dMinus2 = getDateOffsetISO(-2);
  const dMinus3 = getDateOffsetISO(-3);
  const dMinus4 = getDateOffsetISO(-4);
  const dMinus5 = getDateOffsetISO(-5);
  const dMinus6 = getDateOffsetISO(-6);
  const dMinus7 = getDateOffsetISO(-7);
  const dMinus8 = getDateOffsetISO(-8);
  const dMinus9 = getDateOffsetISO(-9);
  const dMinus10 = getDateOffsetISO(-10);
  const dMinus11 = getDateOffsetISO(-11);
  const dMinus12 = getDateOffsetISO(-12);
  const dMinus13 = getDateOffsetISO(-13);
  const dMinus14 = getDateOffsetISO(-14);

  const initialLineEntries: LineEntry[] = [
    {
      id: 1,
      date: today,
      lineNo: '18',
      floor: 'Floor 01 / Unit A',
      buyer: 'H&M',
      style: 'TS-2401 Crewneck',
      smv: 0.85,
      plannedMP: 40,
      workingHours: 8,
      targetEff: 85,
      targetProd: 1200,
      achievedProd: 1080,
      efficiency: 90,
      remarks: 'Smooth run, neckline attachment improved after method change',
      orderQty: 15000,
      dailyInput: 1150,
      dailyOutput: 1080,
      wip: 320,
      balancingGraph: 'day4',
      nextStyle: 'TS-2501 Winter Thermal',
      nextStyleDate: getDateOffsetISO(5),
      mp: {
        Operator: { present: 28, absent: 2 },
        Helper: { present: 8, absent: 1 },
        'Iron Man': { present: 3, absent: 0 }
      },
      balanceMethod: 'Overtime',
      balanceNotes: '2 operators worked 1 hr OT to absorb backlog',
      top5: {
        held: 'yes',
        attendance: 95,
        items: [
          'Rib attach thread tension check completed',
          'Needle break rate reduced to <0.5%',
          'Hourly output target 145 pcs aligned',
          'Helper bundle handling optimized',
          'End-line inspector feedback recorded'
        ],
        notes: 'Line supervisor confirmed all 5 actions acknowledged by batch chiefs'
      },
      bottleneck: {
        station: 'Cuff & Hem stitch',
        cycleTime: 48.5,
        targetCT: 45.0,
        status: 'ok',
        action: 'Guide attachment added to folder',
        notes: 'Within 7% of target cycle time'
      },
      timeStudy: {
        done: 'yes',
        type: 'time',
        observedRate: 142,
        standardRate: 150,
        findings: 'Operator motion efficiency 94.6%'
      },
      buildUp: {
        day: '4',
        plannedPct: 90,
        achievedPct: 90,
        operators: 39,
        notes: 'Learning curve peak achieved ahead of schedule'
      },
      lineIE: {
        name: 'Mahmudul Hoque',
        level: 'sr_executive',
        period: 'daily',
        weeklyNotes: 'On track to meet weekly shipping milestone',
        monthlyNotes: 'Consistent line efficiency >88%',
        additionalInfo: 'Line ready for upcoming audit inspection'
      }
    },
    {
      id: 2,
      date: today,
      lineNo: '19',
      floor: 'Floor 01 / Unit A',
      buyer: 'Zara',
      style: 'JK-1180 Windbreaker',
      smv: 1.25,
      plannedMP: 45,
      workingHours: 8,
      targetEff: 80,
      targetProd: 900,
      achievedProd: 720,
      efficiency: 80,
      remarks: 'Zipper insertion bottleneck addressed with temporary helper',
      orderQty: 8500,
      dailyInput: 750,
      dailyOutput: 720,
      wip: 410,
      balancingGraph: 'day2',
      nextStyle: 'JK-1200 Bomber',
      nextStyleDate: getDateOffsetISO(2),
      mp: {
        Operator: { present: 24, absent: 4 },
        Helper: { present: 6, absent: 2 },
        'Iron Man': { present: 2, absent: 1 }
      },
      balanceMethod: 'Borrowed from other line',
      balanceNotes: '2 operators borrowed from training pool',
      top5: {
        held: 'yes',
        attendance: 90,
        items: [
          'Zipper slider test done with QC',
          'Interlining fusing heat calibrated at 140°C',
          'Pocket welt placement template deployed',
          'Helper sorting tags validated',
          'WIP buffer maintained at 30 pcs'
        ],
        notes: 'Supervisor instructed on continuous piece flow'
      },
      bottleneck: {
        station: 'Front zipper attach',
        cycleTime: 62.0,
        targetCT: 52.0,
        status: 'high',
        action: 'Assigned senior multi-skilled operator',
        notes: 'Cycle time dropped from 68s to 62s'
      },
      timeStudy: {
        done: 'yes',
        type: 'production',
        observedRate: 90,
        standardRate: 112,
        findings: 'Material handling delay accounts for 4.2s per garment'
      },
      buildUp: {
        day: '2',
        plannedPct: 75,
        achievedPct: 80,
        operators: 32,
        notes: 'Target achieved despite 4 absentees'
      },
      lineIE: {
        name: 'Mahmudul Hoque',
        level: 'sr_executive',
        period: 'daily',
        weeklyNotes: 'Focus on zipper station balancing',
        monthlyNotes: 'Targeting 85% stable efficiency by Friday',
        additionalInfo: 'Fabric lot change scheduled tomorrow morning'
      }
    },
    {
      id: 3,
      date: today,
      lineNo: '20',
      floor: 'Floor 01 / Unit B',
      buyer: 'Gap',
      style: 'PL-3302 Pique Polo',
      smv: 0.95,
      plannedMP: 38,
      workingHours: 8,
      targetEff: 88,
      targetProd: 1100,
      achievedProd: 990,
      efficiency: 90,
      remarks: 'Placket folding accurate, collar rib tension stable',
      orderQty: 12000,
      dailyInput: 1050,
      dailyOutput: 990,
      wip: 180,
      balancingGraph: 'complete',
      nextStyle: 'PL-3305 Long Sleeve',
      nextStyleDate: getDateOffsetISO(8),
      mp: {
        Operator: { present: 26, absent: 1 },
        Helper: { present: 7, absent: 0 },
        'Iron Man': { present: 3, absent: 0 }
      },
      balanceMethod: 'Overtime',
      balanceNotes: 'Regular line balance maintained',
      top5: {
        held: 'yes',
        attendance: 100,
        items: [
          'Box placket stitch quality reviewed',
          'Collar point symmetry matched spec',
          'Buttons pull test passed at 90N',
          'Thread trim speed enhanced',
          'Operator fatigue reduction rest breaks'
        ],
        notes: 'Excellent teamwork and communication'
      },
      bottleneck: {
        station: 'Collar join & band',
        cycleTime: 44.0,
        targetCT: 43.5,
        status: 'ok',
        action: 'Standard gauge foot applied',
        notes: 'Very stable cycle'
      },
      timeStudy: {
        done: 'yes',
        type: 'both',
        observedRate: 128,
        standardRate: 135,
        findings: 'High pitch operator performance'
      },
      buildUp: {
        day: 'stable',
        plannedPct: 90,
        achievedPct: 90,
        operators: 36,
        notes: 'Stable production phase'
      },
      lineIE: {
        name: 'Mahmudul Hoque',
        level: 'sr_executive',
        period: 'daily',
        weeklyNotes: 'Consistently top performing line this week',
        monthlyNotes: 'Ready for lean benchmark showcase',
        additionalInfo: ''
      }
    },
    {
      id: 4,
      date: today,
      lineNo: '21',
      floor: 'Floor 01 / Unit B',
      buyer: 'H&M',
      style: 'TS-2410 V-Neck',
      smv: 0.90,
      plannedMP: 36,
      workingHours: 8,
      targetEff: 85,
      targetProd: 1000,
      achievedProd: 850,
      efficiency: 85,
      remarks: 'V-neck center point alignment monitored hourly',
      orderQty: 10000,
      dailyInput: 900,
      dailyOutput: 850,
      wip: 250,
      balancingGraph: 'day1',
      nextStyle: 'TS-2420 Henley',
      nextStyleDate: getDateOffsetISO(9),
      mp: {
        Operator: { present: 25, absent: 3 },
        Helper: { present: 7, absent: 1 },
        'Iron Man': { present: 2, absent: 0 }
      },
      balanceMethod: 'Reduced target',
      balanceNotes: 'Adjusted target for first day run',
      top5: {
        held: 'yes',
        attendance: 88,
        items: [
          'V-neck tape binding tension fixed',
          'Shoulder stay tape position checked',
          'Bottom hem twin needle guide set',
          'Bundling sequence clarified',
          'Safety guard on overlock machines'
        ],
        notes: 'Day 1 setup complete'
      },
      bottleneck: {
        station: 'V-neck insert & topstitch',
        cycleTime: 54.0,
        targetCT: 48.0,
        status: 'high',
        action: 'Pre-creasing jig supplied',
        notes: 'Expect improvement tomorrow'
      },
      timeStudy: {
        done: 'partial',
        type: 'time',
        observedRate: 106,
        standardRate: 125,
        findings: 'First day learning curve underway'
      },
      buildUp: {
        day: '1',
        plannedPct: 60,
        achievedPct: 85,
        operators: 34,
        notes: 'Better than planned first day'
      },
      lineIE: {
        name: 'Sharmin Sultana',
        level: 'executive',
        period: 'daily',
        weeklyNotes: 'Style transition completed successfully',
        monthlyNotes: 'Expected to reach 85%+ in 2 days',
        additionalInfo: ''
      }
    },
    {
      id: 5,
      date: today,
      lineNo: '24',
      floor: 'Floor 02 / Unit A',
      buyer: 'Uniqlo',
      style: 'PL-1100 Dry-Ex',
      smv: 0.80,
      plannedMP: 42,
      workingHours: 8,
      targetEff: 92,
      targetProd: 1300,
      achievedProd: 1200,
      efficiency: 92,
      remarks: 'Synthetic fabric handling optimal, zero static issues reported',
      orderQty: 20000,
      dailyInput: 1250,
      dailyOutput: 1200,
      wip: 90,
      balancingGraph: 'complete',
      nextStyle: 'PL-1150 Mesh Polo',
      nextStyleDate: getDateOffsetISO(5),
      mp: {
        Operator: { present: 30, absent: 0 },
        Helper: { present: 9, absent: 1 },
        'Iron Man': { present: 3, absent: 0 }
      },
      balanceMethod: 'Extra operators',
      balanceNotes: '1 extra floating helper deployed',
      top5: {
        held: 'yes',
        attendance: 100,
        items: [
          'Silicon spray applied to needle bars',
          'Mesh panel match points verified',
          'Heat seal brand label test approved',
          'Anti-snagging glove check enforced',
          'Inspection light intensity checked (1000 lux)'
        ],
        notes: 'Standard operating procedures fully complied'
      },
      bottleneck: {
        station: 'Raglan sleeve join',
        cycleTime: 39.0,
        targetCT: 38.0,
        status: 'ok',
        action: 'Differential feed fine-tuned',
        notes: 'Puckering eliminated'
      },
      timeStudy: {
        done: 'yes',
        type: 'time',
        observedRate: 152,
        standardRate: 160,
        findings: 'High consistency across all operators'
      },
      buildUp: {
        day: 'stable',
        plannedPct: 92,
        achievedPct: 92,
        operators: 42,
        notes: 'Target exceeded consistently'
      },
      lineIE: {
        name: 'Sharmin Sultana',
        level: 'executive',
        period: 'daily',
        weeklyNotes: 'Uniqlo auditor praised layout and visual management',
        monthlyNotes: 'Model line candidate',
        additionalInfo: ''
      }
    },
    // Historical entries for dMinus1 (previous day baseline for efficiency comparison)
    {
      id: 101,
      date: dMinus1,
      lineNo: '18',
      floor: 'Floor 01 / Unit A',
      buyer: 'H&M',
      style: 'TS-2401 Crewneck',
      smv: 0.85,
      plannedMP: 40,
      workingHours: 8,
      targetEff: 85,
      targetProd: 1200,
      achievedProd: 1044,
      efficiency: 87,
      remarks: 'Moderate run, minor machine needle downtime',
      orderQty: 15000,
      dailyInput: 1100,
      dailyOutput: 1044,
      wip: 350,
      balancingGraph: 'day2',
      nextStyle: 'TS-2501 Winter Thermal',
      nextStyleDate: getDateOffsetISO(6),
      mp: {
        Operator: { present: 27, absent: 3 },
        Helper: { present: 8, absent: 1 },
        'Iron Man': { present: 3, absent: 0 }
      },
      balanceMethod: 'Overtime',
      balanceNotes: '1 hr OT planned',
      top5: { held: 'yes', attendance: 90, items: ['Rib attach', 'Needle checks'], notes: 'Standard checks' },
      bottleneck: { station: 'Cuff stitch', cycleTime: 49.0, targetCT: 45.0, status: 'ok', action: 'Attachment adjusted', notes: '' },
      timeStudy: { done: 'yes', type: 'time', observedRate: 135, standardRate: 150, findings: 'Standard pace' },
      buildUp: { day: '3', plannedPct: 85, achievedPct: 87, operators: 38, notes: 'Build-up progression' },
      lineIE: { name: 'Mahmudul Hoque', level: 'sr_executive', period: 'daily', weeklyNotes: '', monthlyNotes: '', additionalInfo: '' }
    },
    {
      id: 102,
      date: dMinus1,
      lineNo: '19',
      floor: 'Floor 01 / Unit A',
      buyer: 'Zara',
      style: 'JK-1180 Windbreaker',
      smv: 1.25,
      plannedMP: 45,
      workingHours: 8,
      targetEff: 80,
      targetProd: 900,
      achievedProd: 756,
      efficiency: 84,
      remarks: 'Zipper operator worked full shift without bottleneck',
      orderQty: 8500,
      dailyInput: 800,
      dailyOutput: 756,
      wip: 380,
      balancingGraph: 'day1',
      nextStyle: 'JK-1200 Bomber',
      nextStyleDate: getDateOffsetISO(3),
      mp: {
        Operator: { present: 26, absent: 2 },
        Helper: { present: 7, absent: 1 },
        'Iron Man': { present: 3, absent: 0 }
      },
      balanceMethod: 'Overtime',
      balanceNotes: 'Normal shift',
      top5: { held: 'yes', attendance: 92, items: ['Zipper verify'], notes: 'On target' },
      bottleneck: { station: 'Zipper install', cycleTime: 65.0, targetCT: 60.0, status: 'high', action: 'Support helper assigned', notes: '' },
      timeStudy: { done: 'yes', type: 'time', observedRate: 95, standardRate: 110, findings: 'Acceptable speed' },
      buildUp: { day: '1', plannedPct: 70, achievedPct: 84, operators: 36, notes: 'Good initial start' },
      lineIE: { name: 'Mahmudul Hoque', level: 'sr_executive', period: 'daily', weeklyNotes: '', monthlyNotes: '', additionalInfo: '' }
    },
    {
      id: 103,
      date: dMinus1,
      lineNo: '20',
      floor: 'Floor 01 / Unit B',
      buyer: 'Tommy Hilfiger',
      style: 'SH-402 Polo Pique',
      smv: 1.10,
      plannedMP: 38,
      workingHours: 8,
      targetEff: 88,
      targetProd: 1100,
      achievedProd: 1001,
      efficiency: 91,
      remarks: 'Steady run, minor trim check in mid-afternoon',
      orderQty: 12000,
      dailyInput: 1050,
      dailyOutput: 1001,
      wip: 210,
      balancingGraph: 'day4',
      nextStyle: 'SH-405 Long Sleeve Polo',
      nextStyleDate: getDateOffsetISO(8),
      mp: {
        Operator: { present: 25, absent: 2 },
        Helper: { present: 7, absent: 0 },
        'Iron Man': { present: 3, absent: 0 }
      },
      balanceMethod: 'Overtime',
      balanceNotes: 'Smooth operations',
      top5: { held: 'yes', attendance: 98, items: ['Placket folder'], notes: '' },
      bottleneck: { station: 'Collar join', cycleTime: 45.0, targetCT: 43.5, status: 'ok', action: '', notes: '' },
      timeStudy: { done: 'yes', type: 'both', observedRate: 122, standardRate: 135, findings: 'Efficient movement' },
      buildUp: { day: 'stable', plannedPct: 90, achievedPct: 91, operators: 35, notes: '' },
      lineIE: { name: 'Mahmudul Hoque', level: 'sr_executive', period: 'daily', weeklyNotes: '', monthlyNotes: '', additionalInfo: '' }
    },
    {
      id: 104,
      date: dMinus1,
      lineNo: '21',
      floor: 'Floor 01 / Unit B',
      buyer: 'H&M',
      style: 'TS-2410 V-Neck',
      smv: 0.90,
      plannedMP: 36,
      workingHours: 8,
      targetEff: 85,
      targetProd: 1000,
      achievedProd: 810,
      efficiency: 81,
      remarks: 'Initial trial runs on new neck binding jig',
      orderQty: 10000,
      dailyInput: 850,
      dailyOutput: 810,
      wip: 290,
      balancingGraph: 'day1',
      nextStyle: 'TS-2420 Henley',
      nextStyleDate: getDateOffsetISO(10),
      mp: {
        Operator: { present: 24, absent: 4 },
        Helper: { present: 6, absent: 2 },
        'Iron Man': { present: 2, absent: 0 }
      },
      balanceMethod: 'Reduced target',
      balanceNotes: 'Trial day',
      top5: { held: 'yes', attendance: 85, items: ['V-neck trial'], notes: '' },
      bottleneck: { station: 'V-neck insert', cycleTime: 57.0, targetCT: 48.0, status: 'high', action: 'Trained instructor present', notes: '' },
      timeStudy: { done: 'partial', type: 'time', observedRate: 100, standardRate: 125, findings: '' },
      buildUp: { day: '1', plannedPct: 60, achievedPct: 81, operators: 32, notes: '' },
      lineIE: { name: 'Sharmin Sultana', level: 'executive', period: 'daily', weeklyNotes: '', monthlyNotes: '', additionalInfo: '' }
    },
    {
      id: 105,
      date: dMinus1,
      lineNo: '24',
      floor: 'Floor 02 / Unit A',
      buyer: 'Uniqlo',
      style: 'PL-1100 Dry-Ex',
      smv: 0.80,
      plannedMP: 42,
      workingHours: 8,
      targetEff: 92,
      targetProd: 1300,
      achievedProd: 1235,
      efficiency: 95,
      remarks: 'Peak record output day with zero quality rejects',
      orderQty: 20000,
      dailyInput: 1300,
      dailyOutput: 1235,
      wip: 70,
      balancingGraph: 'complete',
      nextStyle: 'PL-1150 Mesh Polo',
      nextStyleDate: getDateOffsetISO(6),
      mp: {
        Operator: { present: 30, absent: 0 },
        Helper: { present: 9, absent: 1 },
        'Iron Man': { present: 3, absent: 0 }
      },
      balanceMethod: 'Extra operators',
      balanceNotes: 'High pacing',
      top5: { held: 'yes', attendance: 100, items: ['Silicon needle', 'Anti-snagging'], notes: 'Optimal conditions' },
      bottleneck: { station: 'Raglan sleeve', cycleTime: 38.0, targetCT: 38.0, status: 'ok', action: '', notes: '' },
      timeStudy: { done: 'yes', type: 'time', observedRate: 156, standardRate: 160, findings: 'Flawless cycle' },
      buildUp: { day: 'stable', plannedPct: 92, achievedPct: 95, operators: 42, notes: '' },
      lineIE: { name: 'Sharmin Sultana', level: 'executive', period: 'daily', weeklyNotes: '', monthlyNotes: '', additionalInfo: '' }
    }
  ];

  return {
    checklists: {
      [today]: [
        'yes', 'yes', 'yes', 'yes', 'yes', 'yes',
        'yes', 'pending', 'pending', 'pending', 'no', 'no'
      ],
      [dMinus1]: [
        'yes', 'yes', 'yes', 'yes', 'yes', 'yes',
        'yes', 'yes', 'yes', 'pending', 'yes', 'yes'
      ],
      [dMinus2]: [
        'yes', 'yes', 'yes', 'yes', 'no', 'yes',
        'yes', 'yes', 'pending', 'yes', 'pending', 'yes'
      ],
      [dMinus3]: [
        'yes', 'yes', 'yes', 'yes', 'yes', 'yes',
        'yes', 'yes', 'yes', 'yes', 'yes', 'yes'
      ],
      [dMinus4]: [
        'yes', 'yes', 'pending', 'yes', 'yes', 'yes',
        'no', 'yes', 'yes', 'yes', 'pending', 'yes'
      ],
      [dMinus5]: [
        'yes', 'yes', 'yes', 'yes', 'yes', 'yes',
        'yes', 'yes', 'yes', 'pending', 'yes', 'yes'
      ],
      [dMinus6]: [
        'yes', 'yes', 'yes', 'yes', 'yes', 'pending',
        'yes', 'yes', 'pending', 'yes', 'yes', 'yes'
      ],
      [dMinus7]: [
        'yes', 'yes', 'yes', 'yes', 'yes', 'yes',
        'yes', 'yes', 'yes', 'yes', 'yes', 'yes'
      ],
      [dMinus8]: [
        'yes', 'yes', 'yes', 'pending', 'yes', 'yes',
        'pending', 'yes', 'yes', 'yes', 'no', 'yes'
      ],
      [dMinus9]: [
        'yes', 'yes', 'yes', 'yes', 'yes', 'yes',
        'yes', 'yes', 'yes', 'yes', 'pending', 'yes'
      ],
      [dMinus10]: [
        'yes', 'yes', 'yes', 'yes', 'no', 'yes',
        'yes', 'yes', 'yes', 'yes', 'yes', 'yes'
      ],
      [dMinus11]: [
        'yes', 'yes', 'yes', 'yes', 'yes', 'yes',
        'yes', 'yes', 'yes', 'pending', 'yes', 'yes'
      ],
      [dMinus12]: [
        'yes', 'yes', 'yes', 'yes', 'yes', 'yes',
        'yes', 'yes', 'yes', 'yes', 'yes', 'yes'
      ],
      [dMinus13]: [
        'yes', 'yes', 'pending', 'yes', 'yes', 'yes',
        'yes', 'pending', 'yes', 'yes', 'yes', 'yes'
      ],
      [dMinus14]: [
        'yes', 'yes', 'yes', 'yes', 'yes', 'yes',
        'yes', 'yes', 'yes', 'yes', 'yes', 'yes'
      ]
    },
    lineEntries: initialLineEntries,
    profile: {
      name: 'Ashikur Rahman',
      jobTitle: 'Senior Industrial Engineer',
      role: 'admin',
      notifications: {
        dailyReminder: true,
        complianceAlert: true,
        lineDataSummary: true,
        exportReady: false
      }
    },
    lines: INITIAL_LINES,
    customFloors: DEFAULT_CUSTOM_FLOORS,
    customCompartments: DEFAULT_CUSTOM_COMPARTMENTS,
    rolePeople: INITIAL_ROLE_PEOPLE,
    customRoles: [],
    tiers: DEFAULT_CUSTOMIZABLE_TIERS,
    activeTierId: 'tier_1',
    registeredUsers: DEFAULT_REGISTERED_USERS,
    googleAuth: DEFAULT_GOOGLE_USER,
    userSession: DEFAULT_GOOGLE_USER,
    cloudSync: DEFAULT_CLOUD_SYNC,
    todos: [
      {
        id: 'todo-1',
        title: 'Review Line 18-20 Balancing Graph & Authorize OT Floaters',
        description: 'Verify if 2 extra operators absorbed the collar attachment backlog and approve 1hr overtime.',
        category: 'line_balancing',
        priority: 'high',
        status: 'in_progress',
        targetDate: today,
        dueTime: '11:00',
        lineNo: '18',
        assignedToRole: 'assistant_manager',
        assignedToName: 'Farhana Chowdhury',
        assignedByRole: 'manager',
        assignedByName: 'Tanvir Hasan',
        subtasks: [
          { id: 'st-1', title: 'Check day 4 line balancing graph on Line 18', completed: true },
          { id: 'st-2', title: 'Review cycle times at bottleneck operation #12', completed: true },
          { id: 'st-3', title: 'Sign off overtime balancing authorization', completed: false }
        ],
        notes: 'Target peak production is 1,200 pcs/day for H&M Crewneck.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'todo-2',
        title: 'Conduct Cycle Time Study on Neck Rib Attaching Station',
        description: 'Take 10 cycle observations on machine #18-09 and identify operator motion loss.',
        category: 'time_study',
        priority: 'urgent',
        status: 'pending',
        targetDate: today,
        dueTime: '10:00',
        lineNo: '18',
        assignedToRole: 'officer',
        assignedToName: 'Mahmudul Hoque',
        assignedByRole: 'manager',
        assignedByName: 'Tanvir Hasan',
        subtasks: [
          { id: 'st-4', title: 'Record 10 cycles with digital stopwatch', completed: false },
          { id: 'st-5', title: 'Calculate observed vs standard rating (SMV 0.85)', completed: false },
          { id: 'st-6', title: 'Submit bottleneck flow report to Asst. Manager', completed: false }
        ],
        notes: 'High priority due to 12% variance against target SMV.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'todo-3',
        title: 'Floor WIP Count & Bottleneck Flow Audit at Unit A',
        description: 'Audit in-line bundles between sewing and end-line inspection across Lines 19 & 20.',
        category: 'bottleneck_study',
        priority: 'high',
        status: 'pending',
        targetDate: today,
        dueTime: '13:30',
        lineNo: '19',
        assignedToRole: 'officer',
        assignedToName: 'Mahmudul Hoque',
        assignedByRole: 'assistant_manager',
        assignedByName: 'Farhana Chowdhury',
        subtasks: [
          { id: 'st-7', title: 'Count pieces at sleeve hem station', completed: false },
          { id: 'st-8', title: 'Flag WIP accumulation exceeding 200 pcs', completed: false }
        ],
        notes: 'Ensure balance buffer is maintained.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'todo-4',
        title: 'Verify T.R Sample Readiness for Next Style TS-2501',
        description: 'Coordinate with sample room for technical run sample before style changeover in 5 days.',
        category: 'tr_sample',
        priority: 'medium',
        status: 'in_progress',
        targetDate: today,
        dueTime: '15:00',
        lineNo: '21',
        assignedToRole: 'officer',
        assignedToName: 'Sharmin Sultana',
        assignedByRole: 'assistant_manager',
        assignedByName: 'Farhana Chowdhury',
        subtasks: [
          { id: 'st-9', title: 'Inspect sample seams and critical attachments', completed: true },
          { id: 'st-10', title: 'Confirm critical machine attachments available', completed: false },
          { id: 'st-11', title: 'File 10-day style input date document', completed: false }
        ],
        notes: 'Follow up with pattern maker for updated mock-up.',
        createdAt: new Date().toISOString()
      },
      {
        id: 'todo-5',
        title: 'Kaizen 5S Line Audit & Visual Shadow Board Check',
        description: 'Implement continuous improvement standard on Line 22 tools and thread stands.',
        category: 'kaizen_ci',
        priority: 'low',
        status: 'completed',
        targetDate: today,
        dueTime: '16:00',
        lineNo: '22',
        assignedToRole: 'officer',
        assignedToName: 'Sharmin Sultana',
        assignedByRole: 'assistant_manager',
        assignedByName: 'Farhana Chowdhury',
        subtasks: [
          { id: 'st-12', title: 'Audit scissor and clipper placement', completed: true },
          { id: 'st-13', title: 'Label bobbin color codes', completed: true }
        ],
        notes: 'Line 22 completed 5S audit with 94% score.',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      }
    ],
    schedules: [
      {
        id: 'sched-1',
        title: 'Morning Line Walk, Attendance & Absenteeism Check',
        description: 'Audit present operators vs planned line allocations on Unit A & B.',
        startTime: '08:00',
        endTime: '08:30',
        targetDate: today,
        lineNo: 'All Lines',
        category: 'Line Audit',
        assignedToRole: 'assistant_manager',
        assignedToName: 'Farhana Chowdhury',
        assignedByRole: 'manager',
        assignedByName: 'Tanvir Hasan',
        status: 'completed',
        alertMinutesBefore: 5,
        locationOrFloor: 'Floors 01 & 02'
      },
      {
        id: 'sched-2',
        title: 'Top 5 Quality & Process Meetings at Lines 18, 19, 20',
        description: 'Review previous day quality defects, needle breakage, and hourly pace.',
        startTime: '08:30',
        endTime: '09:00',
        targetDate: today,
        lineNo: '18',
        category: 'Top 5 Meeting',
        assignedToRole: 'officer',
        assignedToName: 'Mahmudul Hoque',
        assignedByRole: 'assistant_manager',
        assignedByName: 'Farhana Chowdhury',
        status: 'completed',
        alertMinutesBefore: 5,
        locationOrFloor: 'Floor 01 / Unit A'
      },
      {
        id: 'sched-3',
        title: 'Line 18 Manpower Balancing & Backlog Absorption',
        description: 'Check floater re-allocation and verify target hourly output 145 pcs.',
        startTime: '09:15',
        endTime: '10:30',
        targetDate: today,
        lineNo: '18',
        category: 'Line Balancing',
        assignedToRole: 'officer',
        assignedToName: 'Mahmudul Hoque',
        assignedByRole: 'manager',
        assignedByName: 'Tanvir Hasan',
        status: 'in_progress',
        alertMinutesBefore: 10,
        locationOrFloor: 'Line 18 Station 12'
      },
      {
        id: 'sched-4',
        title: 'Critical Bottleneck Cycle Time & Motion Studies',
        description: 'Observe 10 cycles with stopwatch on neck attachment and hem folds.',
        startTime: '10:45',
        endTime: '12:00',
        targetDate: today,
        lineNo: '19',
        category: 'Time Study',
        assignedToRole: 'officer',
        assignedToName: 'Sharmin Sultana',
        assignedByRole: 'assistant_manager',
        assignedByName: 'Farhana Chowdhury',
        status: 'upcoming',
        alertMinutesBefore: 10,
        locationOrFloor: 'Line 19 Station 08'
      },
      {
        id: 'sched-5',
        title: 'Floor WIP Flow Audit & Hour-by-Hour Output Check',
        description: 'Monitor feeding station WIP balance and pitch time uniformity.',
        startTime: '13:15',
        endTime: '14:30',
        targetDate: today,
        lineNo: '20',
        category: 'WIP Flow',
        assignedToRole: 'assistant_manager',
        assignedToName: 'Farhana Chowdhury',
        assignedByRole: 'manager',
        assignedByName: 'Tanvir Hasan',
        status: 'upcoming',
        alertMinutesBefore: 15,
        locationOrFloor: 'Floor 01 / Unit B'
      },
      {
        id: 'sched-6',
        title: 'Continuous Improvement / Kaizen Follow-up',
        description: 'Inspect fixture enhancements and folder guide adjustments.',
        startTime: '14:45',
        endTime: '15:45',
        targetDate: today,
        lineNo: '21',
        category: 'Kaizen',
        assignedToRole: 'officer',
        assignedToName: 'Sharmin Sultana',
        assignedByRole: 'assistant_manager',
        assignedByName: 'Farhana Chowdhury',
        status: 'upcoming',
        alertMinutesBefore: 5,
        locationOrFloor: 'Floor 02 / Unit A'
      },
      {
        id: 'sched-7',
        title: 'Daily Efficiency Report & Production Recap',
        description: 'Consolidate 12 IE task checklist, actual vs target pcs, and SMV compliance.',
        startTime: '16:30',
        endTime: '17:30',
        targetDate: today,
        lineNo: 'All Lines',
        category: 'Reporting',
        assignedToRole: 'assistant_manager',
        assignedToName: 'Farhana Chowdhury',
        assignedByRole: 'manager',
        assignedByName: 'Tanvir Hasan',
        status: 'upcoming',
        alertMinutesBefore: 15,
        locationOrFloor: 'IE Central Office'
      }
    ],
    notifications: [
      {
        id: 'notif-1',
        title: 'New Task Assigned by Manager',
        message: 'Manager Tanvir Hasan assigned task: "Review Line 18-20 Balancing Graph & Authorize OT Floaters"',
        type: 'assignment',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
        targetRole: 'assistant_manager'
      },
      {
        id: 'notif-2',
        title: 'Upcoming Schedule Alert',
        message: 'Schedule slot "Line 18 Manpower Balancing & Backlog Absorption" is currently in progress.',
        type: 'schedule',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        read: false,
        targetRole: 'officer'
      },
      {
        id: 'notif-3',
        title: 'Urgent Task Assigned',
        message: 'Manager assigned urgent cycle time study on Line 18 Neck Rib Station to IE Officer Mahmudul Hoque.',
        type: 'todo',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        read: true,
        targetRole: 'officer'
      }
    ],
    pushNotificationSettings: {
      enabled: true,
      permission: 'default',
      sound: true,
      scheduleAlerts: true,
      todoReminders: true,
      roleAssignmentAlerts: true
    },
    auditLog: [
      {
        id: 1,
        at: new Date().toISOString(),
        action: 'system_init',
        detail: 'System initialized with garment manufacturing baseline',
        role: 'admin',
        user: 'Ashikur Rahman'
      }
    ],
    security: {
      pinEnabled: false,
      pinHash: '',
      lockOnHide: false,
      restrictRoleChange: false
    },
    autoUpdate: {
      enabled: true,
      intervalSeconds: 30,
      simulateFloorFeed: false,
      notifyOnUpdate: false
    },
    dashboardLayout: {
      showHero: true,
      showStats: true,
      showQuickActions: true,
      showAbsents: true,
      showBalancingGraph: true,
      showIO: true,
      showUpcoming: true
    },
    googleUser: {
      isSignedIn: false,
      name: 'IE Officer',
      email: '',
      role: 'ie_officer',
      authProvider: 'demo'
    },
    activeRole: 'admin'
  };
}

export const DEFAULT_STORE: AppStore = getInitialData();

