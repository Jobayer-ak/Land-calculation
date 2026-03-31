/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { toast } from '@/components/ui/toast';
import {
  AlertTriangle,
  Eye,
  RefreshCw,
  Shield,
  Trash2,
  UserCheck,
  UserX,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface User {
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

interface ModalField {
  key: keyof User | 'status' | 'joinedDate' | 'lastUpdated';
  label: string;
  colSpan?: number;
  isBadge?: boolean;
  isDate?: boolean;
}

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}

const modalFields: ModalField[] = [
  { key: 'email', label: 'Email', colSpan: 1 },
  { key: 'mobileNumber', label: 'Mobile Number', colSpan: 1 },
  { key: 'address', label: 'Address', colSpan: 2 },
  { key: 'role', label: 'Role', colSpan: 1, isBadge: true },
  { key: 'status', label: 'Status', colSpan: 1, isBadge: true },
  { key: 'joinedDate', label: 'Joined Date', colSpan: 1, isDate: true },
  { key: 'lastUpdated', label: 'Last Updated', colSpan: 1, isDate: true },
];

// Professional Confirmation Modal Component
const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'text-red-600',
          button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
          bg: 'bg-red-50',
        };
      case 'warning':
        return {
          icon: 'text-yellow-600',
          button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
          bg: 'bg-yellow-50',
        };
      default:
        return {
          icon: 'text-white',
          button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
          bg: 'bg-green-500',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-200">
        <div className={`${styles.bg} rounded-t-xl p-4 border-b`}>
          <div className="flex items-center space-x-3">
            <div className={`${styles.icon}`}>
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed">{message}</p>
        </div>

        <div className="flex justify-end space-x-3 p-4 border-t bg-gray-50 rounded-b-xl">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors cursor-pointer ${styles.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AllUsers() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState<string>('');

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type: 'warning' | 'danger' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'warning',
  });

  useEffect(() => {
    // Get current user role
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUserRole(user.role || 'user');
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/sign-in');
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setUsers(data.users);
      } else {
        setError(data.message || 'Failed to fetch users');
        toast.error('Error', data.message || 'Failed to fetch users');
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/sign-in');
        }
      }
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError('Network error. Please try again.');
      toast.error('Network Error', 'Please check your connection');
    } finally {
      setLoading(false);
    }
  };

  // Delete user function (Admin only)
  const handleDeleteUser = async (userId: string, userName: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete User',
      message: `Are you sure you want to permanently delete "${userName}"? This action cannot be undone.`,
      type: 'danger',
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        try {
          setUpdating(true);
          const token = localStorage.getItem('token');

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/delete/${userId}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          );

          const data = await response.json();

          if (response.ok && data.success) {
            toast.success('User Deleted', data.message);
            fetchUsers();
          } else {
            toast.error('Failed', data.message || 'Failed to delete user');
          }
        } catch (err) {
          console.error('Error deleting user:', err);
          toast.error('Error', 'Network error. Please try again.');
        } finally {
          setUpdating(false);
        }
      },
    });
  };

  // Deactivate user function (Admin & Moderator)
  const handleDeactivateUser = async (userId: string, userName: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Deactivate User',
      message: `Are you sure you want to deactivate "${userName}"? They will not be able to login and will be logged out immediately.`,
      type: 'danger',
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        try {
          setUpdating(true);
          const token = localStorage.getItem('token');

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/deactivate/${userId}`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          );

          const data = await response.json();

          if (response.ok && data.success) {
            toast.warning('User Deactivated', data.message);
            fetchUsers();
          } else {
            toast.error('Failed', data.message || 'Failed to deactivate user');
          }
        } catch (err) {
          console.error('Error deactivating user:', err);
          toast.error('Error', 'Network error. Please try again.');
        } finally {
          setUpdating(false);
        }
      },
    });
  };

  // Activate user function (Admin & Moderator)
  const handleActivateUser = async (userId: string, currentStatus: boolean) => {
    const action = currentStatus ? 'deactivate' : 'activate';

    // If trying to deactivate, use the deactivate function
    if (currentStatus) {
      const user = users.find((u) => u._id === userId);
      if (user) {
        handleDeactivateUser(userId, user.fullName);
      }
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'Activate User',
      message: `Are you sure you want to activate this user? They will be able to access the system.`,
      type: 'info',
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        try {
          setUpdating(true);
          const token = localStorage.getItem('token');

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/activate/${userId}`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          );

          const data = await response.json();

          if (response.ok && data.success) {
            toast.success('Success!', data.message);
            fetchUsers();
          } else {
            toast.error(
              'Failed',
              data.message || 'Failed to update user status',
            );
          }
        } catch (err) {
          console.error('Error updating user:', err);
          toast.error('Error', 'Network error. Please try again.');
        } finally {
          setUpdating(false);
        }
      },
    });
  };

  // Update user role (Admin only)
  const handleUpdateRole = async (
    userId: string,
    newRole: string,
    currentRole: string,
  ) => {
    // Only admin can change roles
    if (currentUserRole !== 'admin') {
      toast.error(
        'Permission Denied',
        'Only administrators can change user roles.',
      );
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'Change User Role',
      message: `Are you sure you want to change this user's role from "${currentRole}" to "${newRole}"? This will affect their permissions in the system.`,
      type: 'warning',
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        try {
          setUpdating(true);
          const token = localStorage.getItem('token');

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/update-role/${userId}`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ role: newRole }),
            },
          );

          const data = await response.json();

          if (response.ok && data.success) {
            toast.success(
              'Role Updated',
              `User role changed to ${newRole} successfully`,
            );
            fetchUsers();
          } else {
            toast.error(
              'Update Failed',
              data.message || 'Failed to update user role',
            );
          }
        } catch (err) {
          console.error('Error updating role:', err);
          toast.error('Error', 'Network error. Please try again.');
        } finally {
          setUpdating(false);
        }
      },
    });
  };

  // Reset user session (Admin & Moderator) - WITH INACTIVE USER CHECK
  const handleResetSession = async (userId: string, userName: string) => {
    // Find the user to check if they are active
    const user = users.find((u) => u._id === userId);

    // Check if user is inactive
    if (user && !user.isActive) {
      toast.warning(
        'Cannot Reset Session',
        `"${userName}" is not an active user. Please activate the user first before resetting their session.`,
      );
      return; // Don't proceed with the API call
    }

    setConfirmModal({
      isOpen: true,
      title: 'Reset User Session',
      message: `Are you sure you want to reset "${userName}"'s session? They will be logged out from all devices immediately.`,
      type: 'danger',
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        try {
          setUpdating(true);
          const token = localStorage.getItem('token');

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-session/${userId}`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            },
          );

          const data = await response.json();

          if (response.ok && data.success) {
            toast.info('Session Reset', data.message);

            // Check if the session being reset belongs to the current logged-in user
            const currentUserStr = localStorage.getItem('user');
            if (currentUserStr) {
              const currentUser = JSON.parse(currentUserStr);
              if (currentUser.id === userId) {
                toast.warning(
                  'Session Reset',
                  'Your session has been reset. Please login again.',
                );
                setTimeout(() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  router.push('/sign-in');
                }, 1500);
              }
            }

            fetchUsers();
          } else {
            toast.error(
              'Failed',
              data.message || 'Failed to reset user session',
            );

            if (response.status === 401) {
              toast.error('Session Expired', 'Please login again.');
              setTimeout(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/sign-in');
              }, 1500);
            }
          }
        } catch (err) {
          console.error('Error resetting session:', err);
          toast.error('Error', 'Network error. Please try again.');
        } finally {
          setUpdating(false);
        }
      },
    });
  };

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-800',
      moderator: 'bg-blue-100 text-blue-800',
      user: 'bg-gray-100 text-gray-800',
    };
    return colors[role as keyof typeof colors] || colors.user;
  };

  const getStatusBadgeColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getModalFieldValue = (user: User, field: ModalField) => {
    if (field.key === 'status') {
      return user.isActive ? 'Active' : 'Inactive';
    }
    if (field.key === 'joinedDate') {
      return new Date(user.createdAt).toLocaleString();
    }
    if (field.key === 'lastUpdated') {
      return new Date(user.updatedAt).toLocaleString();
    }
    return user[field.key as keyof User];
  };

  const getModalFieldStyle = (user: User, field: ModalField) => {
    if (field.isBadge) {
      if (field.key === 'role') {
        return getRoleBadgeColor(user.role);
      }
      if (field.key === 'status') {
        return getStatusBadgeColor(user.isActive);
      }
    }
    return '';
  };

  // Check if current user can delete (admin only)
  const canDelete = () => currentUserRole === 'admin';

  // Check if current user can change role (admin only)
  const canChangeRole = () => currentUserRole === 'admin';

  // Check if current user can activate/deactivate (admin or moderator)
  const canToggleStatus = () =>
    currentUserRole === 'admin' || currentUserRole === 'moderator';

  // Check if current user can reset session (admin or moderator)
  const canResetSession = () =>
    currentUserRole === 'admin' || currentUserRole === 'moderator';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchUsers}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 py-4 sm:py-6">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Total {users.length} user(s) found
            </p>
          </div>
          <button
            onClick={fetchUsers}
            disabled={loading || updating}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 hover:text-white transition-colors cursor-pointer disabled:opacity-50 text-sm sm:text-base"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Mobile Card View - visible on small screens */}
      <div className="block md:hidden space-y-4">
        {users.map((user, index) => (
          <div key={user._id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                  <span className="text-white font-medium text-sm">
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{user.fullName}</h3>
                  <p className="text-xs text-gray-500">
                    ID: {user._id.slice(-6)}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowUserModal(true);
                  }}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                {canResetSession() && (
                  <button
                    onClick={() => handleResetSession(user._id, user.fullName)}
                    disabled={updating}
                    className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    title="Reset Session"
                  >
                    <Shield className="h-4 w-4" />
                  </button>
                )}
                {canDelete() && user.role !== 'admin' && (
                  <button
                    onClick={() => handleDeleteUser(user._id, user.fullName)}
                    disabled={updating}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    title="Delete User"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Email:</span>
                <p className="text-gray-900 wrap-break-word">{user.email}</p>
              </div>
              <div>
                <span className="text-gray-500">Mobile:</span>
                <p className="text-gray-900">{user.mobileNumber}</p>
              </div>
              <div>
                <span className="text-gray-500">Address:</span>
                <p className="text-gray-900 text-sm wrap-break-word">
                  {user.address}
                </p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="text-gray-500 text-xs">Role:</span>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleUpdateRole(user._id, e.target.value, user.role)
                    }
                    disabled={updating || !canChangeRole()}
                    className={`ml-2 text-xs rounded-full px-2 py-1 font-semibold ${getRoleBadgeColor(user.role)} border-0 ${canChangeRole() ? 'cursor-pointer' : 'cursor-not-allowed'} focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                {canToggleStatus() && (
                  <button
                    onClick={() => handleActivateUser(user._id, user.isActive)}
                    disabled={updating}
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold cursor-pointer ${getStatusBadgeColor(user.isActive)}`}
                  >
                    {user.isActive ? (
                      <div>
                        <UserCheck className="h-3 w-3 mr-1" />
                        Active
                      </div>
                    ) : (
                      <>
                        <UserX className="h-3 w-3 mr-1" />
                        Inactive
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className="text-xs text-gray-400 pt-1">
                Joined: {new Date(user.createdAt).toLocaleDateString('bn-BD')}
              </div>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>

      {/* Desktop Table View - visible on medium and larger screens */}
      <div className="hidden md:block bg-white shadow overflow-hidden rounded">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded">
            <thead className="bg-gray-400 ">
              <tr>
                <th className="border-r border-gray-200 px-4 py-3 text-center text-gray-800 text-md font-medium uppercase tracking-wider">
                  #
                </th>
                <th className="border-r border-gray-200 px-4 py-3 text-center text-gray-800 text-md font-medium uppercase tracking-wider">
                  User
                </th>
                <th className="border-r border-gray-200 px-4 py-3 text-center text-md font-medium text-gray-800 uppercase tracking-wider">
                  Contact
                </th>
                <th className="border-r border-gray-200 px-4 py-3 text-center text-gray-800 text-md font-medium uppercase tracking-wider">
                  Role
                </th>
                <th className="border-r border-gray-200 px-4 py-3 text-center text-md font-medium text-gray-800 uppercase tracking-wider">
                  Status
                </th>
                <th className="border-r border-gray-200 px-4 py-3 text-center text-md font-medium text-gray-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-yellow-100 divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-white transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center border-r border-gray-300 hover:bg-yellow-200 transition-colors">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center border-r border-gray-300 hover:bg-yellow-200 transition-colors">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.fullName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {user._id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center border-r border-gray-300 hover:bg-yellow-200 transition-colors">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-xs text-gray-500">
                      {user.mobileNumber}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center border-r border-gray-300 hover:bg-yellow-200 transition-colors">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleUpdateRole(user._id, e.target.value, user.role)
                      }
                      disabled={updating || !canChangeRole()}
                      className={`text-xs rounded-full px-2 py-1 font-semibold ${getRoleBadgeColor(user.role)} border-0 ${canChangeRole() ? 'cursor-pointer' : 'cursor-not-allowed'} focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center border-r border-gray-300 hover:bg-yellow-200 transition-colors">
                    {canToggleStatus() ? (
                      <button
                        onClick={() =>
                          handleActivateUser(user._id, user.isActive)
                        }
                        disabled={updating}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(user.isActive)} cursor-pointer`}
                      >
                        {user.isActive ? (
                          <>
                            <UserCheck className="h-3 w-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <UserX className="h-3 w-3 mr-1" />
                            Inactive
                          </>
                        )}
                      </button>
                    ) : (
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(user.isActive)}`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-center border-r border-gray-300 hover:bg-yellow-200 transition-colors">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 hover:bg-gray-50 rounded-lg transition-colors p-1.5 cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {canResetSession() && (
                        <button
                          onClick={() =>
                            handleResetSession(user._id, user.fullName)
                          }
                          disabled={updating}
                          className="text-orange-600 hover:text-orange-900 hover:bg-white rounded-md p-1.5 disabled:opacity-50 cursor-pointer"
                          title="Reset Session"
                        >
                          <Shield className="h-4 w-4" />
                        </button>
                      )}
                      {canDelete() && user.role !== 'admin' && (
                        <button
                          onClick={() =>
                            handleDeleteUser(user._id, user.fullName)
                          }
                          disabled={updating}
                          className="text-red-600 hover:text-red-900 hover:bg-white rounded-md p-1.5 disabled:opacity-50 cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 backdrop-blur-xs bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 ">
                User Details
              </h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-500 hover:bg-black hover:text-white rounded hover:cursor-pointer transition-colors"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 mb-4 pb-3 border-b">
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xl sm:text-2xl font-bold">
                  {selectedUser.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold">
                  {selectedUser.fullName}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1  sm:grid-cols-2 gap-3 sm:gap-4">
              {modalFields.map((field) => {
                const value = getModalFieldValue(selectedUser, field);
                const badgeStyle = getModalFieldStyle(selectedUser, field);

                return (
                  <div
                    key={field.key}
                    className={`border-b p-3 bg-yellow-100 flex flex-wrap items-start gap-2 ${
                      field.colSpan === 2 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <label className="text-xs sm:text-sm md:text-md font-medium text-gray-900 min-w-25 sm:min-w-30">
                      {field.label}:
                    </label>
                    <div className="flex-1">
                      {field.isBadge ? (
                        <span
                          className={`inline-flex px-2 sm:px-3 py-1 text-xs text-green-600 bg-green-100 sm:text-sm md:text-md font-semibold rounded-full`}
                        >
                          {value}
                        </span>
                      ) : (
                        <p className="text-sm text-gray-900 wrap-break-word">
                          {value as string}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-3 sm:px-4 py-2 bg-gray-700 text-white rounded cursor-pointer hover:bg-black hover:text-white transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        confirmText="Yes, Proceed"
        cancelText="Cancel"
      />
    </div>
  );
}
