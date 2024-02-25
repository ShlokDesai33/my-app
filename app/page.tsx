"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ArrowTopRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import { Loader2, ThumbsDown, ThumbsUp } from "lucide-react";
import Chat from "@/components/chat";
import Markdown from "react-markdown";
import logo from "@/public/logo.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { preload } from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => res.json());

export default function Home() {
  const [json, setJson] = useState<{ like: string[]; dislike: string[] }>({
    like: [
      "https://www.wired.com/story/tech-layoffs-2024-amazon-google-discord-twitch/",
    ],
    dislike: [],
  });

  const { data, isLoading } = useSWRImmutable(
    `https://textparse.muthu.live?json=${JSON.stringify(json)}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      let newJson = {
        like: [...json.like, data.id],
        dislike: json.dislike,
      };
      preload(
        `https://textparse.muthu.live?json=${JSON.stringify(newJson)}`,
        fetcher
      );
      let newJson2 = {
        dislike: [...json.dislike, data.id],
        like: json.like,
      };
      preload(
        `https://textparse.muthu.live?json=${JSON.stringify(newJson2)}`,
        fetcher
      );
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <>
        <div className="border-b shadow-sm">
          <div className="flex h-20 items-center px-4 max-w-screen-2xl mx-auto">
            <Image src={logo} alt="logo" height={30} width={30} />
            <span className="text-lg ml-2 font-semibold">Tech Trends</span>
            <div className="ml-auto flex items-center space-x-4">
              <Input
                type="search"
                placeholder="Search..."
                className="md:w-[100px] lg:w-[300px]"
              />
              <ModeToggle />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center pt-40">
          <Loader2 className="text-primary h-10 w-10 animate-spin" />
        </div>
      </>
    );
  }

  console.log("data :>> ", data.github);

  return (
    <>
      <div className="border-b shadow-sm">
        <div className="flex h-20 items-center px-4 max-w-screen-2xl mx-auto">
          <Image src={logo} alt="logo" height={30} width={30} />
          <span className="text-lg ml-2 font-semibold">Tech Trends</span>
          <div className="ml-auto flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[100px] lg:w-[300px]"
            />
            <ModeToggle />
          </div>
        </div>
      </div>

      <main className="flex flex-col lg:flex-row gap-20 max-w-screen-xl mx-auto py-10 px-4">
        <div className="basis-1/3">
          <Card className="px-6 py-2">
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Topic Summary
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p>{data.generatedTitle.replace(/[^a-zA-Z ]/g, "")}</p>

                  <h4 className="text-lg font-semibold tracking-tight mt-4">
                    Key Points:
                  </h4>

                  <ul className="mt-4 ml-6 list-disc [&>li]:mt-2">
                    {data.keyPoints
                      .split("-")
                      .slice(1, 7)
                      .map((text: string, i: number) => (
                        <li key={i}>{text.trim()}</li>
                      ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          <Chat context={data.text} />

          <div className="flex flex-col gap-y-4 mt-6">
            {data.github.items.splice(0, 5).map((item: any) => (
              <Card key={item.id} className="p-6">
                <div className="flex flex-col gap-y-4">
                  <div className="flex items-center gap-x-1">
                    <GitHubLogoIcon />
                    <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-x-4">
                    <span className="flex items-center gap-x-1 text-sm text-muted-foreground">
                      Forks: {item.forks_count}
                    </span>

                    <span className="flex items-center gap-x-1 text-sm text-muted-foreground">
                      Stargazers: {item.stargazers_count}
                    </span>
                  </div>

                  <a
                    href={item.html_url}
                    target="_blank"
                    className="inline-flex items-center gap-x-1 text-sm font-medium transition-colors hover:text-primary"
                  >
                    Go to Repository
                    <ArrowTopRightIcon />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="basis-2/3">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {new Date().toUTCString()}
            </p>

            <div className="flex items-center gap-x-4">
              <Button
                size="icon"
                onClick={() =>
                  setJson({
                    like: [...json.like, data.id],
                    dislike: json.dislike,
                  })
                }
              >
                <ThumbsUp className="size-4" />
              </Button>

              <Button
                size="icon"
                onClick={() =>
                  setJson({
                    dislike: [...json.dislike, data.id],
                    like: json.like,
                  })
                }
              >
                <ThumbsDown className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Markdown>{data.text}</Markdown>
          </div>

          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mt-8">
            Sources:
          </h4>

          <div className="grid gap-4 grid-cols-1 mt-4">
            {data.url.map((url: string, i: number) => (
              <Card className="p-4" key={i}>
                <a
                  target="_blank"
                  href={url}
                  className="inline-flex items-center gap-x-1 text-sm font-medium transition-colors hover:text-primary w-full"
                >
                  {url}
                </a>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t">
        <div className="max-w-screen-2xl mx-auto py-8 px-4 flex items-center justify-between">
          <a
            href="https://github.com/"
            target="_blank"
            className="inline-flex items-center gap-x-1 text-sm font-medium transition-colors hover:text-primary"
          >
            <GitHubLogoIcon />
            Repository
          </a>

          <p className="text-sm text-muted-foreground">
            Made with 💚 at Maddata 24
          </p>
        </div>
      </footer>
    </>
  );
}
