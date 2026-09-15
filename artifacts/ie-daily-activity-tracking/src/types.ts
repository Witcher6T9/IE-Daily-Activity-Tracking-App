export const IE_TASKS = [
  "Learning Curve Plan",
  "Line Balancing Graph (1st day output - 2nd day compl)",
  "Learning Curve First 3 Days (Peak Target 70% Prod.)",
  "Line Balancing Graph 4th Day",
  "Line Estimate Report (6-7 Day)",
  "Line Study & Bottleneck Flow Analysis",
  "Next Style Input Date File Submit (Before 10 Days)",
  "T.R Sample Make Follow-up Update",
  "Floor Status Update",
  "Individual Operator Performance Tracking",
  "Kaizen Work / Continuous Improvement",
  "Running Line Efficiency % & Production"
] as const;

export type TaskStatus = 'yes' | 'pending' | 'no' | null;

export type BaseRoleKey = 'admin' | 'manager' | 'assistant_manager' | 'officer' | 'operator' | 'user';

export type TierColor = 'violet' | 'sky' | 'emerald' | 'amber' | 'brand' | 'slate' | 'rose' | 'indigo' | 'teal';

// Customizable Tier Definition
export interface TierDefinition {
  id: string; // e.g. 'tier_1', 'tier_2', 'custom_tier_3'
  level: number; // 1, 2, 3, 4, 5... (1 is top management)
  name: string; // e.g. 'IE Operations Manager'
  shortCode: string; // e.g. 'T1'
  color: TierColor;
  description: string;
  canManageTierLevels: number[]; // e.g. [2, 3] - fully customizable by user!
  allowSelfAssignment: boolean;
  canCreateTodos: boolean;
  canCreateSchedules: boolean;
  canEditLineData: boolean;
  canApproveChecklist: boolean;
  // System Role & Permission capabilities
  canEdit?: boolean;
  canDelete?: boolean;
  canExport?: boolean;
  canManageLines?: boolean;
  canManageRoles?: boolean;
  systemRoleKey?: string; // 'admin' | 'manager' | 'officer' | 'trainee' | 'auditor'
}

// User Authentication Options & Session
export type AuthProviderType = 'google' | 'corporate_email' | 'demo';

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  employeeId: string;
  department: string;
  tierId: string;
  role: string;
  authProvider: AuthProviderType;
  avatarUrl?: string;
  assignedLines?: string[];
  createdAt: string;
  lastLogin?: string;
}

export interface UserAccountSession {
  isSignedIn: boolean;
  userId?: string;
  email?: string;
  name: string;
  avatarUrl?: string;
  authProvider?: AuthProviderType;
  tierId?: string; // Active associated Tier
  role?: string;
  googleId?: string;
  employeeId?: string;
  department?: string;
  loginTime?: string;
  accessToken?: string;
  token?: string;
}

// Backwards compatibility alias for GoogleUserSession
export type GoogleUserSession = UserAccountSession;

export interface RolePermissions {
  label: string;
  color?: 'brand' | 'violet' | 'sky' | 'emerald' | 'amber' | 'slate' | string;
  edit?: boolean;
  checklist?: boolean;
  linedata?: boolean;
  reports?: boolean;
  download?: boolean;
  audit?: boolean;
  manageLines?: boolean;
  export?: boolean;
  delete?: boolean;
  manageRoles?: boolean;
  defaultLines?: string[] | null;
  hierarchyLevel?: number;
  canManageTiers?: number[];
  canEdit?: boolean;
  canExport?: boolean;
  canDelete?: boolean;
  canManageUsers?: boolean;
  canManageLines?: boolean;
}

export interface CustomRoleDefinition extends RolePermissions {
  key: string;
  title?: string;
  icon?: string;
  color?: string;
  isCustom?: boolean;
  hierarchyLevel?: number;
  canManageRoles?: string[];
  description?: string;
}

export interface RolePerson {
  id: number;
  name: string;
  roleKey: string;
  lines: string[];
  active: boolean;
}

