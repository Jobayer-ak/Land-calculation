/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { toast } from '@/components/ui/toast';
import {
  AlertCircle,
  Calendar,
  Camera,
  CheckCircle,
  Edit2,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  User,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  address: string;
  role: 'user' | 'admin' | 'moderator';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    address: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setProfile(data.user);
        setFormData({
          fullName: data.user.fullName,
          mobileNumber: data.user.mobileNumber,
          address: data.user.address,
        });
      } else {
        toast.error('Error', data.message || 'Failed to load profile');
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
        }
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      toast.error('Network Error', 'Please check your connection');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setProfile(data.user);
        // Update localStorage user data
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          userData.fullName = data.user.fullName;
          localStorage.setItem('user', JSON.stringify(userData));
        }
        setIsEditing(false);
        toast.success(
          'Profile Updated',
          'Your profile has been updated successfully!',
        );
      } else {
        toast.error(
          'Update Failed',
          data.message || 'Failed to update profile',
        );
      }
    } catch (err: any) {
      console.error('Error updating profile:', err);
      toast.error('Error', 'Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (profile) {
      setFormData({
        fullName: profile.fullName,
        mobileNumber: profile.mobileNumber,
        address: profile.address,
      });
    }
    setIsEditing(false);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return {
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: Shield,
          label: 'Administrator',
        };
      case 'moderator':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Shield,
          label: 'Moderator',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: User,
          label: 'User',
        };
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive
      ? {
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          label: 'Active',
        }
      : {
          color: 'bg-red-100 text-red-800',
          icon: AlertCircle,
          label: 'Inactive',
        };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center px-4">
          <div className="text-red-600 text-4xl sm:text-5xl mb-4">⚠️</div>
          <p className="text-gray-600 text-sm sm:text-base">
            Failed to load profile
          </p>
          <button
            onClick={fetchProfile}
            className="mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const roleInfo = getRoleBadge(profile.role);
  const statusInfo = getStatusBadge(profile.isActive);
  const RoleIcon = roleInfo.icon;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      {/* Profile Card */}
      <div className="bg-white rounded-xl sm:rounded shadow-lg overflow-hidden">
        {/* Cover Section */}
        <div className="h-24 sm:h-28 md:h-32 bg-linear-to-r from-blue-500 to-purple-600 relative">
          <h2 className="text-center text-2xl font-semibold text-gray-800 pt-12">
            My Profile
          </h2>
          <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 left-4 sm:left-6 md:left-8">
            <div className="relative">
              <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-white p-1 shadow-lg">
                <div className="h-full w-full rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                    {profile.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 sm:p-1.5 shadow-md hover:bg-gray-50 transition-colors cursor-not-allowed opacity-50"
                title="Change photo (coming soon)"
                disabled
              >
                <Camera className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="pt-12 sm:pt-14 md:pt-16 pb-4 sm:pb-5 md:pb-6 px-4 sm:px-6 md:px-8">
          {/* User Info Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-5 md:mb-6 gap-3 sm:gap-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 wrap-break-word">
                {profile.fullName}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium ${roleInfo.color}`}
                >
                  <RoleIcon className="h-3 w-3" />
                  {roleInfo.label}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                >
                  <StatusIcon className="h-3 w-3" />
                  {statusInfo.label}
                </span>
              </div>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white cursor-pointer rounded hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 cursor-pointer text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm sm:text-base"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProfile}
                  disabled={saving}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 cursor-pointer text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  <Save className="h-4 w-4" />
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-5 md:mt-6">
            {/* Full Name */}
            <div className="bg-yellow-100 rounded p-3 sm:p-4">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 mb-1.5 sm:mb-2">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="text-sm sm:text-base text-gray-900 font-medium wrap-break-word">
                  {profile.fullName}
                </p>
              )}
            </div>

            {/* Email (Read-only) */}
            <div className="bg-yellow-100 rounded p-3 sm:p-4">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 mb-1.5 sm:mb-2">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Email Address
              </label>
              <p className="text-sm sm:text-base text-gray-900 font-medium wrap-break-word">
                {profile.email}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Mobile Number */}
            <div className="bg-yellow-100 rounded p-3 sm:p-4">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 mb-1.5 sm:mb-2">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Mobile Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNumber: e.target.value })
                  }
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your mobile number"
                />
              ) : (
                <p className="text-sm sm:text-base text-gray-900 font-medium wrap-break-word">
                  {profile.mobileNumber}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="bg-yellow-100 rounded p-3 sm:p-4 md:col-span-2">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 mb-1.5 sm:mb-2">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Address
              </label>
              {isEditing ? (
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows={3}
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  placeholder="Enter your address"
                />
              ) : (
                <p className="text-sm sm:text-base text-gray-900 font-medium wrap-break-word whitespace-pre-wrap">
                  {profile.address}
                </p>
              )}
            </div>
          </div>

          {/* Account Information Section */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Account Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Joined:</span>
                </div>
                <span className="text-gray-900 wrap-break-word">
                  {formatDate(profile.createdAt)}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>User ID:</span>
                </div>
                <span className="text-gray-600 font-mono text-xs break-all">
                  {profile._id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
