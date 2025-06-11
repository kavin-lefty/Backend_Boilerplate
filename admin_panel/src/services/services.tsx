import CommonApi from "../server/axios";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  status: string;
  token: string;
}

export const LoginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await CommonApi.post<LoginResponse>("login_user", data);
  return res.data;
};