// To-Do List Elements
export interface TodoSubtask {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoCategory =
  | 'line_balancing'
  | 'bottleneck_study'
  | 'kaizen_ci'
  | 'top5_meeting'
  | 'style_changeover'
  | 'time_study'
  | 'tr_sample'
  | 'machine_layout'
  | 'operator_skill'
  | 'reporting'
  | 'general'
  | 'balancing'
  | 'bottleneck'
  | '5s'
  | 'smv_study'
  | 'meeting'
  | 'report';

export type TodoPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TodoStatus = 'pending' | 'in_progress' | 'completed' | 'blocked';

export interface TodoItem {
  id: string;
  title: string;
  description?: string;
  category: TodoCategory;
  priority: TodoPriority;
  status: TodoStatus;
  targetDate?: string; // YYYY-MM-DD
  dueDate?: string;
  dueTime?: string; // HH:mm e.g. "10:30"
  lineNo?: string; // e.g. "Line 18", "All Lines"
  assignedToRole: string; // 'manager' | 'assistant_manager' | 'officer' | custom
  assignedToPerson?: string;
  assignedToName?: string;
  assignedByRole?: string;
  assignedByName?: string;
  tierLevel?: number;
  subtasks?: TodoSubtask[];
  notes?: string;
  createdAt: string;
  completedAt?: string;
}

// Time Scheduling Elements
export interface ScheduleSlot {
  id: string;
  title?: string;
  description?: string;
  timeSlot?: string;
  dayOfWeek?: string;
  startTime: string; // "08:30"
  endTime: string;   // "09:30"
  targetDate?: string; // YYYY-MM-DD
  lineNo?: string;
  category?: string;
  activity?: string;
  roleKey?: string;
  assignedPerson?: string;
  assignedToRole?: string; // 'assistant_manager' | 'officer' | custom
  assignedToName?: string;
  assignedByRole?: string;
  assignedByName?: string;
  mandatory?: boolean;
  tierLevel?: number;
  status: 'upcoming' | 'in_progress' | 'completed' | 'skipped' | 'pending';
  linkedTodoId?: string;
  alertMinutesBefore?: number; // 0, 5, 10, 15
  locationOrFloor?: string;
  notes?: string;
}

export type TimeScheduleEntry = ScheduleSlot;

// Push Notification Record
export interface NotificationRecord {
  id: string;
  title: string;
  message: string;
  type: 'schedule' | 'todo' | 'system' | 'assignment' | 'alert' | 'warning' | 'success' | 'info';
  timestamp: string;
  read: boolean;
  targetRole?: string;
}

export type FloorNotification = NotificationRecord;

export interface PushNotificationSettings {
  enabled: boolean;
  permission: 'default' | 'granted' | 'denied' | 'unsupported';
  sound: boolean;
  scheduleAlerts: boolean;
  todoReminders: boolean;
  roleAssignmentAlerts: boolean;
}

// Custom Factory Architecture: Floors & Compartments
export interface CustomFloor {
  id: string; // e.g. 'floor_01'
  name: string; // e.g. 'Floor 01 (Ground Floor)'
  code: string; // e.g. 'FL-01'
  building?: string; // e.g. 'Main Complex Unit 1'
  incharge?: string; // e.g. 'Engr. Rezaul Karim'
  lineCapacity?: number; // e.g. 10
  notes?: string;
}

export type CompartmentSectionType = 'sewing' | 'finishing' | 'cutting' | 'ironing' | 'sampling' | 'qc' | 'other';

export interface CustomCompartment {
  id: string; // e.g. 'comp_1'
  name: string; // e.g. 'Unit A (Polo & T-Shirt Bay)'
  code: string; // e.g. 'UNIT-A'
  floorId: string; // Linked CustomFloor id
  sectionType: CompartmentSectionType;
  supervisor?: string;
  lineCapacity?: number;
  notes?: string;
}

export interface TeamMember {
  name: string;
  role: 'Operator' | 'Helper' | 'Iron Man' | 'Supervisor' | 'Other';
}

export interface ProductionLine {
  id: number;
  lineNo: string;
  floor: string;
  floorId?: string;
  compartment?: string;
  compartmentId?: string;
  teamMembers?: TeamMember[];
  active?: boolean;
  status?: 'active' | 'idle' | 'maintenance' | 'changeover';
  runningStyle?: string;
  currentBuyer?: string;
  operators?: number;
  helpers?: number;
  ironMen?: number;
  targetDailyOutput?: number;
  smv?: number;
  targetEfficiency?: number;
  supervisor?: string;
}

export type LineInfo = ProductionLine;

export interface ManpowerDetail {
  present: number;
  absent: number;
}

export interface Top5MeetingData {
  held: 'yes' | 'no' | 'partial' | '';
  attendance: number;
  items: string[];
  notes: string;
}

export interface BottleneckData {
  station: string;
  cycleTime: number;
  targetCT: number;
  status: 'ok' | 'high' | 'critical' | '';
  action: string;
  notes: string;
}

export interface TimeStudyData {
  done: 'yes' | 'no' | 'partial' | '';
  type: 'time' | 'production' | 'both' | '';
  observedRate: number;
  standardRate: number;
  findings: string;
}

export interface BuildUpData {
  day: '1' | '2' | '3' | '4' | '5' | 'stable' | '';
  plannedPct: number;
  achievedPct: number;
  operators: number;
  notes: string;
}

export interface LineIEData {
  name: string;
  level: 'jr_executive' | 'executive' | 'sr_executive';
  period: 'daily' | 'weekly' | 'monthly' | 'additional';
  weeklyNotes: string;
  monthlyNotes: string;
  additionalInfo: string;
}

export interface LineEntry {
  id: number;
  date: string;
  lineNo: string;
  floor: string;
  buyer: string;
  style: string;
  smv: number;
  plannedMP: number;
  workingHours: number;
  targetEff: number;
  targetProd: number;
  achievedProd: number;
  efficiency: number;
  remarks: string;
  orderQty: number;
  dailyInput: number;
  dailyOutput: number;
  wip: number;
  balancingGraph: 'pending' | 'day1' | 'day2' | 'day4' | 'complete';
  nextStyle: string;
  nextStyleDate: string;
  mp: {
    Operator: ManpowerDetail;
    Helper: ManpowerDetail;
    'Iron Man': ManpowerDetail;
  };
  balanceMethod: string;
  balanceNotes: string;
  top5: Top5MeetingData;
  bottleneck: BottleneckData;
  timeStudy: TimeStudyData;
  buildUp: BuildUpData;
  lineIE: LineIEData;
}

export interface UserProfile {
  name: string;
  jobTitle: string;
  role: string;
  notifications: {
    dailyReminder: boolean;
    complianceAlert: boolean;
    lineDataSummary: boolean;
    exportReady: boolean;
  };
}

export interface SecuritySettings {
  pinEnabled: boolean;
  pinHash: string;
  lockOnHide: boolean;
  restrictRoleChange: boolean;
  theme?: UiTheme;
}

export interface AuditLogItem {
  id: number;
  at: string;
  action: string;
  detail: string;
  role: string;
  user: string;
}

// Real-Time Cloud Data Synchronization & Telemetry
export interface CloudSyncLog {
  id: string;
  timestamp: string;
  action: string;
  status: 'success' | 'syncing' | 'failed';
  recordsSynced: number;
  sizeBytes: number;
  latencyMs: number;
}

export interface CloudSyncState {
  isLive?: boolean; // Live streaming active or paused
  status: 'live' | 'syncing' | 'synced' | 'offline' | 'error';
  lastSyncTime?: string;
  lastCloudSync?: string;
  syncFrequencySeconds?: number;
  autoSyncIntervalSec?: number; // 5, 15, 30, 60
  conflictResolution?: 'cloud_wins' | 'local_wins' | 'merge';
  cloudEndpoint: string;
  latencyMs: number;
  autoUploadEntries?: boolean;
  pendingUploadCount?: number;
  totalSyncedPayloadKb?: number;
  offlineQueueCount?: number;
  syncHistory?: CloudSyncLog[];
}

// Individual IE & Roles Monthly KPI Types
export interface IEMonthlyKPI {
  personId: number;
  name: string;
  roleKey: string;
  roleTitle: string;
  tierLevel: number;
  month: string; // YYYY-MM
  assignedLines: string[];

