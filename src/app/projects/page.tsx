import ProjectItem from "@/components/atoms/ProjectItem";
import { projects } from "@site/content";

export default function page() {
  return (
    <section className="container max-w-4xl py-6 lg:py-10">
      <div>
        <h1 className="text-4xl font-black lg:text-5xl">Projects</h1>
      </div>
      <hr className="my-4" />
      <ul className="mt-8 flex flex-col gap-4">
        {projects.map(project => (
          <li key={project.slug}>
            <ProjectItem project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
