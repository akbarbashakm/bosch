import { ACTION_TYPES, PROJECT_TYPES } from "../constants";

const { SET_DATA, REMOVE_DATA, EDIT_DATA } = ACTION_TYPES;

export const initialState = {
  tasks: [{
    taskId: 1,
    taskName: 'Name 1',
    project: 1,
    projectName: 1,
    comments: 'Hey This is'
  }]
};

export default function reducer(state = initialState, action) {
  const { payload, type } = action;
  const { tasks } = state;
  switch (type) {
    case SET_DATA: {
      return {
        ...state,
        tasks: [
          ...tasks,
          {
            ...payload,
            taskId: tasks.length + 1,
            projectName: PROJECT_TYPES.filter((project) => project.value === payload.project)[0].name
          }
        ]
      }
    }
    case REMOVE_DATA: {
      const index = tasks.findIndex(obj => obj.taskId === payload);
      return {
        ...state,
        tasks: [
          ...tasks.slice(0, index),
          ...tasks.slice(index + 1)
        ]
      }
    }
    case EDIT_DATA: {
      const { taskId, taskName, project, comments } = payload;
      const currentTasks = [
        ...tasks
      ]
      const index = currentTasks.findIndex(obj => obj.taskId === taskId);
      currentTasks[index] = {
        ...currentTasks[index],
        taskName, comments,
        projectName: PROJECT_TYPES.filter((a) => a.value === project)[0].name,
        project
      }
      return {
        ...state,
        tasks: [
          ...currentTasks
        ]
      };
    }
    default:
      return state;
  }
}
