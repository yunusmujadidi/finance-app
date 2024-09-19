import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

interface UploadButtonProps {
  onUpload: (result: any) => void;
}

export const UploadButton = ({
  onUpload,
}: {
  onUpload: (results: any) => void;
}) => {
  const { CSVReader } = useCSVReader();

  //TODO: add paywall maybe
  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button size="sm" className="w-full lg:w-auto " {...getRootProps()}>
          <Upload className="size-4 mr-2" /> Import
        </Button>
      )}
    </CSVReader>
  );
};
