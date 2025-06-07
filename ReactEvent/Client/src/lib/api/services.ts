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
