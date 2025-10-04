export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch('/jsonUsersData/users.json');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function createUser(userData: Omit<User, 'id'>): Promise<User> {
  const users = await getUsers();
  const newUser: User = {
    id: Math.max(...users.map(u => u.id), 0) + 1,
    ...userData
  };
  
  return newUser;
}