import PageContent from "../components/PageContent";
import {useRouteError} from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 404) {
    title = "Not Found";
    message = "Could not find requested resource!";
  }

  if (error.status === 500) {
    title = "Internal Server Error";
    message = JSON.parse(error.data).message
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}