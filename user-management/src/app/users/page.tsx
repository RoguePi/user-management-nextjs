'use client';

import { useState, useEffect } from 'react';
import { getUsers, createUser, User } from '@/lib/api';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (err) {
        setNotification({ message: 'Failed to load users', type: 'error' });
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const userData = {
        name: formData.get('name') as string,
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        website: formData.get('website') as string,
        address: {
          street: formData.get('street') as string,
          suite: formData.get('suite') as string,
          city: formData.get('city') as string,
          zipcode: formData.get('zipcode') as string,
          geo: {
            lat: formData.get('lat') as string,
            lng: formData.get('lng') as string,
          }
        },
        company: {
          name: formData.get('companyName') as string,
          catchPhrase: formData.get('catchPhrase') as string,
          bs: formData.get('bs') as string,
        }
      };

      const newUser = await createUser(userData);
      setUsers(prev => [...prev, newUser]);
      setShowModal(false);
      setNotification({ message: 'User created successfully!', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Failed to create user', type: 'error' });
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Notification */}
        {notification && (
          <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow-lg z-50 ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            <div className="flex items-center">
              <span>{notification.message}</span>
              <button 
                onClick={() => setNotification(null)}
                className="ml-2 text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-700 mb-2 tracking-tight">
            User <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Management</span>
          </h1>
          <p className="text-slate-600 font-light">Manage and organize your users with ease</p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 w-64 text-sm text-slate-700 placeholder-slate-400"
            />
            <svg className="w-4 h-4 text-slate-500 absolute left-2.5 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-light rounded-lg hover:shadow-lg hover:shadow-blue-300/25 transition-all duration-300 text-sm"
          >
            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create User
          </button>
        </div>

        {/* Users Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <span className="ml-3 text-slate-600 font-light">Loading users...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-xl font-light text-slate-700 mb-2">{searchTerm ? 'No matching users found' : 'No users found'}</h3>
            <p className="text-slate-500 font-light">{searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first user'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div 
                key={user.id} 
                onClick={() => setSelectedUser(user)}
                className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-light text-lg">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-slate-700">{user.name}</h3>
                    <p className="text-sm text-slate-500 font-light">{user.company.name}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-slate-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {user.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create User Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-slate-200/50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-light text-slate-700 mb-1">Create New User</h2>
                    <p className="text-sm text-slate-500 font-light">Add a new user to your system</p>
                  </div>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white/50 rounded-xl transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Form Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
                <form onSubmit={handleCreateUser} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-light text-slate-700 mb-4 flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                      </div>
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-light text-slate-600">Full Name</label>
                        <input name="name" required className="w-full p-3 bg-white border border-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all duration-200 font-light text-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-light text-slate-600">Username</label>
                        <input name="username" required className="w-full p-3 bg-white border border-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all duration-200 font-light text-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-light text-slate-600">Email Address</label>
                        <input name="email" type="email" required className="w-full p-3 bg-white border border-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all duration-200 font-light text-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-light text-slate-600">Phone Number</label>
                        <input name="phone" required className="w-full p-3 bg-white border border-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all duration-200 font-light text-slate-700" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-light text-slate-600">Website</label>
                        <input name="website" required className="w-full p-3 bg-white border border-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all duration-200 font-light text-slate-700" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Address Information */}
                  <div>
                    <h3 className="text-lg font-light text-slate-700 mb-4 flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </div>
                      Address Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-light text-slate-600">Street</label>
                        <input name="street" required className="w-full p-3 bg-white border border-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all duration-200 font-light text-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-light text-slate-600">Suite</label>
                        <input name="suite" required className="w-full p-3 bg-white border border-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all duration-200 font-light text-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-light text-slate-600">City</label>
                        <input name="city" required className="w-full p-3 bg-white border border-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all duration-200 font-light text-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-light text-slate-600">Zipcode</label>
                        <input name="zipcode" required className="w-full p-3 bg-white border border-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all duration-200 font-light text-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-light text-slate-600">Latitude</label>
                        <input name="lat" required className="w-full p-3 bg-white border border-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all duration-200 font-light text-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-light text-slate-600">Longitude</label>
                        <input name="lng" required className="w-full p-3 bg-white border border-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all duration-200 font-light text-slate-700" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Company Information */}
                  <div>
                    <h3 className="text-lg font-light text-slate-700 mb-4 flex items-center">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-violet-500 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                        </svg>
                      </div>
                      Company Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-light text-slate-600">Company Name</label>
                        <input name="companyName" required className="w-full p-3 bg-white border border-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all duration-200 font-light text-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-light text-slate-600">Catch Phrase</label>
                        <input name="catchPhrase" required className="w-full p-3 bg-white border border-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all duration-200 font-light text-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-light text-slate-600">Business</label>
                        <input name="bs" required className="w-full p-3 bg-white border border-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all duration-200 font-light text-slate-700" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200/50">
                    <button 
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-3 text-slate-600 bg-white/70 border border-slate-200/50 rounded-xl hover:bg-slate-50 transition-all duration-200 font-light"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-xl hover:shadow-xl hover:shadow-blue-300/25 transition-all duration-300 transform hover:-translate-y-0.5 font-light"
                    >
                      Create User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-slate-200/50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white font-light text-xl">{selectedUser.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-light text-slate-700 mb-1">{selectedUser.name}</h2>
                      <p className="text-sm text-slate-500 font-light">{selectedUser.company.name}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedUser(null)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white/50 rounded-xl transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-light text-slate-700 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-slate-50/50 rounded-xl">
                      <svg className="w-4 h-4 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-xs text-slate-500 font-light">Email</p>
                        <p className="text-slate-700">{selectedUser.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-slate-50/50 rounded-xl">
                      <svg className="w-4 h-4 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="text-xs text-slate-500 font-light">Phone</p>
                        <p className="text-slate-700">{selectedUser.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-slate-50/50 rounded-xl">
                      <svg className="w-4 h-4 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                      <div>
                        <p className="text-xs text-slate-500 font-light">Website</p>
                        <p className="text-slate-700">{selectedUser.website}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-lg font-light text-slate-700 mb-4">Address</h3>
                  <div className="bg-slate-50/50 p-4 rounded-xl">
                    <p className="text-slate-700 mb-1">
                      {selectedUser.address.street}, {selectedUser.address.suite}
                    </p>
                    <p className="text-slate-600">
                      {selectedUser.address.city}, {selectedUser.address.zipcode}
                    </p>
                  </div>
                </div>

                {/* Company Details */}
                <div>
                  <h3 className="text-lg font-light text-slate-700 mb-4">Company Details</h3>
                  <div className="space-y-3">
                    <div className="bg-slate-50/50 p-4 rounded-xl">
                      <p className="text-xs text-slate-500 font-light mb-1">Company Name</p>
                      <p className="text-slate-700 font-medium">{selectedUser.company.name}</p>
                    </div>
                    <div className="bg-slate-50/50 p-4 rounded-xl">
                      <p className="text-xs text-slate-500 font-light mb-1">Catch Phrase</p>
                      <p className="text-slate-700 italic">"{selectedUser.company.catchPhrase}"</p>
                    </div>
                    <div className="bg-slate-50/50 p-4 rounded-xl">
                      <p className="text-xs text-slate-500 font-light mb-1">Business</p>
                      <p className="text-slate-700">{selectedUser.company.bs}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}