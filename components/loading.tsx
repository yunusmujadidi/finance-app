import { Card, CardHeader, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const Loading = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full flex items-center justify-center">
            <div className="w-full space-y-4">
              <div className="flex items-center py-4">
                <Skeleton className="h-8 w-[300px]" />
                <Skeleton className="h-8 w-[100px] ml-auto" />
              </div>
              <div className="rounded-md border">
                <div className="h-[400px]">
                  <div className="flex border-b">
                    <div className="flex items-center py-4">
                      <Skeleton />

                      <Skeleton />
                    </div>
                    <div className="rounded-md border">
                      <Skeleton />
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                      <div className="flex-1 text-sm text-muted-foreground">
                        <Skeleton />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Skeleton />
                      </div>
                      <Skeleton />
                      <Skeleton />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-8 w-[80px]" />
                <Skeleton className="h-8 w-[80px]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
