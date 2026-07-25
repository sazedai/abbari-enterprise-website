import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

const RightClickProtection = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setShowAlert(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent common shortcuts for copying/saving
      if (
        (e.ctrlKey && (e.key === "s" || e.key === "S" || e.key === "u" || e.key === "U")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "i" || e.key === "I" || e.key === "j" || e.key === "J"))
      ) {
        e.preventDefault();
        setShowAlert(true);
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      <AlertDialogContent className="bg-card border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-foreground">
            <ShieldAlert className="w-5 h-5 text-primary" />
            Content Protected
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            All content on this website, including images and text, is protected by copyright. 
            Unauthorized copying, reproduction, or distribution is strictly prohibited.
            <br /><br />
            © {new Date().getFullYear()} Abbari Enterprise. All rights reserved.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="hero" onClick={() => setShowAlert(false)}>
            I Understand
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RightClickProtection;
