import type { TLogin } from "../schemas/loginSchema";
import type { TRegister } from "../schemas/registerSchema";
import agent from "./agent";

//========> GetActivities
export async function fetchActivities() {
  const { data } = await agent.get<TActivity[]>("/activities");
  return data;
}
//========> GetActivityById
export async function getActivityById(id: string) {
  const { data } = await agent.get<TActivity>(`/activities/${id}`);
  return data;
}

//========> EditActivity
export async function putActivity(activity: TActivity) {
  await agent.put("/activities", activity);
}

//========> CreateActivity
export async function postActivity(activity: TActivity) {
  const { data } = await agent.post("/activities", activity);
  return data;
}

//========> DeleteActivities
export async function removeActivity(id: string) {
  await agent.delete(`/activities/${id}`);
}

//========> Login
export async function login(creds: TLogin) {
  await agent.post("/login?useCookies=true", creds);
}

//========> Register
export async function register(creds: TRegister) {
  await agent.post("/account/register", creds);
}
//========> Login
export async function logOut() {
  await agent.post("/account/logout");
}

//========> Get user infor
export async function getUser() {
  const { data } = await agent.get<TUser>("/account/user-info");
  return data;
}
