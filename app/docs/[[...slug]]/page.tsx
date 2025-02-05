import { metadataImage } from "@/lib/metadata";
import { source } from "@/lib/source";
import { getGithubLastEdit } from "fumadocs-core/server";
import { Popup, PopupContent, PopupTrigger } from "fumadocs-twoslash/ui";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const time = await getGithubLastEdit({
    owner: "amanvarshney01",
    repo: "typed-dsa",
    path: `content/docs/${page.file.path}`,
  });

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      lastUpdate={new Date(time ?? Date.now())}
      editOnGithub={{
        owner: "amanvarshney01",
        repo: "typed-dsa",
        sha: "main",
        path: `content/docs/${page.file.path}`,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            Popup,
            PopupContent,
            PopupTrigger,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return metadataImage.withImage(page.slugs, {
    title: page.data.title,
    description: page.data.description,
  });
}
