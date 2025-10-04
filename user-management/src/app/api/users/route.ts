import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    
    // Read current users
    const filePath = path.join(process.cwd(), 'public', 'jsonUsersData', 'users.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(fileContents);
    
    // Create new user with ID
    const newUser = {
      id: users.length + 1,
      ...userData
    };
    
    // Add to users array
    users.push(newUser);
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}