import React from 'react';
import { User } from '../types';
import { UserPlus, Calendar, Trash2 } from 'lucide-react';

interface UserListProps {
  users: User[];
  selectedUserId: string;
  onSelectUser: (userId: string) => void;
  onAddUser: () => void;
  onAdjustCycle: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

export function UserList({ users, selectedUserId, onSelectUser, onAddUser, onAdjustCycle, onDeleteUser }: UserListProps) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">登録者一覧</h2>
        <button
          onClick={onAddUser}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all"
        >
          <UserPlus size={18} />
          女性を追加
        </button>
      </div>
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
          >
            <button
              onClick={() => onSelectUser(user.id)}
              className={`flex-1 text-left px-4 py-2 rounded-lg transition-all ${
                selectedUserId === user.id
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {user.name}
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onAdjustCycle(user.id)}
                className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                title="周期を調整"
              >
                <Calendar size={18} />
              </button>
              <button
                onClick={() => onDeleteUser(user.id)}
                className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                title="削除"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}