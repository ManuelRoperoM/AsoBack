export function successResponse(status: number, message: string, data?: any) {
  return { status, message, data };
}

export function errorResponse(status: number, message: string, error?: any) {
  return { status, message, error };
}

