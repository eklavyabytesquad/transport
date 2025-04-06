'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../AuthContext'
import { useRouter } from 'next/navigation'
import { supabase } from '../../supabase'

export default function Dashboard() {
  const { user, profile, loading, signOut } = useAuth()
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Fetch all user profiles if the user is an admin
  useEffect(() => {
    const fetchUsers = async () => {
      if (!user || loading) return
      
      // If not logged in, redirect to login
      if (!user) {
        router.push('/login')
        return
      }

      try {
        // Only fetch all users if the current user is an admin
        if (profile?.role === 'admin' || profile?.role === 'manager') {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false })

          if (error) {
            console.error('Error fetching users:', error)
            return
          }

          setUsers(data || [])
        }
      } catch (error) {
        console.error('Error in fetchUsers:', error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [user, profile, loading, router])

  // If still loading auth status, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-3 text-gray-700">Loading...</p>
        </div>
      </div>
    )
  }

  // If no user, redirect to login (this is a fallback, useEffect should handle this)
  if (!user && !loading) {
    router.push('/login')
    return null
  }

  // Get role color
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'manager':
        return 'bg-green-100 text-green-800'
      case 'biller':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">SS</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">SS TRANSPORT</h1>
          </div>
          <div className="flex items-center">
            {profile && (
              <div className="mr-4 text-right">
                <p className="text-sm font-medium text-gray-900">{profile.full_name}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(profile.role)}`}>
                  {profile.role}
                </span>
              </div>
            )}
            <button
              onClick={signOut}
              className="ml-2 inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Welcome, {profile?.full_name}</h2>
          <p className="text-gray-600">
            You are logged in as{' '}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(profile?.role)}`}>
              {profile?.role}
            </span>
          </p>
        </div>

        {/* User list section - only visible to admins and managers */}
        {(profile?.role === 'admin' || profile?.role === 'manager') && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">User Management</h3>
              <p className="mt-1 text-sm text-gray-500">
                A list of all users in the SS Transport system.
              </p>
            </div>

            {isLoading ? (
              <div className="px-6 py-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm text-gray-500">Loading users...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Updated At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.updated_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Dashboard content specific to other roles */}
        {profile?.role === 'biller' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Dashboard</h3>
            <p className="text-gray-600">
              Welcome to the billing dashboard. You can manage invoices and billing operations here.
            </p>
            {/* Billing specific components would go here */}
          </div>
        )}

        {profile?.role === 'other_staff' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Staff Dashboard</h3>
            <p className="text-gray-600">
              Welcome to the staff dashboard. Your daily tasks and operations will appear here.
            </p>
            {/* Staff specific components would go here */}
          </div>
        )}
      </main>
    </div>
  )
}