/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { toast } from '@/components/ui/toast';
import {
  AlertCircle,
  Bell,
  Eye,
  Globe,
  Key,
  Lock,
  LogOut,
  Moon,
  Shield,
  Smartphone,
  Sun,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SettingsData {
  // Notification Settings
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;

  // Privacy Settings
  profileVisibility: 'public' | 'private' | 'contacts';
  showEmail: boolean;
  showPhone: boolean;

  // Appearance Settings
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  compactView: boolean;

  // Security Settings
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  deviceManagement: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState<SettingsData>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    theme: 'system',
    fontSize: 'medium',
    compactView: false,
    twoFactorAuth: false,
    loginAlerts: true,
    deviceManagement: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      // Load settings from localStorage or API
      const savedSettings = localStorage.getItem('userSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings));

      // Apply theme immediately
      applyTheme(settings.theme);

      toast.success(
        'Settings Saved',
        'Your preferences have been updated successfully!',
      );
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Save Failed', 'Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const applyTheme = (theme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/sign-in');
    }
  };

  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Sun },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'devices', label: 'Devices', icon: Smartphone },
  ];

  const renderProfileSettings = () => (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
          Language & Region
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
              <option value="bn">বাংলা (Bengali)</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Time Zone
            </label>
            <select className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
              <option value="dhaka">Asia/Dhaka (GMT+6)</option>
              <option value="kolkata">Asia/Kolkata (GMT+5:30)</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
          Data & Storage
        </h3>
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm sm:text-base font-medium text-gray-900">
                Clear Cache
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Clear temporary data to free up space
              </p>
            </div>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm sm:text-base">
              Clear Cache
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-3 sm:space-y-4">
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="h-4 w-4 text-gray-500" />
              <p className="text-sm sm:text-base font-medium text-gray-900">
                Email Notifications
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Receive updates and alerts via email
            </p>
          </div>
          <button
            onClick={() =>
              setSettings({
                ...settings,
                emailNotifications: !settings.emailNotifications,
              })
            }
            className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors ${
              settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                settings.emailNotifications
                  ? 'translate-x-5 sm:translate-x-6'
                  : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Smartphone className="h-4 w-4 text-gray-500" />
              <p className="text-sm sm:text-base font-medium text-gray-900">
                SMS Notifications
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Receive alerts via text message
            </p>
          </div>
          <button
            onClick={() =>
              setSettings({
                ...settings,
                smsNotifications: !settings.smsNotifications,
              })
            }
            className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors ${
              settings.smsNotifications ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                settings.smsNotifications
                  ? 'translate-x-5 sm:translate-x-6'
                  : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Bell className="h-4 w-4 text-gray-500" />
              <p className="text-sm sm:text-base font-medium text-gray-900">
                Push Notifications
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Real-time notifications in browser
            </p>
          </div>
          <button
            onClick={() =>
              setSettings({
                ...settings,
                pushNotifications: !settings.pushNotifications,
              })
            }
            className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors ${
              settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                settings.pushNotifications
                  ? 'translate-x-5 sm:translate-x-6'
                  : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
          Theme
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: 'light', label: 'Light', icon: Sun },
            { value: 'dark', label: 'Dark', icon: Moon },
            { value: 'system', label: 'System', icon: Globe },
          ].map((theme) => (
            <button
              key={theme.value}
              onClick={() =>
                setSettings({ ...settings, theme: theme.value as any })
              }
              className={`flex items-center justify-center gap-2 p-2 sm:p-3 rounded-lg border transition-all ${
                settings.theme === theme.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <theme.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
          Font Size
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: 'small', label: 'Small', size: 'text-sm' },
            { value: 'medium', label: 'Medium', size: 'text-base' },
            { value: 'large', label: 'Large', size: 'text-lg' },
          ].map((font) => (
            <button
              key={font.value}
              onClick={() =>
                setSettings({ ...settings, fontSize: font.value as any })
              }
              className={`p-2 sm:p-3 rounded-lg border transition-all ${
                settings.fontSize === font.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className={`${font.size} font-medium`}>{font.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm sm:text-base font-medium text-gray-900">
              Compact View
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Show more content by reducing spacing
            </p>
          </div>
          <button
            onClick={() =>
              setSettings({ ...settings, compactView: !settings.compactView })
            }
            className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors ${
              settings.compactView ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                settings.compactView
                  ? 'translate-x-5 sm:translate-x-6'
                  : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-3 sm:space-y-4">
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lock className="h-4 w-4 text-gray-500" />
              <p className="text-sm sm:text-base font-medium text-gray-900">
                Two-Factor Authentication
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Add an extra layer of security to your account
            </p>
          </div>
          <button
            onClick={() =>
              setSettings({
                ...settings,
                twoFactorAuth: !settings.twoFactorAuth,
              })
            }
            className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors ${
              settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                settings.twoFactorAuth
                  ? 'translate-x-5 sm:translate-x-6'
                  : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bell className="h-4 w-4 text-gray-500" />
              <p className="text-sm sm:text-base font-medium text-gray-900">
                Login Alerts
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Get notified when someone logs into your account
            </p>
          </div>
          <button
            onClick={() =>
              setSettings({ ...settings, loginAlerts: !settings.loginAlerts })
            }
            className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors ${
              settings.loginAlerts ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                settings.loginAlerts
                  ? 'translate-x-5 sm:translate-x-6'
                  : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div>
        <button className="w-full bg-blue-600 text-white rounded-lg p-2.5 sm:p-3 hover:bg-blue-700 transition-colors text-sm sm:text-base">
          Change Password
        </button>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-3 sm:space-y-4">
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
          Profile Visibility
        </label>
        <select
          value={settings.profileVisibility}
          onChange={(e) =>
            setSettings({
              ...settings,
              profileVisibility: e.target.value as any,
            })
          }
          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        >
          <option value="public">Public - Everyone can see</option>
          <option value="private">Private - Only me</option>
          <option value="contacts">Contacts - Only my contacts</option>
        </select>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm sm:text-base font-medium text-gray-900">
              Show Email Address
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Display email on your public profile
            </p>
          </div>
          <button
            onClick={() =>
              setSettings({ ...settings, showEmail: !settings.showEmail })
            }
            className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors ${
              settings.showEmail ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                settings.showEmail
                  ? 'translate-x-5 sm:translate-x-6'
                  : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm sm:text-base font-medium text-gray-900">
              Show Phone Number
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Display phone number on your public profile
            </p>
          </div>
          <button
            onClick={() =>
              setSettings({ ...settings, showPhone: !settings.showPhone })
            }
            className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors ${
              settings.showPhone ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                settings.showPhone
                  ? 'translate-x-5 sm:translate-x-6'
                  : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const renderDevicesSettings = () => (
    <div className="space-y-3 sm:space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-sm sm:text-base font-medium text-yellow-800">
              Active Sessions
            </p>
            <p className="text-xs sm:text-sm text-yellow-700 mt-1">
              You are currently logged in on this device. Manage active sessions
              below.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm sm:text-base font-medium text-gray-900">
                This Device
              </p>
              <p className="text-xs text-gray-500">Current session</p>
            </div>
          </div>
          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
            Active
          </span>
        </div>
        <p className="text-xs text-gray-500">Last active: Just now</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm sm:text-base font-medium text-gray-900">
                Other Devices
              </p>
              <p className="text-xs text-gray-500">
                Manage other logged-in devices
              </p>
            </div>
          </div>
          <button className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium">
            Logout All
          </button>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'security':
        return renderSecuritySettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'devices':
        return renderDevicesSettings();
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
            Loading settings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Settings
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage your account preferences and settings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {sections.find((s) => s.id === activeSection)?.label}
                  </h2>
                  <button
                    onClick={saveSettings}
                    disabled={saving}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {renderSectionContent()}
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-6 sm:mt-8 bg-red-50 border border-red-200 rounded-xl p-4 sm:p-5 md:p-6">
              <div className="flex items-start gap-2 sm:gap-3 mb-3">
                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 shrink-0" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-red-900">
                    Danger Zone
                  </h3>
                  <p className="text-xs sm:text-sm text-red-700 mt-1">
                    These actions are irreversible. Please be careful.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white cursor-pointer rounded hover:bg-red-700 transition-colors text-sm sm:text-base"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
                <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm sm:text-base">
                  <Key className="h-4 w-4" />
                  Deactivate Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
