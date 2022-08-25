import React, { useState, useEffect } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import moment from "moment";
import {
  BsCalendarDateFill,
  BsFillPencilFill,
} from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { BiTask, BiTimeFive } from "react-icons/bi";
import { TiArrowUnsorted } from "react-icons/ti";
import { FiTrash2 } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Time from './Time'

import {
  getTask,
  postTask,
  removeTask,
  updateTask,
} from "../app/features/apis";

const TaskForm = () => {
  const [id, setId] = useState(1);
  const [taskDesc, setTaskDesc] = useState("");
  const [time, setTime] = useState("12:00:00: PM");
  const [date, setDate] = useState("");
  const [assigned, setAssigned] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.value);
  const notify = () => toast("All field required!");
  const handleClickAdd = () => {
    setShowAdd(true);
    setShowEditPanel(false);
    setShowEditForm(false);
    setTaskDesc("")
    setTime("12:00:00: PM")
    setDate("")
    setAssigned("")

  };
  const handleClickSave = (e) => {
    e.preventDefault();

    let error = false;
    if (taskDesc.trim() === "" || date.trim() === "" || assigned.trim() === "")  {
      error = true;
      notify();
    }

   
    if (!error) {
      const task = {
        assigned_user: assigned,
        task_date: date,
        task_time: moment(time, "HH:mm:ss: A").diff(
          moment().startOf("day"),
          "seconds"
        ),
        is_completed: 0,
        time_zone: moment(time, "HH:mm:ss: A").diff(
          moment().startOf("day"),
          "seconds"
        ),
        task_msg: taskDesc,
      };
      dispatch(postTask(task));
      setShowEditPanel(true);
      setShowAdd(false);
      setShowEditForm(false);
    }
  };

  const handleClickEdit = (id) => {
    const singleTask = tasks.find((t) => t.id === id);

    setShowEditForm(true);
    setShowAdd(false);
    setShowEditPanel(false);
    setId(id);
    setTaskDesc(singleTask.task_msg);
    setTime(singleTask.task_time);
    setDate(singleTask.task_date);
    setAssigned(singleTask.assigned_user);
  };

  const handleClickUpdate = (e) => {
    e.preventDefault();
    let error = false;
    if (taskDesc.trim() === "") {
      error = true;
      notify();
    }

    if (!error) {
      const task = {
        id,
        assigned_user: assigned,
        task_date: date,
        task_time: time,
        is_completed: 0,
        task_msg: taskDesc,
        time_zone: time,
      };

      dispatch(updateTask(task));
      setShowEditPanel(true);
      setShowAdd(false);
      setShowEditForm(false);
    }
  };

  const handleClickCancel = (e) => {
    e.preventDefault();
    setShowAdd(false);
    setShowEditPanel(true);
    setShowEditForm(false);
  };

  const handleDelete = () => {
    const confirmMsg = window.confirm("are you sure you want to delete");
    if (confirmMsg) {
      dispatch(removeTask(id));
      setShowAdd(false);
      setShowEditPanel(true);
      setShowEditForm(false);
    }
  };

  useEffect(() => {
    dispatch(getTask());
  }, [dispatch]);
  return (
    <>
      <ToastContainer />
      <div className="form-container">
        <div className=" card">
          <div className="card-header">
            <h2 className="h2 m-2">Task </h2>
            <span className="add-icon" onClick={handleClickAdd}>
              <AiFillPlusSquare />
            </span>
          </div>
          <div className="card-body">
            {showAdd && (
              <form>
                <div className="form-group">
                  <label>Task Description</label>
                  <div className="input-form">
                    <input
                      type="text"
                      className="task"
                      onChange={(e) => setTaskDesc(e.target.value)}
                      placeholder="follow up"
                      required
                    />
                    <span className="task-icon">
                      <BiTask />
                    </span>
                  </div>
                </div>
                <div className="form-group-inline">
                  <div className="form-group">
                    <label>Date</label>
                    <div className="input-form">
                      <span className="date-icon">
                        <BsCalendarDateFill />
                      </span>
                      <input
                        type="date"
                        className="task"
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Time</label>
                    <div className="input-form">
                      <span className="task-icon">
                        <BiTimeFive />
                      </span>
                      <select value={time} onChange={(e) => setTime(e.target.value)}>
                        { Time && Time.map(t =>
                      <option value={t} key={t}>{t}</option>
                        )
                        }
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Assigned</label>
                  <div className="input-form">
                    <select value ={assigned} onChange={(e) => setAssigned(e.target.value)}>
                    <option value="">Select Assignee</option>
                    <option value="Sura">
                        Sura
                      </option>
                      <option value="Mithlesh">
                        Mithlesh
                      </option>
                    </select>
                    <span className="caret-icon">
                      <TiArrowUnsorted />
                    </span>
                  </div>
                </div>
                <div className="button-group">
                  <button
                    className=" btn btn-outline-secondary m-2"
                    onClick={handleClickCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success m-2"
                    onClick={handleClickSave}
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
            {showEditPanel && (
              <div className="content">
                {tasks && tasks.length ? (
                  tasks &&
                  tasks.map((task) => (
                    <div className="edit-panel" key={task.id}>
                      <div className="user-detail">
                        <div className="assign-name">
                          <h2>Assigned User</h2>
                          <h2 className="h3">{task.assigned_user}</h2>
                          <h2 className="h3">{task.task_date}</h2>
                        </div>

                        <span
                          className="btn-edit"
                          onClick={() => {
                            handleClickEdit(task.id);
                          }}
                        >
                          {" "}
                          <BsFillPencilFill />
                        </span>
                      </div>
                      <div className="task-body">
                        <p>Description: {task.task_msg}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No item </div>
                )}
              </div>
            )}

            {showEditForm && (
              <form>
                <div className="form-group">
                  <label>Task Description edit</label>
                  <div className="input-form">
                    <input
                      type="text"
                      className="task"
                      placeholder="follow up"
                      onChange={(e) => {
                        setTaskDesc(e.target.value);
                      }}
                      value={taskDesc}
                    />
                    <span className="task-icon">
                      <BiTask />
                    </span>
                  </div>
                </div>
                <div className="form-group-inline">
                  <div className="form-group">
                    <label>Date</label>
                    <div className="input-form">
                      <span className="date-icon">
                        <BsCalendarDateFill />
                      </span>
                      <input
                        type="date"
                        className="task"
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                        value={date}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Time</label>
                    <div className="input-form">
                      <span className="task-icon">
                        <BiTimeFive />
                      </span>
                      <select value={time} onChange={(e) => setTime(e.target.value)}>
                        { Time && Time.map(t =>
                      <option value={t} key={t}>{t}</option>
                        )
                        }
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Assigned</label>
                  <div className="input-form">
                    <select
                      value={assigned}
                      onChange={(e) => {
                        setAssigned(e.target.value);
                      }}
                    >
                      <option value="Sura">
                        Sura
                      </option>
                      <option value="Mithlesh">
                        Mithlesh
                      </option>
                    </select>
                    <span className="caret-icon">
                      <TiArrowUnsorted />
                    </span>
                  </div>
                </div>
                <div className="action-group">
                  <span className="trash-icon" onClick={handleDelete}>
                    <FiTrash2 />
                  </span>
                  <div className="button-group">
                    <button
                      className="btn btn-secondary m-4"
                      onClick={handleClickCancel}
                    >
                      cancel
                    </button>
                    <button
                      className="btn btn-success m-4"
                      onClick={handleClickUpdate}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
