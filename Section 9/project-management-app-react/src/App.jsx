import { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStartAddProject(){
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: null,
      }
    });
  }

  function handleCancelAddProject(){
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(project){
    const newProject = {
      id: crypto.randomUUID(),
      ...project,
    }

    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: newProject.id,
        projects: [...prevProjectsState.projects, newProject],
      }
    });
  }

  function handleSelectProject(project){
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: project.id,
      };
    });
  }

  function handleDeleteProject(project){
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        projects: prevProjectsState.projects.filter(existingProject => existingProject.id !== project.id),
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddTask(task){
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        projects: prevProjectsState.projects.map(project => {
          if(project.id === prevProjectsState.selectedProjectId){
            return {
              ...project,
              tasks: [...project.tasks, task],
            }
          }
          return project;
        })
      };
    });
  }

  function handleDeleteTask(task){
    setProjectsState((prevProjectsState) => {
      let taskId = task.id;

      return {
        ...prevProjectsState,
        projects: prevProjectsState.projects.map(project => {
          if(project.id === prevProjectsState.selectedProjectId){
            return {
              ...project,
              tasks: project.tasks.filter(existingTask => existingTask.id !== task.id),
            }
          }
          return project;
        })
      };
    })
  }

  let content = null;

  if(projectsState.selectedProjectId === null){
    content = <NewProject
      onAddProject={handleAddProject}
      onCancelAddProject={handleCancelAddProject}
    />;
  }else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected
      onStartAddProject={handleStartAddProject}
    />;
  }else{
    content = <SelectedProject
      project={projectsState.projects.find(project => project.id === projectsState.selectedProjectId)}
      onDeleteProject={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
