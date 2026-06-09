export function hasRequiredRole(userRoles: string[], requiredRoles: string[]) {
  if (!requiredRoles.length) {
    return true
  }

  return requiredRoles.some((role) => userRoles.includes(role))
}
