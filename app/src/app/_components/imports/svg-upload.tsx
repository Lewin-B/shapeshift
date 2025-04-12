"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Upload } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function SvgCard() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0] ?? null);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Uploading file:", file);
  };

  return (
    <Card
      onClick={() => console.log("click")}
      className="flex h-auto w-auto justify-center bg-[#030303]"
    >
      <CardContent className="flex flex-col items-center justify-center space-y-4 bg-[#030303]">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="flex w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg"
            >
              <div className="flex flex-col items-center justify-center space-y-3 px-10 pt-5 pb-6">
                <Upload className="h-30 w-30 text-gray-400" />
                <div className="font-['Instrument Sans'] text-[25px] leading-[30px] font-normal text-white not-italic">
                  Import <span className="text-[#F3B518]">SVG</span>
                </div>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {file && (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-muted-foreground text-sm">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <Button type="submit">Upload</Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
