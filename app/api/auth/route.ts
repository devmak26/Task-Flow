import { NextRequest, NextResponse } from "next/server";
import { hash, compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, cookieOptions } from "@/lib/auth";
import { randomUUID } from "crypto";

// ── POST /api/auth?action=signup|login|logout ─────────────────────────────────

export async function POST(req: NextRequest) {
  const action = req.nextUrl.searchParams.get("action");

  // ── Logout ──────────────────────────────────────────────────────────────────
  if (action === "logout") {
    const res = NextResponse.redirect(new URL("/auth", req.url));
    res.cookies.set({ ...cookieOptions, maxAge: 0, value: "" });
    return res;
  }

  let body: { name?: string; email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, password } = body;
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  // ── Signup ───────────────────────────────────────────────────────────────────
  if (action === "signup") {
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }
    const hashed = await hash(password, 12);
    const user = await prisma.user.create({
      data: { id: randomUUID(), name, email, password: hashed },
    });
    const token = await signToken({ sub: user.id, name: user.name, email: user.email });
    const res = NextResponse.json({ ok: true });
    res.cookies.set({ ...cookieOptions, value: token });
    return res;
  }

  // ── Login ────────────────────────────────────────────────────────────────────
  if (action === "login") {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = await signToken({ sub: user.id, name: user.name, email: user.email });
    const res = NextResponse.json({ ok: true });
    res.cookies.set({ ...cookieOptions, value: token });
    return res;
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}