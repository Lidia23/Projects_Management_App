import NoProjectSelected from './components/NoProjectSelected.jsx';
import NewProject from './components/NewProject.jsx';
import ProjectSidebar from './components/ProjectSidebar.jsx';
import { useState, useEffect } from 'react';
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
      const updatedProjects = [...prevState.projects, newProject];

      // Save projects data to Local Storage
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
  
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: updatedProjects,
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
      const updatedProjects = prevState.projects.filter((project) => project.id !== prevState.selectedProjectId);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: updatedProjects
      }
    })
  }  
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects'));
    if (savedProjects) {
      setProjectState(prevState => ({
        ...prevState,
        projects: savedProjects
      }));
    }
  }, []);
  const handleAddTask = (text) => {
    setProjectState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      const updatedTasks = [newTask, ...prevState.tasks];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      if (newTask.projectId === prevState.selectedProjectId) {
        return {
          ...prevState,
          tasks: updatedTasks,
        };
      } else {
        return prevState; // Return the previous state if the project ID doesn't match
      }
    })
  }
    // const handleAddTask = (text) => {
  //   fetch("/user-added/task", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       text: text,
  //       projectId: projectState.selectedProjectId,
  //     }),
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Failed to add task');
  //     }
  //     return response.json();
  //   })
  //   .then(newTask => {
  //     setProjectState(prevState => ({
  //       ...prevState,
  //       tasks: [newTask, ...prevState.tasks],
  //     }));
  //   })
  //   .catch(error => {
  //     console.error('Error adding task:', error);
  //   });
  // }
  const handleDeleteTask = (id) => {
    setProjectState((prevState) => {
      const updatedTasks = prevState.tasks.filter((task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));  
      return {
        ...prevState,
        tasks: updatedTasks
      }
    })
  }
 useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setProjectState(prevState => ({
        ...prevState,
        tasks: savedTasks
      }));
    }
  }, []);

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