  // 1. Production Line Efficiency & Attainment
  targetEfficiency: number;
  actualEfficiency: number;
  efficiencyVariance: number;
  efficiencyScore: number; // 0-100
  totalProducedQty: number;
  totalTargetQty: number;
  attainmentRate: number; // %

  // 2. Line Balancing & SMV Optimization
  balancedLinesCount: number;
  totalAssignedLinesCount: number;
  balancingRate: number; // %
  bottlenecksResolved: number;
  avgCycleTimeSavedSec: number;
  balancingScore: number; // 0-100

  // 3. Daily Standard Work & Checklist Compliance
  checklistDaysActive: number;
  totalChecklistTasksCompleted: number;
  checklistComplianceRate: number; // %
  learningCurveAdherenceRate: number; // %
  checklistScore: number; // 0-100

  // 4. Task Execution & Schedule Adherence
  tasksTotal: number;
  tasksCompleted: number;
  taskClosureRate: number; // %
  scheduleAdherenceRate: number; // %
  taskScore: number; // 0-100

  // 5. Kaizen & Continuous Improvement
  kaizenCount: number;
  workStudiesCount: number;
  minutesSavedPerGarment: number;
  kaizenScore: number; // 0-100

  // Overall Performance Index (OPI)
  overallPerformanceIndex: number; // 0-100
  performanceGrade: 'A+' | 'A' | 'B' | 'C' | 'D';
  gradeDescription: string;
  rank?: number;

