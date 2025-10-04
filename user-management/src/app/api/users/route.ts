import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    // Read existing users from the JSON file
    const filePath = path.join(
      process.cwd(),
      "public",
      "jsonUsersData",
      "users.json"
    );
    const fileContents = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(fileContents);

    const newUser = {
      id: users.length + 1,
      ...userData,
    };

    users.push(newUser);

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
