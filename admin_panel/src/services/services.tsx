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

interface FetchUsersRequest {
  page: string;
}

interface FetchUsersResponse {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export const LoginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await CommonApi.post<LoginResponse>("login_user", data);
  return res.data;
};

export const FetchUsers = async (
  data: FetchUsersRequest
): Promise<FetchUsersResponse> => {
  const res = await CommonApi.post<FetchUsersResponse>("getUsers", data);
  return res.data;
};
