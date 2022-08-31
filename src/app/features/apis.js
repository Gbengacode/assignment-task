import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const headerInfo = {
  headers: {
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjEzMjY1NDAsIm5iZiI6MTY2MTMyNjU0MCwianRpIjoiZDdmODViN2UtNDNjMS00ZTU3LWJjN2UtNjExZjUxNmM1ODA2IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.zO0LC_AJV1JBIjIY3WWLWcRR9700Nr-dikl_upH44Tc`,
  },
};
const baseUrl = `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691`;

export const getTask = createAsyncThunk("/task/getPost", async () => {
  const response = await axios.get(
    `${baseUrl}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`,
    headerInfo
  );

  return response.data.results;
});

export const postTask = createAsyncThunk("/task/postTask", async (task) => {
  const response = await axios.post(
    `${baseUrl}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`,
    task,
    headerInfo
  );
  return response.data.results;
});

export const removeTask = createAsyncThunk("/task/removeTask", async (id) => {
  await axios.delete(
    `${baseUrl}/${id}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`,

    headerInfo
  );

  return id;

});

export const updateTask = createAsyncThunk("/task/updateTask", async (task) => {
  const sendTask = {
    assigned_user: task.assigned_user,
    task_date: task.task_date,
    task_time: task.task_time,
    is_completed: task.is_completed,
    task_msg: task.task_msg,
    time_zone: task.time_zone,
    
  };
  const response = await axios.put(
    `${baseUrl}/${task.id}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`,
    sendTask,

    headerInfo
  );
  return response.data.results;
});
