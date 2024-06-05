import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DialogPage() {
  return (
    <div className=" z-50">
      <Dialog>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogContent>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
