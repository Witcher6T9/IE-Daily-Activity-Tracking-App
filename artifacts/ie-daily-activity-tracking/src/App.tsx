import React, { useState, useEffect, useRef } from 'react';
import {
  AppStore,
  PageId,
  UiTheme,
  UiDensity,
  DashboardLayoutSettings,
  DEFAULT_DASHBOARD_LAYOUT,
  AutoUpdateSettings,
  LineEntry,
  TaskStatus,
  FloorNotification,
  ProductionLine,
  CustomRoleDefinition,
  RolePerson,
  TierDefinition,
  GoogleUserSession,
  CloudSyncState,
  TodoItem,
  TimeScheduleEntry,
  RegisteredUser
} from './types';
import { DEFAULT_STORE } from './data/initialData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { ChecklistView } from './components/ChecklistView';
import { LineDataView } from './components/LineDataView';
import { MonthlyView } from './components/MonthlyView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { LineManagementModal } from './components/LineManagementModal';
import { IEMonthlyKPIView } from './components/IEMonthlyKPIView';
import { NotificationsModal } from './components/NotificationsModal';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { CloudSyncModal } from './components/CloudSyncModal';
import { TierCustomizerModal } from './components/TierCustomizerModal';
import { CreateCustomRoleModal } from './components/CreateCustomRoleModal';
import { TodoScheduleView } from './components/TodoScheduleView';
import { DatabaseManagerView } from './components/DatabaseManagerView';
import {
  requestNotificationPermission,
  sendWebPushNotification,
  playIEAudioChime
} from './utils/notificationService';

const STORAGE_KEY = 'ie_daily_activity_store_v2';

