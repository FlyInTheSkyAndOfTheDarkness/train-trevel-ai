import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Email from 'next-auth/providers/email';
import { prisma } from '@/lib/db';
import { env } from '@/lib/env.mjs';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { handlers: authHandlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(creds) {
        const email = String(creds?.email ?? '').toLowerCase();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;
        const ok = await bcrypt.compare(String(creds?.password ?? ''), user.password);
        return ok ? { id: user.id, email: user.email, name: user.name } : null;
      }
    }),
    Email({
      async generateVerificationToken() {
        // next-auth v5 handles token creation in DB via Prisma adapter by default when configured.
        return undefined as unknown as string;
      },
      async sendVerificationRequest({ identifier, url }) {
        const transport = nodemailer.createTransport({
          host: env.EMAIL_SERVER_HOST,
          port: env.EMAIL_SERVER_PORT,
          secure: false,
          auth: env.EMAIL_SERVER_USER ? {
            user: env.EMAIL_SERVER_USER,
            pass: env.EMAIL_SERVER_PASSWORD
          } : undefined
        });
        await transport.sendMail({ 
          to: identifier, 
          from: env.EMAIL_FROM, 
          subject: 'Вход в TrainTravel AI', 
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Добро пожаловать в TrainTravel AI!</h2>
              <p>Для входа в систему нажмите на ссылку ниже:</p>
              <a href="${url}" style="display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Войти в систему</a>
              <p style="margin-top: 20px; color: #666; font-size: 14px;">
                Если вы не запрашивали вход, проигнорируйте это письмо.
              </p>
            </div>
          `
        });
      }
    })
  ],
  secret: env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.uid = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.uid) (session.user as any).id = token.uid as string;
      return session;
    }
  }
});

