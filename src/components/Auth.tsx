import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Lock } from 'lucide-react';

interface AuthProps {
  onClose: () => void;
}

export function Auth({ onClose }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (password.length < 6) {
          setError('パスワードは6文字以上で入力してください');
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      switch (err.code) {
        case 'auth/invalid-email':
          setError('メールアドレスの形式が正しくありません');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('メールアドレスまたはパスワードが間違っています');
          break;
        case 'auth/email-already-in-use':
          setError('このメールアドレスは既に使用されています');
          break;
        default:
          setError('エラーが発生しました。もう一度お試しください');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-6 h-6 text-indigo-500" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {isLogin ? 'ログイン' : '新規登録'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
              minLength={6}
            />
            {!isLogin && (
              <p className="mt-1 text-sm text-gray-500">
                パスワードは6文字以上で入力してください
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-all"
            >
              {isLogin ? 'ログイン' : '登録'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
          >
            {isLogin ? '新規登録はこちら' : 'ログインはこちら'}
          </button>
        </form>
      </div>
    </div>
  );
}