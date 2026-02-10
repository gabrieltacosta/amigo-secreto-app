import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";
import Image from "next/image";

interface testimonialsProps {
  name: string;
  description: string;
  imageUrl: string;
}

const TestimonialsCard = ({
  name,
  description,
  imageUrl,
}: testimonialsProps) => {
  return (
    <Card className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 px-0 xl:row-span-2 space-y-8">
      <CardContent className="flex flex-col items-start">
        <CardDescription className="text-gray-900">
          <p className="leading-6">"{description}"</p>
        </CardDescription>

        <CardFooter className="p-0 mt-6 flex items-center gap-x-4">
          <Image
            src={imageUrl}
            alt={name}
            className="rounded-full"
            width={40}
            height={40}
          />
          <div>
            <span className="font-semibold text-zinc-700">{name}</span>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default TestimonialsCard;
