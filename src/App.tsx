import React, { useState, useEffect } from 'react';
import { Calendar } from './components/Calendar';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { CycleAdjustmentForm } from './components/CycleAdjustmentForm';
import { Header } from './components/Header';
import { CycleEducation } from './components/CycleEducation';
import { Auth } from './components/Auth';
import { User } from './types';
import { calculateCycleDays } from './utils/cycleCalculations';
import { useAuth } from './hooks/useAuth';
import { saveUser, getTrackedUsers, deleteUser } from './services/userService';
import { LogIn, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/config';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [showAdjustment, setShowAdjustment] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      loadUsers();
    } else {
      setUsers([]);
      setSelectedUserId('');
    }
  }, [user]);

  const loadUsers = async () => {
    if (user) {
      const loadedUsers = await getTrackedUsers(user.uid);
      setUsers(loadedUsers);
    }
  };

  const handleAddUser = async (userData: Omit<User, 'id'>) => {
    if (!user) return;

    const newUser: User = {
      ...userData,
      id: crypto.randomUUID(),
    };

    await saveUser(user.uid, newUser);
    await loadUsers();
    setSelectedUserId(newUser.id);
    setShowForm(false);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!user || !window.confirm('本当に削除しますか？')) return;
    
    try {
      await deleteUser(user.uid, userId);
      await loadUsers();
      if (selectedUserId === userId) {
        setSelectedUserId('');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAdjustCycle = async (userId: string, updates: Partial<User>) => {
    if (!user) return;

    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, ...updates } : u
    );
    
    const updatedUser = updatedUsers.find(u => u.id === userId);
    if (updatedUser) {
      await saveUser(user.uid, updatedUser);
      await loadUsers();
    }
    
    setShowAdjustment(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowAuth(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleHome = () => {
    setSelectedUserId('');
  };

  const selectedUser = users.find((u) => u.id === selectedUserId);
  const calendarDays = selectedUser
    ? calculateCycleDays(
        selectedUser.lastPeriodStart,
        selectedUser.cycleLength,
        selectedUser.periodLength
      )
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Header onHome={handleHome} showHomeButton={!!selectedUserId} />
          {!user ? (
            <button
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all"
            >
              <LogIn size={18} />
              ログイン
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            >
              <LogOut size={18} />
              ログアウト
            </button>
          )}
        </div>

        {user ? (
          <>
            <UserList
              users={users}
              selectedUserId={selectedUserId}
              onSelectUser={setSelectedUserId}
              onAddUser={() => setShowForm(true)}
              onAdjustCycle={(userId) => setShowAdjustment(userId)}
              onDeleteUser={handleDeleteUser}
            />

            {showForm && (
              <UserForm
                onSave={handleAddUser}
                onCancel={() => setShowForm(false)}
              />
            )}

            {showAdjustment && (
              <CycleAdjustmentForm
                user={users.find(u => u.id === showAdjustment)!}
                onSave={handleAdjustCycle}
                onCancel={() => setShowAdjustment(null)}
              />
            )}

            {selectedUser ? (
              <Calendar days={calendarDays} />
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
                <p>女性を選択するか新しく追加してください</p>
                <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                  ※生理周期はズレていくので、できれば毎回最近の生理開始日を記録してください
                </p>
              </div>
            )}

            <CycleEducation />
          </>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
            <p>ログインしてデータを保存・管理しましょう</p>
          </div>
        )}
      </div>

      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </div>
  );
}