import { NextRequest, NextResponse } from "next/server";
import { useContext } from "react";
import { isAdminRole, isStudentRole, isTeacherRole } from "./utils/util";
import { DataContext } from "./store/GlobalState";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const { state, dispatch } = useContext(DataContext)
  const { auth } = state
  const url = request.nextUrl.clone();
  const token = auth?.token;
  const role = auth && auth.user && auth.user.role;

  const studentRoutes = [
    "/",
    "/signin"
  ];
  const teacherRoutes = [
    "/",
    "/signin",
    "/students",
  ];


  const adminRoutes = [
    "/",
    "/signin",
    "/teachers",
    "/students",
  ];

  const superAdminRoutes = [
    ...adminRoutes
  ];

  const page_404 = "/404";
  const page_signin = "/signin";

  if (!token) {
    url.pathname = page_signin;
    return NextResponse.redirect(url);
  } else if (isAdminRole(role) && adminRoutes.includes(pathname)) {
    return NextResponse.redirect(url);
  } else if (isTeacherRole(role) && teacherRoutes.includes(pathname)) {
    return NextResponse.redirect(url);
  } else if (isStudentRole(role) && studentRoutes.includes(pathname)) {
    return NextResponse.redirect(url);
  } else {
    url.pathname = page_404;
    return NextResponse.redirect(url);
  }
}