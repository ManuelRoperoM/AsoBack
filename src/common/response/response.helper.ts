export interface ApiResponse<T> {
  status: boolean;
  code: number;
  message: string;
  data?: T;
  errors?: any;
}

export const successResponse = <T>(
  data: T,
  message = 'Operación exitosa',
  code = 200,
): ApiResponse<T> => ({
  status: true,
  code,
  message,
  data,
});

export const errorResponse = (
  message = 'Ocurrió un error inesperado',
  code = 400,
  errors?: any,
): ApiResponse<null> => ({
  status: false,
  code,
  message,
  errors,
});
