import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { getToken, decode } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { headers } from 'next/headers'

export async function GET(req) {
    try {
        const headersList = headers()
        const token = headersList.get('authorization').split(' ')[1];
        // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }); // replace 'your-secret-key' with your actual secret key
        if (token) {
            const decoded = await decode({
                token: token,
                secret: process.env.NEXTAUTH_SECRET,
            });

            if (decoded) {

                await connectMongoDB();
                const users = await User.find({});
                return NextResponse.json({ users },  { status: 201 });

            } else {
                return NextResponse.json(
                    { message: "Unauthorized User" },
                    { status: 401 }
                );
            }
        } else {
            return NextResponse.json(
                { message: "Unauthorized User" },
                { status: 401 }
            );
        }

        // const { email } = await req.json();
        // const user = await User.findOne({ email }).select("_id");
        // console.log("user: ", user);
        // return NextResponse.json({ user });
    } catch (error) {
        console.log(error, "This is the error")
        return NextResponse.json(
            { message: "An error occurred while registering the user." },
            { status: 500 }
        );
    }
}