  supervisorRemarks?: string;
  approvedBy?: string;
  approvedDate?: string;
}

export interface AppStore {
  checklists: Record<string, TaskStatus[]>;
  lineEntries: LineEntry[];
  profile: UserProfile;
  lines: ProductionLine[];
  customFloors?: CustomFloor[];
  customCompartments?: CustomCompartment[];
  rolePeople: RolePerson[];
  customRoles: CustomRoleDefinition[];
  activeRole?: string;
  tiers?: TierDefinition[];
  activeTierId?: string;
  registeredUsers?: RegisteredUser[];
  googleAuth?: GoogleUserSession;
  googleUser?: GoogleUserSession;
  userSession?: UserAccountSession;
  cloudSync?: CloudSyncState;
  todos?: TodoItem[];
  schedules?: ScheduleSlot[];
  timeSchedules?: ScheduleSlot[];
  notifications?: NotificationRecord[];
  pushNotificationSettings?: PushNotificationSettings;
  auditLog: AuditLogItem[];
  security: SecuritySettings;
  autoUpdate?: AutoUpdateSettings;
  dashboardLayout?: DashboardLayoutSettings;
}

export type PageId =
  | 'dashboard'
  | 'lean-toolkit'
  | 'checklist'
  | 'linedata'
  | 'line-data'
  | 'monthly'
  | 'reports'
  | 'kpi-reports'
  | 'line-management'
  | 'role-management'
  | 'settings'
  | 'data-export'
  | 'profile'
  | 'todo-schedule'
  | 'database';

export type UiDensity = 'comfortable' | 'compact' | 'normal';

export type UiTheme = 'light' | 'dark' | 'forest' | 'sunset' | 'industrial';

export interface AutoUpdateSettings {
  enabled: boolean;
  intervalSeconds: number; // 15, 30, 60, 120
  simulateFloorFeed: boolean;
  notifyOnUpdate: boolean;
}

export interface DashboardLayoutSettings {
  showHero: boolean;
  showStats: boolean;
  showQuickActions: boolean;
  showAbsents: boolean;
  showBalancingGraph: boolean;
  showIO: boolean;
  showUpcoming: boolean;
}

export const DEFAULT_DASHBOARD_LAYOUT: DashboardLayoutSettings = {
  showHero: true,
  showStats: true,
  showQuickActions: true,
  showAbsents: true,
  showBalancingGraph: true,
  showIO: true,
  showUpcoming: true
};
