import { useState, useEffect, useCallback } from 'react';
import api from '../lib/axios';
import type { User } from '../types/user';

export function useUsers() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchUsers = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await api.get<User[]>('/users');
			setUsers(res.data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Unknown error');
		} finally {
			setLoading(false);
		}
	}, []);

	const createUser = useCallback(
		async (name: string, email: string) => {
			setLoading(true);
			setError(null);
			try {
				await api.post('/users', { name, email });
				await fetchUsers();
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error');
			} finally {
				setLoading(false);
			}
		},
		[fetchUsers],
	);

	const editUser = useCallback(
		async (id: number, name: string, email: string) => {
			setLoading(true);
			setError(null);
			try {
				await api.patch(`/users/${id}`, { name, email });
				await fetchUsers();
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error');
			} finally {
				setLoading(false);
			}
		},
		[fetchUsers],
	);

	const deleteUser = useCallback(
		async (id: number) => {
			setLoading(true);
			setError(null);
			try {
				await api.delete(`/users/${id}`);
				await fetchUsers();
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error');
			} finally {
				setLoading(false);
			}
		},
		[fetchUsers],
	);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return {
		users,
		loading,
		error,
		fetchUsers,
		createUser,
		deleteUser,
		editUser,
	};
}