export default function App() {
  // Load initial store from localStorage or default
  const [store, setStore] = useState<AppStore>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STORE,
          ...parsed,
          registeredUsers: parsed?.registeredUsers?.length ? parsed.registeredUsers : DEFAULT_STORE.registeredUsers,
          profile: { ...DEFAULT_STORE.profile, ...(parsed?.profile || {}) },
          autoUpdate: { ...(DEFAULT_STORE.autoUpdate || {}), ...(parsed?.autoUpdate || {}) },
          dashboardLayout: { ...DEFAULT_DASHBOARD_LAYOUT, ...(parsed?.dashboardLayout || {}) },
          googleUser: { ...(DEFAULT_STORE.googleUser || {}), ...(parsed?.googleUser || {}) },
          cloudSync: { ...(DEFAULT_STORE.cloudSync || {}), ...(parsed?.cloudSync || {}) }
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved state, using default:', e);
    }
    return DEFAULT_STORE;
  });

  // Current view navigation
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [checklistDate, setChecklistDate] = useState<string>(() => {
    return new Date().toISOString().slice(0, 10);
  });

  // Today ISO
  const todayISO = new Date().toISOString().slice(0, 10);

  // UI Theme & Density
  const [uiTheme, setUiTheme] = useState<UiTheme>('light');
  const [uiDensity, setUiDensity] = useState<UiDensity>('normal');
  const [dashLayout, setDashLayout] = useState<DashboardLayoutSettings>(() => {
    return {
      ...DEFAULT_DASHBOARD_LAYOUT,
      ...(store.dashboardLayout || {})
    };
  });

  // Auto-Update State
  const [autoUpdate, setAutoUpdate] = useState<AutoUpdateSettings>(() => {
    return {
      enabled: true,
      intervalSeconds: 30,
      simulateFloorFeed: false,
      notifyOnUpdate: false,
      ...(store.autoUpdate || {})
    };
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());

  // Cloud Sync State
  const [cloudSyncState, setCloudSyncState] = useState<CloudSyncState>(
    store.cloudSync || {
      status: 'live',
      lastCloudSync: new Date().toISOString(),
      syncFrequencySeconds: 15,
      cloudEndpoint: 'wss://ie-telemetry.apparelcloud.internal/v2',
      autoUploadEntries: true,
      latencyMs: 28,
      pendingUploadCount: 0
    }
  );

  // Active Role and Person
  const [currentRoleKey, setCurrentRoleKey] = useState<string>(store.activeRole || 'admin');
  const [customRoles, setCustomRoles] = useState<CustomRoleDefinition[]>(store.customRoles || []);
  const [rolePeople, setRolePeople] = useState<RolePerson[]>(store.rolePeople || []);

  // Tier-based system
  const [tiers, setTiers] = useState<TierDefinition[]>(store.tiers || []);
  const [activeTierId, setActiveTierId] = useState<string>(store.activeTierId || 'tier_1');

  // Google User Session
  const [googleUser, setGoogleUser] = useState<GoogleUserSession>(
    store.googleUser || {
      isSignedIn: false,
      name: 'IE Officer',
      email: '',
      role: 'admin',
      authProvider: 'demo'
    }
  );

  // Notifications
  const [notifications, setNotifications] = useState<FloorNotification[]>(store.notifications || []);
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>(() => {
    return typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default';
  });

  // Modals visibility
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showGoogleAuthModal, setShowGoogleAuthModal] = useState(false);
  const [showCloudSyncModal, setShowCloudSyncModal] = useState(false);
  const [showTierCustomizerModal, setShowTierCustomizerModal] = useState(false);
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);

  // Save to localStorage whenever store updates
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...store,
          activeRole: currentRoleKey,
          customRoles,
          rolePeople,
          tiers,
          activeTierId,
          googleUser,
          cloudSync: cloudSyncState,
          dashboardLayout: dashLayout,
          autoUpdate,
          notifications
        })
      );
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [
    store,
    currentRoleKey,
    customRoles,
    rolePeople,
    tiers,
    activeTierId,
    googleUser,
    cloudSyncState,
    dashLayout,
    autoUpdate,
    notifications
  ]);

  // Apply theme class to body/html
  useEffect(() => {
    document.documentElement.classList.remove('theme-dark', 'theme-forest', 'theme-sunset', 'theme-industrial');
    if (uiTheme !== 'light') {
      document.documentElement.classList.add(`theme-${uiTheme}`);
    }
  }, [uiTheme]);

  // Active Operational Tier is the Active System Role & Permission
  const activeTier = tiers.find(t => t.id === activeTierId) || tiers[0];

  const currentRoleDef =
    customRoles.find(r => r.key === currentRoleKey) ||
    {
      admin: { canEdit: true, canExport: true, canDelete: true, canManageLines: true },
      manager: { canEdit: true, canExport: true, canDelete: false, canManageLines: true },
      ie_officer: { canEdit: true, canExport: true, canDelete: false, canManageLines: false },
      supervisor: { canEdit: true, canExport: false, canDelete: false, canManageLines: false },
      trainee: { canEdit: false, canExport: true, canDelete: false, canManageLines: false },
      junior_ie: { canEdit: false, canExport: true, canDelete: false, canManageLines: false },
      auditor: { canEdit: false, canExport: true, canDelete: false, canManageLines: false }
    }[currentRoleKey] || { canEdit: true, canExport: true, canDelete: false };

  // System permissions derived directly from the Active Operational Tier
  const canEdit = activeTier?.canEdit ?? (activeTier ? (activeTier.level <= 3 && activeTier.canEditLineData !== false) : Boolean(currentRoleDef.canEdit));
  const canDelete = activeTier?.canDelete ?? (activeTier ? activeTier.level === 1 : Boolean(currentRoleDef.canDelete));
  const canManageLines = activeTier?.canManageLines ?? (activeTier ? activeTier.level <= 2 : true);
  const canApproveChecklist = activeTier ? Boolean(activeTier.canApproveChecklist) : true;

  const handleSelectTier = (tierId: string) => {
    setActiveTierId(tierId);
    const selectedTier = tiers.find(t => t.id === tierId);
    if (selectedTier) {
      const roleKey = selectedTier.systemRoleKey || (
        selectedTier.level === 1 ? 'admin' :
        selectedTier.level === 2 ? 'manager' :
        selectedTier.level === 3 ? 'ie_officer' : 'junior_ie'
      );
      setCurrentRoleKey(roleKey);
      setGoogleUser(u => ({ ...u, tierId, role: roleKey }));
    }
  };

  // Auto-Update Engine
  const autoUpdateTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoUpdate.enabled) {
      if (autoUpdateTimerRef.current) clearInterval(autoUpdateTimerRef.current);
      return;
    }

    const intervalMs = Math.max((autoUpdate.intervalSeconds || 15) * 1000, 3000);

    autoUpdateTimerRef.current = setInterval(() => {
      setIsSyncing(true);
      setLastSyncTime(new Date());

      // Simulate floor flow if enabled: occasionally increment line output or notify
      if (autoUpdate.simulateFloorFeed) {
        setStore(prev => {
          const todayEntries = prev.lineEntries.filter(e => e.date === todayISO);
          if (todayEntries.length === 0) return prev;

          // Pick a random entry to add 1-3 finished garments
          const randIdx = Math.floor(Math.random() * todayEntries.length);
          const targetEntry = todayEntries[randIdx];
          const increment = Math.floor(Math.random() * 3) + 1;
          const nextAchieved = (targetEntry.achievedProd || 0) + increment;
          const nextOutput = (targetEntry.dailyOutput || 0) + increment;
          const nextEff =
            targetEntry.targetProd > 0
              ? Math.round((nextAchieved / targetEntry.targetProd) * 100)
              : targetEntry.efficiency;

          const updatedEntries = prev.lineEntries.map(e =>
            e.id === targetEntry.id
              ? {
                  ...e,
                  achievedProd: nextAchieved,
                  dailyOutput: nextOutput,
                  efficiency: nextEff
                }
              : e
          );

          return {
            ...prev,
            lineEntries: updatedEntries
          };
        });
      }

      // Update cloud sync latency
      setCloudSyncState(prev => ({
        ...prev,
        status: 'live',
        lastCloudSync: new Date().toISOString(),
        latencyMs: Math.floor(Math.random() * 20) + 18
      }));

      setTimeout(() => setIsSyncing(false), 600);
    }, intervalMs);

    return () => {
      if (autoUpdateTimerRef.current) clearInterval(autoUpdateTimerRef.current);
    };
  }, [autoUpdate.enabled, autoUpdate.intervalSeconds, autoUpdate.simulateFloorFeed, todayISO]);

  // Handlers for Checklist
  const handleSaveChecklist = (date: string, tasks: TaskStatus[]) => {
    setStore(prev => {
      const updated = { ...prev.checklists, [date]: tasks };
      return { ...prev, checklists: updated };
    });
  };

  // Handlers for Line Entries
  const handleSaveLineEntry = (entry: LineEntry) => {
    setStore(prev => {
      const exists = prev.lineEntries.find(e => e.id === entry.id);
      const updated = exists
        ? prev.lineEntries.map(e => (e.id === entry.id ? entry : e))
        : [entry, ...prev.lineEntries];

      // Add a notification
      const newNotif: FloorNotification = {
        id: `notif_${Date.now()}`,
        title: `Line ${entry.lineNo} Production Captured`,
        message: `${entry.buyer} (${entry.style}) recorded with ${entry.efficiency}% efficiency.`,
        type: entry.efficiency >= 80 ? 'success' : 'warning',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
      setNotifications(n => [newNotif, ...n]);

      // Play audio chime
      playIEAudioChime(entry.efficiency >= 80 ? 'success' : 'chime');

      // Send browser push notification if permitted
      sendWebPushNotification(`IE Track: Line ${entry.lineNo}`, {
        body: `${entry.buyer} • ${entry.efficiency}% Efficiency Logged`
      });

      return { ...prev, lineEntries: updated };
    });
  };

  const handleDeleteLineEntry = (id: number) => {
    setStore(prev => ({
      ...prev,
      lineEntries: prev.lineEntries.filter(e => e.id !== id)
    }));
  };

  // Handlers for Master Lines
  const handleSaveLines = (lines: ProductionLine[]) => {
    setStore(prev => ({ ...prev, lines }));
  };

  // Handlers for Todos & Time Schedules
  const handleUpdateTodos = (todos: TodoItem[]) => {
    setStore(prev => ({ ...prev, todos }));
  };

  const handleUpdateTimeSchedules = (timeSchedules: TimeScheduleEntry[]) => {
    setStore(prev => ({ ...prev, timeSchedules }));
  };

  // Manual Force Sync
  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setLastSyncTime(new Date());
      setIsSyncing(false);
      playIEAudioChime('chime');
    }, 600);
  };

  // Toggle Auto-Update
  const handleToggleAutoUpdate = () => {
    setAutoUpdate(prev => {
      const next = { ...prev, enabled: !prev.enabled };
      setStore(s => ({ ...s, autoUpdate: next }));
      return next;
    });
  };

  // Profile update
  const handleUpdateProfile = (profile: AppStore['profile']) => {
    setStore(prev => ({ ...prev, profile }));
  };

  // Register new user account
  const handleRegisterUser = (newUser: RegisteredUser) => {
    setStore(prev => {
      const existing = prev.registeredUsers || [];
      const updated = [newUser, ...existing.filter(u => u.email !== newUser.email)];
      return {
        ...prev,
        registeredUsers: updated
      };
    });
  };

  // Reset to default demo data
  const handleResetToDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStore(DEFAULT_STORE);
    setCurrentRoleKey('admin');
    setTiers(DEFAULT_STORE.tiers || []);
    setActiveTierId('tier_1');
    alert('Reset to default plant data successfully.');
  };

  // Import full JSON
  const handleImportStoreJSON = (imported: AppStore) => {
    setStore(imported);
    if (imported.activeRole) setCurrentRoleKey(imported.activeRole);
    if (imported.tiers) setTiers(imported.tiers);
  };

  // Request push notification permission
  const handleRequestPushPermission = async () => {
    const perm = await requestNotificationPermission();
    setNotifPermission(perm);
  };

  // Mark all notifications read
  const handleMarkAllNotifsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAllNotifs = () => {
    setNotifications([]);
  };

  // Role label lookup
  const currentRoleLabel =
    customRoles.find(r => r.key === currentRoleKey)?.title ||
    {
      admin: 'Operations Manager',
      ie_officer: 'IE Officer',
      supervisor: 'Floor Supervisor',
      trainee: 'IE Trainee',
      auditor: 'QA Auditor'
    }[currentRoleKey] || currentRoleKey;

  return (
    <div className="app-shell noise-overlay min-h-[100dvh] text-slate-900 pb-24 md:pb-16 selection:bg-teal-700 selection:text-white">
      {/* Primary Header */}
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        roleLabel={currentRoleLabel}
        currentRoleKey={currentRoleKey}
        uiTheme={uiTheme}
        onChangeTheme={setUiTheme}
        autoUpdate={autoUpdate}
        onToggleAutoUpdate={handleToggleAutoUpdate}
        onManualSync={handleManualSync}
        isSyncing={isSyncing}
        lastSyncTime={lastSyncTime}
        onOpenNotifications={() => setShowNotificationsModal(true)}
        unreadNotificationCount={notifications.filter(n => !n.read).length}
        onSelectRole={(key, name) => {
          setCurrentRoleKey(key);
          if (name) {
            setStore(s => ({ ...s, profile: { ...s.profile, name } }));
          }
        }}
        customRoles={customRoles}
        rolePeople={rolePeople}
        onOpenCreateCustomRole={() => setShowCreateRoleModal(true)}
        tiers={tiers}
        activeTierId={activeTierId}
        onSelectTier={handleSelectTier}
        onOpenTierCustomizer={() => setShowTierCustomizerModal(true)}
        googleUser={googleUser}
        onOpenGoogleAuth={() => setShowGoogleAuthModal(true)}
        onGoogleSignOut={() =>
          setGoogleUser({
            isSignedIn: false,
            name: 'IE Officer',
            email: '',
            role: 'ie_officer',
            authProvider: 'demo'
          })
        }
        cloudSyncState={cloudSyncState}
        onOpenCloudSync={() => setShowCloudSyncModal(true)}
      />

      {/* Main Page Routing */}
      <main>
        {currentPage === 'dashboard' && (
          <DashboardView
            store={store}
            today={todayISO}
            uiDensity={uiDensity}
            dashLayout={dashLayout}
            onNavigate={setCurrentPage}
            canEdit={canEdit}
            autoUpdate={autoUpdate}
            onToggleAutoUpdate={handleToggleAutoUpdate}
            onManualSync={handleManualSync}
            isSyncing={isSyncing}
            lastSyncTime={lastSyncTime}
          />
        )}

        {currentPage === 'checklist' && (
          <ChecklistView
            store={store}
            today={todayISO}
            initialDate={checklistDate}
            canEdit={canEdit}
            onSaveChecklist={handleSaveChecklist}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'todo-schedule' && (
          <TodoScheduleView
            store={store}
            today={todayISO}
            onNavigate={setCurrentPage}
            currentRoleKey={currentRoleKey}
            onSelectRole={(key, name) => {
              setCurrentRoleKey(key);
              if (name) {
                setStore(s => ({ ...s, profile: { ...s.profile, name } }));
              }
            }}
            customRoles={customRoles}
            rolePeople={rolePeople}
            onOpenCreateCustomRole={() => setShowCreateRoleModal(true)}
            tiers={tiers}
            activeTierId={activeTierId}
            onSelectTier={handleSelectTier}
            onOpenTierCustomizer={() => setShowTierCustomizerModal(true)}
            onUpdateTodos={handleUpdateTodos}
            onUpdateTimeSchedules={handleUpdateTimeSchedules}
            canEdit={canEdit}
          />
        )}

        {currentPage === 'linedata' && (
          <LineDataView
            store={store}
            today={todayISO}
            canEdit={canEdit}
            canDelete={canDelete}
            onSaveLineEntry={handleSaveLineEntry}
            onDeleteLineEntry={handleDeleteLineEntry}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'monthly' && (
          <MonthlyView
            store={store}
            today={todayISO}
            onNavigate={setCurrentPage}
            onSelectDateForChecklist={date => {
              setChecklistDate(date);
              setCurrentPage('checklist');
            }}
          />
        )}

        {currentPage === 'reports' && (
          <ReportsView
            store={store}
            today={todayISO}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'kpi-reports' && (
          <IEMonthlyKPIView
            store={store}
            today={todayISO}
            onNavigate={setCurrentPage}
            canEdit={canEdit}
          />
        )}

        {currentPage === 'line-management' && (
          <LineManagementModal
            lines={store.lines}
            onSaveLines={handleSaveLines}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'database' && (
          <DatabaseManagerView
            store={store}
            onNavigate={setCurrentPage}
            onUpdateStore={setStore}
            onDeleteLineEntry={handleDeleteLineEntry}
            onResetToDemo={handleResetToDemoData}
            canDelete={canDelete}
          />
        )}

        {currentPage === 'settings' && (
          <SettingsView
            store={store}
            onUpdateProfile={handleUpdateProfile}
            uiTheme={uiTheme}
            onChangeTheme={setUiTheme}
            uiDensity={uiDensity}
            onChangeDensity={setUiDensity}
            dashLayout={dashLayout}
            onChangeDashLayout={setDashLayout}
            autoUpdate={autoUpdate}
            onChangeAutoUpdate={setAutoUpdate}
            onOpenGoogleAuth={() => setShowGoogleAuthModal(true)}
            onNavigate={setCurrentPage}
            onResetToDemoData={handleResetToDemoData}
            onImportStoreJSON={handleImportStoreJSON}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation */}
      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <NotificationsModal
          notifications={notifications}
          onMarkAllRead={handleMarkAllNotifsRead}
          onClearAll={handleClearAllNotifs}
          onClose={() => setShowNotificationsModal(false)}
          onRequestPermission={handleRequestPushPermission}
          permissionStatus={notifPermission}
        />
      )}

      {/* Google & SSO Auth Modal */}
      {showGoogleAuthModal && (
        <GoogleAuthModal
          currentUser={googleUser}
          registeredUsers={store.registeredUsers}
          tiers={tiers}
          onSignIn={user => {
            setGoogleUser(u => ({ ...u, ...user, isSignedIn: true }));
            if (user.tierId) {
              handleSelectTier(user.tierId);
            }
          }}
          onSignOut={() =>
            setGoogleUser({
              isSignedIn: false,
              name: 'Guest Engineer',
              email: '',
              role: 'ie_officer',
              authProvider: 'demo'
            })
          }
          onRegisterUser={handleRegisterUser}
          onClose={() => setShowGoogleAuthModal(false)}
        />
      )}

      {/* Cloud Sync Modal */}
      {showCloudSyncModal && (
        <CloudSyncModal
          syncState={cloudSyncState}
          onUpdateSyncState={upd => setCloudSyncState(prev => ({ ...prev, ...upd }))}
          onForceSync={handleManualSync}
          onClose={() => setShowCloudSyncModal(false)}
        />
      )}

      {/* Tier Customizer Modal */}
      {showTierCustomizerModal && (
        <TierCustomizerModal
          tiers={tiers}
          onSaveTiers={setTiers}
          onClose={() => setShowTierCustomizerModal(false)}
        />
      )}

      {/* Create Custom Role Modal */}
      {showCreateRoleModal && (
        <CreateCustomRoleModal
          onSaveRole={role => setCustomRoles(prev => [...prev, role])}
          onClose={() => setShowCreateRoleModal(false)}
        />
      )}
    </div>
  );
}
