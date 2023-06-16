import React from "react";
import { useMatches, Navigate } from "react-router-dom";

export const PrivateRoute: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const matches = useMatches();
  const rolesNeeded = Array.from(
    new Set(matches.flatMap((m) => (m.handle as any)?.roles ?? []))
  );
  const user = getUser();
  const canAccess = user
    ? rolesNeeded.every((r) => user.roles?.includes(r))
    : false;
  return canAccess ? <>{children}</> : <Navigate to="/login" />;
};


function getUser() {
  const token = window.localStorage.getItem("id_token");
  if (!token) {
    return null;
  }
  const [_header, payload, _signature] = token.split(".");
  const user = JSON.parse(atob(payload));
  return user;
}
