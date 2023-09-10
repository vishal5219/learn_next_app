import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { connectdb } from "@/utils/database";
import User from "@/modals/User";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email })
            session.user.id = sessionUser._id
            return session
        },
        async signIn({ profile }) {
            console.log('profile', profile);
            try {
                await connectdb()
                const UserExist = await User.findOne({ email: profile.email })
                console.log('UserExist', UserExist);
                if (!UserExist) {
                    const user = await User.create({
                        email: profile.email,
                        name: profile.name,
                        image: profile.picture
                    })
                }
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        },
    }
})

export { handler as GET, handler as POST }
// export default NextAuth(authOptions)