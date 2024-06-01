import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from "@/lib/dbConnect";
import User from "@/model/userModel";
import Account from "@/model/accountModel";
import GoogleProvider from "next-auth/providers/google";


export const authOption = {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          name: { label: 'Name', type: 'text', placeholder: 'Name' },
          email: { label: 'Email', type: 'text', placeholder: 'abc@gmail.com' },
          password: { label: 'Password', type: 'password', placeholder: '********' },
        },
        async authorize(credentials: any) {
          await dbConnect();
          const { name, email, password } = credentials
          const user = await User.findOne({ email });
  
          if (user) {
            if (user.password === password) {
              return {
                id: user._id,
                name: user.name,
                email: user.email,
              }
            }
            else {
              return null
            }
          }
          else {
            const user = await User.create({ name, email, password })
            await Account.create({
              user:user._id,
              balance:10000,
              name
          })
            if (user) {
              return {
                id: user._id,
                name: user.name,
                email: user.email,
              }
            }
            else {
              return null
            }
          }
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
      })
    ],
    secret: "secret",
    callbacks: {
      async signIn({ user, account }:any) {
        await dbConnect();
        if (account && account.provider === 'google') {
          let existingUser = await User.findOne({ googleId: user.id });
          if (!existingUser) {
            const newUser = await User.create({
              name: user.name,
              email: user.email,
              googleId: user.id,
            });
  
            await Account.create({
              user: newUser._id,
              balance: 10000,
              name: user.name,
            });
  
            user.id = newUser._id;
          } else {
            user.id = existingUser._id;
          }
        }
        return true;
      },
      jwt: async ({ user, token }: any) => {
        if (user) {
          token.uid = user.id;
          token.name = user.name,
          token.email = user.email
        }
        return token;
      },
      session: ({ session, token }: any) => {
        if (session.user) {
          session.user.id = token.uid
          session.user.email = token.email
          session.user.name = token.name
        }
        return session
      },
      redirect: async ({ baseUrl }:any) => {
        return baseUrl;
      }
    },
    pages:{
      signIn: "/signin"
    }
  }