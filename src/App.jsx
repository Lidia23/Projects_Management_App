import NoProjectSelected from './components/NoProjectSelected.jsx';
import NewProject from './components/NewProject.jsx';
import ProjectSidebar from './components/ProjectSidebar.jsx';
import { useState } from 'react';
import SelectedProjects from './components/SelectedProjects.jsx';
function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined, //undefined if you are gonna select one of the user project, or null if you are gonna add one.
    projects: [],
    tasks: []
  });

  const handleStartAddProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }
  const handleAddProject = (projectData) => {
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      }
    })
  }
  const handleCancelAddProject = () => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }
  const handleSelectedProject = (id) => {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    })
  }
  const handleDeleteProject = () => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    })
  }
  const handleAddTask = (text) => {
    setProjectState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      if (newTask.projectId === prevState.selectedProjectId) {
        return {
          ...prevState,
          tasks: [newTask, ...prevState.tasks],
        };
      } else {
        return prevState; // Return the previous state if the project ID doesn't match
      }
    })
  }
  const handleDeleteTask = (id) => {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      }
    })
  }

  const selectedProject = projectState.projects.find((project) => project.id === projectState.selectedProjectId);
  let tasksForSelectedProject = [];
  if (selectedProject) {
    tasksForSelectedProject = projectState.tasks.filter((task) => task.projectId === selectedProject.id);
  }
  let content = <SelectedProjects project={selectedProject}
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={tasksForSelectedProject} />;

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }
  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectSidebar onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelected={handleSelectedProject}
        selectedProjectId={projectState.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;
