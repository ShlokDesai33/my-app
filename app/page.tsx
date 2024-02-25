import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faker } from "@faker-js/faker";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import Chat from "@/components/chat";
import Markdown from "react-markdown";
import logo from "@/public/logo.svg";
import Image from "next/image";

const markdown = `# University of Waterloo's Face Recognition Vending Machine Scandal 
> "Why do the stupid M&M machines have facial recognition?"

The University of Waterloo is facing backlash after students discovered that M&M-branded smart vending machines on campus were collecting face recognition data without their consent. The controversy, which began when a student posted an image of an error message on Reddit, has raised concerns about privacy and data security.

**Unwanted Data Collection**

The error message displayed on the vending machine revealed the presence of a facial recognition application, "Invenda.Vending.FacialRecognitionApp.exe," which was unexpected and concerning for students. A fourth-year student, River Stanley, investigated the matter and found that the machines were collecting estimated ages and genders of users without their knowledge or consent.

Stanley's investigation also revealed that a shopping mall operator, Cadillac Fairview, had previously been investigated for using facial recognition software on unsuspecting patrons without their consent. The investigation resulted in the discovery that over 5 million Canadians had their faces scanned into Cadillac Fairview's database without their consent.

**University Response**

The University of Waterloo responded to the controversy by confirming that the vending machines were collecting face recognition data. The university spokesperson, Rebecca Elming, stated that the software had been disabled and the machines would be removed as soon as possible. However, Elming declined to provide a specific timeline for the removal or confirm whether other areas of the campus were collecting face recognition data.

**Compliance and Consent**

Invenda, the manufacturer of the vending machines, claims that the machines are fully compliant with the European Union's General Data Protection Regulation (GDPR), which is considered one of the world's toughest data privacy laws. However, under GDPR, face image data is considered highly sensitive and typically requires explicit consent to collect. The fact that the machines were collecting data without consent raises concerns about whether they meet the requirements of the GDPR.

**Student Reactions and Legal Implications**

Students at the University of Waterloo have expressed their frustration and concern over the data collection practices of the vending machines. Some students have covered the vending machine cameras with gum or Post-it notes while waiting for the school to respond. Others have questioned whether the technology is being used elsewhere on campus.

The controversy has also sparked discussions about potential legal implications. Some students have suggested filing a class-action lawsuit against the university for violating their privacy rights.

**Transparency and Accountability**

The University of Waterloo's handling of the situation has been criticized for its lack of transparency. Students have questioned why the university allowed the vending machines to collect facial recognition data without their consent and why the university was not more forthcoming about the data collection practices.

The controversy highlights the importance of transparency, accountability, and informed consent when it comes to the collection and use of personal data. It also raises concerns about the rapidly expanding use of facial recognition technology and the need for strong regulations to protect individual privacy.`;

export default function Home() {
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

      <main className="flex flex-col lg:flex-row gap-20 max-w-screen-xl mx-auto pt-10 px-4">
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
                  <p>{faker.lorem.paragraph()}</p>

                  <h4 className="text-lg font-semibold tracking-tight mt-4">
                    Key Points:
                  </h4>

                  <ul className="mt-4 ml-6 list-disc [&>li]:mt-2">
                    <li>{faker.lorem.paragraph()}</li>
                    <li>{faker.lorem.paragraph()}</li>
                    <li>{faker.lorem.paragraph()}</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          <Chat context="hi hello" />
        </div>

        <div className="basis-2/3 pb-10">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {new Date().toUTCString()}
            </p>

            <div className="flex items-center gap-x-4">
              <Button size="icon">
                <ThumbsUp className="size-4" />
              </Button>

              <Button size="icon">
                <ThumbsDown className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Markdown>{markdown}</Markdown>
          </div>

          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mt-10">
            Sources:
          </h4>

          <div className="grid gap-4 grid-cols-3 mt-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Card className="p-4" key={i}>
                <p>{faker.person.jobTitle()}</p>

                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {faker.lorem.lines(1)}
                </p>
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
